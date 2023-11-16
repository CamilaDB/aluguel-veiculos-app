import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from './veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/veiculos';

  public listarVeiculos(reservado: boolean | null): Observable<Veiculo[]> {
    if (reservado === null) {
      return this.http.get<any>(this.url);
    } else {
      return this.http.get<any>(`${this.url}?reservado=${reservado}`);
    }
  }

  public criarVeiculo(veiculo: Veiculo): Observable<any> {
    return this.http.post<Veiculo>(this.url, veiculo);
  }

  public apagarVeiculo(id: number): Observable<any> {
    return this.http.delete<Veiculo>(`${this.url}/${id}`);
  }

  public alterarVeiculo(veiculo: Veiculo): Observable<any> {
    return this.http.put<Veiculo>(this.url, veiculo);
  }
}
