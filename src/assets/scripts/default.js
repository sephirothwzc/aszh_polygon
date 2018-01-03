/* eslint-disable */
/* eslint-disable */

var __markInfo = {
    projectId: 6743,
    assignId: 361699,
    personId: 976916,
    dataId: 76210592,
    markedCount: 0,
    dataResultId: 0,
    projectTitle: '2016\u7b2c1062\u671f\u56fe\u7247\u6807\u6ce8\u4efb\u52a1',
    dataTitle: '277',
    assignPersonName: '\u5367\u9f99-\u5f20\u745c',
    operationCase: 2,
    qualityPackageId: 0,
    isGatherSource: false,
    projectIntro: '',
    source_key: '3b618a4f-b754-4ca0-baa4-f165e2b8d64b',
    loadSource: true,
    disable: false,
    TemplateId: 258,
    status: 0,
    checkstatus: 0,
    dataResultGuid: '512a20fe-309a-4d6b-a5c4-ebe14d795649',
    lastEditTime: '2017-02-22T09:54:46.333',
    qualityTime: '0001-01-01T00:00:00',
    checkTime: '0001-01-01T00:00:00',
    Type: 1,
    FileName: ''
  }

// e_enlarge.js
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

// e_canvastrim.js
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
   var t_top = (par.height() - (img.height * tempsc_w)) / 2 >0?(par.height() - (img.height * tempsc_w)) / 2 :0;
   if (tempsc_w > tempsc_h) {
      c.css("width", img.width * tempsc_h + "px");
      c.css("left", (par.width() - (img.width * tempsc_h)) / 2 + "px");
      c.css("top", "0");
      e_canvastrim.left = (par.width() - (img.width * tempsc_h)) / 2 + "px";
      e_canvastrim.top = "0";
   }
   else {
      c.css("width", par.width() + "px");
      c.css("top",t_top + "px");
      c.css("left", "0");
      e_canvastrim.left = "0";
      e_canvastrim.top = t_top + "px";
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


// default.js
var _editings = null;
var _isedit = false;
var _showtext = true;
var $img = null;
var imgWidth,imgHeight;

//---------------------拖动控件----------------

function afterDrag() {
    var cid = Number($(this).attr("tid"));
    var sid = Number($("#mycont .source").index($(this)));
    var tempobj = returnobj.datalist[cid];
    returnobj.datalist.splice(cid, 1);
    returnobj.datalist.splice(sid, 0, tempobj);
    refreshDrag();
}

function refreshDrag() {
    stage_t.removeAllChildren();
    // $("#mycont").empty();
    e_canvastrim.tnum = 0;
    // $("#mycont").dragsort("destroy");
    setdatas(returnobj.datalist);
    _editings = null;
    stage_b.removeAllChildren();
    sdelbtnhide();
    fieldhide();
    ablebtns();
}

//--------------------------
var _vdata1,
    _vdata2,
    _vdata3,
    _vdata4,
    _vdata5,
    _vdata6,
    _vdata7,
    _vdata8;
var _pdata1,
    _pdata2,
    _pdata3,
    _pdata4,
    _pdata5;

function trimvdatas() {
    _vdata1 = _vdata2 = _vdata3 = _vdata4 = _vdata5 = _vdata6 = _vdata7 = _vdata8 = 0;
    _pdata1 = _pdata2 = _pdata3 = _pdata4 = _pdata5 = 0;
    for (var i = 0; i < returnobj.datalist.length; i++) {
        switch (returnobj.datalist[i].type) {
            case "road":
            case "sidewalk":
            case "parking":
            case "rail track":
                _vdata1++;
                break;
            case "person":
            case "rider":
                _vdata2++;
                break;
            case "car":
            case "truck":
            case "bus":
            case "on rails":
            case "motorcycle":
            case "bicycle":
            case "caravan":
            case "trailer":
                _vdata3++;
                break;
            case "building":
            case "wall":
            case "fence":
            case "guard rail":
            case "bridge":
            case "tunnel":
            case "garage":
                _vdata4++;
                break;
            case "pole":
            case "pole group":
            case "traffic sign":
            case "traffic light":
            case "banner":
            case "billboard":
            case "street light":
            case "traffic device":
            case "lane divider":
            case "traffic sign frame":
            case "parking sign":
            case "traffic cone":
                _vdata5++;
                break;
            case "vegetation":
            case "terrain":
                _vdata6++;
                break;
            case "sky":
                _vdata7++;
                break;
            case "ground":
            case "dynamic":
            case "static":
                _vdata8++;
                break;


        }
        switch (returnobj.datalist[i].e_type) {
            case 1:
                _pdata1++;
                break;
            case 2:
                _pdata2++;
                break;
            case 3:
                _pdata3++;
                break;
            case 4:
                _pdata4++;
                break;
            case 5:
                _pdata5++;
                break;
        }
    }
}

function setvdata() {
    trimvdatas();
    for (var i = 1; i < 9; i++) {
        $("#vdata" + i).text(eval("_vdata" + i));
    }
    for (var i = 1; i < 6; i++) {
        $("#pdata" + i).text(eval("_pdata" + i));
    }
}

function draginit() {
    // $("#mycont").dragsort({placeHolderTemplate: '<div class="col-xs-1" style="padding: 0px 0px 0px;margin-top:2px; height: 42px; cursor: pointer;" testaaa >'
    // +'<div class="col-xs-12 qlbox" style="opacity: 0.5;"><div class="ql"></div></div></div></div></div>',
    //     dragEnd:afterDrag
    // });
}

var _epageX, _epageY;
$(document).bind("mousemove", function(e) {
    _epageX = e.pageX;
    _epageY = e.pageY;
})

function sdelbtnshow() {
    $("#sdelbtn").show();
    $("#sdelbtn").css("top", (_epageY - $(".main-page").offset().top - 18) + "px");
    $("#sdelbtn").css("left", (_epageX - $(".main-page").offset().left - 27) + "px");
}

function sdelbtnhide() {
    $("#sdelbtn").hide();
}

function fieldshow() {
    $("#typelist").css("display", "block");
    //$("#typelist").removeClass("fadeOut");
    //$("#typelist").addClass("fadeIn");
    $("#typelist").show();
    $("#typelist").removeAttr("disabled");
    $(".dropdown-submenu.open").removeClass("open");
    $("#typelist").css("top", (_epageY - $(".main-page").offset().top - 118) + "px");
    $("#typelist").css("left", (_epageX - $(".main-page").offset().left + 247) + "px");
}

function fieldhide() {
    $("#typelist").attr("disabled", "true");
    $("#typelist").hide();
    $(".dropdown-submenu.open").removeClass("open");
    $("input[name='typeOpts']").unbind("change");
    setvdata();
}
var stage;
var fps = 0;
var returnobj = new Object();
var stage_t;
var stage_b;
returnobj.datalist = new Array();
var retnum = 1;
var img = new Image();
var ablebtns;

var _logtype = 0;
var _logtime = 0;

function _svlogsubtime(type) {
    if (_logtime == 0) {
        _logtype = type;
        _logtime = new Date().getTime();
    } else {
        var _t = new Date().getTime();
        // window.crowd_log.SubTime.push(_logtype + "_" + ((_t - _logtime) / 1000));
        _logtype = type;
        _logtime = _t;
    }
}

function setdatas(data) {
    if (data == undefined || data == null || data.length == 0) {
        setvdata();
        return;
    } else {
        for (var i = 0; i < data.length; i++) {
            var temp;
            var visible = data[i].visible == undefined ? true : data[i].visible;
            switch (data[i].e_type) {
                case 1:
                    temp = new createjs.e_rectangle(true);
                    temp.visible = visible;
                    temp.fontSize = 16;
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
                case 2:
                    temp = new createjs.e_circle(true);
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
                case 3:
                    temp = new createjs.e_ellipse(true);
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
                case 4:
                    temp = new createjs.e_polygon(true);
                    temp.visible = visible;
                    temp.fontSize = 16;
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
                case 5:
                    temp = new createjs.e_polygonb(true);
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
            }
        }
        draginit();

    }
}

function getPixelData() {
    var start = new Date().getTime(); //起始时间
    $("#tcanvas").css("width", $("#myCanvas").css("width"));
    $("#tcanvas").css("height", $("#myCanvas").css("height"));
    $("#tcanvas").attr("width", $("#myCanvas").attr("width"));
    $("#tcanvas").attr("height", $("#myCanvas").attr("height"));
    var tcanvas = document.getElementById("tcanvas");
    var tcstage = new createjs.Stage("tcanvas");
    var tctx = tcanvas.getContext("2d");
    var data = returnobj.datalist;
    var tarr;
    var color, color0, color1, color2, t_type;
    if (data == undefined || data == null || data.length == 0) {
        return;
    } else {
        for (var i = 0; i < data.length; i++) {
            //tcstage.removeAllChildren();
            //tcstage.update();
            var temp;
            switch (data[i].e_type) {
                case 1:
                    temp = new createjs.e_rectangle(true);
                    temp.fontSize = 16;
                    temp.e_data = data[i].arr;
                    temp.e_obj = data[i];
                    temp.drawshape("", true);
                    tcstage.addChild(temp);
                    tcstage.update();
                    break;
                case 2:
                    temp = new createjs.e_circle(true);
                    temp.e_data = data[i].arr;
                    temp.e_obj = data[i];
                    temp.drawshape("", true);
                    tcstage.addChild(temp);
                    tcstage.update();
                    break;
                case 3:
                    temp = new createjs.e_ellipse(true);
                    temp.e_data = data[i].arr;
                    temp.e_obj = data[i];
                    temp.drawshape("", true);
                    tcstage.addChild(temp);
                    tcstage.update();
                    break;
                case 4:
                    temp = new createjs.e_polygon(true);
                    temp.fontSize = 16;
                    temp.e_data = data[i].arr;
                    temp.e_obj = data[i];
                    temp.drawshape("", true);
                    tcstage.addChild(temp);
                    tcstage.update();
                    break;
                case 5:
                    temp = new createjs.e_polygonb(true);
                    temp.e_data = data[i].arr;
                    temp.e_obj = data[i];
                    temp.drawshape("", true);
                    tcstage.addChild(temp);
                    tcstage.update();
                    break;
            }
        }
        tarr = tctx.getImageData(0, 0, tctx.canvas.width, tctx.canvas.height);
        var m = 0,
            n = 0;
        var _w = tctx.canvas.width;
        var _t;
        var tid;
        var retarr = new Array();
        for (var j = 0; j < tarr.data.length; j += 4) {
            tid = e_color.findid(tarr.data[j], tarr.data[j + 1], tarr.data[j + 2]);
            m = (j / 4) % _w + 1;
            n = parseInt((j / 4) / _w) + 1;
            _t = new Object();
            _t.wh = [m, n];
            _t.type = tid;
            _t.rgb = [tarr.data[j], tarr.data[j + 1], tarr.data[j + 2]];
            retarr.push(_t);
        }
    }
    var end = new Date().getTime(); //接受时间
    console.log("处理像素时间" + (end - start) + "ms"); //返回函数执行需要时间
    //return retarr;
    return tcstage.toDataURL("#FFF", "png");
}

var timingsave;
var args = {
    taskId: __markInfo.projectId,
    dataId: __markInfo.dataId,
    personInTaskId: __markInfo.assignId,
    dataTitle: __markInfo.dataTitle,
    type: __markInfo.type
};
    
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
    
var redo = getQueryString("agin");
if (redo != null) {
    redo = redo.toLowerCase() == "true";
} else {
    redo = false;
}
    
timingsave = function(trig) {
    if (returnobj.datalist.length > 0) {
        for (var i = 0; i < returnobj.datalist.length; i++) {
            if (returnobj.datalist[i].e_type != undefined) {
                switch (returnobj.datalist[i].e_type) {
                    case 1:
                        returnobj.datalist[i].e_ttext = "rectangle";
                        break;
                    case 2:
                        returnobj.datalist[i].e_ttext = "circle";
                        break;
                    case 3:
                        returnobj.datalist[i].e_ttext = "ellipse";
                        break;
                    case 4:
                        returnobj.datalist[i].e_ttext = "polygon_a";
                        break;
                    case 5:
                        returnobj.datalist[i].e_ttext = "polygon_b";
                        break;
                    default:
                        break;
                }
            }
            if (returnobj.datalist[i].type != undefined) {
                switch (returnobj.datalist[i].type) {
                    case "road":
                        returnobj.datalist[i].e_etext = "路面";
                        break;
                    case "sidewalk":
                        returnobj.datalist[i].e_etext = "人行道";
                        break;
                    case "parking":
                        returnobj.datalist[i].e_etext = "停车场";
                        break;
                    case "rail track":
                        returnobj.datalist[i].e_etext = "火车道、地铁车道";
                        break;
                    case "person":
                        returnobj.datalist[i].e_etext = "行人或推车的人";
                        break;
                    case "rider":
                        returnobj.datalist[i].e_etext = "骑车的人";
                        break;
                    case "car":
                        returnobj.datalist[i].e_etext = "小汽车";
                        break;
                    case "truck":
                        returnobj.datalist[i].e_etext = "卡车";
                        break;
                    case "bus":
                        returnobj.datalist[i].e_etext = "公共汽车";
                        break;
                    case "on rails":
                        returnobj.datalist[i].e_etext = "轨道上的火车、地铁列车、有轨电车";
                        break;
                    case "motorcycle":
                        returnobj.datalist[i].e_etext = "摩托车、电动车";
                        break;
                    case "bicycle":
                        returnobj.datalist[i].e_etext = "自行车";
                        break;
                    case "caravan":
                        returnobj.datalist[i].e_etext = "房车";
                        break;
                    case "trailer":
                        returnobj.datalist[i].e_etext = "小汽车后面的拖车";
                        break;
                    case "building":
                        returnobj.datalist[i].e_etext = "建筑物，包含脚手架";
                        break;
                    case "wall":
                        returnobj.datalist[i].e_etext = "单独的墙";
                        break;
                    case "fence":
                        returnobj.datalist[i].e_etext = "篱笆";
                        break;
                    case "guard rail":
                        returnobj.datalist[i].e_etext = "护栏";
                        break;
                    case "bridge":
                        returnobj.datalist[i].e_etext = "桥体";
                        break;
                    case "tunnel":
                        returnobj.datalist[i].e_etext = "隧道";
                        break;
                    case "garage":
                        returnobj.datalist[i].e_etext = "车库";
                        break;
                    case "pole":
                        returnobj.datalist[i].e_etext = "各类杆子";
                        break;
                    case "pole group":
                        returnobj.datalist[i].e_etext = "一群远处的杆子";
                        break;
                    case "traffic sign":
                        returnobj.datalist[i].e_etext = "交通标志";
                        break;
                    case "traffic light":
                        returnobj.datalist[i].e_etext = "红绿灯";
                        break;
                    case "banner":
                        returnobj.datalist[i].e_etext = "刀旗或者横幅、小的广告牌";
                        break;
                    case "billboard":
                        returnobj.datalist[i].e_etext = "大型高速路路旁广告牌";
                        break;
                    case "street light":
                        returnobj.datalist[i].e_etext = "路灯";
                        break;
                    case "traffic device":
                        returnobj.datalist[i].e_etext = "超速摄像头或者其他监控头";
                        break;
                    case "lane divider":
                        returnobj.datalist[i].e_etext = "车道分离栏（物）";
                        break;
                    case "traffic sign frame":
                        returnobj.datalist[i].e_etext = "高速路上交通标志的外框";
                        break;
                    case "parking sign":
                        returnobj.datalist[i].e_etext = "停车场标识";
                        break;
                    case "traffic cone":
                        returnobj.datalist[i].e_etext = "交通桩（如三角桩）";
                        break;
                    case "vegetation":
                        returnobj.datalist[i].e_etext = "垂直生长的乔木、灌木植物";
                        break;
                    case "terrain":
                        returnobj.datalist[i].e_etext = "平着生长的草，沙地，土地等";
                        break;
                    case "sky":
                        returnobj.datalist[i].e_etext = "天空";
                        break;
                    case "ground":
                        returnobj.datalist[i].e_etext = "其他地面";
                        break;
                    case "dynamic":
                        returnobj.datalist[i].e_etext = "其他动态物体";
                        break;
                    case "static":
                        returnobj.datalist[i].e_etext = "其他静态物体";
                        break;
                    default:
                        break;
                }
            }
            if (returnobj.datalist[i].e_etext != undefined) {
                switch (returnobj.datalist[i].e_etext) {
                    case "路面":
                        returnobj.datalist[i].e_etext_num = "1_1";
                        break;
                    case "人行道":
                        returnobj.datalist[i].e_etext_num = "1_2";
                        break;
                    case "停车场":
                        returnobj.datalist[i].e_etext_num = "1_3";
                        break;
                    case "火车道、地铁车道":
                        returnobj.datalist[i].e_etext_num = "1_4";
                        break;
                    case "行人或推车的人":
                        returnobj.datalist[i].e_etext_num = "2_5";
                        break;
                    case "骑车的人":
                        returnobj.datalist[i].e_etext_num = "2_6";
                        break;
                    case "小汽车":
                        returnobj.datalist[i].e_etext_num = "3_7";
                        break;
                    case "卡车":
                        returnobj.datalist[i].e_etext_num = "3_8";
                        break;
                    case "公共汽车":
                        returnobj.datalist[i].e_etext_num = "3_9";
                        break;
                    case "轨道上的火车、地铁列车、有轨电车":
                        returnobj.datalist[i].e_etext_num = "3_10";
                        break;
                    case "摩托车、电动车":
                        returnobj.datalist[i].e_etext_num = "3_11";
                        break;
                    case "自行车":
                        returnobj.datalist[i].e_etext_num = "3_12";
                        break;
                    case "房车":
                        returnobj.datalist[i].e_etext_num = "3_13";
                        break;
                    case "小汽车后面的拖车":
                        returnobj.datalist[i].e_etext_num = "3_14";
                        break;
                    case "建筑物，包含脚手架":
                        returnobj.datalist[i].e_etext_num = "4_15";
                        break;
                    case "单独的墙":
                        returnobj.datalist[i].e_etext_num = "4_16";
                        break;
                    case "篱笆":
                        returnobj.datalist[i].e_etext_num = "4_17";
                        break;
                    case "护栏":
                        returnobj.datalist[i].e_etext_num = "4_18";
                        break;
                    case "桥体":
                        returnobj.datalist[i].e_etext_num = "4_19";
                        break;
                    case "隧道":
                        returnobj.datalist[i].e_etext_num = "4_20";
                        break;
                    case "各类杆子":
                        returnobj.datalist[i].e_etext_num = "5_21";
                        break;
                    case "一群远处的杆子":
                        returnobj.datalist[i].e_etext_num = "5_21";
                        break;
                    case "交通标志":
                        returnobj.datalist[i].e_etext_num = "5_21";
                        break;
                    case "红绿灯":
                        returnobj.datalist[i].e_etext_num = "5_21";
                        break;
                    case "垂直生长的乔木、灌木植物":
                        returnobj.datalist[i].e_etext_num = "6_25";
                        break;
                    case "平着生长的草，沙地，土地等":
                        returnobj.datalist[i].e_etext_num = "6_26";
                        break;
                    case "天空":
                        returnobj.datalist[i].e_etext_num = "7_27";
                        break;
                    case "其他地面":
                        returnobj.datalist[i].e_etext_num = "8_28";
                        break;
                    case "其他动态物体":
                        returnobj.datalist[i].e_etext_num = "8_29";
                        break;
                    case "其他静态物体":
                        returnobj.datalist[i].e_etext_num = "8_30";
                        break;
                    default:
                        break;
                }
            }
        }
        var result = {
            datalist: returnobj.datalist,
            tnum: retnum,
            pixdata: getPixelData(),
            img: $img,
            workload: {
                count: 1,
                r: ~~(_pdata1),
                c: ~~(_pdata2),
                e: ~~(_pdata3),
                d: ~~(_pdata4),
                t: ~~(_pdata5),
                flat: ~~(_vdata1),
                human: ~~(_vdata2),
                vehicle: ~~(_vdata3),
                construction: ~~(_vdata4),
                object: ~~(_vdata5),
                nature: ~~(_vdata6),
                sky: ~~(_vdata7),
                void1: ~~(_vdata8)
            }
        };
        result.effective = $("[name='effective']:checked").val();
        var postData = {
            ProjectId: args.taskId,
            DataId: args.dataId,
            DataTitle: args.dataTitle,
            AssignId: args.personInTaskId,
            ResultJson: JSON.stringify(result),
            IsValid: true,
            FeedBack: args.FeedBack
        };
        $.ajax({
            url: "/api/dataresult/save2",
            data: postData,
            method: "POST",
            async: false
        }).success(function(response) {
            if (trig == true) {
                alert("保存成功")
            }
            console.log("保存成功");
        }).fail(function(msg) {
            if (trig == true) {
                alert("保存失败")
            }
            console.log("保存失败");
        });
    }
}
$("#localsave").bind("click", function() {
    timingsave(true);
});
$(window).keydown(function(e) {
    if (e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();
        timingsave(true);
    } else if (e.keyCode == 82) {
        $("#rectangle").click();
    } else if (e.keyCode == 67) {
        $("#circle").click();
    } else if (e.keyCode == 68) {
        $("#polygon").click();
    } else if (e.keyCode == 69) {
        $("#ellipse").click();
    } else if (e.keyCode == 84) {
        $("#polygonb").click();
    }
});

$(".dropdown-submenu").bind("click", function() {
    $(".dropdown-submenu").removeClass("open");
    $(this).addClass("open");
})

if (__markInfo.operationCase == 4) {
    $("#tmpsave").css("display", "none");
}
$("#tmpsave").bind("click", function() {
    timingsave(true);
});

$("#tmphide").bind("click", function() {
    _showtext = false;
    for (var i = 0; i < stage_t.children.length; i++) {
        var tempcc = stage_t.children[i].getChildByName("text");
        if (tempcc != null) {
            tempcc.visible = false;
        }
    }
    $("#tmpshow").show();
    $("#tmphide").hide();
})

$("#tmpshow").bind("click", function() {
    _showtext = true;
    for (var i = 0; i < stage_t.children.length; i++) {
        var tempcc = stage_t.children[i].getChildByName("text");
        if (tempcc != null) {
            tempcc.visible = true;
        }
    }
    $("#tmpshow").hide();
    $("#tmphide").show();
})


var displayAll = true;
$("#allshow").bind("click", function(e) {

    var datalist = returnobj.datalist;
    if (displayAll) {
        $("#allshow").text('全部显示');

        var data = null;
        for (var ii = 0; ii < datalist.length; ii++) {
            data = datalist[ii];
            data.visible = false;
        }

        displayAll = false;
    } else {
        $("#allshow").text('全部隐藏');

        var data = null;
        for (var ii = 0; ii < datalist.length; ii++) {
            data = datalist[ii];
            data.visible = true;
        }

        displayAll = true;
    }

    refreshDrag();
})


var displayCross = true;

// 绘制十字架
var lastX, lastY, can, context, cw, ch;
var imgRate;

function drawCross(e) {

    if (!displayCross) {
        return;
    }

    var x = e.cx,
        y = e.cy;

    context.save();
    context.translate(0.5, 0.5);
    context.lineWidth = 1;
    context.setLineDash([4, 5]);
    context.strokeStyle = '#ff0000';

    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(cw, y);

    context.moveTo(x, 0);
    context.lineTo(x, ch);
    context.closePath();

    context.stroke();
    context.restore();

    lastX = x;
    lastY = y;
}

// 处理stage的mouse over事件
function evt_mousemove(e) {
    if (!context) {
        can = document.getElementById('myCanvas');
        context = can.getContext('2d');

        cw = can.width;
        ch = can.height;

        createjs.Ticker.addEventListener("tick", function(event) {
            drawCross({ cx: lastX, cy: lastY });
        });
    }

    var evt = {
        cx: e.stageX,
        cy: e.stageY
    }
    drawCross(evt);
}

function deleteNone() {
    var l = returnobj.datalist.length;
    if (l > 0 && returnobj.datalist[l - 1].type == undefined) {
        returnobj.datalist.splice(l - 1, 1);
        // stage.removeAllEventListeners();
        refreshDrag();
    }

}

crowd.dataMark.useIcheck = false;
crowd.dataMark.addExtension("DataMark.Plugin.Picture", function() {
    return {
        checkValidata: function() {

            return true;
        },
        getFormSerizlize: function() {
            for (var i = 0; i < returnobj.datalist.length; i++) {
                if (returnobj.datalist[i].e_type != undefined) {
                    switch (returnobj.datalist[i].e_type) {
                        case 1:
                            returnobj.datalist[i].e_ttext = "rectangle";
                            break;
                        case 2:
                            returnobj.datalist[i].e_ttext = "circle";
                            break;
                        case 3:
                            returnobj.datalist[i].e_ttext = "ellipse";
                            break;
                        case 4:
                            returnobj.datalist[i].e_ttext = "polygon_a";
                            break;
                        case 5:
                            returnobj.datalist[i].e_ttext = "polygon_b";
                            break;
                        default:
                            break;
                    }
                }
                if (returnobj.datalist[i].type != undefined) {
                    switch (returnobj.datalist[i].type) {
                        case "road":
                            returnobj.datalist[i].e_etext = "路面";
                            break;
                        case "sidewalk":
                            returnobj.datalist[i].e_etext = "人行道";
                            break;
                        case "parking":
                            returnobj.datalist[i].e_etext = "停车场";
                            break;
                        case "rail track":
                            returnobj.datalist[i].e_etext = "火车道、地铁车道";
                            break;
                        case "person":
                            returnobj.datalist[i].e_etext = "行人或推车的人";
                            break;
                        case "rider":
                            returnobj.datalist[i].e_etext = "骑车的人";
                            break;
                        case "car":
                            returnobj.datalist[i].e_etext = "小汽车";
                            break;
                        case "truck":
                            returnobj.datalist[i].e_etext = "卡车";
                            break;
                        case "bus":
                            returnobj.datalist[i].e_etext = "公共汽车";
                            break;
                        case "on rails":
                            returnobj.datalist[i].e_etext = "轨道上的火车、地铁列车、有轨电车";
                            break;
                        case "motorcycle":
                            returnobj.datalist[i].e_etext = "摩托车、电动车";
                            break;
                        case "bicycle":
                            returnobj.datalist[i].e_etext = "自行车";
                            break;
                        case "caravan":
                            returnobj.datalist[i].e_etext = "房车";
                            break;
                        case "trailer":
                            returnobj.datalist[i].e_etext = "小汽车后面的拖车";
                            break;
                        case "building":
                            returnobj.datalist[i].e_etext = "建筑物，包含脚手架";
                            break;
                        case "wall":
                            returnobj.datalist[i].e_etext = "单独的墙";
                            break;
                        case "fence":
                            returnobj.datalist[i].e_etext = "篱笆";
                            break;
                        case "guard rail":
                            returnobj.datalist[i].e_etext = "护栏";
                            break;
                        case "bridge":
                            returnobj.datalist[i].e_etext = "桥体";
                            break;
                        case "tunnel":
                            returnobj.datalist[i].e_etext = "隧道";
                            break;
                        case "garage":
                            returnobj.datalist[i].e_etext = "车库";
                            break;
                        case "pole":
                            returnobj.datalist[i].e_etext = "各类杆子";
                            break;
                        case "pole group":
                            returnobj.datalist[i].e_etext = "一群远处的杆子";
                            break;
                        case "traffic sign":
                            returnobj.datalist[i].e_etext = "交通标志";
                            break;
                        case "traffic light":
                            returnobj.datalist[i].e_etext = "红绿灯";
                            break;
                        case "banner":
                            returnobj.datalist[i].e_etext = "刀旗或者横幅、小的广告牌";
                            break;
                        case "billboard":
                            returnobj.datalist[i].e_etext = "大型高速路路旁广告牌";
                            break;
                        case "street light":
                            returnobj.datalist[i].e_etext = "路灯";
                            break;
                        case "traffic device":
                            returnobj.datalist[i].e_etext = "超速摄像头或者其他监控头";
                            break;
                        case "lane divider":
                            returnobj.datalist[i].e_etext = "车道分离栏（物）";
                            break;
                        case "traffic sign frame":
                            returnobj.datalist[i].e_etext = "高速路上交通标志的外框";
                            break;
                        case "parking sign":
                            returnobj.datalist[i].e_etext = "停车场标识";
                            break;
                        case "traffic cone":
                            returnobj.datalist[i].e_etext = "交通桩（如三角桩）";
                            break;
                        case "vegetation":
                            returnobj.datalist[i].e_etext = "垂直生长的乔木、灌木植物";
                            break;
                        case "terrain":
                            returnobj.datalist[i].e_etext = "平着生长的草，沙地，土地等";
                            break;
                        case "sky":
                            returnobj.datalist[i].e_etext = "天空";
                            break;
                        case "ground":
                            returnobj.datalist[i].e_etext = "其他地面";
                            break;
                        case "dynamic":
                            returnobj.datalist[i].e_etext = "其他动态物体";
                            break;
                        case "static":
                            returnobj.datalist[i].e_etext = "其他静态物体";
                            break;
                        default:
                            break;
                    }
                }
                if (returnobj.datalist[i].e_etext != undefined) {
                    switch (returnobj.datalist[i].e_etext) {
                        case "路面":
                            returnobj.datalist[i].e_etext_num = "1_1";
                            break;
                        case "人行道":
                            returnobj.datalist[i].e_etext_num = "1_2";
                            break;
                        case "停车场":
                            returnobj.datalist[i].e_etext_num = "1_3";
                            break;
                        case "火车道、地铁车道":
                            returnobj.datalist[i].e_etext_num = "1_4";
                            break;
                        case "行人或推车的人":
                            returnobj.datalist[i].e_etext_num = "2_5";
                            break;
                        case "骑车的人":
                            returnobj.datalist[i].e_etext_num = "2_6";
                            break;
                        case "小汽车":
                            returnobj.datalist[i].e_etext_num = "3_7";
                            break;
                        case "卡车":
                            returnobj.datalist[i].e_etext_num = "3_8";
                            break;
                        case "公共汽车":
                            returnobj.datalist[i].e_etext_num = "3_9";
                            break;
                        case "轨道上的火车、地铁列车、有轨电车":
                            returnobj.datalist[i].e_etext_num = "3_10";
                            break;
                        case "摩托车、电动车":
                            returnobj.datalist[i].e_etext_num = "3_11";
                            break;
                        case "自行车":
                            returnobj.datalist[i].e_etext_num = "3_12";
                            break;
                        case "房车":
                            returnobj.datalist[i].e_etext_num = "3_13";
                            break;
                        case "小汽车后面的拖车":
                            returnobj.datalist[i].e_etext_num = "3_14";
                            break;
                        case "建筑物，包含脚手架":
                            returnobj.datalist[i].e_etext_num = "4_15";
                            break;
                        case "单独的墙":
                            returnobj.datalist[i].e_etext_num = "4_16";
                            break;
                        case "篱笆":
                            returnobj.datalist[i].e_etext_num = "4_17";
                            break;
                        case "护栏":
                            returnobj.datalist[i].e_etext_num = "4_18";
                            break;
                        case "桥体":
                            returnobj.datalist[i].e_etext_num = "4_19";
                            break;
                        case "隧道":
                            returnobj.datalist[i].e_etext_num = "4_20";
                            break;
                        case "各类杆子":
                            returnobj.datalist[i].e_etext_num = "5_21";
                            break;
                        case "一群远处的杆子":
                            returnobj.datalist[i].e_etext_num = "5_21";
                            break;
                        case "交通标志":
                            returnobj.datalist[i].e_etext_num = "5_21";
                            break;
                        case "红绿灯":
                            returnobj.datalist[i].e_etext_num = "5_21";
                            break;
                        case "垂直生长的乔木、灌木植物":
                            returnobj.datalist[i].e_etext_num = "6_25";
                            break;
                        case "平着生长的草，沙地，土地等":
                            returnobj.datalist[i].e_etext_num = "6_26";
                            break;
                        case "天空":
                            returnobj.datalist[i].e_etext_num = "7_27";
                            break;
                        case "其他地面":
                            returnobj.datalist[i].e_etext_num = "8_28";
                            break;
                        case "其他动态物体":
                            returnobj.datalist[i].e_etext_num = "8_29";
                            break;
                        case "其他静态物体":
                            returnobj.datalist[i].e_etext_num = "8_30";
                            break;
                        default:
                            break;
                    }
                }
            }
            var result = {
                datalist: returnobj.datalist,
                tnum: retnum,
                pixdata: getPixelData(),
                img: $img,
                pixdata: "",
                workload: {
                    count: 1,
                    r: ~~(_pdata1),
                    c: ~~(_pdata2),
                    e: ~~(_pdata3),
                    d: ~~(_pdata4),
                    t: ~~(_pdata5),
                    flat: ~~(_vdata1),
                    human: ~~(_vdata2),
                    vehicle: ~~(_vdata3),
                    construction: ~~(_vdata4),
                    object: ~~(_vdata5),
                    nature: ~~(_vdata6),
                    sky: ~~(_vdata7),
                    void1: ~~(_vdata8)
                }
            };
            result.effective = $("[name='effective']:checked").val();

            return result;
        },
        initialize: function(source) {
            //标注信息
            var markInfo = crowd.dataMark.getMarkInfo();
            if (source != null) {
                var imgsrc = "src/assets/img/"+source.images;

                $img = imgsrc;

                $(function() {
                    img.crossOrigin = "Anonymous";
                    img.src = imgsrc;
                    var _lssttime = new Date().getTime();

                    img.onload = function() {
                        var c = $("#myCanvas");
                        // 绑定按钮 没用 删掉
                        e_canvastrim.init(c);
                        imgWidth = this.width;
                        imgHeight = this.height;

                        console.info('origianl image width and height:' + imgWidth + ',' + imgHeight);

                        init();
                        var _lsendtime = new Date().getTime();
                        // window.crowd_log.DataLoadTime = (_lsendtime - _lssttime) / 1000;
                    };

                    function disablebtns() {
                        $("#rectangle").attr("disabled", "disabled");
                        $("#circle").attr("disabled", "disabled");
                        $("#ellipse").attr("disabled", "disabled");
                        $("#polygon").attr("disabled", "disabled");
                        $("#polygonb").attr("disabled", "disabled");
                    }

                    ablebtns = function() {
                        $("#rectangle").removeAttr("disabled");
                        $("#circle").removeAttr("disabled");
                        $("#ellipse").removeAttr("disabled");
                        $("#polygon").removeAttr("disabled");
                        $("#polygonb").removeAttr("disabled");
                    }

                    //矩形
                    $("#rectangle").bind("click", function() {
                        displayCross = true;
                        _isedit = true;
                        refreshDrag();
                        _svlogsubtime(1);
                        disablebtns();
                        var t_re = new createjs.e_rectangle();
                        stage_t.addChild(t_re);
                        returnobj.datalist.push(t_re.e_obj);
                        this.blur();
                    });

                    // 多边形点击
                    $("#polygon").bind("click", function() {
                        displayCross = false;
                        _isedit = true;
                        refreshDrag();
                        _svlogsubtime(4);
                        disablebtns();
                        var t_pl = new createjs.e_polygon();
                        stage_t.addChild(t_pl);
                        returnobj.datalist.push(t_pl.e_obj);
                        this.blur();
                    });

                    $("#myCanvas").bind("contextmenu", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });

                    $("#sdelbtn").bind("contextmenu", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });

                    $(document).bind("keydown", function(evt) {
                        if (evt.keyCode == 46) {
                            deleteNone();
                        }
                    });

                    $("#sdelbtn").bind("click", function() {
                        if (_editings != null) {
                            _editings.cdel();
                            stage_b.removeAllChildren();
                        }
                        sdelbtnhide();
                    })

                    function init() {
                        stage = new createjs.Stage("myCanvas");
                        stage.enableMouseOver(10);

                        var t1 = new createjs.Bitmap(img); //街景图片
                        stage.addChild(t1);

                        stage_t = new createjs.Container();
                        stage_b = new createjs.Container();
                        stage.addChild(stage_t);
                        stage.addChild(stage_b);

                        e_enlarge.init(stage);

                        $(document).keydown(function(evt) {
                            if (evt.keyCode == 32) {
                                if ($(".canvasmask").css("display") == "none") {
                                    $(".canvasmask").css("display", "block");
                                }
                                evt.stopPropagation();
                                evt.preventDefault();
                            }
                        });

                        $(document).keyup(function(evt) {
                            if (evt.keyCode == 32) {
                                $(".canvasmask").css("display", "none");
                            }
                        });

                        var tc_x, tc_y;
                        var tempt, templ;
                        var width = img.width;
                        var widthInit = Number($("#myCanvas").css("width").replace("px", ""));
                        var rateWidth = parseInt(widthInit / width * 100);
                        imgRate = rateWidth;

                        var zoomDiv = "<div id='zommDiv' style='position:absolute;left:10px;top:5px;background:#fffef9;width:90px;height:20px;z-index:9999'>级别：" + rateWidth + "% </div>";
                        $('.canvasframe').prepend(zoomDiv);

                        function cm_mousemove(evt) {
                            console.log("tc_x:" + tc_x + "|tc_y:" + tc_y);
                            var t__x = (tempt + evt.pageY - tc_y);
                            var t__y = (templ + evt.pageX - tc_x);
                            $("#myCanvas").css("left", t__y + "px");
                            $("#myCanvas").css("top", t__x + "px");
                        }

                        $(".canvasmask").bind("mousedown", function(evt) {
                            tempt = Number($("#myCanvas").css("top").replace("px", ""));
                            templ = Number($("#myCanvas").css("left").replace("px", ""));
                            tc_x = evt.pageX;
                            tc_y = evt.pageY;
                            console.log("downx:" + evt.pageX + "|y:" + evt.pageY);
                            $(".canvasmask").bind("mousemove", cm_mousemove);
                            evt.stopPropagation();
                            evt.preventDefault();
                        });

                        $(".canvasmask").bind("mouseup", function(evt) {
                            console.log("upx:" + evt.pageX + "|y:" + evt.pageY);
                            $(".canvasmask").unbind("mousemove", cm_mousemove);
                            tempt = Number($("#myCanvas").css("top").replace("px", ""));
                            templ = Number($("#myCanvas").css("left").replace("px", ""));
                            evt.stopPropagation();
                            evt.preventDefault();
                        });

                        $(".canvasframe").mousewheel(function(evt, del) {
                            console.log("offsetx:" + evt.offsetX + "|offsety:" + evt.offsetY);

                            var tempw = Number($("#myCanvas").css("width").replace("px", ""));
                            var tempt = Number($("#myCanvas").css("top").replace("px", ""));
                            var templ = Number($("#myCanvas").css("left").replace("px", ""));

                            var scale = 1.2;
                            var newTop, newLeft;

                            if (del > 0) {
                                var newWidth = tempw * scale;
                                $("#myCanvas").css("width", newWidth + "px");
                                imgRate = parseInt(newWidth / width * 100);

                                newLeft = templ - (scale * evt.offsetX - evt.offsetX);
                                newTop = tempt - (scale * evt.offsetY - evt.offsetY);

                                $("#myCanvas").css("top", newTop + "px");
                                $("#myCanvas").css("left", newLeft + "px");

                                $("#zommDiv").html("级别：" + imgRate + "%");
                            } else {
                                var newWidth = tempw / scale;
                                imgRate = parseInt(newWidth / width * 100);

                                newLeft = templ + (evt.offsetX - evt.offsetX / scale);
                                newTop = tempt + (evt.offsetY - evt.offsetY / scale);

                                $("#myCanvas").css("width", newWidth + "px");
                                $("#myCanvas").css("top", newTop + "px");
                                $("#myCanvas").css("left", newLeft + "px");

                                $("#zommDiv").html("级别：" + imgRate + "%");
                            }

                            evt.stopPropagation();
                            evt.preventDefault();
                        });

                        stage_t.addEventListener("click", function(e) {
                            if (e.nativeEvent.which == 3 && _editings != null) {
                                sdelbtnshow();
                            }
                        });

                        $(document).bind("click", function() {
                            sdelbtnhide();
                        });

                        createjs.Ticker.setFPS(30);

                        createjs.Ticker.addEventListener("tick", stage);

                        // 为stage添加mousemove事件，来监听mouseover事件
                        stage.addEventListener("stagemousemove", evt_mousemove);

                        if (crowd.dataMark.dataResult != null && crowd.dataMark.dataResult != undefined && crowd.dataMark.dataResult.datalist != undefined) {
                            $("[name='effective']:checked").val(crowd.dataMark.dataResult.effective);

                            returnobj.datalist = crowd.dataMark.dataResult.datalist;

                            for (var ii = 0; ii < returnobj.datalist.length; ii++) {
                                returnobj.datalist[ii].visible = true;
                            }

                            setdatas(crowd.dataMark.dataResult.datalist);

                            retnum = crowd.dataMark.dataResult.tnum;
                            setvdata();
                        } else {
                            //$(".id_input").val(retnum + '_');
                        }
                    }
                });
            }

        },
        qualityForm: function() {
            /// <summary>
            /// 质检表单
            /// </summary>
            /// <returns type=""></returns>

            return [
                { sort: 1, value: "有效性错误" },
                { sort: 2, value: "框属性错误" },
                { sort: 3, value: "框不贴合" },
                { sort: 4, value: "漏标" },
                { sort: 5, value: "其他" }
            ];
        }
    }
});
// window.crowd_log.DataLoadTime = (_lsendtime - _lssttime) / 1000;


