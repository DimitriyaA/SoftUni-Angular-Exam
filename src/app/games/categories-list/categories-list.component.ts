import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  isLoading: boolean = true; // Show loader initially
  currentCategory: string = ''; // Tracks the selected category
  displayedGames: any[] = []; // Stores the games to display in the right column

  // Mock games data
  games = [
    { name: 'Game 1', description: 'A fun game for everyone.', picture: 'game1.jpg', condition: 'New', price: 10, category: 'Card Games' },
    { name: 'Game 2', description: 'Exciting adventure gameplay.', picture: 'game2.jpg', condition: 'Used', price: 15, category: 'Adventure Games' },
    { name: 'Game 3', description: 'Family time fun.', picture: 'game3.jpg', condition: 'New', price: 20, category: 'Family Games' },
    { name: 'Game 4', description: 'Strategy for experienced players.', picture: 'game4.jpg', condition: 'Used', price: 25, category: 'Strategy Games' },
    { name: 'Game 5', description: 'Great for children.', picture: 'game5.jpg', condition: 'New', price: 5, category: 'Children\'s Games' },
    { name: 'Game 6', description: 'Another card game.', picture: 'game6.jpg', condition: 'Used', price: 12, category: 'Card Games' },
  ];
  categories = ['Children\'s Games', 'Card Games', 'Adventure Games', 'Family Games', 'Strategy Games'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLastFiveGames(); // Show the last 5 games initially
    this.simulateLoading(); // Simulate loader

    // Check for the category parameter from the URL on load
    this.route.queryParams.subscribe(params => {
      const categoryFromUrl = params['category'];
      if (categoryFromUrl) {
        // Replace "-" back to " " to get the correct category
        const formattedCategory = categoryFromUrl.replace(/-/g, ' ');
        this.filterByCategory(formattedCategory); // Filter games by category from URL
      }
    });
  }

  loadLastFiveGames(): void {
    this.displayedGames = this.games.slice(-5); // Get the last 5 games
    this.currentCategory = ''; // Reset the category selection
  }

  filterByCategory(category: string): void {
    this.displayedGames = this.games
      .filter(game => game.category === category)
      .slice(-5); // Get the last 5 games in this category
    this.currentCategory = category; // Update the selected category

    // Replace spaces with "-" for better URL formatting
    const formattedCategory = category.replace(/\s+/g, '-');

    // Update the URL with the selected category using queryParams
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: formattedCategory },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }

  simulateLoading(): void {
    setTimeout(() => {
      this.isLoading = false; // Stop loading after 5 seconds
    }, 200);
  }
}
