import { useSearchParams } from 'react-router-dom'
import BookGrid from '../components/BookGrid.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getBooksByCategory } from '../data/books.js'

export default function AllBooks() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category') || 'all'
  const books = getBooksByCategory(active)

  function handleChange(id) {
    if (id === 'all') {
      setParams({})
    } else {
      setParams({ category: id })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <SectionHeading urdu="تمام کتابیں" english="All Books" />
      <div className="mb-10">
        <CategoryFilter active={active} onChange={handleChange} />
      </div>
      <BookGrid books={books} />
    </div>
  )
}
