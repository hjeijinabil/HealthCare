import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // 10 digits
      birthDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

