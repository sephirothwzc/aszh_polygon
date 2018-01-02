/* eslint-disable */
(function () {

    function e_polygon(trig) {
      this.Container_constructor();
      this.point0 = new Array();//编辑虚线初始点
      this.point1 = new Array();//编辑虚线中间点
      this.e_type = 4;//控件形状类型
      this.e_data = new Array();//结果线段集合
      this.e_obj = new Object();
      this.e_shape = new createjs.Shape();//结果图形
      this.stageshape = new createjs.Shape();//编辑虚线框图形
      this.dashlineshape = new createjs.Shape();//临时虚线
      this.stagecontainer = new createjs.Container();
      this.stageshapelist = new Array();
      this.evt_ticker = new Array();//虚线缓动监听
      this.evt_stageclick = null;//边框画线监听
      this.evt_winkeydown = null;//完成边框监听
      this.evt_stagemove = null;//画线中监听
      this.editcont = new createjs.Container();
      this.init(trig);
   }
   var p = createjs.extend(e_polygon, createjs.Container);
   p.init = function (trig) {
      this.addChild(this.dashlineshape);
      this.addChild(this.stagecontainer);
      this.stagecontainer.addChild(this.stageshape);
      if (trig != true) {
          this.setup();
      }
   }
   p.hidepoint = function(){
      this.editcont.visible=false;
   }
   p.drawpoint = function(){
      var p_this=this;
    var tempp;
     for(var i=0;i<this.e_data.length;i++){
        tempp = new createjs.Shape();
        tempp.graphics.beginFill("#F00").drawCircle(this.e_data[i][0][0],this.e_data[i][0][1],2);
        tempp.cursor = "pointer";

       tempp.addEventListener("mousedown", function (evt) {
          var o = evt.target;
          o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
       });
       tempp.addEventListener("pressmove", function (evt) {
          var o = evt.target;
          o.x = evt.stageX + o.offset.x;
          o.y = evt.stageY + o.offset.y;
       });
       (function(j){
         tempp.addEventListener("pressup", function (evt) {
            var o = evt.target;
             p_this.e_data[j][0][0]+=o.x;
             p_this.e_data[j][0][1]+=o.y;
             if(j>0){
             p_this.e_data[j-1][1][0]+=o.x;
             p_this.e_data[j-1][1][1]+=o.y;
             }
             refreshDrag();
        	stage_b.removeAllChildren();
         });
       })(i);
        this.editcont.addChild(tempp);
     }

    tempp = new createjs.Shape();
    tempp.graphics.beginFill("#F00").drawCircle(this.e_data[this.e_data.length-1][1][0],this.e_data[this.e_data.length-1][1][1],2);
    tempp.cursor = "pointer";
    tempp.addEventListener("mousedown", function (evt) {
        var o = evt.target;
        o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
     });
     tempp.addEventListener("pressmove", function (evt) {
        var o = evt.target;
        o.x = evt.stageX + o.offset.x;
        o.y = evt.stageY + o.offset.y;
     });
     tempp.addEventListener("pressup", function (evt) {
        var o = evt.target;
         p_this.e_data[p_this.e_data.length-1][1][0]+=o.x;
         p_this.e_data[p_this.e_data.length-1][1][1]+=o.y;
         refreshDrag();
     });
     this.editcont.addChild(tempp);
   }
   p.drawshape = function (_ttemptext, trig) {
      this.removeChild(this.stagecontainer);
      this.addChild(this.e_shape);
      this.editcont.visible=false;
      var eg = this.e_shape.graphics;
      var color = e_color.selcolor(this.e_obj.type);
      this.e_shape.alpha = e_color.ealpha;
      if (trig != true) {
      eg.beginStroke("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
      eg.beginFill("rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + e_color.inneralpha + ")");
         //eg.beginFill("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
      } else {
         eg.beginFill("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
      }
      this.e_shape.alpha = e_color.ealpha;
      if (this.e_data != null && this.e_data.length > 0) {
         eg.moveTo(this.e_data[0][0][0], this.e_data[0][0][1]);
         for (var i = 0; i < this.e_data.length; i++) {
            if (this.e_data[i].length == 2) {
               eg.lineTo(this.e_data[i][1][0], this.e_data[i][1][1]);
            }
            else {
               eg.quadraticCurveTo(this.e_data[i][2][0], this.e_data[i][2][1], this.e_data[i][1][0], this.e_data[i][1][1]);
            }
         }
         eg.lineTo(this.e_data[0][0][0], this.e_data[0][0][1]);
      }
      eg.endStroke();
      if (trig != true) {
         var temptext = new createjs.Text(_ttemptext, "bold 30px Arial", "red");
         if(this.e_data.length==0){
         	return;
         	}
         	if(_showtext==false){
         		temptext.visible=false;
         		}
         temptext.x = this.e_data[0][0][0];
         temptext.y = this.e_data[0][0][1];
         //temptext.shadow = new createjs.Shadow("#FFF", 1, 1, 1);
         temptext.name = "text";
         this.addChild(temptext);
         this.drawpoint();
      }
   }
   p.setup = function () {
      var p_this = this;
      var g = p_this.stageshape.graphics;
      var lg = p_this.dashlineshape.graphics;

      this.evt_stageclick = function (evt) {
         if (p_this.point0.length == 0) {
            p_this.point0 = [evt.stageX, evt.stageY];
            p_this.point1 = [evt.stageX, evt.stageY];
         }
         else {
            var temptype = 1;
            var tempx = null;
            var tempy = null;
            var temppressmove = function (mv_evt) {
               temptype = 2;
               lg.clear();
               lg.setStrokeStyle(2, 'round', 'round');
               lg.setStrokeDash([7, 3]);
               lg.beginStroke("#F00");
               lg.mt(p_this.point1[0], p_this.point1[1]);
               lg.quadraticCurveTo(mv_evt.stageX, mv_evt.stageY, evt.stageX, evt.stageY);
               lg.endStroke();
               tempx = mv_evt.stageX;
               tempy = mv_evt.stageY;
            }
            var temppressup = function (up_evt) {
               lg.clear();
               var t_x = evt.stageX;
               var t_y = evt.stageY;
               var _tdsshape = new createjs.Shape();
               var g = _tdsshape.graphics;
               p_this.stagecontainer.addChild(_tdsshape);
               p_this.stageshapelist.push(_tdsshape);
               g.setStrokeStyle(2, 'round', 'round');
               var dashCmd = g.setStrokeDash([7, 3]).command;
               g.beginStroke("#F00");
               g.mt(p_this.point1[0], p_this.point1[1]);
               if (temptype == 1) {
                  g.lt(t_x, t_y);
               }
               else {
                  g.quadraticCurveTo(tempx, tempy, evt.stageX, evt.stageY);
               }
               g.endStroke();
               var tempdash = function () {
                  dashCmd.offset++;
               };
               createjs.Ticker.addEventListener("tick", tempdash);
               p_this.evt_ticker.push(tempdash);
               if (temptype == 1) {
                  p_this.e_data.push([[p_this.point1[0], p_this.point1[1]], [t_x, t_y]]);
               }
               else {
                  p_this.e_data.push([[p_this.point1[0], p_this.point1[1]], [t_x, t_y], [tempx, tempy]]);
               }
               p_this.point1 = [t_x, t_y];

               stage.removeEventListener("pressmove", temppressmove);
               stage.removeEventListener("pressup", temppressup);
               stage.addEventListener("stagemousemove", p_this.evt_stagemove);
            }
            stage.addEventListener("pressmove", temppressmove);
            stage.addEventListener("pressup", temppressup);
            stage.removeEventListener("stagemousemove", p_this.evt_stagemove);
         }
      }
      stage.addEventListener("mousedown", this.evt_stageclick);

      this.evt_winkeydown = function (evt) {
         if (evt.keyCode == 8) {
            evt.stopPropagation();
            evt.preventDefault();
            p_this.stagecontainer.removeChild(p_this.stageshapelist.pop());
            p_this.point1[0] = p_this.e_data[p_this.e_data.length - 1][0][0];
            p_this.point1[1] = p_this.e_data[p_this.e_data.length - 1][0][1];
            p_this.e_data.pop();
            lg.clear();
            lg.setStrokeStyle(2, 'round', 'round');
            lg.setStrokeDash([7, 3]);
            lg.beginStroke("#F00");
            lg.mt(p_this.point1[0], p_this.point1[1]);
            lg.lt(stage.mouseX, stage.mouseY);
            lg.endStroke();
         }
         else if (evt.keyCode == 13) {
            lg.clear();
            g.setStrokeStyle(2, 'round', 'round');
            var dashCmd = g.setStrokeDash([7, 3]).command;
            g.beginStroke("#F00");
            g.mt(p_this.point1[0], p_this.point1[1]);
            g.lt(p_this.point0[0], p_this.point0[1]);
            g.endStroke();
            var tempdash = function () {
               dashCmd.offset++;
            };
            createjs.Ticker.addEventListener("tick", tempdash);
            p_this.evt_ticker.push(tempdash);
            window.removeEventListener("keydown", p_this.evt_winkeydown);
            stage.removeEventListener("mousedown", p_this.evt_stageclick);
            stage.removeEventListener("stagemousemove", p_this.evt_stagemove);

            fieldshow();
            var _ttemptext;
            var rl_linsten = function () {
                _isedit= false;
               ablebtns();
               p_this.e_data.type = this.value;
               this.checked = false;
               $("input[name='typeOpts']").unbind("change", rl_linsten);
               fieldhide();
               var child_id = this.parentNode.parentNode.childNodes[2].value;
	             var child_id_z= this.parentNode.parentNode.childNodes[2].value +  '_' + retnum;
		           if(child_id !="" && child_id !=null && child_id !=undefined){
		            	 var _ttemptext = child_id_z + ' ' + this.parentNode.childNodes[1].nodeValue;
		           }else{
		            	var _ttemptext = retnum + ' ' + this.parentNode.childNodes[1].nodeValue;
		           }
               //var _ttemptext = retnum + this.parentNode.childNodes[1].nodeValue;
               p_this.e_obj.arr = p_this.e_data;
               p_this.e_obj.e_type = p_this.e_type;
               p_this.e_obj.text = _ttemptext;
               //新增id和parentId，用于导出数据。
		           p_this.e_obj.id = retnum;
		           if(child_id !="" && child_id !=null && child_id !=undefined){
		               p_this.e_obj.parentId = child_id;
		           }else{
		            	p_this.e_obj.parentId = "-1";
		           }
               p_this.e_obj.type = this.value;
               p_this.drawshape(_ttemptext);
               
               var csel = function () {
                 p_this.e_shape.alpha = 1;
               };
               
               var cdel = p_this.cdel = function () {
                   p_this.parent.removeChild(p_this);
                   if (returnobj != undefined && returnobj != null &&
                        returnobj.datalist != undefined && returnobj.datalist != null) {
                       var ind = returnobj.datalist.indexOf(p_this.e_obj);
                       if (ind != -1) {
                           returnobj.datalist.splice(ind, 1);
                       }
                   }
                refreshDrag();
               };
               var cleave = function () { p_this.e_shape.alpha = e_color.ealpha; };
               var tn = e_canvastrim.addel(csel, cleave, cdel, _ttemptext);
               var delfun = function (evt) {
                  if (evt.keyCode == 46) {
                     cdel();
                     
                  }
               };
               p_this.addEventListener("mouseover", function (evt) {
                  csel();
                  window.addEventListener("keydown", delfun);
               });
               p_this.addEventListener("mouseout", function () {
                  cleave();
                  window.removeEventListener("keydown", delfun);
               });
            p_this.addEventListener("click",function(e){
            	if(_isedit==true){
            		return;
            		}
            	stage_b.removeAllChildren();
            	stage_b.addChild(p_this.editcont);
			         p_this.editcont.visible=true;
			         fieldshow();
			         if(_editings==null){
			         		fieldhide();
			         	}
			           if(_editings!=null&&_editings!=p_this){
			              _editings.hidepoint();
			              fieldhide();
			           }else{
			           	
			              $("input[name='typeOpts']").bind("change", function(){
			              	p_this.e_data.type = this.value;
					            this.checked = false;
					            $("input[name='typeOpts']").unbind("change");
					            fieldhide();
					            var child_id = this.parentNode.parentNode.childNodes[2].value;
                      var child_id_z= this.parentNode.parentNode.childNodes[2].value +  '_' + retnum;
					            if(child_id !="" && child_id !=null && child_id !=undefined){
					            	  var _ttemptext = child_id_z + ' ' + this.parentNode.childNodes[1].nodeValue;
					            }else{
					            		var _ttemptext = retnum + ' ' + this.parentNode.childNodes[1].nodeValue;
					            }
					            //var _ttemptext = retnum + ' ' + this.parentNode.childNodes[1].nodeValue;
					            p_this.e_obj.arr = p_this.e_data;
					            p_this.e_obj.e_type = p_this.e_type;
					            p_this.e_obj.text = _ttemptext;
					            //新增id和parentId，用于导出数据。
					            p_this.e_obj.id = retnum;
					            if(child_id !="" && child_id !=null && child_id !=undefined){
					                p_this.e_obj.parentId = child_id;
					            }else{
					            	 p_this.e_obj.parentId = "-1";
					            }
					            p_this.e_obj.type = this.value;
			              	refreshDrag();
			              	});
			           	}
			           _editings=p_this;
            });
               retnum++;
               $(".id_input").val(""); 
            }

            $("input[name='typeOpts']").bind("change", rl_linsten);
         }
      }
      window.addEventListener("keydown", this.evt_winkeydown);

      this.evt_stagemove = function (evt) {
         lg.clear();
         lg.setStrokeStyle(2, 'round', 'round');
         lg.setStrokeDash([7, 3]);
         lg.beginStroke("#F00");
         lg.mt(p_this.point1[0], p_this.point1[1]);
         lg.lt(evt.stageX, evt.stageY);
         lg.endStroke();
      }
      stage.addEventListener("stagemousemove", this.evt_stagemove);

      //stage.canvas.focus();
   };
   p.e_remove = function () {
      if (this.evt_ticker.length > 0) {
         for (var i = 0; i < this.evt_ticker.length; i++) {
            createjs.Ticker.removeEventListener("tick", this.evt_ticker[i]);
         }
      }
      if (this.evt_stageclick != null) {
         stage.removeEventListener("mousedown", this.evt_stageclick);
      }
      if (this.evt_winkeydown != null) {
         window.removeEventListener("keydown", this.evt_winkeydown);
      }
      if (this.evt_stagemove != null) {
         stage.removeEventListener("stagemousemove", this.evt_stagemove);
      }
   }
   p.setobj = function (obj) {
       var p_this = this;
       p_this.e_obj = obj;
       p_this.e_data = p_this.e_obj.arr;
       var _ttemptext = p_this.e_obj.text;
       p_this.drawshape(_ttemptext);
       
       var csel = function () {
         p_this.e_shape.alpha = 1;
       };
       
       var cdel = p_this.cdel = function () {
           p_this.parent.removeChild(p_this);
           if (returnobj != undefined && returnobj != null &&
               returnobj.datalist != undefined && returnobj.datalist != null) {
               var ind = returnobj.datalist.indexOf(p_this.e_obj);
               if (ind != -1) {
                   returnobj.datalist.splice(ind, 1);
               }
           }
                refreshDrag();
       };
       var cleave = function () { p_this.e_shape.alpha = e_color.ealpha; };
       var tn = e_canvastrim.addel(csel, cleave, cdel, _ttemptext);
       var delfun = function (evt) {
           if (evt.keyCode == 46) {
               cdel();
               
           }
       };
       p_this.addEventListener("mouseover", function (evt) {
           csel();
           window.addEventListener("keydown", delfun);
       });
       p_this.addEventListener("mouseout", function () {
           cleave();
           window.removeEventListener("keydown", delfun);
       });
            p_this.addEventListener("click",function(e){
            	if(_isedit==true){
            		return;
            		}
            	stage_b.removeAllChildren();
            	stage_b.addChild(p_this.editcont);
			         p_this.editcont.visible=true;
			         fieldshow();
			         if(_editings==null){
			         		fieldhide();
			         	}
			           if(_editings!=null&&_editings!=p_this){
			              _editings.hidepoint();
			              fieldhide();
			           }else{
			           	
			              $("input[name='typeOpts']").bind("change", function(){
			              	p_this.e_data.type = this.value;
					            this.checked = false;
					            $("input[name='typeOpts']").unbind("change");
					            fieldhide();
					            var child_id = this.parentNode.parentNode.childNodes[2].value;
                      var child_id_z= this.parentNode.parentNode.childNodes[2].value +  '_' + retnum;
					            if(child_id !="" && child_id !=null && child_id !=undefined){
					            	  var _ttemptext = child_id_z + ' ' + this.parentNode.childNodes[1].nodeValue;
					            }else{
					            		var _ttemptext = retnum + ' ' + this.parentNode.childNodes[1].nodeValue;
					            }
					            //var _ttemptext = retnum + ' ' + this.parentNode.childNodes[1].nodeValue;
					            p_this.e_obj.arr = p_this.e_data;
					            p_this.e_obj.e_type = p_this.e_type;
					            p_this.e_obj.text = _ttemptext;
					            //新增id和parentId，用于导出数据。
					            p_this.e_obj.id = retnum;
					            if(child_id !="" && child_id !=null && child_id !=undefined){
					                p_this.e_obj.parentId = child_id;
					            }else{
					            	 p_this.e_obj.parentId = "-1";
					            }
					            p_this.e_obj.type = this.value;
			              	refreshDrag();
			              	});
			           	}
			           _editings=p_this;
            });
   }
   createjs.e_polygon = createjs.promote(e_polygon, "Container");
}());