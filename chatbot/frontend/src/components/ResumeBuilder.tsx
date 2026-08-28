import { useState } from 'react'

interface ResumeData {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  summary: string
  skills: string
  experience: string
  projects: string
  education: string
}

export function ResumeBuilder() {
  const [formData, setFormData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: '',
    skills: '',
    experience: '',
    projects: '',
    education: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buildResume = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/build-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.pdf) {
        const byteCharacters = atob(data.pdf)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'application/pdf' })

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'resume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch {
      alert('Failed to build resume')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="builder-container">
      <div className="builder-header">
        <h2>Professional Resume Builder</h2>
        <p>Fill in your details and generate an ATS-friendly PDF resume.</p>
      </div>

      <div className="builder-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="New York, NY" />
          </div>
        </div>

        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
        </div>

        <div className="form-group">
          <label>Professional Summary *</label>
          <textarea name="summary" value={formData.summary} onChange={handleChange} rows={4} placeholder="Experienced software engineer with 5+ years..." />
        </div>

        <div className="form-group">
          <label>Skills *</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange} rows={3} placeholder="Python, JavaScript, React, Node.js, SQL, Git" />
        </div>

        <div className="form-group">
          <label>Work Experience *</label>
          <textarea name="experience" value={formData.experience} onChange={handleChange} rows={5} placeholder="Software Engineer at XYZ Corp (2020-2024)&#10;- Led development of microservices architecture&#10;- Improved system performance by 40%" />
        </div>

        <div className="form-group">
          <label>Projects</label>
          <textarea name="projects" value={formData.projects} onChange={handleChange} rows={4} placeholder="E-commerce Platform&#10;- Built full-stack application using React and Node.js&#10;- Deployed on AWS with CI/CD pipeline" />
        </div>

        <div className="form-group">
          <label>Education *</label>
          <textarea name="education" value={formData.education} onChange={handleChange} rows={3} placeholder="Bachelor of Science in Computer Science&#10;University of Technology (2016-2020)" />
        </div>

        <button className="build-btn" onClick={buildResume} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Resume PDF'}
        </button>
      </div>
    </div>
  )
}
