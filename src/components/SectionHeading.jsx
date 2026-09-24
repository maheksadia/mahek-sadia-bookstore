export default function SectionHeading({ urdu, english, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignment} mb-8`}>
      <h2 className="urdu text-3xl md:text-4xl text-ink">{urdu}</h2>
      {english && (
        <p className="font-display italic text-ink/50 text-base mt-1">{english}</p>
      )}
      <div className="hairline w-16 mt-4" />
    </div>
  )
}
