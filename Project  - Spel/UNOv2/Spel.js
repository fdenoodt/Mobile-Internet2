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
    this.uitgespeeldeSpelers = new Array();
    this.wieAanDeBeurt = 1;
    this.spelRichtingIsKlokWijs = true;
    this.uniekeId = 0;
    this.hoofdSpelerHeeftGelegd = false;
  }

 //*********************** Properties *************************
  get getSpelers() {
    return this.spelers;
  }

  get getAantalSpelers() {
    return this.spelers;
  }

  get laatstGelegdeKaart(){
    return this.gebruikteKaarten[0];
  }



//*** kaarten van spelers updaten en weergeven ***
//************************************************
  updateKaarten() {
    this.updateKaartenHoofdSpeler();
    this.updateKaartenBots();
    this.updateAlgemeneKaarten();
  }

  updateKaartenHoofdSpeler() {
    let output = "";
    let breedteScherm = $(window).width()*(70/100);
    let hoogteScherm = $(window).height();
    let hoogteKaart = 120;
    let breedteKaart = 80;

    let aantalKaarten = this.spelers[0].getKaarten.length;
    let ruimteTussenKaarten = breedteScherm/aantalKaarten;
    if(ruimteTussenKaarten > 121)
      ruimteTussenKaarten = 90;

    let zIndex = this.spelers[0].getKaarten.length;
    for(let j = 0; j<this.spelers[0].getKaarten.length;j++){
      var wildcard = "";
      if(this.spelers[0].getKaarten[j].getWaarde == "*" || this.spelers[0].getKaarten[j].getWaarde == "*+4")
        wildcard = "zw";
      output +=
      `<div class ="kaart ${this.spelers[0].getKaarten[j].getKleur}"
        id = "${this.spelers[0].getKaarten[j].getIdee}"
        style="
          left: ${j*ruimteTussenKaarten+10}px;
          top: ${hoogteScherm-(hoogteKaart)-(hoogteKaart/4)}px;
          z-index: ${--zIndex};"
          onclick="spel.spelers[0].legKaart(this)"
        >
        <div class = "binnenKaart ${wildcard}">
          ${this.spelers[0].getKaarten[j].getWaardeOpScherm}
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
        ${this.gebruikteKaarten[0].getWaardeOpScherm}
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
  // BEURTEN BEPALEN
  // ***************************************

  geefBeurtAanVolgende(){
    let that = this; //dit moet gebeuren omdat this in settimeout upfuckt met scope.
    //bron = https://stackoverflow.com/questions/591269/settimeout-and-this-in-javascript

    console.log(this.wieAanDeBeurt);
    if(this.wieAanDeBeurt != 0 || this.hoofdSpelerHeeftGelegd){
      this.hoofdSpelerHeeftGelegd = false;
    setTimeout(function () {
      that.wieAanDeBeurt = that.kijkWieVolgendeIs();
      that.geefBeurtAanVolgende();
      }, 1000);
    }
  }


    kijkWieVolgendeIs(){
      let wieIsAanDeBeurt = this.wieAanDeBeurt;

      if(wieIsAanDeBeurt >= this.aantalSpelers-1){
        wieIsAanDeBeurt = 0;
        }
      else {
        wieIsAanDeBeurt++;
      }

      for(let i = 0; i<=4; i++){
        if(!this.uitgespeeldeSpelers.includes(wieIsAanDeBeurt) && this.spelers[wieIsAanDeBeurt].magLeggen){
          return wieIsAanDeBeurt;
        }
        else {

          //mag leggen op true, want heeft beurt overgeslaan.
          this.spelers[wieIsAanDeBeurt].magLeggen = true;

          if(wieIsAanDeBeurt >= this.aantalSpelers-1){
            wieIsAanDeBeurt = 0;
            }
          else {
            wieIsAanDeBeurt++;
          }

        }
      }
  }




  // ***************************************
  // spel gereerd maken.
  // ***************************************

  start(){
    this.maakKaartenAan();
    this.schudtOngebruikteKaarten();
    this.geefSpelersKaarten();

    //tijdelijk
    this.gebruikteKaarten[0] = this.ongebruikteKaarten[0];
    this.ongebruikteKaarten.shift();

    this.updateKaarten();

    this.geefBeurtAanVolgende();

  }


  geefSpelersKaarten() {
    for (let i = 0; i < 7; i++) {
      for(let tijdSpeler = 0; tijdSpeler<this.aantalSpelers; tijdSpeler++){
        this.spelers[tijdSpeler].geefKaart(this.ongebruikteKaarten[0]);
        this.ongebruikteKaarten.shift();
      }
    }

  }


//************************
//** Kaarten aanmaken ****

maakKaartenAan() {
  //kaarten aanmaken.
  this.maak4NulKaarten();

  this.maak9KaartenVanKleur1tot9("rood");
  this.maak9KaartenVanKleur1tot9("rood");

  this.maak9KaartenVanKleur1tot9("geel");
  this.maak9KaartenVanKleur1tot9("geel");

  this.maak9KaartenVanKleur1tot9("blauw");
  this.maak9KaartenVanKleur1tot9("blauw");

  this.maak9KaartenVanKleur1tot9("groen");
  this.maak9KaartenVanKleur1tot9("groen");

  // this.maakSpecialeKaarten("+2", "+2");
  // this.maakSpecialeKaarten("+2", "+2");
  //
  this.maakSpecialeKaarten("reverse", "<i class='material-icons' style='font-size:42px; font-weight: bold; margin-top: 10%;'>sync</i>");
  this.maakSpecialeKaarten("reverse", "<i class='material-icons' style='font-size:42px; font-weight: bold; margin-top: 10%;'>sync</i>");

  // this.maakSpecialeKaarten("skip", "<i class='material-icons' style='font-size:42px; font-weight: bold; margin-top: 10%;'>do_not_disturb_alt</i>");
  // this.maakSpecialeKaarten("skip", "<i class='material-icons' style='font-size:42px; font-weight: bold; margin-top: 10%;'>do_not_disturb_alt</i>");

  // this.maakWildcarts("*+4", "+4");
  // this.maakWildcarts("*", "");
}
  maak9KaartenVanKleur1tot9(kleur) {
    for (var i = 1; i < 10; i++) {
      this.ongebruikteKaarten.push(new Kaart(i, kleur, i, ++this.uniekeId));
    }
  }

  maak4NulKaarten(){
    var kleuren = ["rood", "blauw", "groen", "geel"];
    for (var i = 0; i < 4; i++) {
      this.ongebruikteKaarten.push(new Kaart("0", kleuren[i], "0", ++this.uniekeId));
    }
  }

  maakSpecialeKaarten(waarde, waardeOpScherm){
    var kleuren = ["rood", "blauw", "groen", "geel"];
    for (var i = 0; i < kleuren.length; i++) {
      this.ongebruikteKaarten.push(new Kaart(waarde, kleuren[i], waardeOpScherm, ++this.uniekeId));
    }
  }
  maakWildcarts(waarde, waardeOpScherm){
    for (var i = 0; i < 4; i++) {
      this.ongebruikteKaarten.push(new Kaart(waarde, "zwart", waardeOpScherm, ++this.uniekeId));
    }
  }

  schudtOngebruikteKaarten(){
    var j, x, i;
     for (i = this.ongebruikteKaarten.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
         x = this.ongebruikteKaarten[i];
         this.ongebruikteKaarten[i] = this.ongebruikteKaarten[j];
         this.ongebruikteKaarten[j] = x;
     }
  }

}
