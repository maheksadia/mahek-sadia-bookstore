import { useState } from 'react'
import { siteConfig } from '../data/siteConfig.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name || 'a reader'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <div className="max-w-xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <SectionHeading urdu="رابطہ" english="Contact" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-line rounded-sm px-4 py-3 text-sm bg-transparent focus:border-gold outline-none"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-line rounded-sm px-4 py-3 text-sm bg-transparent focus:border-gold outline-none"
        />
        <textarea
          required
          rows={5}
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border border-line rounded-sm px-4 py-3 text-sm bg-transparent focus:border-gold outline-none resize-none"
        />
        <button
          type="submit"
          className="bg-ink text-paper text-sm tracking-wide rounded-sm py-3 hover:bg-gold transition-colors"
        >
          Send Message
        </button>
      </form>

      <p className="text-sm text-ink/50 mt-8">
        Or reach out directly on{' '}
        <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer" className="text-gold underline">
          Instagram {siteConfig.instagram.handle}
        </a>{' '}
        or via email at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-gold underline">
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </div>
  )
}
