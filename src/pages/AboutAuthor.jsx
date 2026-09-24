import { siteConfig } from '../data/siteConfig.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function AboutAuthor() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-parchment border border-line flex items-center justify-center shrink-0 mx-auto md:mx-0">
          <span className="font-display italic text-ink/30 text-sm text-center px-4">
            Author photo
          </span>
        </div>

        <div>
          <h1 className="urdu text-4xl text-ink">مہک سعدیہ</h1>
          <p className="font-display italic text-ink/50 mt-1">Mahek Sadia</p>

          <p className="urdu text-xl text-ink/85 leading-loose mt-6">
            مہک سعدیہ ایک سافٹ ویئر انجینئر ہیں جو کبھی کبھار اردو شاعری اور کہانیاں بھی لکھتی ہیں۔
          </p>
          <p className="font-display text-ink/60 mt-4 leading-relaxed">
            Mahek Sadia is a software engineer who sometimes writes Urdu poetry and stories —
            the kind that begin quietly, in the margins of ordinary days, and stay long after
            they're read.
          </p>

          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 text-sm border border-ink/20 rounded-full px-5 py-2 hover:border-ink transition-colors"
          >
            {siteConfig.instagram.handle}
          </a>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading urdu="لکھنے کا سبب" english="Writing Philosophy" />
        <p className="urdu text-lg text-ink/80 leading-loose max-w-prose">
          الفاظ وہی کہانیاں سناتے ہیں جو دل میں دبی رہ جاتی ہیں۔ میں لکھتی ہوں کیونکہ کچھ احساسات
          صرف کاغذ پر ہی سانس لے سکتے ہیں۔
        </p>
        <p className="font-display text-ink/60 mt-4 leading-relaxed max-w-prose">
          I write because some feelings only breathe on paper. My stories sit at the quiet
          crossing of faith, society, and the parts of being human that rarely get said out loud —
          not to give answers, but to sit with the questions honestly.
        </p>
      </div>
    </div>
  )
}
