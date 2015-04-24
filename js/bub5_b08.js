/*................................................................................
................................???,.....,?????=,,..............................
...............................?????.....??????????????????+~,,,................
..............................,?????....=???,...................,,,,,...........
..............................??????...,???:....................................
.............................???????...????.....................................
............................,???:???,.=???,.....................................
...................,?????~..????.???,,???+......................................
................+?????????.????,.???,????.......................................
..............=???????~,,.,???=..???~???,.......................................
.............?????,.......????...???????........................................
............????:........=???,...??????.........................................
...........=???:........,????....~????,.........................................
...........????.........????.....,????.EGDEN..2012....www.negden.com............
...........????........????,......,,,...........................................
...........????+.....,????,.....................................................
...........,??????:+?????:................|| ASK BEFORE COPY ||.................
............,???????????........................................................
..............,=?????,..........................................................
................................................Author:Jonathan Rivalan.......*/


jQuery(document).ready(function(){
   $(document).mousemove(function(e){
      window.mXPos = e.pageX;
      window.mYPos = e.pageY;
   }); 
})

$(document).ready(function(){
  function BubbleLauncherFR(){

      //Informations sur la scene
    var wW = $(window).width();
    var wH = $(window).height();

      //Création du canvas principal
    var c0re = $('html');
    c0re.prepend('<canvas id="canvas1" width="'+wW+'" height="'+wH+'"></canvas>');
    var can = document.getElementById('canvas1');
    var ctx = can.getContext('2d');
    
      //Création du canvas secondaire pour pre-rendering
    var can2 = document.createElement('canvas');
    can2.width = wW;
    can2.height = wH;
    var ctx2 = can2.getContext('2d');

        // Variables de l'effet
    var bNum = 50,
        bMinSz = 4,
        bMaxSz = 100, 
        bMinSp = 0,
        bMaxSp = 3,
        bColor = ["(69,208,253)","(0,150,255)","(19,119,212)","(81,146,213)"],
        SpecialColor = "(255,0,78)", //#ce0f0f
        b2ndColor = [SpecialColor,//orange
                    "(255,123,87)",//orouge
                    "(255,198,0)",//or
                    "(255,107,107)",//saumon
                    SpecialColor],//=couleur spéciale
        bDelay = 700, //tps avant lancement
        bRender = "render";//methode de rendu, prend les valeurs "render" ou "prerender"
    //Mises en cache !!ne pas modifier
    var counter = 0, //quand atteind la valeur de bNum, arrête l'animation
        recounter = 0, //compte le nombre de relaunch
        stopRelaunch = 3, //nb retry avant popin
        mX = 0,
        mY = 0,
        bB = 0* Math.PI,//début et fin du cercle
        bE = 2* Math.PI;

    //Auto-initialise l'effet
    function launch(){
      counter = 0; //reset
    //Création des objets
      bulleZ = [];
      for (i=1;i<=bNum;i++) {
        bulleZ[i] = bullePopulate(i);
      };
    //Rendu des objets
      setTimeout(function(){
        if (bRender == "render"){
          render();$("#rend").text("// rendu direct");}
        else if (bRender == "prerender"){prerender();$("#rend").text("// pré-rendu");}
        else {render();}
      },bDelay);
    };
    launch();

    //FPS COUNTER PART1
    var fS = 20,
        fT = 0, 
        lL = new Date, 
        tL,
        fO = document.getElementById('fps');

    function render(){
      bAnim = requestAnimationFrame(render);
      step(ctx);

    //FPS COUNTER PART2
      var tFT = (tL=new Date) - lL;fT+= (tFT - fT) / fS;lL = tL;
    }

    function prerender(){
      step(ctx2,ctx);
      ctx.clearRect(0, 0, wW, wH);
      ctx.drawImage(can2, 0, 0);
      bAnim = requestAnimationFrame(prerender);

    //FPS COUNTER PART2
      var tFT = (tL=new Date) - lL;fT+= (tFT - fT) / fS;lL = tL;
    }

    //FPS COUNTER PART3
    function dispFPS(){
      var dis = (1000/fT).toFixed(1) + "fps";
      fO.innerHTML = dis;
    }
    setInterval(dispFPS,1000);

    function step(ctxt){
        //nettoyage du canvas
      ctxt.clearRect(0, 0, wW, wH);
        //possible alternative, +lent
      /*can1.width = can1.width;*/
    for (i=1;i<=bNum;i++) {
      var b = bulleZ[i],
          mX = window.mXPos,
          mY = window.mYPos,
                reStepCore = b.size/3,
                reStepIn = b.size/2,
                reSpdIn = b.size*b.speed*10,
                reSpdOut = b.size*b.speed*8,
                reRand = Rand0To(4)*b.speed,
                bulOcolor = b.color,
                bulPosX = (b.x - b.size),//!@! optimiser la partie collision 
                bulPosY = (b.y - b.size),
                bulNegX = (b.x + b.size),
                bulNegY = (b.y + b.size),
                bulPosX2 = (b.x - reStepIn),
                bulPosY2 = (b.y - reStepIn),
                bulNegX2 = (b.x + reStepIn),
                bulNegY2 = (b.y + reStepIn),
                bulCorX = (b.x - reStepCore),
                bulCorY = (b.y - reStepCore),
                bulCorPX = (b.x + reStepCore),
                bulCorPY = (b.y + reStepCore);

             if (mX >= bulCorX && mX <= bulCorPX && mY >= bulCorY && mY <= bulCorPY)
              {   
                  b.x = mX;
                  b.y = mY;
              }
    
              if (mX >= bulPosX2 && mX <= bulNegX2 && mY >= bulPosY2 && mY <= bulNegY2)
              {
                if (b.color == b.color2nd) {}
                else {
                  b.cFnum[1] += b.Step[1]*7;
                  b.cFnum[2] += b.Step[2]*7;
                  b.cFnum[3] += b.Step[3]*7;
                  b.color = "("+b.cFnum[1]+","+b.cFnum[2]+","+b.cFnum[3]+")";
                }
                  b.x = mX-b.size*0.2;
                  b.y = mY-b.size*0.2;
                  b.size -= reSpdOut;
              }
              else if (mX >= bulPosX && mX <= bulNegX && mY >= bulPosY && mY <= bulNegY)  
              {
                b.size -= reSpdIn;
                b.x -= reRand+reSpdOut;
                b.y += reRand;
              }
              else if (b.size !== b.Osize) 
              {
                b.cFnum[1] -= b.Step[1]*2;
                b.cFnum[2] -= b.Step[2]*2;
                b.cFnum[3] -= b.Step[3]*2;
                b.color = "("+b.cFnum[1]+","+b.cFnum[2]+","+b.cFnum[3]+")";
                b.size += (b.Osize-b.size)*0.05;
              }
              
          bulX = (b.dx - b.x) * b.speed;
          bulY = (b.dy - b.y) * b.speed;

        b.x += bulX; //Regular non rounded >> !!uses slower subpixel
        b.y += bulY; //Regular non rounded >> !!uses slower subpixel

        if (b.x >= -(b.area))
        {
          b.x += bulX;
          b.y += bulY;
          drawBul(b,ctxt);
        }
        else if (b.counter == 0){
          b.counter += 1;
          counter += 1;
          if (counter == bNum){           //stop l'anim une fois les bulles dehors
            counter = 0;
            cancelAnimationFrame(bAnim);
          }
        }
      }
    };


    function drawBul(obj,ctxt){
      ctxt.fillStyle = "rgb"+obj.color;
      ctxt.beginPath();
      // context.arc(centerX, centerY, radiuSize, startingAngle, endingAngle, antiClockwise);
      ctxt.arc((obj.x),(obj.y),(obj.size),bB,bE,false);
      ctxt.globalAlpha = 0.4;
      ctxt.closePath();
      ctxt.fill();

    };

    function bullePopulate(num){
      bulle = {};
      b = bulle,
      b.mX = 10,
      b.my = 10;
      //Rayon
      b.Osize = RandnTo(bMinSz,bMaxSz);
      b.size = b.Osize;
      b.area = b.size*2;
      //Couleur
      var triRand = RandnTo(0,3),
          colRand = RandnTo(0,4);
      b.color = bColor[triRand];
      //Attribue une couleur spéciale à la deuxième bulle
      if (num == 2 | num == 4){b.color = SpecialColor;}
      b.color2nd = b2ndColor[colRand];

      b.ColStep = b.OColstep = b.color;
      b.ColDest = b.OColDest = b.color2nd;

      var reg=new RegExp("[(,)]", "g");
      var colFrom=b.cFnum=b.OcFnum=b.ColStep.split(reg);
      var colDest=b.cDnum=b.OcDnum=b.ColDest.split(reg);
      b.Step = [1,1];
for (var i = 1; i <= colFrom.length-2; i++) {
  b.cFnum[i] = b.OcFnum[i] = parseFloat(colFrom[i]);
  b.cDnum[i] = b.OcDnum[i] = parseFloat(colDest[i]);
  b.Step[i] = (~~((b.cDnum[i]-b.cFnum[i])*0.01));
};

      //Vitesse
      var sp1 = RandnTo(bMinSp,bMaxSp/2);
      var sp2 = RandnTo(001,999); //on attribue un random par défaut
      b.speed = "0.00"+sp1+""+sp2;
      b.counter = 0;
      //définit la position bas/droite
      var diRand = RandnTo(1,2);
      switch(diRand)
      {
          //la bulle nait en bas
          case 1:
          var ba = wH+(b.size*3);
          b.x = (Rand0To(wW));
          b.y = ba;break;
          //la bulle nait à droite
          case 2:
          var dr = wW+(b.size*3);
          b.x = dr;
          b.y = (Rand0To(wH));break;
      }
      b.dx = -(Math.floor(Math.random()*wW)+500);
      b.dy = -(Math.floor(Math.random()*wH)+500);

      bulle = b;
    return bulle;
    };

    //dynamic random range
    function Rand0To(n){
    return Math.floor(Math.random()*(n))
    }
    function RandnTo(n,nbis){
      z = nbis+1;
    return Math.floor(Math.random()*(z-n)+n);
    }
    //Initialise l'API d'animation HTML5 /*Credits : Erik Möller & Paul Irish*/
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
     
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
     
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

      (function BubbleDemo(){
        var but = $('.demo');
        but.click(function(){
          var wW = $(window).width();
          var wH = $(window).height();
          can = $("#canvas1");
          can.width = wW;
          can.height = wH;
          cancelAnimationFrame(bAnim);
          can.fadeToggle("slow").fadeToggle("slow");
          recounter += 1;
          launch();
          if (recounter <= 1) {}
          else {
            recounter = 0;
            fpsControl = $('#fps').html().split(".");
            if (fpsControl[0] >= 600) { //en attendant que firefox remette cancelAnimationFrame.. version actuelle FF11 
                                        //edit: corrigé dans la béta FF12
              c0re.append('<div id="negPop" width="'+wW+'" height="'+wH+'"><p>Too many<br> fps!<br>:(</p></div>');
            }
            else {
              var ErrScreen = '<div id="negPop" width="'+wW+'" height="'+wH+'"><p>Get a<br>life<br>!:)</p></div>';
              c0re.append(ErrScreen);
              Rideau = $('#negPop');
              Rideau.click(function(){
                  Rideau.remove();
                  cancelAnimationFrame(bAnim);
                  can.fadeToggle("slow").fadeToggle("fast");
                  launch();
                });
            }
          }
        });
      })();
  };
  BubbleLauncherFR();
  /*au click sur démos, on relance l'anim :)*/
});




