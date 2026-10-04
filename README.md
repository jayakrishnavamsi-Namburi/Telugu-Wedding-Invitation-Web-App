# 🌟 Traditional Telugu Wedding Web Application (Pelli Sandadi / Pelli Pilupu)

A luxury, culturally authentic full-stack wedding invitation and guest management web application built for traditional Telugu weddings (**పెళ్ళి పిలుపు / పెళ్ళి సందడి**).

Featuring a **Royal Maroon (`#800020`)**, **Pure Gold (`#D4AF37`)**, and **Silk Cream** palette, interactive **Talambralu / Golden Petal physics**, **Nadaswaram & Mangala Vadyam audio**, **Save the Date Cinematic Video Stage**, **Sumuhurtham Countdown**, **RSVP & Guest Blessings Wall**, and an **Admin Dashboard**.

---

## 🛠️ Tech Stack & Database Architecture

* **Frontend:** React.js, Tailwind CSS, Canvas Particle Physics, Lucide Icons, Canvas Confetti
* **Backend:** Node.js, Express.js, Mongoose
* **Database:** MongoDB Atlas (`cluster0.htde3ft.mongodb.net`) with seamless resilient in-memory fallback

---

## 📁 Directory Structure

```text
wedding-invitation-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection & MongoDB Atlas configuration
│   ├── models/
│   │   └── Guest.js              # Mongoose RSVP & Blessings Guest schema
│   ├── routes/
│   │   └── guestRoutes.js        # REST APIs for RSVP, guest stats & management
│   ├── .env                      # Environment config (Port, Mongo URI, Admin PIN)
│   ├── package.json
│   └── server.js                 # Express server entry point
└── frontend/
    ├── public/
    │   ├── assets/
    │   │   ├── nadaswaram.mp3     # Auspicious Nadaswaram audio
    │   │   └── wedding-video.mp4  # Save-the-date teaser video
    │   └── index.html             # Google fonts & Telugu typography setup
    ├── src/
    │   ├── components/
    │   │   ├── WelcomeCard.jsx    # Royal unfold invitation card with Ganesha stotram
    │   │   ├── VideoStage.jsx     # Ornate gold framed cinematic wedding teaser
    │   │   ├── RsvpForm.jsx       # Interactive RSVP with Andhra Bhojanam & Telugu wishes
    │   │   └── AdminDashboard.jsx # PIN-protected guest tracker, stats & CSV export
    │   ├── pages/
    │   │   ├── InvitationPage.jsx # Main full wedding invitation experience
    │   │   └── AdminPage.jsx      # Admin RSVP coordinator portal
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css              # Custom gold gradients, borders & animations
    │   └── main.jsx
    ├── package.json
    └── tailwind.config.js
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

---

### 2. Configure MongoDB Atlas (`backend/.env`)

Edit `backend/.env` to configure your MongoDB Atlas credentials:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.htde3ft.mongodb.net/telugu_wedding_db?retryWrites=true&w=majority
ADMIN_PIN=1432
```

*(Note: If MongoDB Atlas credentials are not yet configured, the app automatically runs in resilient in-memory mode so you can demo the RSVP and Admin features immediately!)*

---

### 3. Run the Application

#### Start Backend Server:
```bash
cd backend
npm run dev
# or npm start
# Server runs on: http://localhost:5000
```

#### Start Frontend (In a separate terminal):
```bash
cd frontend
npm run dev
# Vite runs on: http://localhost:3000
```

---

## ✨ Key Features

1. **శ్రీరస్తు | శుభమస్తు | అవిఘ్నమస్తు**: Traditional invocations to Lord Vigneshwara (Ganesha).
2. **Interactive Talambralu Particle Shower**: Realistic canvas simulation of yellow akshintalu, golden rice, and fragrant rose petals.
3. **Bilingual Support (తెలుగు / English)**: One-click instant language switcher for all wedding details.
4. **Sumuhurtham Countdown Timer**: Live ticking clock to the exact auspicious Lagna (24th Nov 2026, 09:42 AM).
5. **Ceremony Itinerary**: Timeline for Pradhana Karyakramam, Mangala Snanam, Mehendi, Sumuhurtham, and Reception with Google Maps navigation.
6. **RSVP & Blessings Wall**: Guests can select their side (Groom/Bride), attendance type, feast preference (Andhra Satvik Bhojanam), and leave heartfelt wishes.
7. **Admin Portal (`PIN: 1432`)**: View live guest count, side metrics, search, and export data directly into Excel/CSV.
