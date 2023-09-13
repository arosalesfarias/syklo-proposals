import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { bufferToggle } from 'rxjs/operators';
import { Proposal, ProposalFilter, Proposals } from './domain/proposal';
import { ProposalService } from './services/proposal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public serv: ProposalService) {}
  proposalFilter: ProposalFilter;

  async ngOnInit() {
    this.proposalFilter = new ProposalFilter();
    await this.serv.obtener();
  }

  ventas(): Proposal[] {
    return this.serv.ventas(this.proposalFilter);
  }

  compras(): Proposal[] {
    return this.serv.compras(this.proposalFilter);
  }

  paises() {
    return this.serv.paisesFiltro();
  }

  metodosDePago() {
    return this.serv.MDPsFiltro();
  }

  monedas() {
    return this.serv.monedasFiltro();
  }

  onChangePais() {
    this.proposalFilter.metodoDePago = '';
    this.proposalFilter.moneda = '';
  }
}
