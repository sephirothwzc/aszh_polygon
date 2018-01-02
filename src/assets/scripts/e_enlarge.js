/* eslint-disable */
var e_enlarge = {};
e_enlarge.init = function (stage) {
   var largeview = new createjs.Container();
   var largemap = new createjs.Container();
   var tempbitmap = new createjs.Bitmap();
   tempbitmap.image = stage.canvas;
   largemap.addChild(tempbitmap);
   largeview.addChild(largemap);
   largemap.scaleX = 2;
   largemap.scaleY = 2;
   //stage.addChild(largeview);
   var bordershape = new createjs.Shape();
   bordershape.graphics.setStrokeStyle(4);
   bordershape.graphics.beginStroke("red").rect(-80, -60, 160, 120).endStroke();
   largeview.addChild(bordershape);

   var lmask = new createjs.Shape();
   lmask.graphics.beginFill("red").rect(-80, -60, 160, 120).endStroke();
   largemap.mask = lmask;

   largeview.visible = false;

   window.addEventListener("keydown", function (evt) {
      //console.log(evt.keyCode);
      if (evt.keyCode == 80) {
         if (stage.getChildIndex(largeview) > 0) {
            stage.removeChild(largeview);
         }
         else {
            stage.addChild(largeview);
         }
      }
   });

   stage.addEventListener("rollover", function () {
      largeview.visible = true;
   });

   stage.addEventListener("mouseleave", function () {
      largeview.visible = false;
   });

   var tempx = 0;
   var tempy = 0;
   stage.addEventListener("stagemousemove", function (evt) {
      tempx = evt.stageX;
      tempy = evt.stageY;
      bordershape.x = tempx;
      bordershape.y = tempy;
      //lmask.graphics.clear();
      //lmask.graphics.beginFill("red").drawCircle(evt.stageX, evt.stageY, 70).endStroke();
      lmask.x = tempx;
      lmask.y = tempy;
      largemap.x = 0 - tempx;
      largemap.y = 0 - tempy;
   });
}