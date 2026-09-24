// Renders a real cover image if `cover` is provided (e.g. "/covers/darmiyan.jpg",
// placed in the /public/covers folder), otherwise falls back to an elegant
// generated cover using the book's title and palette — so the store never
// shows a broken image while covers are still being designed.
export default function BookCover({ book, className = '' }) {
  if (book.cover) {
    return (
      <img
        src={book.cover}
        alt={`${book.romanTitle} — book cover`}
        className={`w-full h-full object-cover ${className}`}
      />
    )
  }

  const [base, accent] = book.coverPalette || ['#15130F', '#A9803F']

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center px-6 ${className}`}
      style={{ background: `linear-gradient(155deg, ${base} 0%, ${base} 60%, ${accent}22 100%)` }}
    >
      <div
        className="w-10 h-px mb-6"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      <p className="urdu text-3xl md:text-4xl text-paper leading-snug">{book.title}</p>
      <p className="font-display italic text-sm tracking-wide mt-4" style={{ color: accent }}>
        {book.romanTitle}
      </p>
      <div
        className="w-10 h-px mt-6"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      {book.status === 'coming-soon' && (
        <span className="mt-6 text-[11px] tracking-wide text-paper/70 font-sans">
          Coming Soon
        </span>
      )}
    </div>
  )
}
