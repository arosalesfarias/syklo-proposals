export class Proposal {
  icon: String;
  metodo_de_pago: String;
  monto: String;
  oferta: String;
  operacion: String;
  pais: String;
  precio: String;
  usuario: String;
  moneda: String;

  constructor(
    ico: String,
    mdp: String,
    mto: String,
    ofr: String,
    opr: String,
    pai: String,
    prc: String,
    usu: String
  ) {
    this.icon = ico;
    this.metodo_de_pago = mdp;
    this.monto = mto;
    this.oferta = ofr;
    this.operacion = opr;
    this.pais = pai;
    this.precio = prc;
    this.usuario = usu;
    this.moneda = this.monto.slice(-3);
  }

  esPais(): Boolean {
    return this.pais == 'AR';
  }

  esMoneda(): Boolean {
    return this.precio.includes('ARS');
  }

  precioNum() {
    return Number(this.precio.slice(0, this.precio.length - 4));
  }

  static JsontoProposal(json): Proposal {
    return new Proposal(
      json.icon,
      json.metodo_de_pago,
      json.monto,
      json.oferta,
      json.operacion,
      json.pais,
      json.precio,
      json.usuario
    );
  }

  esFiltro(pFilter: ProposalFilter): Boolean {
    let flag: Boolean = true;
    if (pFilter.pais != '' && pFilter.pais != this.pais) flag = false;
    if (
      pFilter.metodoDePago != '' &&
      pFilter.metodoDePago != this.metodo_de_pago
    )
      flag = false;
    return flag;
  }
}

export class Proposals {
  compras: Proposal[];
  ventas: Proposal[];

  constructor(compras: Proposal[], ventas: Proposal[]) {
    //Las compras son las ventas y las ventas son las compras
    this.compras = ventas.map((it) => Proposal.JsontoProposal(it));
    this.ventas = compras.map((it) => Proposal.JsontoProposal(it));
  }

  all(): Proposal[] {
    return this.compras.concat(this.ventas);
  }

  paisesList(): String[] {
    return this.all()
      .map((it) => {
        if (it.pais != null) return it.pais;
      })
      .sort((a, b) => a.localeCompare(b.toString()));
  }

  MdPList(): String[] {
    return this.all()
      .map((it) => {
        if (it.metodo_de_pago != null) return it.metodo_de_pago;
      })
      .sort((a, b) => a.localeCompare(b.toString()));
  }
}

export class ProposalFilter {
  pais: String;
  metodoDePago: String;
  constructor() {
    this.pais = '';
    this.metodoDePago = '';
  }

  equals(pFilter: ProposalFilter) {
    return (
      this.metodoDePago == pFilter.metodoDePago && this.pais == pFilter.pais
    );
  }
}
