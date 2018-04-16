class Kaart {
  constructor(waarde, kleur, waardeOpScherm, idee) {
    this.waarde = waarde;
    this.kleur = kleur;
    this.waardeOpScherm = waardeOpScherm;
    this.idee = idee;
  }

  get getWaarde(){
    return this.waarde;
  }

  get getKleur(){
    return this.kleur;
  }

  get getIdee(){
    return this.idee;
  }

  get getWaardeOpScherm(){
    return this.waardeOpScherm;
  }
}
