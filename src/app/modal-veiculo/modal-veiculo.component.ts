import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veiculo } from '../home/veiculo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-veiculo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-veiculo.component.html',
  styleUrl: './modal-veiculo.component.scss',
})
export class ModalVeiculoComponent {
  @Input() veiculo: Veiculo = new Veiculo();
  @Input() modalVeiculo = false;
  @Output() fecharModalVeiculoEvent = new EventEmitter<void>();
  @Output() salvarVeiculoEvent = new EventEmitter<any>();
  @Output() alterarVeiculoEvent = new EventEmitter<any>();

  fecharModal() {
    this.fecharModalVeiculoEvent.emit();
  }

  salvarVeiculo() {
    if (this.veiculo.id === null) {
      this.salvarVeiculoEvent.emit(this.veiculo);
    } else {
      this.alterarVeiculoEvent.emit(this.veiculo);
    }
  }
}
