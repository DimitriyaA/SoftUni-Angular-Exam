import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { GameService } from '../../services/games.service'; // Import the GameService

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, LoaderComponent], // Importing the necessary modules
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  isLoading: boolean = true; // Initially showing the loader
  currentCategory: string = ''; // Tracks the selected category
  displayedGames: any[] = []; // Stores the games to display
  categories = ['Children\'s Games', 'Card Games', 'Adventure Games', 'Family Games', 'Strategy Games'];

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLastFiveGames(); // Load the last 5 games initially
    this.simulateLoading(); // Simulate loading

    // Handle category selection from URL query parameters
    this.route.queryParams.subscribe(params => {
      const categoryFromUrl = params['category'];
      if (categoryFromUrl) {
        const formattedCategory = categoryFromUrl.replace(/-/g, ' ');
        this.filterByCategory(formattedCategory); // Filter games by category from URL
      }
    });
  }

  loadLastFiveGames(): void {
    this.gameService.getGames().subscribe(games => {
      this.displayedGames = games.slice(-5); // Get the last 5 games
      this.currentCategory = ''; // Reset the category selection
    });
  }

  filterByCategory(category: string): void {
    this.gameService.getGames().subscribe(games => {
      this.displayedGames = games.filter(game => game.category === category).slice(-5); // Filter by category and get the last 5 games
      this.currentCategory = category; // Update the selected category

      const formattedCategory = category.replace(/\s+/g, '-');
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: formattedCategory },
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    });
  }

  // Method to handle navigation to the discussion page
  navigateToDiscussion(gameName: string): void {
    const discussionUrl = `/games/${gameName}/discussion`;
    this.router.navigate([discussionUrl]);
  }

  // Method to handle navigation to the game details page
  navigateToGameDetails(gameName: string): void {
    const detailsUrl = `/games/${gameName}/details`; // Construct the details URL
    this.router.navigate([detailsUrl]); // Navigate to the details page
  }

  simulateLoading(): void {
    setTimeout(() => {
      this.isLoading = false; // Stop loading after a short delay
    }, 200);
  }
}
