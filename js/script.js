/*..............................................................................
................................???,.....,?????==,,,,,,.........................
...............................?????.....??????????????????+~...................
..............................,?????....=???,...................................
..............................??????...,???:....................................
.............................???????...????.....................................
............................,???:???,.=???,.....................................
...................,?????~..????.???,,???+......................................
................+?????????.????,.???,????.......................................
..............=???????~,,.,???=..???~???,.......................................
.............?????,.......????...???????........................................
............????:........=???,...??????.........................................
...........=???:........,????....~????,.........................................
...........????.........????.....,????.EGDEN..........www.negden.com............
...........????........????,......,,,...........................................
...........????+.....,????,.....................................................
...........,??????:+?????:......................................................
............,???????????........................................................
..............,=?????,..........................................................
.....................ALL RIGHTS RESERVED........Author:Jonathan Rivalan.......*/
  
  //todo refactoriser en méthodes (init, replay)
  //todo add ghost option
  function BubbleLauncher(){

      //Informations sur la scene

    var wW = document.documentElement.clientWidth;
    var wH = document.documentElement.clientHeight;

      //Création du canvas principal
    var c0re = document.querySelector('html'),
        c0reCanvas = document.createElement('canvas');

    c0reCanvas.id = "canvas1";
    c0reCanvas.width = wW;
    c0reCanvas.height = wH;
    c0re.insertBefore(c0reCanvas, c0re.firstChild);
    //var can = document.querySelector('#canvas1');
    var ctx = c0reCanvas.getContext('2d');

      // Variables de l'effet
    var bNum = 49,
        bMinSz = 4,
        bMaxSz = 100, 
        bMinSp = 0,
        bMaxSp = 4,
        bColor = ["(69,208,253)","(0,150,255)","(19,119,212)","(81,146,213)"],
        b2ndColor = ["(255,168,0)",//orange
                    "(255,123,87)",//orouge
                    "(255,198,0)",//or
                    "(255,107,107)",//saumon
                    "(255,87,123)"],//roge
        SpecialColor = "(255,0,78)", //#ce0f0f
        bDelay = 1500, //tps avant lancement
        bRender = "render";//methode de rendu, prend les valeurs "render" ou "prerender" (deprecated)
    //Mises en cache !!ne pas modifier
    var counter = 0, //quand atteind la valeur de bNum, arrête l'animation
        recounter = 0, //compte le nombre de relaunch
        stopRelaunch = 3, //nb retry avant popin
        mXPos = 0;
        mYPos = 0;
        mX = 0,
        mY = 0,
        bB = 0* Math.PI,//début et fin du cercle
        bE = 2* Math.PI;

     var bCounter = {};
     bCounter.pinnedBubbles = 0,
     cursor = document.querySelector('.bubble_cursor'),
     cursorTooltip = document.querySelector('.pinned_bubbles'),
     cursorBlur = document.querySelector('img.bubble_blur');
     ghostActive = 0,
     ghosts = '',
     currentCursorPos = [0,0],
     newCursorPos = 0,
     oddEven = 0;

      document.addEventListener("mousemove", function(e){
        mXPos = e.pageX;
        mYPos = e.pageY;
      })

    //Auto-initialise l'effet
    function launch(){
      counter = 0; //reset
      cursor.style.display = "none"; //todo .hide class
    //Création des objets
      bulleZ = [];
      for (i=1;i<=bNum;i++) {
        bulleZ[i] = bullePopulate(i);
      };
    //Rendu des objets
      setTimeout(function(){
        if (bRender == "render"){
          render();
          document.querySelector('#rend').innerText = "// rendu direct";
        }
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
      cursorHandle();
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
        //to date, fastest clearing canvas way
      ctxt.clearRect(0, 0, wW, wH);
        //possible alternative, slowest
      /*can1.width = can1.width;*/
    for (i=1;i<=bNum;i++) {
      var b = bulleZ[i],
          mX = mXPos,
          mY = mYPos,
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


                  //si la bulle n'était pas pinnée
                  if (b.pin == "no"){
                    b.pin = "yes";
                    bCounter.pinnedBubbles += 1;
                    if (bCounter.pinnedBubbles == 1){
                      cursor.classList.add('custcursor');
                      document.querySelector('#canvas1').classList.add('custcursor');
                    }

                    cursorTooltip.classList.add('shine');
                    setTimeout(function(){
                      cursorTooltip.classList.remove('shine');
                    },200)
                    
                  }
                  //si la bulle était déjà pinnée
                  else {}

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


                if (b.pin !== "no"){
                  b.pin = "no";
                  bCounter.pinnedBubbles -= 1;
                  cursorTooltip.classList.add('unshine');
                  setTimeout(function(){
                    cursorTooltip.classList.remove('unshine');
                  },200)
                  if (bCounter.pinnedBubbles == 0){
                    document.querySelector('canvas').classList.remove('custcursor');
                  }
                }

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
      ctxt.beginPath();
        // context.arc(centerX, centerY, radiuSize, startingAngle, endingAngle, antiClockwise);
        ctxt.arc((obj.x),(obj.y),(obj.size),bB,bE,false);
        ctxt.fillStyle = "rgb"+obj.color;
        ctxt.globalAlpha = 0.4;
      ctxt.closePath();
      ctxt.fill();
    };

    (function cursorGhostCreate(obj, blurobj){
      obj = cursor;
      blurobj = cursorBlur;
      
      if (ghostActive == 0){
        ghostActive = 1;
        var objGhost = blurobj.cloneNode();
        objGhost.classList.add('ghosts');
        objGhost.classList.remove('shine');
        //todo removo 6 for configurable number
        for (var i = 1; i <= 6; i++) {
          var newObj = objGhost.cloneNode();
          newObj.attributes["dataOpacityId"] = (Math.round((0.6/i*0.9)*1000))/1000;
          obj.parentNode.insertBefore(newObj, obj);
        };
        ghosts = document.querySelectorAll('.ghosts');
      }
    })();

    function cursorHandle(){
      if (bCounter.pinnedBubbles !== 0){
        cursor.style.display = "block";// todo .hide class
        cursor.style.opacity = 1;
        for (var i = 0; i < ghosts.length-1; i++) {
          ghosts[i].style.opacity = ghosts[i].attributes.dataOpacityId;
        }
        cursor.style.left = mXPos-6+'px';
        cursor.style.top = mYPos-4+'px';
        cursorTooltip.innerText = ''+bCounter.pinnedBubbles+'';
        if (oddEven == 1 ){
          oddEven = 0;
          cursorMotionBlur(cursor, cursorBlur);
        }
        else {
          oddEven += 1;
        }
      }
      else {
        if (cursor.style.display !== 'none'){
          cursor.style.left = mXPos-5+'px';
          cursor.style.top = mYPos+'px';
          cursor.style.display = "none";
          for (var i = 0; i < ghosts.length-1; i++) {
            ghosts[i].style.opacity = 0;
          }
        }
      }
    };

    function getCursorSpeed(obj){
    newCursorPos = [parseInt(obj.style.left),parseInt(obj.style.top)];
    var cursorSpeed = [(newCursorPos[0]-currentCursorPos[0]),(newCursorPos[1]-currentCursorPos[1])];
     currentCursorPos = newCursorPos;
     return cursorSpeed;
    }

    function cursorMotionBlur(obj, blurobj){
      var speed = getCursorSpeed(obj);
      var basePos = [parseInt(obj.style.left),parseInt(obj.style.top)];
      for (var i = 0; i < ghosts.length-1; i++) {
        ghosts[i].style.left = basePos[0]+(speed[0]*(i*(i*i*0.1)-i*2))+'px';
        ghosts[i].style.top = basePos[1]+(speed[1]*(i*(i*i*0.1)-i*2))+'px';
        basePos = [parseInt(ghosts[i].style.left),parseInt(ghosts[i].style.top)];
      }
    };

    function bullePopulate(num){
      bulle = {};
      b = bulle,
      b.mX = 10,
      b.my = 10;

      //pin status
      b.pin = "no";

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

      //todo readd the relaunch button
      (function BubbleDemo(){
        var but = document.querySelector('.demo');
        //but.click(function(){
        but.addEventListener("click",function(){
          var wW = document.documentElement.clientWidth;
          var wH = document.documentElement.clientHeight;
          can = document.querySelector("#canvas1");
          can.width = wW;
          can.height = wH;
          recounter += 1;
          if (recounter <= 1) {
            cancelAnimationFrame(bAnim);
            launch();
          }
          else {
            recounter = 0;
              Rideau = document.createElement('div');

              Rideau.innerHTML = '<p>Get a<br>life<br>!:)</p>';
              Rideau.id = 'negPop';
              Rideau.width = wW;
              Rideau.width = wH;
              c0re.appendChild(Rideau);

              Rideau = document.querySelector('#negPop');
              Rideau.addEventListener("click",function(){
                Rideau.remove();
                cancelAnimationFrame(bAnim);
                launch();
              });
          }
        });
      })();
  };
  //Execution après le chargement des images.
  window.onload = function() {
    BubbleLauncher();
  }
  /*au click sur démos, on relance l'anim :)*/