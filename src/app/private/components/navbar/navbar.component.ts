import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  public userName = signal<string>("");

  ngOnInit(): void {
    this.userName.set(this.authService.getUser?.user!);
  }

  logOut() {
    this.authService.logout();
  }
}
