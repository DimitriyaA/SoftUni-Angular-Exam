// Interface for a Game
export interface Game {
  id: string;              // Game ID (Firebase document ID)
  name: string;            // Game name
  description: string;     // Game description
  picture: string;         // URL to the game picture
  createdBy: string;       // User ID of the person who added the game
  //createdAt: firebase.firestore.Timestamp; // Firebase Timestamp for game creation date
}

// Interface for a Comment in the discussion
export interface Comment {
  id: string;              // Comment ID (Firebase document ID)
  userId: string;          // ID of the user who wrote the comment
  gameId: string;          // ID of the game the comment is related to
  content: string;         // The comment content
  //createdAt: firebase.firestore.Timestamp; // Firebase Timestamp for comment creation date
}

// User Interface in Firebase context
export interface User {
  id: string;              // User ID (Firebase document ID)
  username: string;        // Username of the user
  email: string;           // User email
  phoneNumber: string;     // User phone number
  //createdAt: firebase.firestore.Timestamp; // Firebase Timestamp when the user was created
  //updatedAt: firebase.firestore.Timestamp; // Firebase Timestamp for the last update
  addedGames: string[];    // List of Game IDs that the user has added
  comments: string[];      // List of Comment IDs (or direct comment data if needed)
}

// For Authentication - This is the structure for the user during login/register
export interface UserForAuth {
  firstName: string;  // Fisrt Name
  lastName: string;   // Last Name
  email: string;           // User email for authentication
  password: string;        // User password for authentication
  phoneNumber: string;
  id: string;
}

// Optional Profile Update interface
export interface UserProfileUpdate {
  username?: string;       // Optional new username
  email?: string;          // Optional new email
  phoneNumber?: string;    // Optional new phone number
}
