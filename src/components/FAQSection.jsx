import React, { useState } from 'react'

const items = [
  { q: 'Do I need to login?', a: 'No. We fetch public LeetCode stats by username only.' },
  { q: 'Is my data stored?', a: 'No. Nothing is persisted on a server; recent searches are stored locally in your browser.' },
  { q: 'Why use a proxy?', a: 'To bypass CORS restrictions and reliably call LeetCode\'s public GraphQL endpoint.' },
]

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-toggle">{open ? '-' : '+'}</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  )
}

const FAQSection = () => {
  return (
    <section className="faq-section" id="faq">
      <h2 className="section-title">FAQ</h2>
      <div className="faq-list">
        {items.map((it) => (
          <FAQItem key={it.q} q={it.q} a={it.a} />
        ))}
      </div>
    </section>
  )
}

export default FAQSection







