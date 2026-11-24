import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { ChatInterface } from './components/ChatInterface'
import { ChatSidebar } from './components/ChatSidebar'
import { ProcedureGuide } from './components/ProcedureGuide'
import { PhrasesGuide } from './components/PhrasesGuide'
import { useChatStore } from './store/chatStore'

type Tab = 'chat' | 'procedures' | 'phrases'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')
  const { theme, setTheme, setSidebarOpen } = useChatStore()

  useEffect(() => {
    const savedTheme = localStorage.getItem('konnichiwa-japan-theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('konnichiwa-japan-theme', theme)
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
        {activeTab === 'procedures' && <ProcedureGuide />}
        {activeTab === 'phrases' && <PhrasesGuide />}
      </div>
    </div>
  )
}

export default App
