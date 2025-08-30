import React from 'react'
import { Search, Server, BarChart3 } from 'lucide-react'

const steps = [
  { icon: <Search size={22} />, title: 'Enter Username', desc: 'Type your LeetCode username and click Search.' },
  { icon: <Server size={22} />, title: 'Proxy Fetch', desc: 'A lightweight proxy requests public GraphQL stats.' },
  { icon: <BarChart3 size={22} />, title: 'Visualize', desc: 'We render your progress, submissions and metrics.' }
]

const HowItWorksSection = () => {
  return (
    <section className="how-section" id="how">
      <h2 className="section-title">How It Works</h2>
      <div className="how-grid">
        {steps.map((s, idx) => (
          <div className="step-card" key={s.title}>
            <div className="step-number">{idx + 1}</div>
            <div className="step-icon">{s.icon}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection







