export const EndpointNames = {
  Products: {
    New: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ecom/products/new` as const,
    Outlet: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ecom/products/outlet` as const,
    Promoted: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ecom/products/promoted` as const,
    QuickSearch: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ecom/products/quicksearch` as const,
  },
}