function disablebtns() {
    $("#rectangle").attr("disabled", "disabled");
    $("#circle").attr("disabled", "disabled");
    $("#ellipse").attr("disabled", "disabled");
    $("#polygon").attr("disabled", "disabled");
    $("#polygonb").attr("disabled", "disabled");
}

ablebtns = function() {
    $("#rectangle").removeAttr("disabled");
    $("#circle").removeAttr("disabled");
    $("#ellipse").removeAttr("disabled");
    $("#polygon").removeAttr("disabled");
    $("#polygonb").removeAttr("disabled");
}

//矩形
$("#rectangle").bind("click", function() {
    displayCross = true;
    _isedit = true;
    refreshDrag();
    _svlogsubtime(1);
    disablebtns();
    var t_re = new createjs.e_rectangle();
    stage_t.addChild(t_re);
    returnobj.datalist.push(t_re.e_obj);
    this.blur();
});

// 多边形点击
$("#polygon").bind("click", function() {
    displayCross = false;
    _isedit = true;
    refreshDrag();
    _svlogsubtime(4);
    disablebtns();
    var t_pl = new createjs.e_polygon();
    stage_t.addChild(t_pl);
    returnobj.datalist.push(t_pl.e_obj);
    this.blur();
});

$("#myCanvas").bind("contextmenu", function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

$("#sdelbtn").bind("contextmenu", function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

$(document).bind("keydown", function(evt) {
    if (evt.keyCode == 46) {
        deleteNone();
    }
});

$("#sdelbtn").bind("click", function() {
    if (_editings != null) {
        _editings.cdel();
        stage_b.removeAllChildren();
    }
    sdelbtnhide();
})

function init() {
    stage = new createjs.Stage("myCanvas");
    stage.enableMouseOver(10);

    var t1 = new createjs.Bitmap(img); //街景图片
    stage.addChild(t1);

    stage_t = new createjs.Container();
    stage_b = new createjs.Container();
    stage.addChild(stage_t);
    stage.addChild(stage_b);

    e_enlarge.init(stage);

    $(document).keydown(function(evt) {
        if (evt.keyCode == 32) {
            if ($(".canvasmask").css("display") == "none") {
                $(".canvasmask").css("display", "block");
            }
            evt.stopPropagation();
            evt.preventDefault();
        }
    });

    $(document).keyup(function(evt) {
        if (evt.keyCode == 32) {
            $(".canvasmask").css("display", "none");
        }
    });

    var tc_x, tc_y;
    var tempt, templ;
    var width = img.width;
    var widthInit = Number($("#myCanvas").css("width").replace("px", ""));
    var rateWidth = parseInt(widthInit / width * 100);
    imgRate = rateWidth;

    var zoomDiv = "<div id='zommDiv' style='position:absolute;left:10px;top:5px;background:#fffef9;width:90px;height:20px;z-index:9999'>级别：" + rateWidth + "% </div>";
    $('.canvasframe').prepend(zoomDiv);

    function cm_mousemove(evt) {
        console.log("tc_x:" + tc_x + "|tc_y:" + tc_y);
        var t__x = (tempt + evt.pageY - tc_y);
        var t__y = (templ + evt.pageX - tc_x);
        $("#myCanvas").css("left", t__y + "px");
        $("#myCanvas").css("top", t__x + "px");
    }

    $(".canvasmask").bind("mousedown", function(evt) {
        tempt = Number($("#myCanvas").css("top").replace("px", ""));
        templ = Number($("#myCanvas").css("left").replace("px", ""));
        tc_x = evt.pageX;
        tc_y = evt.pageY;
        console.log("downx:" + evt.pageX + "|y:" + evt.pageY);
        $(".canvasmask").bind("mousemove", cm_mousemove);
        evt.stopPropagation();
        evt.preventDefault();
    });

    $(".canvasmask").bind("mouseup", function(evt) {
        console.log("upx:" + evt.pageX + "|y:" + evt.pageY);
        $(".canvasmask").unbind("mousemove", cm_mousemove);
        tempt = Number($("#myCanvas").css("top").replace("px", ""));
        templ = Number($("#myCanvas").css("left").replace("px", ""));
        evt.stopPropagation();
        evt.preventDefault();
    });

    $(".canvasframe").mousewheel(function(evt, del) {
        console.log("offsetx:" + evt.offsetX + "|offsety:" + evt.offsetY);

        var tempw = Number($("#myCanvas").css("width").replace("px", ""));
        var tempt = Number($("#myCanvas").css("top").replace("px", ""));
        var templ = Number($("#myCanvas").css("left").replace("px", ""));

        var scale = 1.2;
        var newTop, newLeft;

        if (del > 0) {
            var newWidth = tempw * scale;
            $("#myCanvas").css("width", newWidth + "px");
            imgRate = parseInt(newWidth / width * 100);

            newLeft = templ - (scale * evt.offsetX - evt.offsetX);
            newTop = tempt - (scale * evt.offsetY - evt.offsetY);

            $("#myCanvas").css("top", newTop + "px");
            $("#myCanvas").css("left", newLeft + "px");

            $("#zommDiv").html("级别：" + imgRate + "%");
        } else {
            var newWidth = tempw / scale;
            imgRate = parseInt(newWidth / width * 100);

            newLeft = templ + (evt.offsetX - evt.offsetX / scale);
            newTop = tempt + (evt.offsetY - evt.offsetY / scale);

            $("#myCanvas").css("width", newWidth + "px");
            $("#myCanvas").css("top", newTop + "px");
            $("#myCanvas").css("left", newLeft + "px");

            $("#zommDiv").html("级别：" + imgRate + "%");
        }

        evt.stopPropagation();
        evt.preventDefault();
    });

    stage_t.addEventListener("click", function(e) {
        if (e.nativeEvent.which == 3 && _editings != null) {
            sdelbtnshow();
        }
    });

    $(document).bind("click", function() {
        sdelbtnhide();
    });

    createjs.Ticker.setFPS(30);

    createjs.Ticker.addEventListener("tick", stage);

    // 为stage添加mousemove事件，来监听mouseover事件
    stage.addEventListener("stagemousemove", evt_mousemove);

    if (crowd.dataMark.dataResult != null && crowd.dataMark.dataResult != undefined && crowd.dataMark.dataResult.datalist != undefined) {
        $("[name='effective']:checked").val(crowd.dataMark.dataResult.effective);

        returnobj.datalist = crowd.dataMark.dataResult.datalist;

        for (var ii = 0; ii < returnobj.datalist.length; ii++) {
            returnobj.datalist[ii].visible = true;
        }

        setdatas(crowd.dataMark.dataResult.datalist);

        retnum = crowd.dataMark.dataResult.tnum;
        setvdata();
    } else {
        //$(".id_input").val(retnum + '_');
    }
}

// e_polygon.js
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