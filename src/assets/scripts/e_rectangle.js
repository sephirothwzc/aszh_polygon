/* eslint-disable */
(function () {

   function e_rectangle(trig) {
      this.Container_constructor();
      this.e_type = 1;//控件形状类型
      this.e_spoint = new Array();//起始点
      this.e_data = new Array();//结果线段集合
      this.e_obj = new Object();
      this.e_shape = new createjs.Shape();//结果图形
      this.stageshape = new createjs.Shape();//编辑虚线框图形
      this.dashlineshape = new createjs.Shape();//临时虚线
      this.evt_ticker = new Array();//虚线缓动监听
      this.evt_mousedown = null;//边框画线监听
      this.evt_pressup = null;//完成边框监听
      this.evt_pressmove = null;//画线中监听
      this.editcont = new createjs.Container();
      this.init(trig);
   }
   var p = createjs.extend(e_rectangle, createjs.Container);
   p.drawshape = function (_ttemptext, trig) {
      this.removeChild(this.stageshape);
      this.addChild(this.e_shape);
      this.editcont.visible=false;
      var eg = this.e_shape.graphics;
      var color = e_color.selcolor(this.e_obj.type);
      this.e_shape.alpha = e_color.ealpha;
      if (trig != true) {
         eg.beginStroke("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
         eg.beginFill("rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + e_color.ealpha + ")");
      } else {
         eg.beginFill("rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
      }
      eg.rect(this.e_data[0], this.e_data[1], this.e_data[2], this.e_data[3]);
      eg.endStroke();
      if (trig != true) {
         var temptext = new createjs.Text(_ttemptext, "bold 30px Arial", "red");
         	if(_showtext==false){
         		temptext.visible=false;
         		}
         temptext.x = this.e_data[0];
         temptext.y = this.e_data[1];
         //temptext.shadow = new createjs.Shadow("#FFF", 1, 1, 1);
         temptext.name = "text";
         this.addChild(temptext);
         this.drawpoint();
      }
   }
   p.init = function (trig) {
      this.addChild(this.stageshape);
      this.addChild(this.dashlineshape);
      if (trig != true) {
         this.setup();
      }
   }
   p.hidepoint = function(){
      this.editcont.visible=false;
   }
   p.drawpoint = function(){
      var p_this=this;
      var _temppoint1 = new createjs.Shape();
      _temppoint1.graphics.beginFill("#F00").drawCircle(this.e_data[0],this.e_data[1],4);
      var _temppoint2 = new createjs.Shape();
      _temppoint2.graphics.beginFill("#F00").drawCircle(this.e_data[0]+this.e_data[2],this.e_data[1],4);
      var _temppoint3 = new createjs.Shape();
      _temppoint3.graphics.beginFill("#F00").drawCircle(this.e_data[0],this.e_data[1]+this.e_data[3],4);
      var _temppoint4 = new createjs.Shape();
      _temppoint4.graphics.beginFill("#F00").drawCircle(this.e_data[0]+this.e_data[2],this.e_data[1]+this.e_data[3],4);
      _temppoint1.cursor = "pointer";
      _temppoint2.cursor = "pointer";
      _temppoint3.cursor = "pointer";
      _temppoint4.cursor = "pointer";
      for(var i=1;i<5;i++){
         eval("_temppoint"+i).addEventListener("mousedown", function (evt) {
            var o = evt.target;
            o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
         });
         eval("_temppoint"+i).addEventListener("pressmove", function (evt) {
            var o = evt.target;
            o.x = evt.stageX + o.offset.x;
            o.y = evt.stageY + o.offset.y;
         });
      }
      _temppoint1.addEventListener("pressup",function(evt){
         var o = evt.target;
         p_this.e_data[0]+=o.x;
         p_this.e_data[1]+=o.y;
         p_this.e_data[2]-=o.x;
         p_this.e_data[3]-=o.y;
         refreshDrag();
        	stage_b.removeAllChildren();
      });
      _temppoint2.addEventListener("pressup",function(evt){
         var o = evt.target;
         p_this.e_data[1]+=o.y;
         p_this.e_data[2]+=o.x;
         p_this.e_data[3]-=o.y;
         refreshDrag();
            	stage_b.removeAllChildren();
      });
      _temppoint3.addEventListener("pressup",function(evt){
         var o = evt.target;
         p_this.e_data[0]+=o.x;
         p_this.e_data[2]-=o.x;
         p_this.e_data[3]+=o.y;
         refreshDrag();
            	stage_b.removeAllChildren();
      });
      _temppoint4.addEventListener("pressup",function(evt){
         var o = evt.target;
         p_this.e_data[2]+=o.x;
         p_this.e_data[3]+=o.y;
         refreshDrag();
            	stage_b.removeAllChildren();
      });
      this.editcont.addChild(_temppoint1);
      this.editcont.addChild(_temppoint2);
      this.editcont.addChild(_temppoint3);
      this.editcont.addChild(_temppoint4);
   }
   p.setup = function () {
      var p_this = this;
      var g = p_this.stageshape.graphics;
      var lg = p_this.dashlineshape.graphics;

      this.evt_mousedown = function (evt) {
         p_this.e_spoint = [evt.stageX, evt.stageY];
         p_this.e_data.push(evt.stageX);
         p_this.e_data.push(evt.stageY);
         stage.addEventListener("pressmove", p_this.evt_pressmove);
         stage.addEventListener("pressup", p_this.evt_pressup);
      }
      this.evt_pressmove = function (evt) {
         var p_point = p_this.e_spoint;
         lg.clear();
         lg.setStrokeStyle(2, 'round', 'round');
         lg.setStrokeDash([7, 3]);
         lg.beginStroke("#F00");
         lg.rect(p_point[0], p_point[1], evt.stageX - p_point[0], evt.stageY - p_point[1]);
         lg.endStroke();
      }
      this.evt_pressup = function (evt) {
         var p_point = p_this.e_spoint;
         lg.clear();
         g.setStrokeStyle(2, 'round', 'round');
         var dashCmd = g.setStrokeDash([7, 3]).command;
         g.beginStroke("#F00");
         g.beginFill("rgba(255,255,255,0.01)").rect(p_point[0], p_point[1], evt.stageX - p_point[0], evt.stageY - p_point[1]);
         g.endStroke();
         p_this.e_data.push(evt.stageX - p_point[0]);
         p_this.e_data.push(evt.stageY - p_point[1]);
         var tempdash = function () {
            dashCmd.offset++;
         };
         var tempmv = new Object();
         /*p_this.stageshape.addEventListener("mousedown", function (evti) {
            tempmv.x = p_this.x - evti.stageX;
            tempmv.y = p_this.y - evti.stageY;
         });
         p_this.stageshape.addEventListener("pressmove", function (evtj) {
            p_this.x = (evtj.stageX + tempmv.x);
            p_this.y = (evtj.stageY + tempmv.y);
         });*/
         createjs.Ticker.addEventListener("tick", tempdash);
         p_this.evt_ticker.push(tempdash);
         stage.removeEventListener("mousedown", p_this.evt_mousedown);
         stage.removeEventListener("pressmove", p_this.evt_pressmove);
         stage.removeEventListener("pressup", p_this.evt_pressup);

         fieldshow();

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
            p_this.drawshape(_ttemptext);
            var csel = function () { p_this.e_shape.alpha = 1; };
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
					            //var _ttemptext = retnum +  ' ' + this.parentNode.childNodes[1].nodeValue;
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
      stage.addEventListener("mousedown", p_this.evt_mousedown);
   };

   p.setobj = function (obj) {
      var p_this = this;
      p_this.e_obj = obj;
      p_this.e_data = p_this.e_obj.arr;
      var _ttemptext = p_this.e_obj.text;
      p_this.drawshape(_ttemptext);
      var csel = function () { p_this.e_shape.alpha = 1; };
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
					            //var child_id_z = this.parentNode.parentNode.childNodes[2].value;
					            //child_id= this.parentNode.parentNode.childNodes[2].value.split("_")[1];
					            var child_id = this.parentNode.parentNode.childNodes[2].value;
                      var child_id_z= this.parentNode.parentNode.childNodes[2].value +  '_' + retnum;
					            if(child_id !="" && child_id !=null && child_id !=undefined){
					            	  var _ttemptext = child_id_z + ' ' + this.parentNode.childNodes[1].nodeValue;
					            }else{
					            		var _ttemptext = retnum + ' ' + this.parentNode.childNodes[1].nodeValue;
					            }
					            
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

   createjs.e_rectangle = createjs.promote(e_rectangle, "Container");
}());