import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthStateServiceService } from 'src/app/services/auth-state-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null; // To hold the error message

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateServiceService // Inject the AuthStateService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful');
          // Store the JWT token in localStorage
          localStorage.setItem('jwt', response.jwt);
          
          // Update the authentication status in the shared service
          this.authStateService.setAuthenticated(true);

          this.router.navigate(['/']); // Redirect after successful login
        },
        error: (err) => {
          console.error('Login error', err);
          this.errorMessage = err.error.error; // Capture the error message from the response
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}