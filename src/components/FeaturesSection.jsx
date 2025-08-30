import React from 'react'
import { Shield, Zap, Smartphone, BarChart3, Eye, Sparkles } from 'lucide-react'

const features = [
  { icon: <BarChart3 size={24} />, title: 'Rich Analytics', desc: 'Beautiful progress rings, submission stats, and overview metrics.' },
  { icon: <Zap size={24} />, title: 'Fast & Lightweight', desc: 'Powered by Vite and React for instant loads and smooth interactions.' },
  { icon: <Smartphone size={24} />, title: 'Responsive UI', desc: 'Looks great on phones, tablets, and desktops with fluid layouts.' },
  { icon: <Shield size={24} />, title: 'Privacy-Friendly', desc: 'Only fetches public LeetCode data via a small proxy; no accounts needed.' },
  { icon: <Eye size={24} />, title: 'Accessible', desc: 'Keyboard-friendly controls and sensible contrast across themes.' },
  { icon: <Sparkles size={24} />, title: 'Polished Design', desc: 'Glassmorphism, gradients, and micro-interactions throughout.' }
]

const FeaturesSection = () => {
  return (
    <section className="features-section" id="features">
      <h2 className="section-title">Features</h2>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection







