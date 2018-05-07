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

const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('keyval');
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
    "naam" : "Fab",
    "voornaam" : "Steven",
    "vakken": {
        "Fase1":["MI1","MI2","NM1","NM2-D&T"],
        "Fase2":["MI3","MI4"],
        "Fase3":["MI5"]
    }
};

// bewaar mijnObject onder de key "een"
idbKeyval.set("mijnObject",mijnObject);
// Je kan het nakijken via de dev-tools --> Application --> Storage --> IndexedDB

// het object terug opvragen :
idbKeyval.get("mijnObject").then(val => console.log(val));
// het vorige in de oudere js syntax :
idbKeyval.get("mijnObject").then(function(val){
    console.log(val);
});

/* ****************************
 * Een product bewaren
 * *************************** */

function bewaarProduct() {
    // let producten = [{
    //         product : $("#product").val(),
    //         prijs : parseFloat($("#prijs").val())
    // }]; // parseFloat in het geval we met de prijs willen rekenen
    

    let producten = []
    producten.push({
      product : $("#product").val(),
      prijs : parseFloat($("#prijs").val())
}) // parseFloat in het geval we met de prijs willen rekenen

    idbKeyval.set("producten", producten);
}

function haalProductenOp() {
    idbKeyval.get("producten").then(val =>{
        let tText = "";
        for(let i of val){
            tText += "<tr><td>" + i.product + "</td><td>" + i.prijs + "</td></tr>";
        }
        $("#producten tbody").html(tText);
    });
}




