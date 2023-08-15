import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


interface RegisterResponse {
  message: string;
}

interface ResponseMessage {
  message: string;
}

interface ErrorResponse {
  error: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  confirmPassword: string = '';
  message: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  birthdate: string = '';
  photo: File | null = null; 
  showSuccessPopup = false;


  constructor(private http: HttpClient , private router: Router) { }

  ngOnInit(): void {
    this.setupButtons();
  }

  private setupButtons() {
    const signUpButton = document.getElementById('signUp') as HTMLElement;
    const signInButton = document.getElementById('signIn') as HTMLElement;
    const container = document.getElementById('container') as HTMLElement;

    signUpButton?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });
  }
  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
 }
 

  register(email: string, password: string, firstName: string, lastName: string, birthdate: string, photo: File | null) {
    if (!photo) {
      return;
    }
    if (!this.passwordsMatch()) {
      this.message = 'Passwords do not match.';
      return;
   }
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('birthdate', birthdate);
    formData.append('photo', photo, photo.name);

    this.http.post<RegisterResponse>('http://localhost:5000/register', formData).subscribe(
      response => {
        this.message = response.message;
      },
      error => {
        this.message = (error.error as ErrorResponse).error;
      }
    );
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photo = input.files[0];
    }
  }
  

  login() {
    this.http.post<ResponseMessage>('http://localhost:5000/login', { email: this.email, password: this.password }).subscribe(
      response => {
        this.message = response.message;
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate(['/graduate-programs']);
        }, 2000);
      },
      error => {
        this.message = (error.error as ErrorResponse).error;
      }
    );
  }
}
