import React from 'react'
import { motion } from 'framer-motion'

const ProgressRing = ({ difficulty, solved, total, color, delay }) => {
  const percentage = total === 0 ? 0 : (solved / total) * 100
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      className="progress-ring-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      <div className="progress-ring">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ delay: delay + 0.3, duration: 1.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          />
        </svg>
        
        <div className="progress-content">
          <motion.div
            className="progress-number"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.8, duration: 0.5 }}
          >
            {solved}/{total}
          </motion.div>
          <motion.div
            className="progress-percentage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1, duration: 0.5 }}
          >
            {percentage.toFixed(1)}%
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className="difficulty-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1.2, duration: 0.5 }}
        style={{ color }}
      >
        {difficulty}
      </motion.div>
    </motion.div>
  )
}

export default ProgressRing

