import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  @ViewChild('password') password?: ElementRef;
  signinForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signinForm = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    this.authService.signin(this.signinForm.value);
    this.signinForm.reset();
  }

  toggleVisibility() {
    this.password!.nativeElement.type =
      this.password!.nativeElement.type === 'password' ? 'text' : 'password';
  }
}
