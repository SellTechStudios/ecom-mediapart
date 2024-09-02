'use client'
import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { FDDistribution } from './types'
import { XMLParser } from 'fast-xml-parser'
import {
  upsertUOMBulk,
  upsertWarehouseBulk,
  upsertManufacturerBulk,
  upsertProductCategoryBulk,
  upsertProductBulk,
} from './process'
import Image from 'next/image'

const bulkSize = 10
const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '_',
}

const FdDistributionImportUI = () => {
  let [uomTotal, setUomTotal] = useState(0)
  let [uomCounter, setUomCounter] = useState(0)
  let [warehousesTotal, setWarehousesTotal] = useState(0)
  let [warehouseCounter, setWarehouseCounter] = useState(0)
  let [manufacturerTotal, setManufacturerTotal] = useState(0)
  let [manufacturerCounter, setManufacturerCounter] = useState(0)
  let [categoryTotal, setCategoryTotal] = useState(0)
  let [categoryCounter, setCategoryCounter] = useState(0)
  let [productsTotal, setProductsTotal] = useState(0)
  let [productsCounter, setProductsCounter] = useState(0)

  const handleRunActions = async () => {
    let xml = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/imports/fd-distribution-input.xml`)
    let text = await xml.text()

    const parser = new XMLParser(parserOptions)
    let data = parser.parse(text) as FDDistribution

    //convert smaller collections to arrays to handle everything in the same way
    if (!Array.isArray(data.dane.magazyny.m)) data.dane.magazyny.m = [data.dane.magazyny.m]
    if (!Array.isArray(data.dane.producenci.pr)) data.dane.producenci.pr = [data.dane.producenci.pr]

    setUomCounter(0)
    setUomTotal(data.dane.jednostki_miary.jm.length)
    setWarehouseCounter(0)
    setWarehousesTotal(data.dane.magazyny.m.length)
    setManufacturerCounter(0)
    setManufacturerTotal(data.dane.producenci.pr.length)
    setCategoryCounter(0)
    setCategoryTotal(data.dane.kategorie.k.length)
    setProductsCounter(0)
    setProductsTotal(data.dane.produkty.p.length)

    //Warehouses
    for (let i = 0; i < data.dane.magazyny.m.length; i += bulkSize) {
      await upsertWarehouseBulk(data.dane.magazyny.m.slice(i, i + bulkSize))
      setWarehouseCounter(i)
    }
    setWarehouseCounter(warehousesTotal)

    // //UOMs
    for (let i = 0; i < data.dane.jednostki_miary.jm.length; i += bulkSize) {
      await upsertUOMBulk(data.dane.jednostki_miary.jm.slice(i, i + bulkSize))
      setUomCounter(i)
    }
    setUomCounter(uomTotal)

    //Manufacturers
    for (let i = 0; i < data.dane.producenci.pr.length; i += bulkSize) {
      await upsertManufacturerBulk(data.dane.producenci.pr.slice(i, i + bulkSize))
      setManufacturerCounter(i)
    }
    setManufacturerCounter(manufacturerTotal)

    //Product Erp Categories
    for (let i = 0; i < data.dane.kategorie.k.length; i += bulkSize) {
      await upsertProductCategoryBulk(data.dane.kategorie.k.slice(i, i + bulkSize))
      setCategoryCounter(i)
    }
    setCategoryCounter(categoryTotal)

    //Products
    for (let i = 0; i < data.dane.produkty.p.length; i += bulkSize) {
      await upsertProductBulk(data.dane.produkty.p.slice(i, i + bulkSize))
      setProductsCounter(i)
    }
    setProductsCounter(productsTotal)
  }

  return (
    <>
      <div className="flex flex-row">
        <Image
          className="image"
          src="/imports/fd-distribution-logo.svg"
          width={30}
          height={30}
          alt="FD Distribution Logo"
        />
        <h1>FD Distribution</h1>
      </div>

      <Button onClick={handleRunActions}>Upload XML</Button>

      <>
        <div>
          Warehouses: {warehouseCounter} / {warehousesTotal}
        </div>
        <div>
          UOMs: {uomCounter} / {uomTotal}
        </div>
        <div>
          Manufacturers: {manufacturerCounter} / {manufacturerTotal}
        </div>
        <div>
          Product Categories: {categoryCounter} / {categoryTotal}
        </div>
        <div>
          Products: {productsCounter} / {productsTotal}
        </div>
      </>
    </>
  )
}

export default FdDistributionImportUI
