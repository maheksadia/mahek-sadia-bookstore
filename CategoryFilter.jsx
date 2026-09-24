import { CATEGORIES } from '../data/books.js'

export default function CategoryFilter({ active, onChange }) {
  const all = [{ id: 'all', label: 'All Books' }, ...CATEGORIES]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      {all.map((cat) => {
        const isActive = active === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`whitespace-nowrap px-4 py-2 text-[13px] rounded-full border transition-colors ${
              isActive
                ? 'bg-ink text-paper border-ink'
                : 'border-ink/20 text-ink/70 hover:border-ink/50'
            }`}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
