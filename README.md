# 🇯🇵 Konnichiwa Japan

### Your Companion for Moving to Japan

> **Konnichiwa Japan** is a student-focused web platform designed to help **KIIT students preparing to study, work, or intern in Japan** navigate language learning, administrative procedures, and everyday life.

---

##  About the Project

Moving to a new country involves much more than simply learning the language.

Students relocating to Japan may have to deal with unfamiliar administrative procedures, Japanese communication, local garbage-disposal rules, and many aspects of everyday life that are difficult to understand beforehand.

**Konnichiwa Japan** brings these resources together in one platform, giving students a practical companion before and after moving to Japan.

The project is being developed as part of the **Smart India Hackathon (SIH)**.

---

##  Problem Statement

> **KIIT students moving to Japan often struggle with language, administrative procedures, and unfamiliar daily-life systems, making transition difficult.**

---

##  Key Features

###  Learn Japanese

An interactive, self-evaluation focused Japanese learning section.

* Hiragana learning and quizzes
* Katakana learning and quizzes
* Beginner Kanji
* Multiple-choice quizzes
* Instant results and scores
* Practice areas based on quiz performance

The basic quiz system is client-side, keeping the experience fast and simple.

---

###  Administrative Guides

Easy-to-understand guides for common procedures students may encounter after arriving in Japan.

Examples include:

* Opening a bank account
* Getting a Japanese phone number / SIM
* Residence registration
* Hanko / personal seal
* Transportation
* Other everyday procedures

Each guide aims to provide:

```text
What is it?
      ↓
Why do I need it?
      ↓
Where do I go?
      ↓
What documents are required?
      ↓
What steps should I follow?
      ↓
Useful Japanese phrases
      ↓
Official references
```

---

### Smart Garbage Assistant

Japanese garbage disposal rules can vary depending on the local municipality and district.

Konnichiwa Japan helps students understand **what to throw, when to throw it, and how to dispose of it correctly**.

####  Garbage Schedule

Users can select their:

```text
City → District / Ward
```

and view the applicable garbage-disposal schedule.

#### AI Garbage Scanner

Users can upload a photo of an item.

The system can:

1. Analyze the uploaded image
2. Identify the likely garbage category
3. Check the selected municipality's rules
4. Show the appropriate disposal method
5. Display the relevant collection day
6. Inform the user if a designated/special garbage bag is required

###  AI + Municipal Data

The AI identifies the **type of garbage**, while structured municipal data determines the actual disposal rules and collection schedule.

```text
                 Image
                   │
                   ▼
              AI Analysis
                   │
                   ▼
          Garbage Category
                   │
                   ▼
        City + District Rules
                   │
                   ▼
      ┌────────────┼────────────┐
      ▼            ▼            ▼
 Collection     Disposal     Special Bag
    Day           Method       Required?
```

---

##  Future Features

The platform is designed to expand beyond the initial MVP.

Possible future additions include:

* Student profiles
* Automatic location detection
* Garbage collection reminders
* More Japanese cities and municipalities
* Japanese phrase assistant
* Moving-to-Japan checklist
* Cost-of-living information
* Emergency information
* Public transportation guidance
* Workplace etiquette and vocabulary
* Local weather information
* And more student-focused utilities

---

## Tech Stack

### Frontend

* **React**
* **JavaScript / JSX**
* **HTML5**
* **CSS3**

### Backend

* **Node.js**
* **Express.js**
* REST API architecture

### Database

* **MongoDB**
* MongoDB Atlas for cloud database hosting

### Authentication

* **Clerk**
* User authentication and account management

### AI

* **Gemini API**
* Multimodal image understanding for garbage classification

### Development & Deployment

* **Git**
* **GitHub**
* **Vercel / Render** or other suitable deployment platforms

---

## Project Architecture

```text
                         ┌─────────────────────┐
                         │      React          │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                              REST API Calls
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Node.js        │
                         │      Express        │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
               MongoDB           Clerk           Gemini API
               Database       Authentication      AI Vision
                    │                                │
                    │                                │
                    └──────────────┬─────────────────┘
                                   │
                                   ▼
                              Application
```

---


## MVP Scope

The initial prototype focuses on three core areas:

| Module                   | MVP Features                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------- |
|  Learn Japanese        | Hiragana, Katakana, Kanji, MCQ quizzes                                                |
|  Administrative Guides | Bank accounts, phone/SIM, Hanko, registration and other useful procedures             |
|  Smart Garbage        | City/district schedule, image classification, disposal rules, special-bag information |

---


## 💡 Why Konnichiwa Japan?

Students moving to Japan often have to search across multiple websites, government pages, guides, and informal sources to understand basic procedures and everyday rules.

**Konnichiwa Japan brings these resources together into a single student-friendly platform.**

Our goal is simple:

> **Learn → Prepare → Move → Adapt**

---

## Project Status

**Currently under development**

The MVP is being developed for the **Smart India Hackathon**.

---

## Contributing

This project is currently being developed as a student hackathon project.

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/suyashcsecore/Konnichiwa_Japan.git

# Enter the project
cd Konnichiwa-Japan

# Install frontend dependencies
cd client
npm install

# Start the frontend
npm run dev
```

In another terminal:

```bash
# Enter the backend
cd server

# Install backend dependencies
npm install

# Start the backend
node index.js
```

Create the required environment variables for MongoDB, Clerk and other services before running the application.


# 🇯🇵 Konnichiwa Japan

### *Learn the language. Understand the system. Enjoy the journey.*
