// game-category.ts
import { User } from './user'; // User would likely be the creator of the game

export interface GameCategory {
  _id: string; // Unique identifier for the category
  name: string; // Name of the game category (e.g., "Adventure", "Board Games", etc.)
  description: string; // Description of the category
  games: Game[]; // A list of games that belong to this category
  createdBy: User; // The user who created the category
  createdAt: string; // Timestamp of creation
  updatedAt: string; // Timestamp of last update
  __v: number; // Versioning
}

export interface Game {
  _id: string;
  name: string; // Game name
  description: string; // Description of the game
  price: number; // Price of the game
  condition: string; // Condition of the game (e.g., "New", "Used")
  picture: string; // Picture URL
  category: string; // Category name (e.g., "Adventure", "Card")
  createdBy: User; // Creator of the game
  createdAt: string; // Timestamp of game creation
  updatedAt: string; // Timestamp of last update
}
