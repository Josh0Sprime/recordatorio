import { Component, Signal, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Icon {
  icon: string;
  type: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {

  private router: Router = inject(Router);
  private userService = inject(AuthService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService)

  public loginForm: FormGroup = this.fb.group({
    user: ["", Validators.required],
    password: ["", Validators.required]
  })

  public canYourSee = signal<Icon>({
    icon: "pi pi-eye-slash",
    type: "password"
  });


  seePassword() {
    if( this.canYourSee().icon === "pi pi-eye" ) {
      this.canYourSee.set({
        icon: "pi pi-eye-slash",
        type: "password"
      });
    }else {
      this.canYourSee.set({
        icon: "pi pi-eye",
        type: "text"
      });
    }
  }

  logIn() {
    if( this.loginForm.valid ) {
      const { user, password } = this.loginForm.value;
      this.userService.logIn(user, password).subscribe({
        next: (resp) => {
          if( resp.ok) {
            this.router.navigateByUrl("mi-perfil");
          }else {
            this.messageService.add({severity: "warn", summary: "Ups", detail: resp.msg})
          }
        }
      })
    }else {
      this.loginForm.markAllAsTouched();
    }

  }

}
