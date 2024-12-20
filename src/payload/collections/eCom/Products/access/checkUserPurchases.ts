import { FieldAccess } from 'payload'
import { checkRole } from '../../../Users/checkRole'
import { Product } from 'src/payload-types'

// we need to prevent access to documents behind a paywall
// to do this we check the document against the user's list of active purchases
export const checkUserPurchases: FieldAccess<Product> = async ({ req: { user }, doc }) => {
  if (!user) {
    return false
  }

  if (checkRole(['admin'], user)) {
    return true
  }

  if (doc && user && typeof user === 'object' && user?.purchases?.length > 0) {
    return user.purchases?.some(
      (purchase) => doc.id === (typeof purchase === 'object' ? purchase.id : purchase),
    )
  }

  return false
}
