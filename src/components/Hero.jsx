import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 flex flex-col items-center text-center">
        <p className="font-display italic text-ink/50 tracking-wide text-sm mb-6">
          Urdu Novelist &amp; Poet
        </p>

        <h1 className="urdu text-5xl md:text-7xl text-ink leading-tight">مہک سعدیہ</h1>

        <div className="hairline w-24 my-8" />

        <p className="urdu text-2xl md:text-3xl text-ink/90 max-w-2xl leading-loose">
          کچھ کہانیاں پڑھی نہیں جاتیں، محسوس کی جاتی ہیں۔
        </p>

        <p className="font-display text-ink/60 max-w-xl mt-6 text-[15px] md:text-base leading-relaxed">
          Welcome to the official digital bookstore of Mahek Sadia — where stories,
          emotions, faith, society and the unseen parts of human life find their words.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/books"
            className="px-8 py-3 bg-ink text-paper text-sm tracking-wide rounded-sm hover:bg-gold transition-colors"
          >
            Explore Books
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 border border-ink/25 text-ink text-sm tracking-wide rounded-sm hover:border-ink transition-colors"
          >
            About the Author
          </Link>
        </div>
      </div>
    </section>
  )
}
