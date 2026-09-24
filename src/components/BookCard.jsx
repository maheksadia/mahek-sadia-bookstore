import { Link } from 'react-router-dom'
import BookCover from './BookCover.jsx'
import { formatPrice } from '../utils/format.js'
import { useCart } from '../context/CartContext.jsx'

export default function BookCard({ book }) {
  const { addItem } = useCart()
  const isComingSoon = book.status === 'coming-soon'

  return (
    <div className="group flex flex-col">
      <Link
        to={`/books/${book.id}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-sm shadow-book"
      >
        <BookCover book={book} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        {isComingSoon && (
          <span className="absolute top-3 left-3 bg-paper/90 text-ink text-[11px] px-2.5 py-1 tracking-wide rounded-sm">
            Coming Soon
          </span>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1.5">
        <Link to={`/books/${book.id}`}>
          <h3 className="urdu text-xl text-ink leading-snug hover:text-gold transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="font-display italic text-sm text-ink/60">{book.romanTitle}</p>
        <p className="text-[13.5px] text-ink/70 leading-relaxed line-clamp-2">
          {book.descriptionEn}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-display text-lg text-ink">
            {isComingSoon ? 'TBA' : formatPrice(book.price)}
          </span>
          <span className="text-[11px] text-ink/50 tracking-wide">
            {book.language} · {book.format?.join('/')}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <Link
            to={`/books/${book.id}`}
            className="flex-1 text-center text-[13px] border border-ink/20 rounded-sm py-2 hover:border-ink transition-colors"
          >
            View Book
          </Link>
          <button
            disabled={isComingSoon}
            onClick={() => addItem(book)}
            className="flex-1 text-center text-[13px] bg-ink text-paper rounded-sm py-2 hover:bg-gold transition-colors disabled:opacity-40 disabled:hover:bg-ink"
          >
            {isComingSoon ? 'Notify Me' : 'Buy Ebook'}
          </button>
        </div>
      </div>
    </div>
  )
}
