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
    this.veiculo = new Veiculo();
    this.fecharModalVeiculoEvent.emit();
  }

  salvarVeiculo() {
    if (!this.validarFormulario()) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (this.veiculo.id === null) {
      this.salvarVeiculoEvent.emit(this.veiculo);
    } else {
      this.alterarVeiculoEvent.emit(this.veiculo);
    }
  }

  validarFormulario(): boolean {
    const anoAtual = new Date().getFullYear();
    if (
      this.veiculo.anoDeFabricacao &&
      (this.veiculo.anoDeFabricacao < 1900 ||
        this.veiculo.anoDeFabricacao > anoAtual)
    ) {
      return false;
    }
    if (
      this.veiculo.placa &&
      (this.veiculo.placa.length < 7 || this.veiculo.placa.length > 7)
    ) {
      return false;
    }
    return (
      !!this.veiculo.modelo &&
      !!this.veiculo.marca &&
      !!this.veiculo.cor &&
      !!this.veiculo.anoDeFabricacao &&
      !!this.veiculo.placa
    );
  }
}
