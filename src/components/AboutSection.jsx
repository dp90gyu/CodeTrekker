import React from 'react'
import { Code, Heart, Rocket } from 'lucide-react'

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-header">
        <Rocket size={24} />
        <h2>About CodeTrekker</h2>
      </div>
      <p>
        CodeTrekker is a modern, beautiful dashboard that visualizes your LeetCode progress. It uses a lightweight proxy to
        securely fetch your public stats and transforms them into animated visual insights.
      </p>
      <ul className="about-list">
        <li><span>✓</span> Clean UI with glassmorphism and dark/light modes</li>
        <li><span>✓</span> Animated progress rings and statistics</li>
        <li><span>✓</span> Responsive and mobile-friendly</li>
      </ul>
      <div className="about-footer">
        <Code size={18} />
        <span>Built with React, Vite, and love</span>
        <Heart size={16} />
      </div>
    </section>
  )
}

export default AboutSection







