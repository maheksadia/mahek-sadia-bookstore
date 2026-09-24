import BookCard from './BookCard.jsx'

export default function BookGrid({ books }) {
  if (!books.length) {
    return (
      <div className="py-20 text-center text-ink/50 font-display italic text-lg">
        No books in this category yet — please check back soon.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
