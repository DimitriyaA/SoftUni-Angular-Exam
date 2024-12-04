import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getPosts(limit?: number) {
    const { apiUrl } = environment.parse;  // Corrected this line to access 'apiUrl' inside 'parse'
    let url = `${apiUrl}/posts`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url);
  }

  getThemes() {
    const { apiUrl } = environment.parse;  // Corrected this line as well
    return this.http.get<Theme[]>(`${apiUrl}/themes`);
  }

  getSingleTheme(id: string) {
    const { apiUrl } = environment.parse;  // Corrected this line as well
    return this.http.get<Theme>(`${apiUrl}/themes/${id}`);
  }

  createTheme(themeName: string, postText: string) {
    const { apiUrl } = environment.parse;  // Corrected this line as well
    const payload = { themeName, postText };
    return this.http.post<Theme>(`${apiUrl}/themes`, payload);
  }
}

// Log apiUrl to ensure it's working correctly
const apiUrl = environment.parse.apiUrl;  // Corrected here as well
console.log(apiUrl);  // This should now print the correct API URL
