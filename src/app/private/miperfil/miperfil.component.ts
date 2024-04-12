import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FormularioComponent } from '../components/formulario/formulario.component';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [NavbarComponent, FormularioComponent],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css'
})
export class MiperfilComponent {

  public actualDate: Date = new Date();

}
