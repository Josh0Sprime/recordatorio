import { Component, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [DialogModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  public isModalActive =  signal(false);

  abrirModal() {
    this.isModalActive.set(!this.isModalActive());
  }

}
