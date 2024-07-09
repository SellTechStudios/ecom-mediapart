import type { PayloadHandler } from 'payload/config'
import type { PayloadRequest } from 'payload/types'
import payload from 'payload'

const outputProject = {
  name: 1,
  price: 1,
  ean: 1,
  mediaImages: 1,
}

export const productsQuickSearch: PayloadHandler = async (req: PayloadRequest, res) =>
  await send(req, res, quickSearchAggregate)

export const productsNew: PayloadHandler = async (req: PayloadRequest, res) =>
  await send(req, res, newProductAggregate)

export const productsOutlet: PayloadHandler = async (req: PayloadRequest, res) =>
  await send(req, res, outletProductAggregate)

export const productsPromoted: PayloadHandler = async (req: PayloadRequest, res) =>
  await send(req, res, promotedProductAggregate)

export const atlasSearch: PayloadHandler = async (req: PayloadRequest, res) =>
  await send(req, res, atlasSearchAggregate)

async function send(req: PayloadRequest, res, reqAggregateBuilder) {
  try {
    var result = await reqAggregateBuilder(req)

    res.status(200).json(result)
  } catch (error: unknown) {
    res.status(500).json({ error: `Error when using Atlas Search API: ${error}` })
  }
}

async function quickSearchAggregate(req: PayloadRequest) {
  const searchString = req.query?.text

  var productsModel = payload.db.collections['products']
  return await productsModel.aggregate([
    {
      $search: {
        index: 'facets',
        text: {
          query: searchString,
          path: 'name',
        },
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        ean: 1,
        mediaImages: 1,
      },
    },
  ])
}

async function newProductAggregate(req: PayloadRequest) {
  var productsModel = payload.db.collections['products']
  return await productsModel.aggregate([
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: outputProject,
    },
  ])
}

async function outletProductAggregate(req: PayloadRequest) {
  var productsModel = payload.db.collections['products']
  return await productsModel.aggregate([
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: outputProject,
    },
  ])
}

async function promotedProductAggregate(req: PayloadRequest) {
  var productsModel = payload.db.collections['products']
  return productsModel.aggregate([
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: outputProject,
    },
  ])
}

async function atlasSearchAggregate(req: PayloadRequest) {
  const searchString = req.query?.text

  var productsModel = payload.db.collections['products']
  return await productsModel.aggregate([
    {
      $search: {
        index: 'facets',
        text: {
          query: searchString,
          path: 'name',
        },
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        ean: 1,
        mediaImages: 1,
      },
    },
  ])
}
