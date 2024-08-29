'use client'
import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { FDDistribution } from './types'
import { XMLParser } from 'fast-xml-parser'
import {
  upsertUOM,
  upsertWarehouse,
  upsertManufacturer,
  upsertProductCategory,
  upsertProduct,
} from './process'
import Image from 'next/image'

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '_',
}

const FdDistributionImportUI = () => {
  let [parsing, setParsing] = useState(false)
  let [uomCounter, setUomCounter] = useState({
    current: 0,
    total: 0,
  })
  let [warehouseCounter, setWarehouseCounter] = useState({
    current: 0,
    total: 0,
  })
  let [manufacturerCounter, setManufacturerCounter] = useState({
    current: 0,
    total: 0,
  })
  let [categoryCounter, setCategoryCounter] = useState({
    current: 0,
    total: 0,
  })
  let [productsCounter, setProductsCounter] = useState({
    current: 0,
    total: 0,
  })

  const handleRunActions = async () => {
    setParsing(true)

    let xml = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/imports/fd-distribution-input.xml`)
    let text = await xml.text()

    const parser = new XMLParser(parserOptions)
    let data = parser.parse(text) as FDDistribution

    //convert smaller collections to arrays to handle everything in the same way
    if (!Array.isArray(data.dane.magazyny.m)) data.dane.magazyny.m = [data.dane.magazyny.m]
    if (!Array.isArray(data.dane.producenci.pr)) data.dane.producenci.pr = [data.dane.producenci.pr]

    setUomCounter({
      current: 1,
      total: data.dane.jednostki_miary.jm.length,
    })
    setWarehouseCounter({
      current: 1,
      total: data.dane.magazyny.m.length,
    })
    setManufacturerCounter({
      current: 1,
      total: data.dane.producenci.pr.length,
    })
    setCategoryCounter({
      current: 1,
      total: data.dane.kategorie.k.length,
    })
    setProductsCounter({
      current: 1,
      total: data.dane.produkty.p.length,
    })

    // //Warehouses
    for (let i = 0; i < data.dane.magazyny.m.length; i++) {
      await upsertWarehouse(data.dane.magazyny.m[i])
      setWarehouseCounter({
        current: i + 1,
        total: data.dane.magazyny.m.length,
      })
    }

    //UOMs
    for (let i = 0; i < data.dane.jednostki_miary.jm.length; i++) {
      await upsertUOM(data.dane.jednostki_miary.jm[i])
      setUomCounter({
        current: i + 1,
        total: data.dane.jednostki_miary.jm.length,
      })
    }

    //Manufacturers
    for (let i = 0; i < data.dane.producenci.pr.length; i++) {
      await upsertManufacturer(data.dane.producenci.pr[i])
      setManufacturerCounter({
        current: i + 1,
        total: data.dane.producenci.pr.length,
      })
    }

    //Product Erp Categories
    for (let i = 0; i < data.dane.kategorie.k.length; i++) {
      await upsertProductCategory(data.dane.kategorie.k[i])
      setCategoryCounter({
        current: i + 1,
        total: data.dane.kategorie.k.length,
      })
    }

    //Products
    for (let i = 0; i < data.dane.produkty.p.length; i++) {
      await upsertProduct(data.dane.produkty.p[i])
      setProductsCounter({
        current: i + 1,
        total: data.dane.produkty.p.length,
      })
    }
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
          Warehouses: {warehouseCounter.current} / {warehouseCounter.total}
        </div>
        <div>
          UOMs: {uomCounter.current} / {uomCounter.total}
        </div>
        <div>
          Manufacturers: {manufacturerCounter.current} / {manufacturerCounter.total}
        </div>
        <div>
          Product Categories: {categoryCounter.current} / {categoryCounter.total}
        </div>
        <div>
          Products: {productsCounter.current} / {productsCounter.total}
        </div>
      </>
    </>
  )
}

export default FdDistributionImportUI
