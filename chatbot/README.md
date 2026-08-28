# Job Advisor AI

> An AI-powered career assistance chatbot that combines local dataset grounding with large language models to provide personalized job recommendations, resume analysis, and interview preparation.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
│                   React + Vite + Zustand                        │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐            │
│  │   Chat    │  │   Resume     │  │    Resume     │            │
│  │Interface  │  │  Analyzer    │  │    Builder    │            │
│  └─────┬─────┘  └──────┬───────┘  └───────┬───────┘            │
│        │               │                   │                     │
│        └───────────────┼───────────────────┘                     │
│                        │                                        │
│                   Zustand Store                                 │
│              (Session Persistence)                              │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND                                  │
│                     FastAPI + Python                            │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                  API Endpoints                       │       │
│  │  /api/chat  /api/upload-resume  /api/analyze-resume │       │
│  └─────────────────────┬───────────────────────────────┘       │
│                        │                                        │
│  ┌─────────────────────┴───────────────────────────────┐       │
│  │               RAG Engine (TF-IDF)                    │       │
│  │  • Cosine similarity search                          │       │
│  │  • 1,166 career profiles indexed                     │       │
│  │  • Temporary resume context augmentation              │       │
│  └─────────────────────┬───────────────────────────────┘       │
│                        │                                        │
│  ┌─────────────────────┴───────────────────────────────┐       │
│  │            API Manager (6 Providers)                  │       │
│  │  Groq → Moonshot → OpenRouter → Fireworks → NVIDIA   │       │
│  └─────────────────────────────────────────────────────┘       │
│                        │                                        │
│                        ▼                                        │
│  ┌─────────────────────────────────────────────────────┐       │
│  │              Local Dataset (CSV)                     │       │
│  │  1,166 career profiles × 6 columns                   │       │
│  └─────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Capabilities

- **Intelligent Career Chat** — RAG-grounded responses using TF-IDF retrieval over 1,166 career profiles
- **Multi-Session Management** — Create, switch, and delete conversation sessions with persistent history
- **Resume Upload & Analysis** — Upload PDF, DOC, DOCX, or image files for context-aware career advice
- **ATS Resume Scoring** — Analyze resumes against Applicant Tracking System standards with keyword gap detection
- **PDF Resume Builder** — Generate professional resumes from structured form input
- **Markdown Rendering** — AI responses display formatted text with headings, lists, code blocks, and links
- **Light/Dark Theme** — System-aware theme switching with localStorage persistence
- **6-Provider Failover** — Automatic rotation across Groq, Moonshot, OpenRouter, Fireworks, NVIDIA, and Cloudflare
- **XSS Protection** — DOMPurify sanitization on all rendered AI responses
- **PII Security** — Resume text stripped from localStorage persistence

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 | User interface components |
| **Frontend** | TypeScript | Type-safe development |
| **Frontend** | Vite | Fast build tooling |
| **Frontend** | Zustand | Global state management |
| **Frontend** | react-markdown | Markdown rendering |
| **Frontend** | DOMPurify | XSS sanitization |
| **Backend** | Python 3.13+ | Server runtime |
| **Backend** | FastAPI | REST API framework |
| **Backend** | Uvicorn | ASGI server |
| **AI/ML** | scikit-learn | TF-IDF vectorization |
| **AI/ML** | pandas | Data manipulation |
| **AI/ML** | tiktoken | Token counting |
| **Data** | Groq (Llama 3.3 70B) | Primary LLM provider |
| **Data** | CSV (1,166 profiles) | Career dataset |
| **Tools** | pdfplumber | PDF text extraction |
| **Tools** | python-docx | Word document parsing |
| **Tools** | reportlab | PDF generation |

---

## Environment Configuration

Copy `backend/.env.example` to `backend/.env` and configure at least one provider:

```env
# Required: At least one LLM provider
GROQ_API_KEYS=["your_groq_api_key_here"]

# Optional: Additional providers for failover
MOONSHOT_API_KEYS=["your_moonshot_api_key_here"]
OPENROUTER_API_KEYS=["your_openrouter_api_key_here"]
FIREWORKS_API_KEYS=["your_fireworks_api_key_here"]
NVIDIA_NIM_API_KEYS=["your_nvidia_nim_api_key_here"]
CLOUDFLARE_WORKERS_API_KEYS=["your_cloudflare_workers_api_key_here"]

# Optional: OpenAI for audio transcription
OPENAI_API_KEYS=["your_openai_api_key_here"]
```

---

## Installation & Execution

### Prerequisites

- Python 3.13+
- Node.js 18+
- npm

### Backend Setup

```bash
cd Ai_Job_Recommendation_Chatbot

# Create and activate virtual environment
python -m venv career_env
career_env\Scripts\activate          # Windows
# source career_env/bin/activate    # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy backend\.env.example backend\.env    # Windows
# cp backend/.env.example backend/.env   # macOS/Linux

# Start the backend server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Backend runs at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at `http://localhost:5173`

### Access the Application

Open `http://localhost:5173` in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send message to chatbot |
| `POST` | `/api/upload-resume` | Upload resume file for parsing |
| `POST` | `/api/analyze-resume` | ATS scoring and keyword analysis |
| `POST` | `/api/build-resume` | Generate PDF resume |
| `GET` | `/api/health` | Health check |

---

## System Limitations

- **Dataset Size**: 1,166 career profiles — recommendations are limited to roles present in the dataset
- **LLM Rate Limits**: Subject to provider-specific rate limits (Groq free tier: 30 RPM)
- **File Upload**: Maximum file size depends on backend configuration (default ~10MB)
- **Context Window**: LLM responses limited to 1,200 tokens
- **Resume Text**: Extracted text capped at 4,000 characters for LLM context
- **Session Persistence**: Chat history stored in browser localStorage (clears on browser data wipe)
- **API Key Rotation**: Automatic failover across 6 providers, but all keys have daily quotas

---

## License

MIT
