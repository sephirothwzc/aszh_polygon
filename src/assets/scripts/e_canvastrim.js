/* eslint-disable */
var e_canvastrim = {};
e_canvastrim.tnum = 0;
e_canvastrim.left = "";
e_canvastrim.top = "";
e_canvastrim.init = function (c) {
   c.attr("width", img.width);
   c.attr("height", img.height);
   var par = c.parent();
   var tempsc_w = par.width() / c.width();
   var tempsc_h = par.height() / c.height();
   if (tempsc_w > tempsc_h) {
      c.css("width", img.width * tempsc_h + "px");
      c.css("left", (par.width() - (img.width * tempsc_h)) / 2 + "px");
      c.css("top", "0");
      e_canvastrim.left = (par.width() - (img.width * tempsc_h)) / 2 + "px";
      e_canvastrim.top = "0";
   }
   else {
      c.css("width", par.width() + "px");
      c.css("top", (par.height() - (img.height * tempsc_w)) / 2 + "px");
      c.css("left", "0");
      e_canvastrim.left = "0";
      e_canvastrim.top = (par.height() - (img.height * tempsc_w)) / 2 + "px";
   }
}
e_canvastrim.addel = function (selfun, leavefun, delfun, text) {
   if (text == null) {
      text = "测试测试";
   }
   var tn = this.tnum;
   var temphtml = '<div class="col-xs-1 source" tid="'+ tn +'" style="padding: 2px 2px 0px;" id="ccont' + tn + '">' +
                     '<div class="col-xs-12 qlbox">' +
                        '<div class="ql">' +
                           '<div id="csel' + tn + '">' + text + '</div>' +
                           '<div id="cdel' + tn + '" class="glyphicon glyphicon-remove qla"></div>' +
                        '</div>' +
                     '</div>' +
                  '</div>';
   $("#mycont").append(temphtml);
   $("#csel" + tn).bind("click", function (e) {
     var children = stage.children;
     var list = children[1].children;
     var shape = null ;
     var text = this.innerText ;
     
     for(var ii = 0;ii < list.length ; ii ++){
       shape = list[ii];
       if(shape.e_obj.text == text){
         shape.visible = true ;
       }else{
         shape.visible = false ;
       }
     }
   });
   $("#csel" + tn).mouseenter(function () {
      if (selfun != null) {
         selfun();
      }
   });
   $("#csel" + tn).mouseleave(function () {
      if (leavefun != null) {
         leavefun();
      }
   });
   $("#cdel" + tn).bind("click", function () {
      if (delfun != null) {
         delfun();
      }
   });
   var retobj = tn;
   this.tnum++;
   setvdata();
   return retobj;
}