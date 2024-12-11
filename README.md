SoftUni Angular Exam Project
This project is a Single Page Application (SPA) built with Angular and uses Firebase for backend services such as Authentication and Firestore Database. The application is a platform for second-hand board games, allowing users to manage, browse, and interact with games.

Table of Contents
1. Project Overview
2. Technologies Used
3. Installation and Setup
4. Application Features
5. Folder Structure
6. Run the Application

1. Project Overview
The application allows users to:

Browse available categories of board games.
Add, edit, and delete games (private functionality).
Participate in discussions by adding comments to games.
Manage their profile with user-specific data.

2. Technologies Used
Angular (v19.0.2): For building the frontend and managing components.
Firebase Authentication: For user registration, login, and logout functionalities.
Firebase Firestore: For managing and storing data about games, comments, and users.
RxJS: For handling asynchronous operations and reactive programming.
TypeScript: For type safety and clean code structure.
CSS: For responsive styling and layout.

3. Installation and Setup
4. 
1. Prerequisites
Ensure you have the following tools installed on your system:

Node.js (v16 or later): Download Node.js
Angular CLI: Install it globally using:
bash

npm install -g @angular/cli

2. Install Dependencies
Clone the Repository:

bash

git clone https://github.com/DimitriyaA/SoftUni-Angular-Exam.git
cd SoftUni-Angular-Exam
Install Node Modules: Run the following command in the project root directory:

bash

npm install
Firebase Configuration:

Set up a Firebase project on the Firebase Console.

Enable Authentication (Email/Password) and Firestore Database.

Replace your Firebase API Keys in the environment files:

/src/environments/environment.ts (for development)
/src/environments/environment.prod.ts (for production)

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

3. Run the Application
Start the Development Server:

bash

ng serve
Open your browser and navigate to:

http://localhost:4200/

Ensure your Firebase backend is active to use features such as authentication and data storage.

4. Application Features
   
Public Part
Home Page: Displays a welcome message and highlights categories.
Categories: List of board games sorted by categories.
Game Details: View details of a game and comments/discussion.
Login/Register: Users can register and log into the application.

Private Part (Authenticated Users)
Add Game: Add a new game with details (name, description, price, etc.).
Edit/Delete Game: Manage games created by the logged-in user.
Discussion: Add and view comments on games.
User Profile: View and manage the user's added games and comments.

5.Folder Structure
Here’s an overview of the project’s main folders:

/src
  /app
    /user            - Components for Login/Register/Profile.
    /core            - Main layout components (Header/Footer).
    /games
      /categories-list    - List games by category.
      /game-details       - Game details and discussion.
      /add-game           - Add new games.
      /discussion         - Discussion for each game.
    /services        - Firebase services (authentication, Firestore, etc.).
    /types           - Interfaces.
    /home            - Home page.
    /error           - Page Not Found.
  /environments      - Firebase environment configurations.
index.html         - Main HTML file.
main.ts            - Application bootstrap file.



