# SeoulSpeak – Learn Korean Step by Step

SeoulSpeak is an interactive, modern learning platform for Korean, tailored to various proficiency levels – from absolute beginners (A1) to advanced learners (C2).  
It combines playful Hangul practice, structured grammar explanations, and quiz-based learning – all within a clean, mobile-friendly interface.

---

## 🌐 Live Demo
**Backend & Database (Render):** [https://seoulspeak-backend.onrender.com](https://seoulspeak-backend.onrender.com)

**Frontend (Vercel):** [https://seoul-speak.vercel.app](https://seoul-speak.vercel.app)

### In Progress:
**Backend with Login (Render):** [https://seoulspeaklogin.onrender.com](https://seoulspeaklogin.onrender.com) 

**Frontend with Login (Vercel):** [http://seoul-speak-login.vercel.app/](http://seoul-speak-login.vercel.app/)

---
## Tech Stack
| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | Angular      |
| Backend     | Node.js                               |
| Database    | PostgreSQL (via Render)                                       |
| Deployment  | Vercel (Frontend), Render (Backend + DB)         |
| Styling     | Bootstrap    |

---

## CRUD Functionalities

**Create**: Add new vocabulary entries 
**Read**: Display all entries in a styled, sortable table 
**Update**: Edit existing entries via modal or detail view 
**Delete**: Remove entries individually 

---
## Local Installation
### 1. Clone the Repository

```bash
git clone https://github.com/Piriyangah/SeoulSpeak.git

cd SeoulSpeak
```

### 2. Start Backend
Im Terminal: 
```bash
cd backend

npm run watch
```
Backend läuft unter http://localhost:3000.

### 3. Start Frontend 
Im neuen Terminal: 
```bash
cd frontend

npm install

ng serve

```
Die App läuft unter http://localhost:4200.

Beende den Server bei Bedarf mit Ctrl + C.

---
## Features and User Actions

### Home Page
- View homepage -> See overview of platform and learning motivation 

### Hangul Page
- Learn the Korean alphabet (Hangul) -> Explore letters and sounds with audio l(isten to the correct pronunciation)

### Grammar Page
- Read grammar explanations -> Learn grammar step by step with examples
- Take quizzes -> Practice

### Vocabulary Page
- add new vocabulary -> Enter custom words with meaning, example, pronunciation
- view vocabularylist and for more click on one for more details -> Click an entry to view full details
- Edit vocabulary -> Modify existing entries
- Delete vocabulary -> Remove words from the list

### Learn Section

#### Level Page 
- Choose language level -> Select lessons appropriate to their level

#### All Lessons Page
- Select a lesson -> Choose a lesson to start learning

#### One Lesson Page
- Learn about Korean culture and language -> Read introduction texts
- Watch explanation videos -> Follow visual/audio lesson guides
- Learn lesson-related vocabulary -> Discover and save new words directly to vocabulary
- Learn grammar in context -> Study grammar embedded in meaningful context
- Solve grammar quizzes	-> Practice with interactive quiz types
- Practice sentence order -> Drag & drop for grammar training
- Continue to next lesson -> Move directly to the next learning unit

### Header/ Nav
- Click logo -> Navigate back to the homepage
- Page navigation -> Access Grammar, Hangul, Vocabulary, Learn pages
**Coming soon:**
- Login button -> Register and log in to save your progress

### Footer
- View project info	-> See tech stack, GitHub, LinkedIn, and legal links
---
## Planned Features:
- User accounts with login & password (in progress)
- Progress tracking per lesson (e.g., quiz scores)
- Korean speech output for quizzes and vocabulary (TTS integration)
- Admin dashboard for lesson management
- Gamified learning: flashcards, memory games, etc.


---
## Active Git Branches
| Branch         | Zweck                                   |
|----------------|------------------------------------------|
| `main`         | Aktueller Stand                |
| `login_new`    | Entwicklung der Login-/Register-Funktionen |
| `save-progress`| Fortschritt speichern je nach User        |

---
**Tools & Resources:**
- Web Technologies script and exercises provided by Prof. Freiheit  
- Official Bootstrap documentation and examples  
- YouTube tutorials (for Angular, Node.js, and styling support)

**AI:** was used to support development in the following areas:
- Planning Angular component structure
- Developing interactive quiz types
- Bug fixing
- Styling ideas for a modern UI
- Refactoring CSS and HTML files

---
## Lizenz
Created as part of the Web Technologies module (Summer Term 2025, Prof. Freiheit).
Use permitted for educational purposes.
Redistribution or commercial use only with prior permission.
