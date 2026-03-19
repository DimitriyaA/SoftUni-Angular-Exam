🎲 BoardGamesMania – SoftUni Angular Exam Project

🌐 Live Demo

📌 Project Overview

BoardGamesMania е Single Page Application (SPA), разработен с Angular и Firebase.
Платформата позволява купуване и продаване на втора употреба настолни игри, с възможност за разглеждане, управление и взаимодействие с обяви.

✨ Key Features

🔐 User authentication (Register / Login)

🎮 Browse games by categories

📄 View detailed game information

➕ Add new game listings

✏️ Edit and delete your own games

💬 Comment and participate in discussions

👤 User profile with personal content

🛠️ Technologies Used

Angular (v19)

Firebase Authentication

Firebase Firestore

RxJS

TypeScript

CSS

📸 Screenshots

(Add your screenshots here for better presentation)

/screenshots
  home.png
  details.png
  profile.png

Example:




⚙️ Installation and Setup
1. Prerequisites

Make sure you have installed:

Node.js (v16 or later): Download Node.js

Angular CLI: Install globally using:

npm install -g @angular/cli
2. Clone Repository
git clone https://github.com/DimitriyaA/SoftUni-Angular-Exam.git
cd SoftUni-Angular-Exam
3. Install Dependencies
npm install
4. Firebase Configuration

Create a project in Firebase Console

Enable:

Authentication (Email/Password)

Firestore Database

Add your Firebase config in:

/src/environments/environment.ts

/src/environments/environment.prod.ts

Example:

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
🚀 Run the Application
ng serve

Open in browser: http://localhost:4200/

🧩 Application Structure
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
🔐 Application Features
Public Part

Home page with featured categories

Browse games by category

View game details and comments

Register and login

Private Part (Authenticated Users)

Add new games

Edit and delete owned games

Comment on games

View personal profile and activity

🚀 Future Improvements

📷 Image upload (Firebase Storage)

❤️ Like / favorite system

🔍 Search functionality

📄 Pagination / lazy loading

📄 Notes

Firebase must be properly configured for full functionality

Authentication and Firestore must be enabled

👩‍💻 Author

Created for SoftUni Angular Exam Project – BoardGamesMania