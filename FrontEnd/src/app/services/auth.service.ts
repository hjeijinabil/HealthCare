import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8000/api/register'; // API endpoint for registration
  private loginUrl = 'http://localhost:8000/api/login';       // API endpoint for login
  private logoutUrl = 'http://localhost:8000/api/logout';     // API endpoint for logout
  private apiUrl = 'http://localhost:8000/api'; // Base URL for your API
  private tokenKey = 'jwt'; // Replace with your actual token key


  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    console.log("Registering user with data:", userData);
    return this.http.post(this.registerUrl, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

   // Logout method
   logout(): Observable<any> {
    // Here you can add any logic needed for logout, like token removal
    localStorage.removeItem('jwt'); // Remove token from local storage
    return of(null); // Return an observable indicating logout success
  }
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    return of(!!token); // Returns true if the token exists, false otherwise
  }

}
