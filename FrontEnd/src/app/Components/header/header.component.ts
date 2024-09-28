import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false; // Track authentication status

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check authentication status on initialization
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated: boolean) => {
        this.authenticated = isAuthenticated; // Update the authenticated property
      },
      error => {
        console.error('Error checking authentication status:', error);
        this.authenticated = false; // Default to not authenticated on error
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.authenticated = false; // Update the authenticated status on logout
        console.log('User logged out successfully');
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }
}