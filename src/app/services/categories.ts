export const fetchCategories = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/categories`)
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }
  const json = await response.json()
  return json
}
