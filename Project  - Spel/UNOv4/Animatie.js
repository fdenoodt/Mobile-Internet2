class Animatie {
    constructor() {
    }

    doeIets() {
        alert("kek");
    }

    zetKaartvanFabNaarMidden(kaart) {
        let id = kaart.getIdee;

        $("#" + id).animate({
            top: ($(window).height() / 2 - (80 / 2)) * 0.8 + "px",
            left: $(window).width() / 2 - (60 / 2) - 40 + "px"
        });

        this.toonFancyChange(kaart);
    }

    //dit werkt niet en ik begrijp niet waarom, 
    //de exacte code in console uitvoeren lukt wel.
    
    zetKaartvanBotNaarMidden(kaart) {

        var wildcard = "";
        if (kaart.getWaarde == "*" || kaart.getWaarde == "*+4")
          wildcard = "zw";

        document.getElementById("terreinVoorAnimaties").innerHTML = `
        <div class ="kaart ${kaart.getKleur}"
        id = "${kaart.getIdee}"
        style="
          left: ${$(window).width() / 2 - (60 / 2) - 400}px;
          top: ${($(window).height() / 2 - (80 / 2)) * 0.8}px;
        ">
        <div class = "binnenKaart ${wildcard}">
          ${kaart.getWaardeOpScherm}
        </div>
      </div>`;
        


        // let id = kaart.getIdee;
        // $(`.${id}`).animate({
        //     top: ($(window).height() / 2 - (80 / 2)) * 0.8 + "px",
        //     left: $(window).width() / 2 - (60 / 2) - 40 + "px"
        // });
        
    }


    //nog doen
    //als ik skip, of plus 2 krijg wil ik melding krijgen
    toonFancyChange(kaart){
        if(kaart.getWaarde == "skip"){
            
        }
    }
}