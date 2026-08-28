import { useChatStore } from '../store/chatStore'

type Tab = 'chat' | 'resume-analyzer' | 'resume-builder'

interface ChatSidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const navItems: { id: Tab; label: string; icon: JSX.Element }[] = [
  {
    id: 'chat',
    label: 'Konnichiwa Japan AI',
    icon: (
      <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'resume-analyzer',
    label: 'Resume Analyzer',
    icon: (
      <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'resume-builder',
    label: 'Resume Builder',
    icon: (
      <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
]

export function ChatSidebar({ activeTab, onTabChange }: ChatSidebarProps) {
  const { sessions, currentSessionId, createSession, switchSession, deleteSession, isSidebarOpen, setSidebarOpen } = useChatStore()

  const handleNew = () => {
    createSession()
    onTabChange('chat')
  }

  const handleSelect = (id: string) => {
    switchSession(id)
    onTabChange('chat')
  }

  return (
    <>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <span className="sidebar-brand-icon">🌸</span>
            <h1>Konnichiwa Japan AI</h1>
          </div>
          <button className="sidebar-new-btn" onClick={handleNew}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Chat
          </button>
          
          <button 
            className="sidebar-new-btn" 
            style={{ marginTop: '0.5rem', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
            onClick={() => {
              try {
                if (window.top) {
                  window.top.location.href = 'http://localhost:5173/';
                } else {
                  window.location.href = 'http://localhost:5173/';
                }
              } catch (e) {
                window.location.href = 'http://localhost:5173/';
              }
            }}
          >
            <span style={{ fontSize: '1.2rem', marginRight: '4px' }}>&larr;</span>
            Back to Konnichiwa Japan
          </button>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(item.id)
                  if (window.innerWidth <= 768) setSidebarOpen(false)
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-divider" />
        <div className="sidebar-label">Recent</div>

        <div className="sidebar-sessions">
          {sessions.length === 0 && (
            <div className="sidebar-empty">No conversations yet</div>
          )}
          {sessions.map(session => (
            <div
              key={session.id}
              className={`sidebar-session ${session.id === currentSessionId && activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => handleSelect(session.id)}
            >
              <div className="session-icon">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div className="session-info">
                <span className="session-title">{session.title}</span>
              </div>
              <button
                className="session-delete"
                onClick={(e) => { e.stopPropagation(); deleteSession(session.id) }}
                title="Delete chat"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
