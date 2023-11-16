import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carregando',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carregando.component.html',
  styleUrl: './carregando.component.scss',
})
export class CarregandoComponent {
  @Input()
  carregando = false;
}
