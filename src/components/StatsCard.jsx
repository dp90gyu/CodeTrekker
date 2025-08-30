import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ label, value, icon, color, description, delay = 0 }) => {
  return (
    <motion.div
      className="stats-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="stats-card-header">
        <div className="stats-icon" style={{ background: color }}>
          {icon}
        </div>
        <div className="stats-content">
          <div className="stats-value">{value.toLocaleString()}</div>
          <div className="stats-label">{label}</div>
          <div className="stats-description">{description}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard
  