import React from 'react'

const stack = ['React', 'Vite', 'Express', 'Node.js', 'Framer Motion', 'Lucide Icons']

const TechStackSection = () => {
  return (
    <section className="tech-section" id="tech">
      <h2 className="section-title">Tech Stack</h2>
      <div className="tech-badges">
        {stack.map((t) => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>
    </section>
  )
}

export default TechStackSection







