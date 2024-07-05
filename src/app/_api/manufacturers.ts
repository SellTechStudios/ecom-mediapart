import type { Manufacturer } from '../../payload/payload-types'
import { BuildRequest } from '../../payload/utilities/graphqlUtils'

export const manufacturerFetchByErpId = async (erpId: string): Promise<Manufacturer> => {
  const body = {
    query: `query Manufacturer {
        Manufacturers (where: { erpId: { equals: "${erpId}" }}) {
          docs {
            id
            name
            title
            description
            keywords
          }
        }
      }`,
  }
  const json = await BuildRequest(body)
  return json.data?.Manufacturers?.docs[0]
}

export const manufacturerCreate = async (manufacturer: Manufacturer): Promise<number> => {
  const body = {
    variables: {
      manufacturer: manufacturer,
    },
    query: `mutation CreateManufacturer($manufacturer: mutationManufacturerInput!) {
              createManufacturer(data: $manufacturer) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.createManufacturer?.id as number
}

export const manufacturerUpdate = async (
  id: string,
  manufacturer: Manufacturer,
): Promise<number> => {
  const body = {
    variables: {
      manufacturer: manufacturer,
    },
    query: `mutation UpdateManufacturer($manufacturer: mutationManufacturerUpdateInput!) {
              updateManufacturer(id: "${id}", data: $manufacturer) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.updateManufacturer?.id as number
}
