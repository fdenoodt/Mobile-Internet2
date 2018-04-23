"use strict";
/* jshint esnext: true */
/* global idb, $ */

// In dit script demonstreren we het gebruik van
// * promises
// * ES6 syntax
// * de bibliotheek IDB waarmee je met de Indexed DB lokaal data kan opslaan.

// Wil je met ES6 werken, en geeft je linter opmerkingen over de syntax, voeg dan
// de lijn die bovenaan onder "use strict" staat.

// Voorbeeld 1:  werken met een keyval opslag

// Het aanmaken van een referentie naar de databank.
// De naam van de databank is hier 'keyval-store', en versie is 1

// upgradeDB is de naam die aan het object wordt gegeven dat het resultaat is
// van de promise van het openen van de databank.

const dbPromise = idb.open('keyval-store', 2, upgradeDB => {
    switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('keyval');
            // GEEN break : we willen juist dat alles wordt uitgevoerd in deze volgorde : plaats alle structurele aanpassingen (upgrades) die je aan je db uitvoert hier onder elkaar. Daardoor ondersteun je gebruikers die met oudere versies van je DB structuur werken en kunnen ze naadloos up-to-date worden gebracht met de meest recente structuren.
    case 1:
      upgradeDB.createObjectStore('objs', {keyPath: 'id'});
            // we voegen een id toe aan de objecten. 
            // we gaan onze producten nu ook toevoegen aan een andere sture 'objs'
  }
});
// Een andere manier om het vorige te schrijven is :
//const dbPromise = idb.open('keyval-store', 1, function(upgradeDB) {
//   upgradeDB.createObjectStore('keyval');
//});


const idbKeyval = {
  get(key) {
    return dbPromise.then(db => {
      return db.transaction('keyval')
        .objectStore('keyval').get(key);
    });
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').put(val, key);
      return tx.complete;
    });
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').delete(key);
      return tx.complete;
    });
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').clear();
      return tx.complete;
    });
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval');
      const keys = [];
      const store = tx.objectStore('keyval');

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }
};

/* ****************************
 * Een eenvoudig object bewaren, keyval
 * *************************** */

let mijnObject = {
    "naam" : "Ophalvens",
    "voornaam" : "Steven",
    "vakken": {
        "Fase1":["MI1","MI2","NM1","NM2-D&T"],
        "Fase2":["MI3","MI4"],
        "Fase3":["MI5"]
    }
};

// bewaar mijnObject onder de key "een"
idbKeyval.set("een",mijnObject);
// Je kan het nakijken via de dev-tools --> Application --> Storage --> IndexedDB

// het object terug opvragen :
idbKeyval.get("een").then(val => console.log(val));
// het vorige in de oudere js syntax :
idbKeyval.get("een").then(function(val){
    console.log(val);
});

/* ****************************
 * Een product bewaren :  toevoegen aan bestaande producten
 * *************************** */
var nextID;

function getNextID(){
    dbPromise.then(db =>{
        const tx = db.transaction('objs', 'readwrite');
        const store = tx.objectStore('objs');
        // await staat ons toe om een asynchrone opdracht uit te voeren, maar voor de lijnen daaronder te wachten tot het resultaat van die asynchrone opdracht binnen is.
        store.count().then(id => {
            nextID = id + 1;
        }, err => {
            nextID = 1;
        });
        
    });
}
getNextID();

function bewaarProduct() {
    // async omdat we met await werken in deze functie
    dbPromise.then(db =>{
        const tx = db.transaction('objs', 'readwrite');
        tx.objectStore('objs').put({
            id : nextID, // Omdat we niet met 0 zijn beginnen nummeren en we de eerste niet willen overschrijven
            product : document.getElementById("product").value,
            prijs : parseFloat(document.getElementById("prijs").value)
        });
        return tx.complete;
    });
    getNextID(); // we laten de nieuwe id berekenen
    haalProductenOp(); // we halen de producten op en tonen ze
}

function haalProductenOp() {
    
    dbPromise.then(db => {
      return db.transaction('objs')
        .objectStore('objs').getAll();
    }).then(allObjs => {
        let tText = "";
        for(let i of allObjs){
            tText += "<tr><td>" + i.product + "</td><td>" + i.prijs + "</td></tr>";
        }
        $("#producten tbody").html(tText);
    });
}

function haalProductOp(id) {
    // Haal het product met id id op 
    dbPromise.then(db => {
      return db.transaction('objs')
        .objectStore('objs').get(id);
    }).then(obj => {
        if(obj){
            let tText = "<tr><td>" + obj.product + "</td><td>" + obj.prijs + "</td></tr>";
        
            $("#producten tbody").html(tText);
        } else {
            $("#alert").html("Niet gevonden");
            return false;
        }
        
    }, err => {
        $("#alert").html(err);
    });
}




