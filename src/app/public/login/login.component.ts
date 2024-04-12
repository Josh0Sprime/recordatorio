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
  origin: string;
}

interface IconOrigin {
  login?: Icon,
  register?: Icon
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

  public registerForm: FormGroup = this.fb.group({
    user: ["", Validators.required],
    password: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]]
  })

  public canYourSee = signal<IconOrigin>({
    login: {
      icon: "pi pi-eye-slash",
      type: "password",
      origin: "login"
    },
    register: {
      icon: "pi pi-eye-slash",
      type: "password",
      origin: "login"
    }
  });

  public isLogInPage = signal<boolean>(true);

  changeRegisterPage() {
    this.loginForm.reset();
    this.registerForm.reset();
    this.isLogInPage.set(!this.isLogInPage());
  }


  seePassword(origin: string) {
    switch(origin) {
      case "login":
        if( this.canYourSee().login!.icon === "pi pi-eye" ) {
          this.canYourSee.set({
            login: {
              icon: "pi pi-eye-slash",
              type: "password",
              origin
            }
          });
        }else {
          this.canYourSee.set({
            login: {
              icon: "pi pi-eye",
              type: "text",
              origin
            }
          });
        }
        break
      case "register":
        if( this.canYourSee().register!.icon === "pi pi-eye" ) {
          this.canYourSee.set({
            register: {
              icon: "pi pi-eye-slash",
              type: "password",
              origin
            }
          });
        }else {
          this.canYourSee.set({
            register: {
              icon: "pi pi-eye",
              type: "text",
              origin
            }
          });
        }
      break
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

  registerUser() {
    if( this.registerForm.valid ){
      this.userService.registerUser(this.registerForm.value)
      .subscribe({
        next: (resp) => {
          if( resp.ok ) {
            this.messageService.add({ severity: "success", summary: "ok!", detail: resp.msg })
            return
          }
          this.messageService.add({ severity: "warn", summary: "ups!", detail: resp.msg })
         }
      })
    }else {
      this.registerForm.markAllAsTouched();
    }
  }

}
