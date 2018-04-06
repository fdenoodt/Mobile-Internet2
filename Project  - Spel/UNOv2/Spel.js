class Spel {
  constructor(hoofdSpeler, bot1, bot2, bot3) {

    let tijdelijkSpelers = new Array();
    tijdelijkSpelers[0] = hoofdSpeler;
    tijdelijkSpelers[1] = bot1;
    tijdelijkSpelers[2] = bot2;
    tijdelijkSpelers[3] = bot3;

    this.spelers = tijdelijkSpelers;
    this.aantalSpelers = tijdelijkSpelers.length;
    this.ongebruikteKaarten = new Array();
    this.gebruikteKaarten = new Array();
  }

  get getSpelers() {
    return this.spelers;
  }

  get getAantalSpelers() {
    return this.spelers;
  }

//kaarten van spelers updaten en weergeven
  updateKaarten() {
    this.updateKaartenHoofdSpeler();
    this.updateKaartenBots();
    this.updateAlgemeneKaarten();
  }

  updateKaartenHoofdSpeler() {

    let output = "";
    let breedteScherm = $(window).width();
    let hoogteScherm = $(window).height();
    let hoogteKaart = 120;
    let breedteKaart = 80;

    //100
    // 70% van scherm. --> 700 px. --> 7 --> .
    let aantalKaarten = this.spelers[0].getKaarten.length;
    let ruimteTussenKaarten = breedteScherm/aantalKaarten;
    if(ruimteTussenKaarten > 121)
      ruimteTussenKaarten = 90;

    let zIndex = this.spelers[0].getKaarten.length;
    for(let j = 0; j<this.spelers[0].getKaarten.length;j++){
      output +=
      `<div class ="kaart ${this.spelers[0].getKaarten[j].getKleur}"
        id = "${this.spelers[0].getKaarten[j].getIdee}"
        style="
          left: ${j*ruimteTussenKaarten+10}px;
          top: ${hoogteScherm-(hoogteKaart)-(hoogteKaart/4)}px;
          z-index: ${--zIndex};
        ">
        <div class = "binnenKaart">
          ${this.spelers[0].getKaarten[j].getWaarde}
        </div>
      </div>
      `;
    }

    document.getElementById(this.spelers[0].getTerrein).innerHTML = output;

  }

  updateKaartenBots() {

    //bot 1
    var output = "";
    for(let j = 0; j<this.spelers[1].getKaarten.length;j++){
      output +=
      `
      <img src="img/uno_back.png" alt="afbeelding van uno kaart"
      style="width: 60px; position: absolute;
      left: 20px;
      top: ${j*40}px;
       transform: rotate(90deg);
      ">
      `;
    }

    document.getElementById(this.spelers[1].getTerrein).innerHTML = output;

    //bot 2
    output = "";
    for(let j = 0; j<this.spelers[2].getKaarten.length;j++){
      output +=
      `
      <img src="img/uno_back.png" alt="afbeelding van uno kaart"
      style="width: 60px; position: absolute;
      left: ${j*40+120}px;
      top: ${15}px;
      ">
      `;
    }

    document.getElementById(this.spelers[2].getTerrein).innerHTML = output;


    //bot 3
    var output = "";
    for(let j = 0; j<this.spelers[1].getKaarten.length;j++){
      output +=
      `
      <img src="img/uno_back.png" alt="afbeelding van uno kaart"
      style="width: 60px; position: absolute;
      left: ${$(window).width()-60-20}px;
      top: ${j*40}px;
       transform: rotate(90deg);
      ">
      `;
    }

    document.getElementById(this.spelers[3].getTerrein).innerHTML = output;

  }

  updateAlgemeneKaarten(){

    var output =
    `
    <div class ="kaart ${this.gebruikteKaarten[0].getKleur}"
      id = "${this.gebruikteKaarten[0].getIdee}"
      style="
        left: ${$(window).width()/2-(60/2)-40}px;
        top: ${$(window).height()/2-(80/2)}px;
      ">
      <div class = "binnenKaart">
        ${this.gebruikteKaarten[0].getWaarde}
      </div>
    </div>`;

    output +=
    `
    <img src="img/uno_back.png" alt="te kiezen kaart"
      style="
        height: 120px; position: absolute;
        left: ${$(window).width()/2-(60/2)+40}px;
        top: ${$(window).height()/2-(80/2)}px;"
        >
    `;


    document.getElementById("terreinAlgemeen").innerHTML = output
  }


  // ***************************************
  // spel gereerd maken.
  // ***************************************

  start(){
    this.maakKaartenAan();
    this.geefSpelersKaarten();

    //tijdelijk
    this.ongebruikteKaarten.shift();
    this.gebruikteKaarten[0] = this.ongebruikteKaarten[0];

    this.updateKaarten();

  }

  maakKaartenAan() {
    //kaarten aanmaken.
    for (var i = 0; i < 80; i++) {
      this.ongebruikteKaarten.push(new Kaart("5", "Rood", i));
    }
  }

  geefSpelersKaarten() {
    for (let i = 0; i < 7; i++) {
      for(let tijdSpeler = 0; tijdSpeler<this.aantalSpelers; tijdSpeler++){
        this.spelers[tijdSpeler].geefKaart(this.ongebruikteKaarten[0]);
        this.ongebruikteKaarten.shift();
      }
    }

  }

}
