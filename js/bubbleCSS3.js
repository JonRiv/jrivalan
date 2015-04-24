$(document).ready(function(){
  ///////////////////////////
  //Genere les bulles
  ///////////////////////////

  var BubblesGenerateCSS3 = function ()
    {

  /*Possibles variables a ajouter
  taille min_med_max
  vitesse min_med_max
  transparence*/
  //nombres de bulles
  var bubNum = 18;
  //couleur spéciale
  var bubSpeCo = "#ff004e";
  //var bubSpeCo = "#ffc000"; || jaune sympa

///////////////////////////
  //Informations sur la scene
  ///////////////////////////
  //function usrScreen(){
  //recupere les informations et set les limites hors champ
  var winHeight = $(window).height();
  var winWidth = $(window).width();
  var bott0m = winHeight+200+'px';
  var r1ght = winWidth+200+'px';
  //};
  //usrScreen();

  //pas indispensable
  //$(window).resize(function(){
  //usrScreen();
  //});
    //fabrication de la scène
    var c0re = $('body');
    c0re.append('<div id="canevas"></div>')
    var base = $('#canevas');

      for (i=1; i<=bubNum; i++) {

    //wrap des positions
    var hoRand = Math.floor(Math.random()*winWidth);
    var veRand = Math.floor(Math.random()*winHeight);
    var bubRight = 'left:'+r1ght+';top:'+veRand+'px;';
    var bubBottom = 'left:'+hoRand+'px;top:'+bott0m+';';
     
    //style des bulles
      //taille et arrondi
    var bubSize = Math.floor(Math.random()*200)+11;
    var bubRound = bubSize/2;
      //couleur parmi une liste
    var tabColor = new Array("#45d0fd","#0096ff","#1377d4","#5192d5");
    var triRand = Math.floor(Math.random()*3);
    var bubColor = tabColor[triRand];

    //applique une couleur spéciale à la 11eme bulle
    if (i!=11){}  
    else if (i==11) {
    //reset la couleur spéciale si non définie
      if (bubSpeCo == undefined)
          {
          var bubSpeCo = "#ff004e";
          }
        var bubColor = bubSpeCo;
    }

    //wrap les deux possibilitées || a réfléchir si interessant pre-wrapper les deux
    bubLeftPos = '"'+bubRight+'background-color:'+bubColor+';width:'+bubSize+'px;height:'+bubSize+'px;border-radius:'+bubRound+'px;"';
    bubRightPos = '"'+bubBottom+'background-color:'+bubColor+';width:'+bubSize+'px;height:'+bubSize+'px;border-radius:'+bubRound+'px;"';

    //définit la position bas/droite 
    var diRand = Math.floor(Math.random()*2)+1;
    switch(diRand)
    {
      case 1:var birth = bubLeftPos;break;
      case 2:var birth = bubRightPos;break;
    }

    //fabrique la bulle et l'attache au DOM
    var bubDiv = '<div class="bubble" name="bubble_'+i+'" style='+birth+'></div>';
    base.append(bubDiv);

    //lance l'animation une fois la derniere bulle créée
    if (i==bubNum)
    {
      setTimeout(function(){
        BubblesFly();
      },200)
    }

    };

    //////////////////////////
    //Animation
    ///////////////////////////

    var BubblesFly = function(){
      var circles = $('.bubble');
        circles.each(function(){
          var bubble = $(this);

          var hiRand = Math.floor(Math.random()*2000)+100;
          var biRand = Math.floor(Math.random()*2000)+100;
            var l3ft = '-'+hiRand+'px';
            var t0p = '-'+biRand+'px';

            bubble.css("left",l3ft);
            bubble.css("top",t0p);

          });
    };
  };
  BubblesGenerateCSS3();

});