
class Mens {
  constructor(naam) {
    this.naam =  naam;
  }

  get Naam(){
    return this.naam;
  }
}



var mijnMens = new Mens("bob");

alert(mijnMens.Naam);
