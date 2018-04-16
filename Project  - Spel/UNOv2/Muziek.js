class Muziek {
  constructor() {
    this.audio = new Audio('sounds/song1.mp3');
  }
  // --------------------------
  // speelMuziek



  play(){
    let that = this;
    this.audio.play();
    //liedje is 144 sec. ik weet niet hoe ik var kan oproepen. dus hard gecodeerd
    setTimeout(function(){ that.play(); }, 144000);
  }

  toggleMuziek(){
    this.audio.muted = !(this.audio.muted);
    if(this.audio.muted)
      $("#audio").html('volume_off');
    else
      $("#audio").html('volume_up');

    //// TODO:
    //NOG IETS TOEVOEGEN DAT JE KEUZE OPGESLAGEN WORDT
  }

}
