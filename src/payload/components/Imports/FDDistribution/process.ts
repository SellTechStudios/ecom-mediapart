import { XMLParser } from 'fast-xml-parser'
import { FDDistribution, JednostkaMiary, Kategoria, Magazyn, Producent, Produkt } from './types'
import { Manufacturer, Product, ProductCategory, Uom, Warehouse } from '../../../payload-types'
import {
  categoryCreate,
  categoryUpdate,
  categoryFetchByErpId,
} from '../../../../app/_api/productCategories'
import { uomFetchByErpId, uomCreate, uomUpdate } from '../../../../app/_api/unitsOfMeasure'
import {
  warehouseFetchByErpId,
  warehouseUpdate,
  warehouseCreate,
} from '../../../../app/_api/warehouses'
import { Upsert } from '../../../utilities/graphqlUtils'
import {
  manufacturerCreate,
  manufacturerFetchByErpId,
  manufacturerUpdate,
} from '../../../../app/_api/manufacturers'
import { productCreate, productFetchByErpId, productUpdate } from '../../../../app/_api/products'

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '_',
}

const ERP_PREFIX = 'FDD_'
const BuildErpId = (id: string) => `${ERP_PREFIX}${id}`

function sleep(milliseconds) {
  var start = new Date().getTime()
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break
    }
  }
}

export default async (xmlFileContent: string): Promise<FDDistribution> => {
  const parser = new XMLParser(parserOptions)
  let data = parser.parse(xmlFileContent) as FDDistribution

  //convert smaller collections to arrays to handle everything in the same way
  if (!Array.isArray(data.dane.magazyny.m)) data.dane.magazyny.m = [data.dane.magazyny.m]
  if (!Array.isArray(data.dane.producenci.pr)) data.dane.producenci.pr = [data.dane.producenci.pr]

  // await processUOMs(data.dane.jednostki_miary.jm)
  // await processWarehouses(data.dane.magazyny.m)
  // await processManufacturers(data.dane.producenci.pr)
  // await processCategories(data.dane.kategorie.k)
  await processProducts(data.dane.produkty.p)

  return data
}

async function processUOMs(data: JednostkaMiary[]) {
  data.forEach(async (u, i) => {
    const erpId = BuildErpId(u._id)
    const uom = {
      erpId: erpId,
      name: u._skrot,
    } as Uom

    await Upsert(uomFetchByErpId, uomUpdate, uomCreate, erpId, uom)
    sleep(100)
  })
}

async function processWarehouses(data: Magazyn[]) {
  data.forEach(async (m, i) => {
    const erpId = BuildErpId(m._id)
    const warehouse = {
      erpId: erpId,
      name: m._nazwa,
      description: m.m_opis,
    } as Warehouse

    await Upsert(warehouseFetchByErpId, warehouseUpdate, warehouseCreate, erpId, warehouse)
    sleep(100)
  })
}

async function processManufacturers(data: Producent[]) {
  data.forEach(async (m, i) => {
    const erpId = BuildErpId(m._id)
    const manufacturer = {
      erpId: erpId,
      name: m._nazwa,
      description: m.pr_description,
      keywords: m.pr_keywords,
      title: m.pr_title,
    } as Manufacturer

    await Upsert(
      manufacturerFetchByErpId,
      manufacturerUpdate,
      manufacturerCreate,
      erpId,
      manufacturer,
    )
    sleep(100)
  })
}

async function processCategories(data: Kategoria[]) {
  data.forEach(async (c, i) => {
    const erpId = BuildErpId(c._id)
    const category = {
      erpId: erpId,
      name: c.k_title,
      title: c.k_title,
      description: c.k_description,
      keywords: c.k_description,
    } as ProductCategory

    await Upsert(categoryFetchByErpId, categoryUpdate, categoryCreate, erpId, category)
    sleep(100)
  })
}

async function processProducts(data: Produkt[]) {
  // data.forEach(async p => {
  for (let i = 0; i < 10; i++) {
    let p = data[i]
    const erpId = BuildErpId(p._id)
    const warehouse = await warehouseFetchByErpId(`${ERP_PREFIX}${p._magazyn_id}`)
    const manufacturer = await manufacturerFetchByErpId(`${ERP_PREFIX}${p._producent_id}`)
    const category = await categoryFetchByErpId(`${ERP_PREFIX}${p._kategoria_id}`)
    const mainImage = p.zdjecia.z.find(z => z._glowne == '1')

    type ImageType = {
      url: string
      isMain: boolean
    }
    const images = p.zdjecia.z.map(
      z =>
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
      categories: [category.id],
      mediaImages: images,
      mediaVideo: videos,
      seoDescription: p.html_description,
      seoImageUrl: mainImage?._url,
      seoTitle: p.html_title,
    } as Product

    await Upsert(productFetchByErpId, productUpdate, productCreate, erpId, product)
    sleep(100)
  }
}
