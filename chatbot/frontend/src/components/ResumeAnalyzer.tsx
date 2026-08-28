import { useState } from 'react'

interface AnalysisResult {
  score: number
  found_keywords: string[]
  missing_keywords: string[]
  weak_verbs: { weak: string; replacements: string[] }[]
  impact_gaps: { suggestion: string }[]
}

export function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('')
  const [keywords, setKeywords] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setLoading(true)
      const res = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.text) {
        setResumeText(data.text)
        setUploadedFile(file.name)
      }
    } catch {
      alert('Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

  const analyze = async () => {
    if (!resumeText.trim()) return

    setLoading(true)
    try {
      const keywordList = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k)

      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, keywords: keywordList }),
      })
      const data: AnalysisResult = await res.json()
      setResult(data)
    } catch {
      alert('Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="analyzer-container">
      <div className="analyzer-header">
        <h2>Resume ATS Analyzer</h2>
        <p>Upload your resume and get an ATS compatibility score with improvement suggestions.</p>
      </div>

      <div className="analyzer-content">
        <div className="analyzer-input">
          <div className="upload-area">
            <label className="upload-label">
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} hidden />
              <span className="upload-icon">📄</span>
              <span>{uploadedFile || 'Upload Resume (PDF, DOCX, TXT)'}</span>
            </label>
          </div>

          <div className="textarea-group">
            <label>Or paste your resume text:</label>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              rows={10}
            />
          </div>

          <div className="textarea-group">
            <label>Target keywords (comma-separated):</label>
            <input
              type="text"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="Python, SQL, Machine Learning, Data Analysis"
            />
          </div>

          <button className="analyze-btn" onClick={analyze} disabled={loading || !resumeText.trim()}>
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>

        {result && (
          <div className="analysis-results">
            <div className="score-card">
              <div className="score-circle">
                <span className="score-value">{Math.round(result.score)}</span>
                <span className="score-label">ATS Score</span>
              </div>
            </div>

            <div className="results-section">
              <h3>Keywords Found</h3>
              <div className="keyword-list found">
                {result.found_keywords.length > 0 ? (
                  result.found_keywords.map((kw, i) => (
                    <span key={i} className="keyword found">{kw}</span>
                  ))
                ) : (
                  <span className="no-data">No keywords matched</span>
                )}
              </div>
            </div>

            <div className="results-section">
              <h3>Missing Keywords</h3>
              <div className="keyword-list missing">
                {result.missing_keywords.length > 0 ? (
                  result.missing_keywords.map((kw, i) => (
                    <span key={i} className="keyword missing">{kw}</span>
                  ))
                ) : (
                  <span className="no-data">All keywords found!</span>
                )}
              </div>
            </div>

            {result.weak_verbs.length > 0 && (
              <div className="results-section">
                <h3>Weak Action Verbs</h3>
                <div className="verb-list">
                  {result.weak_verbs.map((item, i) => (
                    <div key={i} className="verb-item">
                      <span className="weak">"{item.weak}"</span>
                      <span className="arrow">→</span>
                      <span className="strong">{item.replacements.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
