import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digits
      birthDate: ['', Validators.required],
      gender: ['', Validators.required]  // Add gender field with 'required' validator

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
