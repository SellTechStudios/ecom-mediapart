import Link from 'next/link'
import classes from './index.module.scss'
import { Product } from '../../../../payload/payload-types'

export const CheckoutItem = ({
  product,
  title,
  quantity,
}: {
  product: Product
  title: string
  quantity: number
}) => {
  return (
    <li className={classes.item} key={product.id}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        <p>IMAGE GOES HERE</p>
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
        </div>
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>{quantity * product.price}</div>
    </li>
  )
}
