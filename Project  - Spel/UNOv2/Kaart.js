class Kaart {
  constructor(waarde, kleur, idee) {
    this.waarde = waarde;
    this.kleur = kleur;
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
}
