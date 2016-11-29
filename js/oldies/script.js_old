/*Author:Jonathan Rivalan for Negden*/

$(document).ready(function(){

  function BubbleLauncherFR(){

      //Informations sur la scene
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    $(window).resize(function(){
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    })
    //Création du canvas principal
    var c0re = $('html');
    c0re.prepend('<canvas id="canvas1" width="'+winWidth+'" height="'+winHeight+'"></canvas>');
    var can = document.getElementById('canvas1');
    var ctx = can.getContext('2d');
    
    //Création du canvas secondaire pour pre-rendering
    var can2 = document.createElement('canvas');
    can2.width = winWidth;
    can2.height = winHeight;
    var ctx2 = can2.getContext('2d');

    // Variables de l'effet
    var bNum = 50,
        bMinSz = 4,
        bMaxSz = 100, 
        bMinSp = 0,
        bMaxSp = 2,
        bColor = ["#45d0fd","#0096ff","#1377d4","#5192d5"],
        SpecialColor = "#ff004e", //#ce0f0f
        LaunchDelay = 500, //tps avant lancement
        bulleZrender = "render";//methode de rendu, prend les valeurs "render" ou "prerender"

    //Mises en cache
    var counter = 0, //quand atteind la valeur de bNum, arrête l'animation
        recounter = 0, //compte le nombre de relaunch
        stopRelaunch = 3, //nb retry avant popin
        bB = 0* Math.PI,//début et fin du cercle
        bE = 2* Math.PI;

    //Auto-initialise l'effet
    function launch(){
      counter = 0; //vaut pour reset
      //Création des objets
      bulleZ = new Array();
      for (i=1;i<=bNum;i++) {
        bulleZ[i] = bullePopulate();
      };
      //Rendu des objets
      setTimeout(function(){
        if (bulleZrender == "render"){render();}
        else if (bulleZrender == "prerender"){prerender();}
        else {render();}
      },LaunchDelay);
    };
    launch(); //déclaration de la fonction pour reuse 

    //FPS COUNTER PART1
    var fS = 20;
    var fT = 0, lL = new Date, tL;
    var fO = document.getElementById('fps');

    function render(){
      bAnim = requestAnimationFrame(render);
      draw(ctx);

        //FPS COUNTER PART2
      var tFT = (tL=new Date) - lL;
      fT+= (tFT - fT) / fS;
      lL = tL;

    }

    function prerender(){
      draw(ctx2,ctx);
      ctx.clearRect(0, 0, winWidth, winHeight);
      ctx.drawImage(can2, 0, 0);
      myAnim = requestAnimationFrame(prerender);

        //FPS COUNTER PART2
      var tFT = (tL=new Date) - lL;
      fT+= (tFT - fT) / fS;
      lL = tL;
    }

    //FPS COUNTER PART3
    function dispFPS(){
      var dis = (1000/fT).toFixed(1) + "fps";
      fO.innerHTML = dis;
    }
    setInterval(dispFPS,1000);


    function draw(ctxt){
        //to date, fastest clearing canvas way
      ctxt.clearRect(0, 0, winWidth, winHeight);
        //possible alternative, slowest
      /*can1.width = can1.width;*/

    for (i=1;i<=bNum;i++) {
      var b = bulleZ[i],
          bulX = (b.dx - b.x) * b.speed,
          bulY = (b.dy - b.y) * b.speed;

      //Math.round version
    //bulleZ[i].x += Math.round((bulleZ[i].dx - bulleZ[i].x)* bulleZ[i].speed);
    //bulleZ[i].y += Math.round((bulleZ[i].dy - bulleZ[i].y)* bulleZ[i].speed);

      //double tide hack >> alternative to MathRound
    //bulleZ[i].x += ~~ ((bulleZ[i].dx - bulleZ[i].x) * bulleZ[i].speed);
    //bulleZ[i].y += ~~ ((bulleZ[i].dy - bulleZ[i].y) * bulleZ[i].speed);

      //OR binary hack >> alternative to MathRound
    //bulleZ[i].x += ((bulleZ[i].dx - bulleZ[i].x) * bulleZ[i].speed)) | 0;
    //bulleZ[i].y += ((bulleZ[i].dy - bulleZ[i].y) * bulleZ[i].speed)) | 0;

        b.x += bulX; //Regular non rounded >> !!uses slower subpixel
        b.y += bulY; //Regular non rounded >> !!uses slower subpixel

    //si la valeur de x est égale à -(valeur de son rayon) plus de traçage
        if (b.x >= -(b.area))
        {
          b.x += bulX;
          b.y += bulY;
          drawBul(b,ctxt);
        }
        else if (b.counter == 0){ //stop l'anim une fois les bulles dehors
          b.counter += 1;
          counter += 1;
          if (counter == bNum){
            counter = 0;
            cancelAnimationFrame(bAnim);
          }
        };
    };
    }


    function bullePopulate(){
      bulle = new Object();
      b = bulle;
      //Rayon
      b.size = RandnTo(bMinSz,bMaxSz);
      b.area = b.size*3;
      //Couleur
      var triRand = Rand0To(3);
      b.color = bColor[triRand];
      //Attribue une couleur spéciale à la deuxième bulle
      if (i == 2 | i == 4){b.color = SpecialColor;}
      //Vitesse
      var sp1 = RandnTo(bMinSp,bMaxSp);
      var sp2 = RandnTo(001,999); //on attribue un random par défaut
      b.speed = "0.00"+sp1+""+sp2;

      b.counter = 0;
      //définit la position bas/droite
      var diRand = RandnTo(1,2);
      switch(diRand)
      {
          //la bulle nait en bas
          case 1:
          var ba = winHeight+(b.size*3);
          b.x = (Rand0To(winWidth));
          b.y = ba;break;
          //la bulle nait à droite
          case 2:
          var dr = winWidth+(b.size*3);
          b.x = dr;
          b.y = (Rand0To(winHeight));break;
      }
      b.dx = -(Math.floor(Math.random()*winWidth)+500);
      b.dy = -(Math.floor(Math.random()*winHeight)+500);
      bulle = b;
    return bulle;
    };


    function drawBul(obj,ctxt){
      ctxt.fillStyle = obj.color;
      ctxt.beginPath();
      // context.arc(centerX, centerY, radiuSize, startingAngle, endingAngle, antiClockwise);
      ctxt.arc((obj.x),(obj.y),(obj.size),bB,bE,false);
      ctxt.globalAlpha = 0.4;
      ctxt.closePath();
      ctxt.fill();
    };


    //dynamic random range
    function Rand0To(n){
    return Math.floor(Math.random()*(n))
    }
    function RandnTo(n,nbis){
    return Math.floor(Math.random()*(nbis)+n);
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
          cancelAnimationFrame(bAnim);
          recounter += 1;
          launch();
          //randError = Rand0To(10);
          if (recounter <= 2) {}
          else {
            recounter = 0;
            fpsControl = $('#fps').html().split(".");
            if (fpsControl[0] >= 600) {
              var StopScreen = '<div id="nomo" width="'+winWidth+'" height="'+winHeight+'"><p>Too many<br> fps!<br>:(</p></div>';
              c0re.append(StopScreen);
            }
            else {
              var ErrScreen = '<div id="nomo" width="'+winWidth+'" height="'+winHeight+'"><p>Get a<br>life<br>!:)</p></div>';
              c0re.append(ErrScreen);
              Rideau = $('#nomo'),
              Rideau.hide().fadeToggle();
              Rideau.click(function(){
                  cancelAnimationFrame(bAnim);
                  Rideau.fadeToggle();
                  launch();
                  Rideau.remove();
                });
            }
          }
        });
      })();
  };
  BubbleLauncherFR();

  /*au click sur démos, on relance l'anim :)*/


});




