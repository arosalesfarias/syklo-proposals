export class Proposal {
  icon: String;
  metodo_de_pago: String;
  monto: String;
  oferta: String;
  operacion: String;
  pais: String;
  precio: String;
  usuario: String;

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
}

export class Proposals {
  compras: Proposal[];
  ventas: Proposal[];

  constructor(compras: Proposal[], ventas: Proposal[]) {
    //Las compras son las ventas y las ventas son las compras
    this.compras = ventas;
    this.ventas = compras;
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
}
