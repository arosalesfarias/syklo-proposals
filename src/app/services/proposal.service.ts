import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proposal, Proposals } from '../domain/proposal';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  proposals: Proposals = { compras: [], ventas: [], all: () => [] };
  paises: Set<String> = new Set();
  metodosDePago: Set<String> = new Set();

  constructor(private http: HttpClient) {}

  async obtener() {
    await this.http
      .get<Proposals>('https://public-api.syklo.io/proposals')
      .toPromise()
      .then((data) => {
        this.proposals = new Proposals(data.compras, data.ventas);
        //console.log(this.proposals);
      });
    let lista: Proposal[] = this.proposals.compras.concat(
      this.proposals.ventas
    );
    lista.map((it) => this.paises.add(it.pais));
    lista.map((it) => this.metodosDePago.add(it.metodo_de_pago));
  }

  compras(paisFiltro: String, MDPFiltro: String): Proposal[] {
    let filtrado = this.proposals.compras.filter((it) =>
      paisFiltro == '' && MDPFiltro == ''
        ? true
        : it.pais == paisFiltro || it.metodo_de_pago == MDPFiltro
    );
    let ordenado = filtrado.sort(function (a, b) {
      return (
        Number(a.precio.slice(0, a.precio.length - 4)) -
        Number(b.precio.slice(0, b.precio.length - 4))
      );
    });
    //console.log('Compras');
    //console.log(ordenado);
    return ordenado;
  }
  ventas(paisFiltro: String, MDPFiltro: String): Proposal[] {
    let filtrado = this.proposals.ventas.filter((it) =>
      paisFiltro == '' && MDPFiltro == ''
        ? true
        : it.pais == paisFiltro || it.metodo_de_pago == MDPFiltro
    );
    let ordenado = filtrado.sort(function (a, b) {
      return (
        Number(b.precio.slice(0, b.precio.length - 4)) -
        Number(a.precio.slice(0, a.precio.length - 4))
      );
    });
    //console.log('Ventas');
    //console.log(ordenado);
    return ordenado;
  }

  paisesFiltro(): Set<String> {
    this.proposals.all().map((it) => {
      this.paises.add(it.pais);
    });
    return this.paises;
  }

  MDPsFiltro(): Set<String> {
    this.proposals.all().map((it) => {
      this.metodosDePago.add(it.metodo_de_pago);
    });
    return this.metodosDePago;
  }
}
