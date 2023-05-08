import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { bufferToggle } from 'rxjs/operators';
import { Proposal, Proposals } from './domain/proposal';
import { ProposalService } from './services/proposal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public serv: ProposalService) {}
  paisFiltro: String = '';

  async ngOnInit() {
    await this.serv.obtener();
  }

  ventas(): Proposal[] {
    return this.serv.ventas();
  }

  compras() {
    return this.serv.compras();
  }

  paises() {
    return this.serv.paisesFiltro();
  }

  onChange() {
    console.log(this.paisFiltro);
  }
}
