import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStateServiceService } from 'src/app/services/auth-state-service.service';
import { googleAuthConfig, facebookAuthConfig, githubAuthConfig } from '../../auth.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { ServiceOAuthService } from 'src/app/services/service-oauth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuth: SocialAuthService,
    private OAuth : ServiceOAuthService,
    private router: Router,
    private authStateService: AuthStateServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Configure OAuth service for the desired provider
    // this.oauthService.configure(googleAuthConfig);  // Or configure Facebook or GitHub here
    this.socialAuth.authState.subscribe((user) => { console.log(user);
      this.OAuth.socialAuth(user.idToken).subscribe(
        (response : any) => {
       console.log(response)
       localStorage.setItem('jwt', response.token);
        // Update the authentication status in the shared service
        this.authStateService.setAuthenticated(true);

        this.router.navigate(['/']); // Redirect after successful login
       
        }

    )})
  
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
          this.errorMessage = err.error.message || 'Login failed'; // Capture the error message from the response
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Google login function
  // loginWithGoogle(): void {
  //   this.oauthService.configure(googleAuthConfig);
  //   this.oauthService.initCodeFlow(); // Start the OAuth flow for Google
  // }

  // Facebook login function
  // loginWithFacebook(): void {
  //   this.oauthService.configure(facebookAuthConfig);
  //   this.oauthService.initCodeFlow(); // Start the OAuth flow for Facebook
  // }

  // GitHub login function
  // loginWithGitHub(): void {
  //   this.oauthService.configure(githubAuthConfig);
  //   this.oauthService.initCodeFlow(); // Start the OAuth flow for GitHub
  // }

  // OAuth login callback handling (you can use this for handling the response after OAuth login)
  // handleOAuthCallback(): void {
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
  //     if (this.oauthService.hasValidAccessToken()) {
  //       const token = this.oauthService.getAccessToken();
  //       // Store the token, and you can also store the user information here
  //       localStorage.setItem('access_token', token);
  //       this.authStateService.setAuthenticated(true);
  //       this.router.navigate(['/']); // Redirect after successful login
  //     }
  //   });
  // }
}
