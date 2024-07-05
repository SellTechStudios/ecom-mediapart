import type { Warehouse } from '../../payload/payload-types'
import { BuildRequest } from '../../payload/utilities/graphqlUtils'

export const warehouseFetchByErpId = async (erpId: string): Promise<Warehouse> => {
  const body = {
    query: `query Warehouse {
        Warehouses (where: { erpId: { equals: "${erpId}" }}) {
          docs {
            id
            erpId
            name
            description
          }
        }
      }`,
  }
  const json = await BuildRequest(body)
  return json.data?.Warehouses?.docs[0]
}

export const warehouseCreate = async (warehouse: Warehouse): Promise<number> => {
  const body = {
    variables: {
      warehouse: warehouse,
    },
    query: `mutation CreateWarehouse($warehouse: mutationWarehouseInput!) {
              createWarehouse(data: $warehouse) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.createWarehouse?.id as number
}

export const warehouseUpdate = async (id: string, warehouse: Warehouse): Promise<number> => {
  const body = {
    variables: {
      warehouse: warehouse,
    },
    query: `mutation UpdateWarehouse($warehouse: mutationWarehouseUpdateInput!) {
              updateWarehouse(id: "${id}", data: $warehouse) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.updateWarehouse?.id as number
}
