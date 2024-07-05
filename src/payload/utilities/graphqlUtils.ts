type baseEntity = {
  id: string
}

const BuildRequest = async (queryObject: object): Promise<any> => {
  const response = await fetch(`http://localhost:3000/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(queryObject),
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const json = await response.json()
  if (json?.errors) console.log(json)

  return json
}

const Upsert = async <Tin>(
  fetch: (erpId: string) => Promise<Tin>,
  update: (id: string, entity: Tin) => Promise<number>,
  create: (entity: Tin) => Promise<number>,
  erpId: string,
  entity: Tin,
) => {
  const existingEntity = await fetch(erpId)
  existingEntity ? await update((existingEntity as baseEntity).id, entity) : await create(entity)
}

export { BuildRequest, Upsert }
