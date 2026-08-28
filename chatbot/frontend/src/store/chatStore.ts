import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

export interface AttachmentData {
  name: string
  size: number
  fileType: 'pdf' | 'doc' | 'image'
  previewUrl?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  attachment?: AttachmentData
  timestamp: number
}

export interface Session {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

interface ChatState {
  sessions: Session[]
  currentSessionId: string | null
  resumeText: string
  theme: Theme
  isSidebarOpen: boolean

  createSession: () => string
  switchSession: (id: string) => void
  deleteSession: (id: string) => void
  addMessage: (sessionId: string, message: Message) => void
  updateSessionTitle: (sessionId: string, title: string) => void
  setResumeText: (text: string) => void
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  getCurrentSession: () => Session | undefined
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function deriveTitle(messages: Message[]): string {
  const firstUserMsg = messages.find(m => m.role === 'user' && m.content.trim())
  if (firstUserMsg) {
    const text = firstUserMsg.content.trim()
    return text.length > 30 ? text.slice(0, 30) + '...' : text
  }
  return 'New Chat'
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      resumeText: '',
      theme: 'dark',
      isSidebarOpen: typeof window !== 'undefined' ? window.innerWidth > 768 : true,

      createSession: () => {
        const id = generateId()
        const session: Session = {
          id,
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set(state => ({
          sessions: [session, ...state.sessions],
          currentSessionId: id,
        }))
        return id
      },

      switchSession: (id: string) => {
        set({ currentSessionId: id })
      },

      deleteSession: (id: string) => {
        set(state => {
          const filtered = state.sessions.filter(s => s.id !== id)
          const newCurrentId = state.currentSessionId === id
            ? (filtered[0]?.id ?? null)
            : state.currentSessionId
          return { sessions: filtered, currentSessionId: newCurrentId }
        })
      },

      addMessage: (sessionId: string, message: Message) => {
        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: [...s.messages, message],
                  title: deriveTitle([...s.messages, message]),
                  updatedAt: Date.now(),
                }
              : s
          ),
        }))
      },

      updateSessionTitle: (sessionId: string, title: string) => {
        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === sessionId ? { ...s, title } : s
          ),
        }))
      },

      setResumeText: (text: string) => {
        set({ resumeText: text })
      },

      setTheme: (theme: Theme) => {
        set({ theme })
        localStorage.setItem('job-advisor-theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
      },

      toggleSidebar: () => {
        set(state => ({ isSidebarOpen: !state.isSidebarOpen }))
      },

      setSidebarOpen: (open: boolean) => {
        set({ isSidebarOpen: open })
      },

      getCurrentSession: () => {
        const { sessions, currentSessionId } = get()
        return sessions.find(s => s.id === currentSessionId)
      },
    }),
    {
      name: 'job-advisor-chat',
      partialize: (state) => ({
        sessions: state.sessions.map(s => ({
          ...s,
          messages: s.messages.map(m => ({
            id: m.id,
            role: m.role,
            content: m.content,
            attachment: m.attachment ? {
              name: m.attachment.name,
              size: m.attachment.size,
              fileType: m.attachment.fileType,
            } : undefined,
            timestamp: m.timestamp,
          })),
        })),
        currentSessionId: state.currentSessionId,
        resumeText: '',
        theme: state.theme,
      }),
    }
  )
)
