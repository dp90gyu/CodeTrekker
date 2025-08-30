import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Activity } from 'lucide-react'

const SubmissionTimeline = ({ submissions, delay = 0 }) => {
  // Generate mock timeline data (in real app, this would come from API)
  const generateTimelineData = () => {
    const days = 30
    const data = []
    let currentStreak = 0
    let maxStreak = 0
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Generate realistic submission data
      const submissions = Math.floor(Math.random() * 8) // 0-7 submissions per day
      const solved = Math.floor(Math.random() * (submissions + 1))
      
      if (submissions > 0) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        submissions,
        solved,
        streak: currentStreak
      })
    }
    
    return { data, maxStreak }
  }

  const { data, maxStreak } = generateTimelineData()
  const totalSubmissions = data.reduce((sum, day) => sum + day.submissions, 0)
  const totalSolved = data.reduce((sum, day) => sum + day.solved, 0)
  const activeDays = data.filter(day => day.submissions > 0).length

  return (
    <motion.div
      className="timeline-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <h2 className="section-title">
        <Activity size={24} />
        Submission Timeline
      </h2>
      
      <div className="timeline-stats">
        <div className="timeline-stat">
          <div className="stat-value">{totalSubmissions}</div>
          <div className="stat-label">Total Submissions</div>
        </div>
        <div className="timeline-stat">
          <div className="stat-value">{totalSolved}</div>
          <div className="stat-label">Problems Solved</div>
        </div>
        <div className="timeline-stat">
          <div className="stat-value">{activeDays}</div>
          <div className="stat-label">Active Days</div>
        </div>
        <div className="timeline-stat">
          <div className="stat-value">{maxStreak}</div>
          <div className="stat-label">Max Streak</div>
        </div>
      </div>

      <div className="timeline-chart">
        <div className="timeline-grid">
          {data.map((day, index) => (
            <motion.div
              key={day.date}
              className="timeline-day"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + index * 0.02, duration: 0.3 }}
            >
              <div 
                className="day-bar"
                style={{ 
                  height: `${Math.max(day.submissions * 8, 4)}px`,
                  backgroundColor: day.submissions > 0 ? '#667eea' : 'rgba(255,255,255,0.1)'
                }}
              />
              <div className="day-tooltip">
                <div className="tooltip-date">{day.date}</div>
                <div className="tooltip-submissions">Submissions: {day.submissions}</div>
                <div className="tooltip-solved">Solved: {day.solved}</div>
                {day.streak > 0 && <div className="tooltip-streak">Streak: {day.streak}</div>}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="timeline-labels">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      <div className="timeline-insights">
        <div className="insight-card">
          <TrendingUp size={20} />
          <div>
            <div className="insight-title">Most Active Day</div>
            <div className="insight-value">Wednesday (avg: 5.2 submissions)</div>
          </div>
        </div>
        <div className="insight-card">
          <Calendar size={20} />
          <div>
            <div className="insight-title">Consistency Score</div>
            <div className="insight-value">{Math.round((activeDays / 30) * 100)}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SubmissionTimeline
