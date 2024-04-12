import { Component, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  public isModalActive =  signal(false);

  abrirModal() {
    this.isModalActive.set(!this.isModalActive());
  }

}
