import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proposal, ProposalFilter, Proposals } from '../domain/proposal';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  proposals: Proposals = new Proposals([], []);
  paises: Set<String> = new Set();
  metodosDePago: Set<String> = new Set();
  monedas: Set<String> = new Set();

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

  compras(pFilter: ProposalFilter): Proposal[] {
    let filtrado = this.proposals.compras.filter((it) => it.esFiltro(pFilter));
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
  ventas(pFilter: ProposalFilter): Proposal[] {
    let filtrado = this.proposals.ventas.filter((it) => it.esFiltro(pFilter));
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
    this.proposals.paisesList().forEach((it) => this.paises.add(it));
    this.paises.delete(null);
    this.paises.delete(undefined);
    return this.paises;
  }

  MDPsFiltro(): Set<String> {
    this.proposals.MdPList().map((it) => {
      this.metodosDePago.add(it);
    });
    return this.metodosDePago;
  }

  monedasFiltro(): Set<String> {
    this.proposals.monedasList().map((it) => {
      this.monedas.add(it);
    });
    return this.monedas;
  }
}
