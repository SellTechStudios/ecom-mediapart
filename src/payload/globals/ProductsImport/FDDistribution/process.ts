'use server'
import { JednostkaMiary, Kategoria, Magazyn, Producent, Produkt } from './types'
import {
  Manufacturer,
  Product,
  ProductErpCategory,
  Settings,
  Uom,
  Warehouse,
} from 'src/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ObjectID from 'bson-objectid'

const ERP_PREFIX = 'FDD_'
const BuildErpId = (id: string) => `${ERP_PREFIX}${id}`

export async function upsertUOMBulk(bulk: JednostkaMiary[]) {
  const payload = await getPayloadHMR({ config })

  let collection = payload.db.collections['uom']

  type UomUpsert = Omit<Uom, 'createdAt' | 'updatedAt' | 'id'>
  var data = bulk.map((m) => ({
    updateOne: {
      upsert: true,
      filter: { erpId: BuildErpId(m._id) },
      update: {
        erpId: BuildErpId(m._id),
        name: m._skrot,
      } as UomUpsert,
    },
  }))

  await collection.bulkWrite(data)
}

export async function upsertWarehouseBulk(bulk: Magazyn[]) {
  const payload = await getPayloadHMR({ config })
  let collection = payload.db.collections['warehouses']

  type WarehouseUpsert = Omit<Warehouse, 'createdAt' | 'updatedAt' | 'id'>
  var data = bulk.map((m) => ({
    updateOne: {
      upsert: true,
      filter: { erpId: BuildErpId(m._id) },
      update: {
        erpId: BuildErpId(m._id),
        name: m._nazwa,
      } as WarehouseUpsert,
    },
  }))

  await collection.bulkWrite(data)
}

export async function upsertManufacturerBulk(bulk: Producent[]) {
  const payload = await getPayloadHMR({ config })
  let collection = payload.db.collections['manufacturer']

  type ManufacturerUpsert = Omit<Manufacturer, 'createdAt' | 'updatedAt' | 'id'>
  var data = bulk.map((m) => ({
    updateOne: {
      upsert: true,
      filter: { erpId: BuildErpId(m._id) },
      update: {
        erpId: BuildErpId(m._id),
        name: m._nazwa,
      } as ManufacturerUpsert,
    },
  }))

  await collection.bulkWrite(data)
}

export async function upsertProductCategoryBulk(bulk: Kategoria[]) {
  const payload = await getPayloadHMR({ config })
  let collection = payload.db.collections['product-erp-category']
  let settings: Settings = await getCachedGlobal('settings')()

  type ProductErpCategoryUpsert = Omit<ProductErpCategory, 'createdAt' | 'updatedAt' | 'id'>
  var data = bulk.map((c) => ({
    updateOne: {
      upsert: true,
      filter: { erpId: BuildErpId(c._id) },
      update: {
        erpId: BuildErpId(c._id),
        erpName: 'FDDistribution',
        name: c.k_title,
        categoryId: settings.defaultProductCategory,
      } as ProductErpCategoryUpsert,
    },
  }))

  await collection.bulkWrite(data)
}

export async function upsertProductBulk(bulk: Produkt[]) {
  const payload = await getPayloadHMR({ config })
  let collection = payload.db.collections['products']

  type ProductUpsert = Omit<
    Product,
    'createdAt' | 'updatedAt' | 'slug' | 'id' | 'manufacturer' | 'erpCategories' | 'warehouse'
  >
  var data = await Promise.all(
    bulk.map(async (p) => {
      const warehouse = (
        await payload.find({
          collection: 'warehouses',
          pagination: false,
          where: {
            erpId: { equals: BuildErpId(p._magazyn_id) },
          },
        })
      )?.docs[0]

      const manufacturer = (
        await payload.find({
          collection: 'manufacturer',
          pagination: false,
          where: {
            erpId: { equals: BuildErpId(p._producent_id) },
          },
        })
      )?.docs[0]

      const erpCategory = (
        await payload.find({
          collection: 'product-erp-category',
          pagination: false,
          where: {
            erpId: { equals: BuildErpId(p._kategoria_id) },
          },
        })
      )?.docs[0]

      if (!Array.isArray(p.zdjecia.z)) p.zdjecia.z = [p.zdjecia.z]
      const mainImage = p.zdjecia.z.find((z) => z._glowne == '1')

      type ImageType = {
        url: string
        isMain: boolean
      }
      const images = p.zdjecia?.z?.map(
        (z) =>
          <ImageType>{
            url: z._url,
            isMain: z._glowne == '1',
          },
      )
      const videos = p.opis_filmy ? [{ url: p.opis_filmy }] : null

      return {
        updateOne: {
          upsert: true,
          filter: { erpId: BuildErpId(p._id) },
          update: {
            erpId: BuildErpId(p._id),
            title: p.html_title,
            code: p.kod_producenta.toString(),
            description: p.opis,
            ean: p.kod_ean.toString(),
            name: p.nazwa,
            price: parseFloat(p._cena),
            pricePrevious: parseFloat(p._cena_poprzednia),
            quantity: parseFloat(p._ilosc),
            quantityMin: parseFloat(p._ilosc_min),
            quantityStep: parseFloat(p._ilosc_przyrost),
            vat: parseFloat(p._stawka_vat),
            warehouse: ObjectID(warehouse.id),
            manufacturer: ObjectID(manufacturer.id),
            erpCategories: [ObjectID(erpCategory.id)],
            mediaImages: images,
            mediaVideo: videos,
            seoDescription: p.html_description,
            seoImageUrl: mainImage?._url,
            seoTitle: p.html_title,
          } as ProductUpsert,
        },
      }
    }),
  )

  await collection.bulkWrite(data)
}
