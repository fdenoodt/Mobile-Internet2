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
}
