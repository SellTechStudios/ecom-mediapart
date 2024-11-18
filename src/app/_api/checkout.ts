import { type PayloadHandler } from 'payload'
import crypto from 'crypto'
import { P24PaymentMethodsResponse } from './checkout.types'

// Configuration
const merchantID = 317031
const crcKey = '4ef7e930847ee038'
const apiKey = '9dacdc356b13109fcae9d383df66228a'

const paymnetMethodsHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    const methods = await getP24PaymentMethods()

    return Response.json(methods)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

const initTransactionHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    const result = await initTransaction(1, '1234', 'karol.barkowski@gmail.com')

    return Response.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

async function getP24PaymentMethods() {
  const base64AuthKey = buildApiKey()

  const response = await fetch(
    'https://sandbox.przelewy24.pl/api/v1/payment/methods/pl?amount=150&subgroup=1&currency=PLN',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64AuthKey}`,
      },
    },
  )

  const typedResponse = (await response.json()) as P24PaymentMethodsResponse
  return typedResponse.data.filter((m) => m.status === true)
}

async function initTransaction(amount: number, sessionId: string, userEmail: string) {
  const base64AuthKey = buildApiKey()

  const crcHashParams = {
    sessionId: sessionId,
    merchantId: merchantID,
    amount: amount,
    currency: 'PLN',
    crc: crcKey,
  }
  const crcJsonString = JSON.stringify(crcHashParams)
  console.log(crcJsonString)

  const hash = crypto.createHash('sha384').update(crcJsonString).digest('hex')
  console.log(hash)

  try {
    const response = await fetch('https://sandbox.przelewy24.pl/api/v1/transaction/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64AuthKey}`,
      },
      body: JSON.stringify({
        merchantId: merchantID,
        posId: merchantID,
        sessionId: sessionId,
        amount: amount * 100,
        currency: 'PLN',
        description: 'Test order',
        email: userEmail,
        country: 'PL',
        language: 'pl',
        method: 154, //BLIK
        waitForResult: true,
        sign: hash,
        encoding: 'UTF-8',
        urlReturn: 'http://localhost:3000/checkout',
      }),
    })

    console.log(await response.json())

    return response.body
  } catch (error) {
    console.error(error)
    return null
  }
}

const buildApiKey = () => btoa(`${merchantID}:${apiKey}`)

export { paymnetMethodsHandler, initTransactionHandler }
