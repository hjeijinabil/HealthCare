import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup; // Formulaire d'inscription
  errorMessage!: string; // Message d'erreur

  constructor(private fb: FormBuilder ,private authService:AuthService, private router:Router) {
    // Initialiser le formulaire
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.errorMessage = ''; // Initialiser le message d'erreur
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      // Call the register method from AuthService
      this.authService.register(this.signUpForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Optionally navigate to another route after successful registration
          this.router.navigate(['/signin']); // Redirect to login page
        },
        error: (err) => {
          console.error('Registration error', err);
          this.errorMessage = 'Emaiil Aleardy Exist!.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis correctement.';
    }
  }
}
