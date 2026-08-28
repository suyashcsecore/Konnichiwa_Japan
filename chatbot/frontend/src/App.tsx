import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { ChatInterface } from './components/ChatInterface'
import { ChatSidebar } from './components/ChatSidebar'
import { ResumeAnalyzer } from './components/ResumeAnalyzer'
import { ResumeBuilder } from './components/ResumeBuilder'
import { useChatStore } from './store/chatStore'

type Tab = 'chat' | 'resume-analyzer' | 'resume-builder'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')
  const { theme, setTheme, setSidebarOpen } = useChatStore()

  useEffect(() => {
    const savedTheme = localStorage.getItem('job-advisor-theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="app">
      <ChatSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          if (window.innerWidth <= 768) setSidebarOpen(false)
        }}
      />
      <div className="main-area">
        <Header activeTab={activeTab} />
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'resume-analyzer' && <ResumeAnalyzer />}
        {activeTab === 'resume-builder' && <ResumeBuilder />}
      </div>
    </div>
  )
}

export default App
