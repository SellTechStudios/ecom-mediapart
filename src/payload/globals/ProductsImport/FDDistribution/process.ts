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

const ERP_PREFIX = 'FDD_'
const BuildErpId = (id: string) => `${ERP_PREFIX}${id}`

export async function upsertUOM(u: JednostkaMiary) {
  const payload = await getPayloadHMR({ config })
  const collectionSlug = 'uom'

  const erpId = BuildErpId(u._id)
  const uom = {
    erpId: erpId,
    name: u._skrot,
  } as Uom

  const existing = (
    await payload.find({
      collection: collectionSlug,
      pagination: false,
      where: {
        erpId: { equals: erpId },
      },
    })
  )?.docs[0]

  if (existing) {
    await payload.update({
      collection: collectionSlug,
      id: existing.id,
      data: uom,
    })
  } else {
    await payload.create({
      collection: collectionSlug,
      data: uom,
    })
  }
}

export async function upsertWarehouse(m: Magazyn) {
  const payload = await getPayloadHMR({ config })
  const collectionSlug = 'warehouses'

  const erpId = BuildErpId(m._id)
  const warehouse = {
    erpId: erpId,
    name: m._nazwa,
    description: m.m_opis,
  } as Warehouse

  const existing = (
    await payload.find({
      collection: collectionSlug,
      pagination: false,
      where: {
        erpId: { equals: erpId },
      },
    })
  )?.docs[0]

  if (existing) {
    await payload.update({
      collection: collectionSlug,
      id: existing.id,
      data: warehouse,
    })
  } else {
    await payload.create({
      collection: collectionSlug,
      data: warehouse,
    })
  }
}

export async function upsertManufacturer(m: Producent) {
  const payload = await getPayloadHMR({ config })
  const collectionSlug = 'manufacturer'

  const erpId = BuildErpId(m._id)
  const manufacturer = {
    erpId: erpId,
    name: m._nazwa,
    description: m.pr_description,
    keywords: m.pr_keywords,
    title: m.pr_title,
  } as Manufacturer

  const existing = (
    await payload.find({
      collection: collectionSlug,
      pagination: false,
      where: {
        erpId: { equals: erpId },
      },
    })
  )?.docs[0]

  if (existing) {
    await payload.update({
      collection: collectionSlug,
      id: existing.id,
      data: manufacturer,
    })
  } else {
    await payload.create({
      collection: collectionSlug,
      data: manufacturer,
    })
  }
}

export async function upsertProductCategory(c: Kategoria) {
  const payload = await getPayloadHMR({ config })
  const collectionSlug = 'product-erp-category'

  let settings: Settings = await getCachedGlobal('settings')()

  const erpId = BuildErpId(c._id)
  const category = {
    erpId: erpId,
    erpName: 'FDDistribution',
    name: c.k_title,
    categoryId: settings.defaultProductCategory,
  } as ProductErpCategory

  const existing = (
    await payload.find({
      collection: collectionSlug,
      pagination: false,
      where: {
        erpId: { equals: erpId },
      },
    })
  )?.docs[0]

  if (existing) {
    await payload.update({
      collection: collectionSlug,
      id: existing.id,
      data: category,
    })
  } else {
    await payload.create({
      collection: collectionSlug,
      data: category,
    })
  }
}

export async function upsertProduct(p: Produkt) {
  const payload = await getPayloadHMR({ config })
  const collectionSlug = 'products'

  const erpId = BuildErpId(p._id)
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

  const product = {
    erpId: erpId,
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
    warehouse: warehouse.id,
    manufacturer: manufacturer.id,
    erpCategories: [erpCategory.id],
    mediaImages: images,
    mediaVideo: videos,
    seoDescription: p.html_description,
    seoImageUrl: mainImage?._url,
    seoTitle: p.html_title,
  } as Product

  const existing = (
    await payload.find({
      collection: collectionSlug,
      pagination: false,
      where: {
        erpId: { equals: erpId },
      },
    })
  )?.docs[0]

  if (existing) {
    await payload.update({
      collection: collectionSlug,
      id: existing.id,
      data: product,
    })
  } else {
    await payload.create({
      collection: collectionSlug,
      data: product,
    })
  }
}
