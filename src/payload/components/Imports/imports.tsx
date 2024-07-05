'use client'
import React, { useRef, useState } from 'react'
import { AdminViewComponent } from 'payload/config'
import { Button } from 'payload/components'
import ProcessFdDistribution from './FDDistribution/process'
import { FDDistribution } from './FDDistribution/types'
import './imports.scss'

const ImportsAdminView: AdminViewComponent = args => {
  console.log(args)
  const inputFileRef = useRef(null)
  let [parsing, setParsing] = useState(false)
  let [result, setResult] = useState<FDDistribution>(null)

  let onFileUpload = async e => {
    const reader = new FileReader()

    reader.onload = async () => parseData(reader.result.toString())
    reader.readAsText(e.target.files[0])
  }

  let parseData = async (data: string) => {
    setParsing(true)
    setResult(await ProcessFdDistribution(data))
    setParsing(false)
  }

  return (
    <div className="imports">
      <Button onClick={async () => inputFileRef.current.click()}>Upload XML</Button>
      <input type="file" ref={inputFileRef} disabled={parsing} onChange={onFileUpload}></input>

      {parsing && <h2>Parsing data...</h2>}
      {result && (
        <div>
          <h2>Processed:</h2>
          <ul>
            <li>{result.dane.jednostki_miary.jm.length + 1} UOMs</li>
            <li>{result.dane.magazyny.m.length + 1} Warehouses</li>
            <li>{result.dane.producenci.pr.length + 1} Manufacturers</li>
            <li>{result.dane.kategorie.k.length + 1} Product Categories</li>
            <li>{result.dane.produkty.p.length + 1} Products</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ImportsAdminView
