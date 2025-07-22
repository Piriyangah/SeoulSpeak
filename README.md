# SeoulSpeak – Learn Korean Step by Step

**SeoulSpeak** is an interactive, modern Korean learning platform tailored to different proficiency levels – from absolute beginners (A1) to advanced learners (C2).  
It combines playful Hangul practice, structured grammar explanations, and quiz-based learning – all wrapped in a clean, mobile-friendly design.

---

## 🌐 Live Demo

**Frontend (Vercel):** [https://seoul-speak.vercel.app](https://seoul-speak.vercel.app)

**Backend & Database (Render):** [https://seoulspeak-backend.onrender.com](https://seoulspeak-backend.onrender.com)

---

## ✨ Features

✅ Interactive **Hangul** section (clickable letters with pronunciation audio)  
✅ Grammar pages with explanations and self-check exercises  
✅ 4 quiz types: Multiple Choice, True/False, Fill in the Blanks, Sentence Order  
✅ Save vocabulary to your **personal vocab list** (add/edit/delete – CRUD)  
✅ Lessons structured by CEFR language levels (A1–C2)  
✅ Modern, responsive design with a violet color palette (#511462)  
✅ Fully functional across desktop, tablet, and mobile  

---

## 🛠️ Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | Angular (TypeScript), SCSS, Bootstrap Icons      |
| Backend     | Node.js, Express                                 |
| Database    | PostgreSQL 16 (via Render)                                       |
| Deployment  | Vercel (Frontend), Render (Backend + DB)         |
| Styling     | Bootstrap    |

---

## 📦 CRUD Functionalities

The application implements full CRUD on the personal vocabulary list:

- **Create**: Add new vocabulary entries ✅
- **Read**: Display all entries in a styled, sortable table ✅
- **Update**: Edit existing entries via modal or detail view ✅
- **Delete**: Remove entries individually ✅

---

## 🚀 Installation Guide (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/Piriyangah/SeoulSpeak.git

cd SeoulSpeak
```

### 2. Backend
Im Terminal: 
```bash
cd backend

npm run watch
```
Backend läuft nun unter http://localhost:3000

### 3. Frontend 
Im neuen Terminal: 
```bash
cd frontend

npm install

ng serve

```
Die App läuft jetzt unter http://localhost:4200

Beende den Server bei Bedarf mit Ctrl + C.

---
## For the future:
A login system (username & password) is planned for future iterations. individual using 

---

## Lizenz
Erstellt im Rahmen des Moduls Webtechnologien WS 24/25 (Prof. Freiheit).
Nutzung zu Lernzwecken erlaubt. Weiterverbreitung oder kommerzielle Nutzung nur nach Rücksprache.