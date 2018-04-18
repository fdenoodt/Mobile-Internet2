class Speler {
  constructor(naam, terrein, isHoofdspeler) {
    this.naam = naam;
    this.kaarten = new Array();
    this.terrein = terrein;
    this.magLeggen = true;
    this.isHoofdspeler = isHoofdspeler;
    this.heeftBeurtGelegd = false;
  }

  get getKaarten() {
    return this.kaarten;
  }

  get getTerrein() {
    return this.terrein;
  }

  geefKaart() {
    let kaart = spel.ongebruikteKaarten[0]
    this.kaarten.push(kaart);
    spel.ongebruikteKaarten.shift();
  }

  // --------------------------------------
  // Fabian legt een kaart
  legKaart(geselecteerd) {
    //kijken of wel zijn beurt is.
    if (spel.wieAanDeBeurt != 0 || this.heeftBeurtGelegd)
      return;


    let geselecteerdeKaart = this.kijkWelkeKaartgekozenIs(geselecteerd);

    //kaart leggen
    if (this.controlleerOfKaartGelegdMagWorden(geselecteerdeKaart)) {
      this.heeftBeurtGelegd = true;
      this.zetKaartOpStapel(geselecteerdeKaart, spel.spelers[0]);
    }

  }

  kijkWelkeKaartgekozenIs(geselecteerd) {
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
  botLegtKaart() {
    for (var i = 0; i < this.kaarten.length; i++) {
      if (this.controlleerOfKaartGelegdMagWorden(this.kaarten[i])) {
        this.zetKaartOpStapel(this.kaarten[i], this);
        return;
      }
    }
    //kaart nemen als niet kan leggen.
    this.geefKaart(); console.log("speler heeft kaart genomen");
  }


  //----------------
  controlleerOfKaartGelegdMagWorden(kaart) {
    if (kaart.getWaarde == spel.laatstGelegdeKaart.getWaarde || kaart.getKleur == spel.laatstGelegdeKaart.getKleur || kaart.getKleur == "zwart") {
      // console.log("kaart mag gelegd worden.");
      return true;
    }
    else {
      // console.log("kaart mag NIET gelegd worden.");
      return false;
    }
  }

  zetKaartOpStapel(kaart, speler) {
    spel.gebruikteKaarten.unshift(kaart); //toevoegen aan stapel

    this.controlleerOpSpecialeKaarten(kaart);
    console.log(kaart);
    //kaart verwijderen
    let index = this.kaarten.indexOf(kaart);
    if (index > -1) {
      this.kaarten.splice(index, 1);


      if (this.isHoofdspeler) {
        spel.hoofdSpelerHeeftGelegd = true;
        spel.geefBeurtAanVolgende();
      }
    }
  }

  controlleerOpSpecialeKaarten(kaart) {
    //+2
    if (kaart.getWaarde == "+2") {
      console.log("De volgende speler zou 2 kaarten extra moeten nemen.");
      spel.geefVolgendeWieIsMaarGeefPersoon().geefKaart();
      spel.geefVolgendeWieIsMaarGeefPersoon().geefKaart();
      spel.updateKaarten();
      spel.spelers[spel.kijkWieVolgendeIs()].magLeggen = false;
    }
    // klokwijs
    else if (kaart.getWaarde == "reverse") {
      console.log("reverse");
      spel.spelRichtingIsKlokWijs = !spel.spelRichtingIsKlokWijs;
    }
    //block
    else if (kaart.getWaarde == "skip") {
      console.log(spel.kijkWieVolgendeIs() + "- Skip");
      spel.spelers[spel.kijkWieVolgendeIs()].magLeggen = false;
    }
    //wildcard
    else if (kaart.getWaarde == "*") {
      console.log("kies kaart");

      //speler of bot
      if (this.isHoofdspeler) {
        this.kiesKleurPopUp(kaart);
      }
      else {
        this.kiesKleur(kaart);
      }

    }
    //wildcard +4
    else if (kaart.getWaarde == "*+4") {
      console.log("kies kaart + volgende +4");
      // $("#kleurKiezer").fadeIn("slow");


      if (this.isHoofdspeler) {
        this.kiesKleurPopUp(kaart);
      }
      else {
        this.kiesKleur(kaart);
      }
      
    }

  }



  // --------------------------------------


  //kaart opvragen als niet kan leggen.
  neemRandomKaart() {
    if (spel.wieAanDeBeurt != 0 || this.heeftBeurtGelegd)
      return;

    this.geefKaart()

    this.heeftBeurtGelegd = true;
    spel.hoofdSpelerHeeftGelegd = true;
    spel.updateKaarten();
    spel.geefBeurtAanVolgende();
  }


  kiesKleurPopUp(kaart){
    kaart.setKleur("rood");
    $("#kleurKiezer").fadeIn("slow");
  }

  kiesKleur(kaart){
    kaart.setKleur("rood");
  }


}
