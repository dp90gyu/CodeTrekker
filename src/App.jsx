import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Moon, Sun, Code, Trophy, Target, TrendingUp, Users, Calendar, Award, Zap } from 'lucide-react'
import ProgressRing from './components/ProgressRing'
import StatsCard from './components/StatsCard'
import LoadingSpinner from './components/LoadingSpinner'
import SectionDivider from './components/SectionDivider'
import AboutSection from './components/AboutSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import FAQSection from './components/FAQSection'
import TechStackSection from './components/TechStackSection'
import SubmissionTimeline from './components/SubmissionTimeline'
import PerformanceMetrics from './components/PerformanceMetrics'
import TopicAnalysis from './components/TopicAnalysis'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [recentSearches, setRecentSearches] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('codetrekker-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearch = (username) => {
    const updated = [username, ...recentSearches.filter(s => s !== username)].slice(0, 5)
    setRecentSearches(updated)
          localStorage.setItem('codetrekker-recent-searches', JSON.stringify(updated))
  }

  const validateUsername = (username) => {
    if (username.trim() === '') {
      setError('Username should not be empty')
      return false
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/
    if (!regex.test(username)) {
      setError('Invalid Username format')
      return false
    }
    return true
  }

  const fetchUserDetails = async (username) => {
    try {
      setLoading(true)
      setError('')
      setUserData(null)
      setShowSuggestions(false)

      const graphql = JSON.stringify({
        query: `
          query userSessionProgress($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: { username }
      })

      const response = await fetch('/leetcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: graphql,
      })

      if (!response.ok) throw new Error('Unable to fetch user details')

      const parsedData = await response.json()

      if (!parsedData.data || !parsedData.data.matchedUser)
        throw new Error('User not found or data missing')

      setUserData(parsedData.data)
      saveRecentSearch(username)
    } catch (error) {
      console.error('Error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (validateUsername(username)) {
      fetchUserDetails(username)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setUsername(suggestion)
    fetchUserDetails(suggestion)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Auto-load results when opened with ?u=<username> (or ?username=)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramUser = params.get('u') || params.get('username')
    if (paramUser) {
      setUsername(paramUser)
      fetchUserDetails(paramUser)
    }
  }, [])

  const getStatsData = () => {
    if (!userData) return null

    const q = userData.allQuestionsCount
    const a = userData.matchedUser.submitStats.acSubmissionNum
    const t = userData.matchedUser.submitStats.totalSubmissionNum

    const totalEasy = q.find(q => q.difficulty === 'Easy')?.count || 0
    const totalMedium = q.find(q => q.difficulty === 'Medium')?.count || 0
    const totalHard = q.find(q => q.difficulty === 'Hard')?.count || 0

    const solvedEasy = a.find(s => s.difficulty === 'Easy')?.count || 0
    const solvedMedium = a.find(s => s.difficulty === 'Medium')?.count || 0
    const solvedHard = a.find(s => s.difficulty === 'Hard')?.count || 0

    const totalSolved = solvedEasy + solvedMedium + solvedHard
    const totalQuestions = totalEasy + totalMedium + totalHard
    const overallProgress = totalQuestions === 0 ? 0 : (totalSolved / totalQuestions) * 100

    return {
      progress: [
        { difficulty: 'Easy', solved: solvedEasy, total: totalEasy, color: '#00C46F' },
        { difficulty: 'Medium', solved: solvedMedium, total: totalMedium, color: '#FFA534' },
        { difficulty: 'Hard', solved: solvedHard, total: totalHard, color: '#FF6B6B' }
      ],
      cards: [
        { 
          label: 'Total Submissions', 
          value: t[0]?.submissions || 0, 
          icon: <TrendingUp size={24} />,
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          description: 'All time submissions'
        },
        { 
          label: 'Easy Submissions', 
          value: t.find(s => s.difficulty === 'Easy')?.submissions || 0, 
          icon: <Target size={24} />,
          color: 'linear-gradient(135deg, #00C46F 0%, #00A854 100%)',
          description: 'Easy problem attempts'
        },
        { 
          label: 'Medium Submissions', 
          value: t.find(s => s.difficulty === 'Medium')?.submissions || 0, 
          icon: <Code size={24} />,
          color: 'linear-gradient(135deg, #FFA534 0%, #FF8C00 100%)',
          description: 'Medium problem attempts'
        },
        { 
          label: 'Hard Submissions', 
          value: t.find(s => s.difficulty === 'Hard')?.submissions || 0, 
          icon: <Trophy size={24} />,
          color: 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
          description: 'Hard problem attempts'
        }
      ],
      overview: {
        totalSolved,
        totalQuestions,
        overallProgress,
        accuracy: t[0]?.submissions ? ((totalSolved / t[0].submissions) * 100).toFixed(1) : 0
      }
    }
  }

  const statsData = getStatsData()

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="background-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>
      
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="header">
          <motion.h1 
            className="title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Code className="title-icon" />
            CodeTrekker
            <motion.span 
              className="title-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              Pro
            </motion.span>
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Beautiful LeetCode Analytics Dashboard
          </motion.p>
        </header>

        <motion.div 
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="search-container">
            <div className="input-group">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Enter your LeetCode username..."
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setShowSuggestions(e.target.value.length > 0)
                }}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(username.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="search-input"
              />
              {showSuggestions && recentSearches.length > 0 && (
                <motion.div
                  className="suggestions-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {recentSearches.map((suggestion, index) => (
                    <motion.div
                      key={suggestion}
                      className="suggestion-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Users size={16} />
                      {suggestion}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            <motion.button
              onClick={handleSearch}
              disabled={loading}
              className="search-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap size={20} />
                </motion.div>
              ) : (
                'Search'
              )}
            </motion.button>
          </div>
          
          <motion.button
            onClick={toggleTheme}
            className="theme-toggle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="error-message"
            >
              <motion.div
                className="error-icon"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                ⚠️
              </motion.div>
              {error}
            </motion.div>
          )}

          {userData && statsData && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="results-section"
            >
              {/* Overview Section */}
              <div className="overview-section">
                <h2 className="section-title">Overview</h2>
                <div className="overview-grid">
                  <motion.div
                    className="overview-card main"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                  >
                    <div className="overview-icon">
                      <Award size={32} />
                    </div>
                    <div className="overview-content">
                      <div className="overview-value">{statsData.overview.totalSolved}</div>
                      <div className="overview-label">Problems Solved</div>
                      <div className="overview-progress">
                        <div 
                          className="progress-bar"
                          style={{ width: `${statsData.overview.overallProgress}%` }}
                        ></div>
                      </div>
                      <div className="overview-percentage">
                        {statsData.overview.overallProgress.toFixed(1)}% Complete
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="overview-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                  >
                    <div className="overview-icon">
                      <Calendar size={24} />
                    </div>
                    <div className="overview-content">
                      <div className="overview-value">{statsData.overview.accuracy}%</div>
                      <div className="overview-label">Accuracy</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="progress-section">
                <h2 className="section-title">Progress Overview</h2>
                <div className="progress-rings">
                  {statsData.progress.map((item, index) => (
                    <ProgressRing
                      key={item.difficulty}
                      difficulty={item.difficulty}
                      solved={item.solved}
                      total={item.total}
                      color={item.color}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>

              <div className="stats-section">
                <h2 className="section-title">Submission Statistics</h2>
                <div className="stats-grid">
                  {statsData.cards.map((card, index) => (
                    <StatsCard
                      key={card.label}
                      label={card.label}
                      value={card.value}
                      icon={card.icon}
                      color={card.color}
                      description={card.description}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>

              <SectionDivider />
              
              <SubmissionTimeline submissions={userData} delay={0.6} />
              
              <SectionDivider />
              
              <PerformanceMetrics userData={userData} delay={0.8} />
              
              <SectionDivider />
              
              <TopicAnalysis delay={1.0} />
            </motion.div>
          )}
        </AnimatePresence>

        <SectionDivider />
        <FeaturesSection />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <TechStackSection />
        <SectionDivider />
        <FAQSection />

        {/* Footer */}
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p>Made with ❤️ for LeetCode enthusiasts</p>
          <div className="footer-links">
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
              LeetCode
            </a>
            <span>•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  )
}

export default App
