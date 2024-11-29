import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse'; // Correct import
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from './main/main.component';
import { CategoriesListComponent } from './games/categories-list/categories-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MainComponent, CategoriesListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.initializeParse();
    this.testDatabaseConnection();
  }

  private initializeParse(): void {
    const appId = environment.parse.appId;
    const jsKey = environment.parse.jsKey;
    const serverURL = environment.parse.serverURL;

    // Initialize Parse with configuration object
    Parse.initialize(appId, jsKey, serverURL);

    console.log('Parse initialized with:', { appId, jsKey, serverURL });
  }

  private async testDatabaseConnection(): Promise<void> {
    try {
      const TestObject = Parse.Object.extend('TestObject'); // Your class name in Back4App
      const query = new Parse.Query(TestObject);
      const results = await query.find(); // Retrieve data

      console.log('Connection successful! Retrieved objects:', results);
    } catch (error) {
      console.error('Error connecting to Back4App database:', error);
    }
  }
}
