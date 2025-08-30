import React from 'react'
import { motion } from 'framer-motion'
import { Target, Clock, TrendingUp, Award, Zap, BarChart3 } from 'lucide-react'

const PerformanceMetrics = ({ userData, delay = 0 }) => {
  // Generate mock performance data
  const generatePerformanceData = () => {
    return {
      successRate: {
        easy: 85,
        medium: 72,
        hard: 58,
        overall: 73
      },
      averageTime: {
        easy: 12,
        medium: 25,
        hard: 45
      },
      improvement: {
        lastMonth: 15,
        lastWeek: 8,
        trend: 'up'
      },
      ranking: {
        global: 'Top 12%',
        country: 'Top 8%',
        rating: 1850
      },
      efficiency: {
        problemsPerDay: 2.3,
        submissionsPerProblem: 1.8,
        firstTrySuccess: 65
      }
    }
  }

  const metrics = generatePerformanceData()

  return (
    <motion.div
      className="performance-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <h2 className="section-title">
        <BarChart3 size={24} />
        Performance Analytics
      </h2>

      <div className="performance-grid">
        {/* Success Rate by Difficulty */}
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.1, type: 'spring', stiffness: 100 }}
        >
          <div className="metric-header">
            <Target size={20} />
            <span>Success Rate</span>
          </div>
          <div className="metric-content">
            <div className="difficulty-metrics">
              <div className="difficulty-metric">
                <span className="difficulty-label easy">Easy</span>
                <div className="success-bar">
                  <div 
                    className="success-fill easy"
                    style={{ width: `${metrics.successRate.easy}%` }}
                  />
                  <span className="success-text">{metrics.successRate.easy}%</span>
                </div>
              </div>
              <div className="difficulty-metric">
                <span className="difficulty-label medium">Medium</span>
                <div className="success-bar">
                  <div 
                    className="success-fill medium"
                    style={{ width: `${metrics.successRate.medium}%` }}
                  />
                  <span className="success-text">{metrics.successRate.medium}%</span>
                </div>
              </div>
              <div className="difficulty-metric">
                <span className="difficulty-label hard">Hard</span>
                <div className="success-bar">
                  <div 
                    className="success-fill hard"
                    style={{ width: `${metrics.successRate.hard}%` }}
                  />
                  <span className="success-text">{metrics.successRate.hard}%</span>
                </div>
              </div>
            </div>
            <div className="overall-success">
              <span>Overall: {metrics.successRate.overall}%</span>
            </div>
          </div>
        </motion.div>

        {/* Average Time per Problem */}
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring', stiffness: 100 }}
        >
          <div className="metric-header">
            <Clock size={20} />
            <span>Average Time</span>
          </div>
          <div className="metric-content">
            <div className="time-metrics">
              <div className="time-metric">
                <span className="time-label">Easy</span>
                <span className="time-value">{metrics.averageTime.easy} min</span>
              </div>
              <div className="time-metric">
                <span className="time-label">Medium</span>
                <span className="time-value">{metrics.averageTime.medium} min</span>
              </div>
              <div className="time-metric">
                <span className="time-label">Hard</span>
                <span className="time-value">{metrics.averageTime.hard} min</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ranking & Rating */}
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, type: 'spring', stiffness: 100 }}
        >
          <div className="metric-header">
            <Award size={20} />
            <span>Ranking</span>
          </div>
          <div className="metric-content">
            <div className="ranking-info">
              <div className="ranking-item">
                <span className="ranking-label">Global</span>
                <span className="ranking-value">{metrics.ranking.global}</span>
              </div>
              <div className="ranking-item">
                <span className="ranking-label">Country</span>
                <span className="ranking-value">{metrics.ranking.country}</span>
              </div>
              <div className="ranking-item">
                <span className="ranking-label">Rating</span>
                <span className="ranking-value">{metrics.ranking.rating}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Efficiency Metrics */}
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.4, type: 'spring', stiffness: 100 }}
        >
          <div className="metric-header">
            <Zap size={20} />
            <span>Efficiency</span>
          </div>
          <div className="metric-content">
            <div className="efficiency-metrics">
              <div className="efficiency-item">
                <span className="efficiency-label">Problems/Day</span>
                <span className="efficiency-value">{metrics.efficiency.problemsPerDay}</span>
              </div>
              <div className="efficiency-item">
                <span className="efficiency-label">Submissions/Problem</span>
                <span className="efficiency-value">{metrics.efficiency.submissionsPerProblem}</span>
              </div>
              <div className="efficiency-item">
                <span className="efficiency-label">First Try Success</span>
                <span className="efficiency-value">{metrics.efficiency.firstTrySuccess}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Improvement Trends */}
      <motion.div
        className="improvement-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.5, duration: 0.6 }}
      >
        <h3 className="subsection-title">
          <TrendingUp size={20} />
          Improvement Trends
        </h3>
        <div className="improvement-cards">
          <div className="improvement-card positive">
            <div className="improvement-icon">📈</div>
            <div className="improvement-content">
              <div className="improvement-value">+{metrics.improvement.lastMonth}%</div>
              <div className="improvement-label">Last Month</div>
            </div>
          </div>
          <div className="improvement-card positive">
            <div className="improvement-icon">⚡</div>
            <div className="improvement-content">
              <div className="improvement-value">+{metrics.improvement.lastWeek}%</div>
              <div className="improvement-label">Last Week</div>
            </div>
          </div>
          <div className="improvement-card neutral">
            <div className="improvement-icon">🎯</div>
            <div className="improvement-content">
              <div className="improvement-value">Consistent</div>
              <div className="improvement-label">Performance Trend</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PerformanceMetrics
