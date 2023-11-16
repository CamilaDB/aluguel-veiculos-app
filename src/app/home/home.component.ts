import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoService } from './veiculoService';
import { Veiculo } from './veiculo';
import { CarregandoComponent } from '../carregando/carregando.component';
import { ModalVeiculoComponent } from '../modal-veiculo/modal-veiculo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, CarregandoComponent, ModalVeiculoComponent],
})
export class HomeComponent implements OnInit {
  constructor(private veiculoService: VeiculoService) {}

  veiculos: Veiculo[] = [];
  veiculo: Veiculo = new Veiculo();
  carregando: boolean = false;
  modalVeiculo: boolean = false;

  ngOnInit(): void {
    this.listarVeiculos();
  }

  listarVeiculos(): void {
    this.carregando = true;
    this.veiculoService.listarVeiculos().subscribe({
      next: (resposta) => {
        this.veiculos = resposta;
        this.carregando = false;
      },
      error: (erro) => {
        this.carregando = false;
        alert('Erro ao consultar veículos.');
        console.error(erro);
      },
    });
  }

  salvarVeiculo(veiculo: Veiculo) {
    this.carregando = true;
    this.veiculoService.criarVeiculo(veiculo).subscribe({
      next: () => {
        this.carregando = false;
        this.listarVeiculos();
        this.fecharModalVeiculo();
      },
      error: (erro) => {
        this.carregando = false;
        this.fecharModalVeiculo();
        alert('Erro ao adicionar veículo.');
        console.error(erro);
      },
    });
  }

  alterarVeiculo(veiculo: Veiculo) {
    this.carregando = true;
    this.veiculoService.alterarVeiculo(veiculo).subscribe({
      next: () => {
        this.carregando = false;
        this.listarVeiculos();
        this.fecharModalVeiculo();
      },
      error: (erro) => {
        this.carregando = false;
        this.fecharModalVeiculo();
        alert('Erro ao alterar veículo.');
        console.error(erro);
      },
    });
  }

  excluirVeiculo(id: number | null): void {
    if (id) {
      this.carregando = true;
      this.veiculoService.apagarVeiculo(id).subscribe({
        next: () => {
          this.carregando = false;
          this.listarVeiculos();
        },
        error: (erro) => {
          this.carregando = false;
          alert('Erro ao excluir veículo.');
          console.error(erro);
        },
      });
    }
  }

  mostrarModalVeiculo() {
    this.modalVeiculo = true;
  }

  mostrarModalAlterarVeiculo(veiculo: Veiculo) {
    this.veiculo = veiculo;
    this.mostrarModalVeiculo();
  }

  fecharModalVeiculo() {
    this.modalVeiculo = false;
  }
}
