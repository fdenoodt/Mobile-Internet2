class Animatie {
    constructor() {
        this.movementId = 0;
    }

    doeIets() {
        alert("kek");
    }

    zetKaartvanFabNaarMidden(kaart) {
        let id = kaart.getIdee;

        $("#" + id).animate({
            top: ($(window).height() / 2 - (80 / 2)) * 0.8 + "px",
            left: $(window).width() / 2 - (60 / 2) - 40 + "px"
        }, function () {
            $(`#${kaart.getIdee}`).hide();
            spel.updateKaarten();
        });

        this.toonFancyChange(kaart);
    }

    //dit werkt niet en ik begrijp niet waarom, 
    //de exacte code in console uitvoeren lukt wel.

    zetKaartvanBotNaarMidden(kaart, vanWie) {
        let middenWidth = $(window).width() / 2 - (60 / 2) - 40;
        let middenHeight = ($(window).height() / 2 - (80 / 2)) * 0.8;
        let coord = [
            [20, middenHeight], //bot1 posities
            [middenWidth, 15], //bot2
            [$(window).width() - 60 - 20, middenHeight] //bot3
        ]

        let left;
        let top;
        if (vanWie.naam == "Bot1") {
            left = coord[0][0];
            top = coord[0][1];
        }
        else if (vanWie.naam == "Bot2") {
            left = coord[1][0];
            top = coord[1][1];
        }
        else if (vanWie.naam == "Bot3") {
            left = coord[2][0];
            top = coord[2][1];
        }
        else {
            alert("error");
        }
        // alert(left + " " + top);
        //op scherm zetten
        var wildcard = "";
        if (kaart.getWaarde == "*" || kaart.getWaarde == "*+4")
            wildcard = "zw";

        document.getElementById("terreinVoorAnimaties").innerHTML += `
        <div class ="kaart ${kaart.getKleur} ${kaart.getIdee}"
        id = "${kaart.getIdee}"
        style="
        display:none;
        left: ${left}px;
        top: ${top}px;
        ">
        <div class = "binnenKaart ${wildcard}">
          ${kaart.getWaardeOpScherm}
        </div>
      </div>`;

        //verplaatsen
        $(`#${kaart.getIdee}`).fadeIn(200);
        $(`#${kaart.getIdee}`).animate({
            top: ($(window).height() / 2 - (80 / 2)) * 0.8 + "px",
            left: $(window).width() / 2 - (60 / 2) - 40 + "px"
        }, function () {
            //omdat met id verwijderen niet altijd werkt, deze keer met class
            $(`.${kaart.getIdee}`).hide();
            spel.updateKaarten();
        });
    }


    geefSpelerKaart(vanWie) {
        let middenWidth = $(window).width() / 2 - (60 / 2) - 40;
        let middenHeight = ($(window).height() / 2 - (80 / 2)) * 0.8;
        let coord = [
            [20, middenHeight], //bot1 posities
            [middenWidth, 15], //bot2
            [$(window).width() - 60 - 20, middenHeight], //bot3
            [middenWidth, $(window).height() - (120) - (120 / 4)] //fab
        ]

        let left;
        let top;
        if (vanWie.naam == "Bot1") {
            left = coord[0][0];
            top = coord[0][1];
        }
        else if (vanWie.naam == "Bot2") {
            left = coord[1][0];
            top = coord[1][1];
        }
        else if (vanWie.naam == "Bot3") {
            left = coord[2][0];
            top = coord[2][1];
        }
        else {
            //fabian
            left = coord[3][0];
            top = coord[3][1];
        }

        document.getElementById("terreinVoorAnimaties").innerHTML +=
            `
             <img
             class="${++this.movementId}anim"
             src="img/uno_back.png" alt="te kiezen kaart"
             style="
                display: none;
                 height: 120px; position: absolute;
                 left:${$(window).width() / 2 - (60 / 2) + 40}px;
                 top: ${($(window).height() / 2 - (80 / 2)) * 0.8}px;"
                 >
             `;

        let that = this;
        //verplaatsen
        $("." + this.movementId + "anim").fadeIn(200);
        $("." + this.movementId + "anim").animate({
            top: top + "px",
            left: left + "px"
        }, function () {
            //omdat met id verwijderen niet altijd werkt, deze keer met class
            $("." + that.movementId + "anim").remove();
            spel.updateKaarten();
        });


    }



    //nog doen
    //als ik skip, of plus 2 krijg wil ik melding krijgen
    toonFancyChange(kaart) {
        if (kaart.getWaarde == "skip") {

        }
    }
}