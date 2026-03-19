# 🎲 SoftUni Angular Exam Project

## 🌐 Live Demo

👉 [https://mymagicapp-1acde.web.app](https://mymagicapp-1acde.web.app)

---

## 📌 Project Overview

This is a **Single Page Application (SPA)** built with Angular and Firebase.
The platform is designed for buying and selling **second-hand board games**, allowing users to browse, manage, and interact with listings.

---

## ✨ Key Features

* 🔐 User authentication (Register / Login)
* 🎮 Browse games by categories
* 📄 View detailed game information
* ➕ Add new game listings
* ✏️ Edit and delete your own games
* 💬 Comment and participate in discussions
* 👤 User profile with personal content

---

## 🛠️ Technologies Used

* **Angular (v19)**
* **Firebase Authentication**
* **Firebase Firestore**
* **RxJS**
* **TypeScript**
* **CSS**

---

## 📸 Screenshots

> *(Add your screenshots here for better presentation)*

```bash
/screenshots
  home.png
  details.png
  profile.png
```

Example:

![Home Page](./screenshots/home.png)
![Game Details](./screenshots/details.png)

---

## ⚙️ Installation and Setup

### 1. Prerequisites

Make sure you have installed:

* Node.js (v16 or later)
* Angular CLI

```bash
npm install -g @angular/cli
```

---

### 2. Clone the Repository

```bash
git clone https://github.com/DimitriyaA/SoftUni-Angular-Exam.git
cd SoftUni-Angular-Exam
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Firebase Configuration

1. Create a project in Firebase Console

2. Enable:

   * Authentication (Email/Password)
   * Firestore Database

3. Add your Firebase config in:

* `/src/environments/environment.ts`
* `/src/environments/environment.prod.ts`

Example:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
```

---

## 🚀 Run the Application

```bash
ng serve
```

Open in browser:
[http://localhost:4200/](http://localhost:4200/)

---

## 🧩 Application Structure

```bash
/src
  /app
    /core            # Header & Footer
    /user            # Login, Register, Profile
    /games
      /categories-list
      /game-details
      /add-game
      /discussion
    /services        # Firebase services
    /types           # Interfaces
    /home            # Home page
    /error           # 404 page
  /environments      # Firebase configs
```

---

## 🔐 Application Features

### Public Part

* Home page with featured categories
* Browse games by category
* View game details and comments
* Register and login

### Private Part (Authenticated Users)

* Add new games
* Edit and delete owned games
* Comment on games
* View personal profile and activity

---

## 🚀 Future Improvements

* 📷 Image upload (Firebase Storage)
* ❤️ Like / favorite system
* 🔍 Search functionality
* 📄 Pagination / lazy loading

---

## 📄 Notes

* Firebase must be properly configured for full functionality
* Authentication and Firestore must be enabled

---

## 👩‍💻 Author

Created for SoftUni Angular Exam Project
