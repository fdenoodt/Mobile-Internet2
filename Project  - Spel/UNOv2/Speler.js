class Speler {
  constructor(naam, terrein) {
    this.naam = naam;
    this.kaarten = new Array();
    this.terrein = terrein;
  }

  get getKaarten(){
    return this.kaarten;
  }

  get getTerrein(){
    return this.terrein;
  }

  geefKaart(kaart){
    this.kaarten.push(kaart);
  }

// --------------------------------------
// Fabian legt een kaart
  legKaart(geselecteerd){
    let geselecteerdeKaart = this.kijkWelkeKaartgekozenIs(geselecteerd);
    console.log(geselecteerdeKaart + " zal gelegd worden.")
  }

  kijkWelkeKaartgekozenIs(geselecteerd){
    let geselecteerdeId = geselecteerd.id;
    let geselecteerdeKaart = null;

    var i = 0;
    for (i; i < this.kaarten.length; i++) {
        if (this.kaarten[i].idee == geselecteerdeId) {
            geselecteerdeKaart = this.kaarten[i];
            return geselecteerdeKaart;
        }
    }
    return geselecteerdeKaart;
  }
// --------------------------------------


}
