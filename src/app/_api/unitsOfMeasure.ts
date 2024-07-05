import type { Uom } from '../../payload/payload-types'
import { BuildRequest } from '../../payload/utilities/graphqlUtils'

export const uomFetchByErpId = async (erpId: string): Promise<Uom> => {
  const body = {
    query: `query Uoms {
        Uoms (where: { erpId: { equals: "${erpId}" }}) {
          docs {
            id
            name
          }
        }
      }`,
  }
  const json = await BuildRequest(body)
  return json.data?.Uoms?.docs[0]
}

export const uomCreate = async (uom: Uom): Promise<number> => {
  const body = {
    variables: {
      uom: uom,
    },
    query: `mutation CreateUom($uom: mutationUomInput!) {
              createUom(data: $uom) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.createUom?.id as number
}

export const uomUpdate = async (id: string, uom: Uom): Promise<number> => {
  const body = {
    variables: {
      uom: uom,
    },
    query: `mutation UpdateUom($uom: mutationUomUpdateInput!) {
              updateUom(id: "${id}", data: $uom) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.updateUom?.id as number
}
