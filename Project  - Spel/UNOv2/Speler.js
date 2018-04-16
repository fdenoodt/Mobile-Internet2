class Speler {
  constructor(naam, terrein) {
    this.naam = naam;
    this.kaarten = new Array();
    this.terrein = terrein;
    this.magLeggen = true;
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

    //kijken of wel zijn beurt is.
    if(spel.wieAanDeBeurt != 0)
      return;


    let geselecteerdeKaart = this.kijkWelkeKaartgekozenIs(geselecteerd);

    //kaart leggen
    if(this.controlleerOfKaartGelegdMagWorden(geselecteerdeKaart)){
      this.zetKaartOpStapel(geselecteerdeKaart, spel.spelers[0]);
    }
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

// bot legt kaart
botLegtKaart(){
  for (var i = 0; i < this.kaarten.length; i++) {
    if(this.controlleerOfKaartGelegdMagWorden(this.kaarten[i])){
      this.zetKaartOpStapel(this.kaarten[i], this);
      return;
    }

    //naam kaart

  }
}


//----------------
  controlleerOfKaartGelegdMagWorden(kaart){
    if(kaart.getWaarde == spel.laatstGelegdeKaart.getWaarde || kaart.getKleur == spel.laatstGelegdeKaart.getKleur || kaart.getKleur == "zwart"){
      // console.log("kaart mag gelegd worden.");
      return true;
    }
    else {
      // console.log("kaart mag NIET gelegd worden.");
      return false;
    }
  }

  zetKaartOpStapel(kaart, speler){
    spel.gebruikteKaarten.unshift(kaart); //toevoegen aan stapel

    this.controlleerOpSpecialeKaarten(kaart);

    //kaart verwijderen
    let index = this.kaarten.indexOf(kaart);
    if(index > -1) {
      this.kaarten.splice(index, 1);

      spel.updateKaartenHoofdSpeler();
      spel.updateAlgemeneKaarten();
      spel.hoofdSpelerHeeftGelegd = true;
      spel.geefBeurtAanVolgende();
    }
  }

  controlleerOpSpecialeKaarten(kaart){
    if(kaart.getWaarde == "+2"){
      console.log("De volgende speler zou 2 kaarten extra moeten nemen.");
    }
    else if (kaart.getWaarde == "reverse"){
      console.log("reverse");
      spel.spelRichtingIsKlokWijs = !spel.spelRichtingIsKlokWijs;
    }
    else if(kaart.getWaarde == "skip"){
      console.log(spel.kijkWieVolgendeIs() + "- Skip");
      spel.spelers[spel.kijkWieVolgendeIs()].magLeggen = false;
    }
    else if(kaart.getWaarde == "*"){
      console.log("kies kaart");
    }
    else if(kaart.getWaarde == "*+4"){
      console.log("kies kaart + volgende +4");
    }
  }

// --------------------------------------






}
