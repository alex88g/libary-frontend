
# 📚 BookMate – Frontend (React)

BookMate är ett responsivt och fullt fungerande frontend-gränssnitt byggt med **React.js** och **Vite** för ett digitalt bibliotekssystem. Användare kan registrera sig, logga in, låna böcker, lämna recensioner och hantera sin profil. Admins kan dessutom lägga till, redigera och radera böcker.

---

## 🎯 Funktioner

### 👤 Autentisering
- Registrering, inloggning, utloggning
- Glömt lösenord & lösenordsåterställning via e-post (Brevo)
- JWT hantering via `localStorage`

### 📚 Bibliotek
- Visa tillgängliga böcker
- Filtrering på tillgänglighet
- Låna böcker med valbar lånetid (upp till 30 dagar)

### 📝 Recensioner
- Skapa, läsa, redigera och radera recensioner
- Recensionerna är kopplade till böcker

### 🔐 Adminpanel
- Lägg till nya böcker
- Redigera eller ta bort befintliga
- Se om en bok är utlånad och till vem

### 🙋 Profil
- Visa användarinfo
- Radera konto

---

## 🧩 Teknologier & Beroenden

- **React** (via Vite)
- **React Router** – klientbaserad routing
- **Axios** – API-kommunikation
- **React Toastify** – aviseringar
- **CSS Modules** – sida-specifika stilar
- **LocalStorage** – autentisering & sessionshantering

---

## 📁 Projektstruktur

```
src/
├── components/
│   ├── BookCard.jsx
│   ├── Navbar.jsx
│   └── ReviewSection.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── Library.jsx
│   ├── AdminDashboard.jsx
│   ├── MyLoansPage.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgotPassword.jsx
│   ├── ResetPassword.jsx
│   └── ReviewPage.jsx
├── App.jsx
├── main.jsx
├── api.js
```

---

## 🌐 API-integration

Alla anrop görs via `api.js` där bas-URL sätts enligt miljövariabeln:

```js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

---

## ⚙️ Starta lokalt

1. Klona frontend-repot
```bash
git clone https://github.com/alex88g/library-frontend.git
cd bookmate-frontend
```

2. Installera beroenden
```bash
npm install
```

3. Skapa `.env`-fil i root:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Starta utvecklingsservern
```bash
npm run dev
```

---

## 📦 Viktiga beroenden (`package.json`)

```json
"dependencies": {
  "axios": "^1.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "react-toastify": "^9.x"
}
```

---

## 🧠 Skärmbilder & UI

![Startsida](./85da9ebb-bd00-439e-9b0d-dfb37fd77144.png)

---

## ✅ Kodstandard

Projektet inkluderar konfigurationsfiler för ESLint och Prettier:

- `.eslintrc.js` – ESLint med React-regler
- `.prettierrc` – Prettier med semikolon och 2-space indentering

---

## 📬 Kontakt

Har du förbättringsförslag? Kontakta mig alexander.gallorini@gmail.com

---

© 2025 BookMate Frontend SPA – byggd med React
