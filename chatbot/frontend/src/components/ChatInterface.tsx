import { useState, useRef, useEffect } from 'react'
import Markdown from 'react-markdown'
import { useChatStore } from '../store/chatStore'

const ACCEPTED = '.pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.txt'

function classifyFile(name: string): 'pdf' | 'doc' | 'image' {
  const ext = name.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'doc' || ext === 'docx') return 'doc'
  return 'image'
}

function isAccepted(name: string): boolean {
  const ext = '.' + name.split('.').pop()?.toLowerCase()
  return ACCEPTED.split(',').includes(ext)
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="message-text">
      <Markdown
        components={{
          p: ({ children }) => <p className="md-p">{children}</p>,
          strong: ({ children }) => <strong className="md-strong">{children}</strong>,
          em: ({ children }) => <em className="md-em">{children}</em>,
          ul: ({ children }) => <ul className="md-ul">{children}</ul>,
          ol: ({ children }) => <ol className="md-ol">{children}</ol>,
          li: ({ children }) => <li className="md-li">{children}</li>,
          h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
          h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return <code className="md-code-block">{children}</code>
            }
            return <code className="md-code">{children}</code>
          },
          pre: ({ children }) => <pre className="md-pre">{children}</pre>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="md-link">
              {children}
            </a>
          ),
          blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
          hr: () => <hr className="md-hr" />,
          br: () => <br />,
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

export function ChatInterface() {
  const {
    currentSessionId,
    sessions,
    resumeText,
    createSession,
    addMessage,
    setResumeText,
  } = useChatStore()

  const [inputText, setInputText] = useState('')
  const [pendingAttachment, setPendingAttachment] = useState<{
    name: string
    size: number
    fileType: 'pdf' | 'doc' | 'image'
    previewUrl?: string
    text?: string
    warnings?: string[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const session = sessions.find(s => s.id === currentSessionId)
  const messages = session?.messages ?? []

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!isAccepted(file.name)) {
      const sid = currentSessionId || createSession()
      addMessage(sid, {
        id: generateId(),
        role: 'assistant',
        content: 'Unsupported file type. Please upload PDF, DOC, DOCX, or image files.',
        timestamp: Date.now(),
      })
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    const fileType = classifyFile(file.name)
    const previewUrl = fileType === 'image' ? URL.createObjectURL(file) : undefined

    setPendingAttachment({
      name: file.name,
      size: file.size,
      fileType,
      previewUrl,
    })

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-resume', { method: 'POST', body: formData })
      const data = await res.json()

      if (data.text) {
        setResumeText(data.text)
        setPendingAttachment(prev => prev ? { ...prev, text: data.text, warnings: data.warnings } : null)
      } else if (data.error) {
        setPendingAttachment(prev => prev ? { ...prev, warnings: [data.error] } : null)
      }
    } catch {
      setPendingAttachment(prev => prev ? { ...prev, warnings: ['Network error during upload'] } : null)
    }

    if (fileRef.current) fileRef.current.value = ''
  }

  const sendMessage = async () => {
    if (!inputText.trim() && !pendingAttachment) return
    if (loading) return

    const sid = currentSessionId || createSession()

    const userMsg = {
      id: generateId(),
      role: 'user' as const,
      content: inputText.trim(),
      attachment: pendingAttachment ?? undefined,
      timestamp: Date.now(),
    }

    addMessage(sid, userMsg)
    setInputText('')
    setPendingAttachment(null)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputText.trim(),
          history: messages.map(m => ({ role: m.role, content: m.content })),
          resume_text: resumeText,
        }),
      })
      const data = await res.json()
      addMessage(sid, {
        id: generateId(),
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      })
    } catch {
      addMessage(sid, {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      })
    } finally {
      setLoading(false)
    }
  }

  const removeAttachment = () => setPendingAttachment(null)

  const suggestions = [
    'What should I know before visiting Tokyo?',
    'Teach me some basic Japanese phrases',
    'What is the Garbage Collector feature?',
    'Tell me about traditional Japanese food',
  ]

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-icon">🎯</div>
            <h2>How can I help you today?</h2>
            <p>I can help with Japanese culture, language, travel, and the Konnichiwa Japan project.</p>
            <div className="suggestions">
              {suggestions.map((s, i) => (
                <button key={i} className="suggestion-chip" onClick={() => setInputText(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="message-avatar assistant-avatar">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
                  <circle cx="9" cy="15" r="1" fill="currentColor" />
                  <circle cx="15" cy="15" r="1" fill="currentColor" />
                </svg>
              </div>
            )}
            <div className={`message-content ${msg.role === 'user' && msg.attachment ? 'message-with-attachment' : ''}`}>
              {msg.attachment && <AttachmentPill attachment={msg.attachment} />}
              {msg.content && (
                msg.role === 'assistant'
                  ? <MarkdownContent content={msg.content} />
                  : <div className="message-text">{msg.content}</div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="message-avatar user-avatar">U</div>
            )}
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="message-avatar assistant-avatar">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
                <circle cx="9" cy="15" r="1" fill="currentColor" />
                <circle cx="15" cy="15" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="message-content typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <div className="chat-input-container">
        {pendingAttachment && (
          <div className="input-attachment-pill">
            <AttachmentPill attachment={pendingAttachment} />
            <button className="pill-remove" onClick={removeAttachment}>&times;</button>
          </div>
        )}

        <div className="chat-input-row">
          <label className="upload-chat-btn" title="Attach file">
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED}
              onChange={handleFileSelect}
              hidden
            />
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </label>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask about Japan, culture, language, travel..."
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={loading || (!inputText.trim() && !pendingAttachment)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function AttachmentPill({ attachment }: { attachment: { name: string; size: number; fileType: 'pdf' | 'doc' | 'image'; previewUrl?: string } }) {
  return (
    <div className="attachment-pill">
      <div className={`pill-icon pill-icon--${attachment.fileType}`}>
        {attachment.fileType === 'image' && attachment.previewUrl ? (
          <img src={attachment.previewUrl} alt="" className="pill-thumb" />
        ) : (
          <span>{attachment.fileType === 'pdf' ? 'PDF' : 'DOC'}</span>
        )}
      </div>
      <div className="pill-info">
        <div className="pill-name">{attachment.name}</div>
        <div className="pill-size">{(attachment.size / 1024).toFixed(1)} KB</div>
      </div>
    </div>
  )
}
