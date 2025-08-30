import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Target, Zap } from 'lucide-react'

const TopicAnalysis = ({ delay = 0 }) => {
  // Generate mock topic data
  const generateTopicData = () => {
    return [
      { name: 'Arrays', solved: 45, total: 50, accuracy: 90, strength: 'excellent' },
      { name: 'Strings', solved: 38, total: 45, accuracy: 84, strength: 'good' },
      { name: 'Linked Lists', solved: 25, total: 35, accuracy: 71, strength: 'average' },
      { name: 'Trees', solved: 32, total: 40, accuracy: 80, strength: 'good' },
      { name: 'Dynamic Programming', solved: 18, total: 30, accuracy: 60, strength: 'needs-work' },
      { name: 'Graphs', solved: 15, total: 25, accuracy: 60, strength: 'needs-work' },
      { name: 'Hash Tables', solved: 28, total: 32, accuracy: 88, strength: 'excellent' },
      { name: 'Two Pointers', solved: 22, total: 28, accuracy: 79, strength: 'good' },
      { name: 'Binary Search', solved: 20, total: 25, accuracy: 80, strength: 'good' },
      { name: 'Stack/Queue', solved: 18, total: 22, accuracy: 82, strength: 'good' }
    ]
  }

  const topics = generateTopicData()
  const totalSolved = topics.reduce((sum, topic) => sum + topic.solved, 0)
  const totalProblems = topics.reduce((sum, topic) => sum + topic.total, 0)
  const overallAccuracy = Math.round((totalSolved / totalProblems) * 100)

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'excellent': return '#00C46F'
      case 'good': return '#FFA534'
      case 'average': return '#FFA534'
      case 'needs-work': return '#FF6B6B'
      default: return '#667eea'
    }
  }

  const getStrengthIcon = (strength) => {
    switch (strength) {
      case 'excellent': return '🔥'
      case 'good': return '✅'
      case 'average': return '⚠️'
      case 'needs-work': return '📚'
      default: return '📊'
    }
  }

  return (
    <motion.div
      className="topic-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <h2 className="section-title">
        <BookOpen size={24} />
        Topic Analysis
      </h2>

      <div className="topic-overview">
        <div className="overview-stat">
          <div className="stat-number">{totalSolved}</div>
          <div className="stat-label">Topics Mastered</div>
        </div>
        <div className="overview-stat">
          <div className="stat-number">{overallAccuracy}%</div>
          <div className="stat-label">Overall Accuracy</div>
        </div>
        <div className="overview-stat">
          <div className="stat-number">{topics.filter(t => t.strength === 'excellent').length}</div>
          <div className="stat-label">Strong Areas</div>
        </div>
        <div className="overview-stat">
          <div className="stat-number">{topics.filter(t => t.strength === 'needs-work').length}</div>
          <div className="stat-label">Need Focus</div>
        </div>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.name}
            className="topic-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + index * 0.05, type: 'spring', stiffness: 100 }}
          >
            <div className="topic-header">
              <div className="topic-name">{topic.name}</div>
              <div className="topic-strength" style={{ color: getStrengthColor(topic.strength) }}>
                {getStrengthIcon(topic.strength)}
              </div>
            </div>
            
            <div className="topic-progress">
              <div className="progress-info">
                <span className="progress-text">{topic.solved}/{topic.total}</span>
                <span className="progress-percentage">{topic.accuracy}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ 
                    width: `${(topic.solved / topic.total) * 100}%`,
                    backgroundColor: getStrengthColor(topic.strength)
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(topic.solved / topic.total) * 100}%` }}
                  transition={{ delay: delay + index * 0.05 + 0.3, duration: 1 }}
                />
              </div>
            </div>

            <div className="topic-insights">
              {topic.strength === 'excellent' && (
                <div className="insight excellent">
                  <Zap size={14} />
                  <span>Mastered! Consider advanced problems</span>
                </div>
              )}
              {topic.strength === 'good' && (
                <div className="insight good">
                  <Target size={14} />
                  <span>Good progress, keep practicing</span>
                </div>
              )}
              {topic.strength === 'average' && (
                <div className="insight average">
                  <TrendingUp size={14} />
                  <span>Room for improvement</span>
                </div>
              )}
              {topic.strength === 'needs-work' && (
                <div className="insight needs-work">
                  <BookOpen size={14} />
                  <span>Focus area - needs more practice</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="topic-recommendations">
        <h3 className="subsection-title">
          <Target size={20} />
          Recommended Focus Areas
        </h3>
        <div className="recommendations-grid">
          <div className="recommendation-card priority">
            <div className="recommendation-icon">🎯</div>
            <div className="recommendation-content">
              <div className="recommendation-title">High Priority</div>
              <div className="recommendation-topics">
                {topics
                  .filter(t => t.strength === 'needs-work')
                  .slice(0, 3)
                  .map(topic => topic.name)
                  .join(', ')}
              </div>
            </div>
          </div>
          <div className="recommendation-card practice">
            <div className="recommendation-icon">📚</div>
            <div className="recommendation-content">
              <div className="recommendation-title">Practice More</div>
              <div className="recommendation-topics">
                {topics
                  .filter(t => t.strength === 'average')
                  .slice(0, 3)
                  .map(topic => topic.name)
                  .join(', ')}
              </div>
            </div>
          </div>
          <div className="recommendation-card advanced">
            <div className="recommendation-icon">🚀</div>
            <div className="recommendation-content">
              <div className="recommendation-title">Ready for Advanced</div>
              <div className="recommendation-topics">
                {topics
                  .filter(t => t.strength === 'excellent')
                  .slice(0, 3)
                  .map(topic => topic.name)
                  .join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TopicAnalysis
