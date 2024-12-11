SoftUni Angular Exam Project
This is a Single Page Application (SPA) built with Angular and integrated with Firebase for backend services such as Authentication and Firestore Database. The application serves as a platform for second-hand board games, allowing users to manage, browse, and interact with games.

1. Table of Contents
2. Project Overview
3. Technologies Used
4. Installation and Setup
5. Application Features
6. Folder Structure
7. Run the Application
   
1. Project Overview
The application provides the following functionality:

Public Part: Browse game categories, view game details, and access authentication forms (login/register).
Private Part: Logged-in users can add, edit, and delete games, participate in discussions, and manage user-specific data like their profile and added games.

2. Technologies Used
Angular (v19.0.2): For building the frontend components and routing.
Firebase Authentication: For user registration, login, and logout functionalities.
Firebase Firestore: For storing and managing data (games, comments, and user data).
RxJS: For reactive programming and handling asynchronous operations.
TypeScript: For type safety and clean code structure.
CSS: For responsive design and styling.

3. Installation and Setup
   
1. Prerequisites
Make sure you have the following tools installed on your system:

Node.js (v16 or later): Download Node.js
Angular CLI: Install it globally using the command:
bash

npm install -g @angular/cli

2. Install Dependencies
Clone the Repository:

bash

git clone https://github.com/DimitriyaA/SoftUni-Angular-Exam.git
cd SoftUni-Angular-Exam
Install Required Node Modules:

bash

npm install

3. Firebase Configuration
Create a Firebase project in the Firebase Console.
Enable Authentication (Email/Password) and Firestore Database.
Replace your Firebase API keys in the environment files:
Development: /src/environments/environment.ts
Production: /src/environments/environment.prod.ts
Example:

typescript

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

4. Application Features
Public Part
Home Page: Welcome message and featured game categories.
Categories: Browse games grouped by categories.
Game Details: View game details and comments.
Authentication: Login and register forms for users.
Private Part (Authenticated Users)
Add Game: Add new games with details like name, description, price, and image.
Edit/Delete Game: Edit or delete games created by the logged-in user.
Discussions: Add comments under game details.
User Profile: View and manage the games and comments created by the user.

6. Folder Structure
The project follows a clean and modular Angular structure:

bash

/src
  /app
    /user            # Components for Login, Register, and Profile pages.
    /core            # Layout components: Header and Footer.
    /games
      /categories-list   # List games by category.
      /game-details      # Game details and comments/discussions.
      /add-game          # Add new games.
      /discussion        # Comments for each game.
    /services        # Firebase services (Authentication, Firestore, etc.).
    /types           # TypeScript interfaces for games, users, and comments.
    /home            # Home page component.
    /error           # 404 Page Not Found component.
  /environments      # Environment configurations for Firebase.
index.html           # Main HTML file.
main.ts              # Application entry point.

6. Run the Application
To start the application, follow these steps:

Run the Development Server:

bash

ng serve
Open your browser and navigate to:
http://localhost:4200/

Important Notes
Ensure the Firebase backend is properly configured and running for full functionality.
Authentication and Firestore Database must be enabled in the Firebase Console.
