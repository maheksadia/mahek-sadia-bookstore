import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Cart() {
  const { items, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <SectionHeading urdu="آپ کا کارٹ خالی ہے" english="Your cart is empty" align="center" />
        <Link to="/books" className="text-gold underline text-sm">
          Browse all books
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <SectionHeading urdu="کارٹ" english="Your Cart" />

      <div className="flex flex-col divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <div>
              <p className="urdu text-lg text-ink">{item.title}</p>
              <p className="font-display italic text-ink/50 text-sm">{item.romanTitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-ink">{formatPrice(item.price)}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs text-ink/40 hover:text-ink underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="text-ink/60 text-sm">Total</span>
        <span className="font-display text-2xl text-ink">{formatPrice(total)}</span>
      </div>

      <Link
        to="/checkout"
        className="block text-center mt-8 bg-ink text-paper text-sm tracking-wide rounded-sm py-3 hover:bg-gold transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}
