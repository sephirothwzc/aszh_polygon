/* eslint-disable */
var _editings = null;
var _isedit = false;
var _showtext = true;
var $img = null;
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

// requirejs(['crowd.mark'], function(mark) {
//     var args = {
//         taskId: __markInfo.projectId,
//         dataId: __markInfo.dataId,
//         personInTaskId: __markInfo.assignId,
//         dataTitle: __markInfo.dataTitle,
//         type: __markInfo.type
//     };

//     function getQueryString(name) {
//         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//         var r = window.location.search.substr(1).match(reg);
//         if (r != null) return unescape(r[2]);
//         return null;
//     }

//     var redo = getQueryString("agin");
//     if (redo != null) {
//         redo = redo.toLowerCase() == "true";
//     } else {
//         redo = false;
//     }

//     timingsave = function(trig) {
//         if (returnobj.datalist.length > 0) {
//             for (var i = 0; i < returnobj.datalist.length; i++) {
//                 if (returnobj.datalist[i].e_type != undefined) {
//                     switch (returnobj.datalist[i].e_type) {
//                         case 1:
//                             returnobj.datalist[i].e_ttext = "rectangle";
//                             break;
//                         case 2:
//                             returnobj.datalist[i].e_ttext = "circle";
//                             break;
//                         case 3:
//                             returnobj.datalist[i].e_ttext = "ellipse";
//                             break;
//                         case 4:
//                             returnobj.datalist[i].e_ttext = "polygon_a";
//                             break;
//                         case 5:
//                             returnobj.datalist[i].e_ttext = "polygon_b";
//                             break;
//                         default:
//                             break;
//                     }
//                 }
//                 if (returnobj.datalist[i].type != undefined) {
//                     switch (returnobj.datalist[i].type) {
//                         case "road":
//                             returnobj.datalist[i].e_etext = "路面";
//                             break;
//                         case "sidewalk":
//                             returnobj.datalist[i].e_etext = "人行道";
//                             break;
//                         case "parking":
//                             returnobj.datalist[i].e_etext = "停车场";
//                             break;
//                         case "rail track":
//                             returnobj.datalist[i].e_etext = "火车道、地铁车道";
//                             break;
//                         case "person":
//                             returnobj.datalist[i].e_etext = "行人或推车的人";
//                             break;
//                         case "rider":
//                             returnobj.datalist[i].e_etext = "骑车的人";
//                             break;
//                         case "car":
//                             returnobj.datalist[i].e_etext = "小汽车";
//                             break;
//                         case "truck":
//                             returnobj.datalist[i].e_etext = "卡车";
//                             break;
//                         case "bus":
//                             returnobj.datalist[i].e_etext = "公共汽车";
//                             break;
//                         case "on rails":
//                             returnobj.datalist[i].e_etext = "轨道上的火车、地铁列车、有轨电车";
//                             break;
//                         case "motorcycle":
//                             returnobj.datalist[i].e_etext = "摩托车、电动车";
//                             break;
//                         case "bicycle":
//                             returnobj.datalist[i].e_etext = "自行车";
//                             break;
//                         case "caravan":
//                             returnobj.datalist[i].e_etext = "房车";
//                             break;
//                         case "trailer":
//                             returnobj.datalist[i].e_etext = "小汽车后面的拖车";
//                             break;
//                         case "building":
//                             returnobj.datalist[i].e_etext = "建筑物，包含脚手架";
//                             break;
//                         case "wall":
//                             returnobj.datalist[i].e_etext = "单独的墙";
//                             break;
//                         case "fence":
//                             returnobj.datalist[i].e_etext = "篱笆";
//                             break;
//                         case "guard rail":
//                             returnobj.datalist[i].e_etext = "护栏";
//                             break;
//                         case "bridge":
//                             returnobj.datalist[i].e_etext = "桥体";
//                             break;
//                         case "tunnel":
//                             returnobj.datalist[i].e_etext = "隧道";
//                             break;
//                         case "garage":
//                             returnobj.datalist[i].e_etext = "车库";
//                             break;
//                         case "pole":
//                             returnobj.datalist[i].e_etext = "各类杆子";
//                             break;
//                         case "pole group":
//                             returnobj.datalist[i].e_etext = "一群远处的杆子";
//                             break;
//                         case "traffic sign":
//                             returnobj.datalist[i].e_etext = "交通标志";
//                             break;
//                         case "traffic light":
//                             returnobj.datalist[i].e_etext = "红绿灯";
//                             break;
//                         case "banner":
//                             returnobj.datalist[i].e_etext = "刀旗或者横幅、小的广告牌";
//                             break;
//                         case "billboard":
//                             returnobj.datalist[i].e_etext = "大型高速路路旁广告牌";
//                             break;
//                         case "street light":
//                             returnobj.datalist[i].e_etext = "路灯";
//                             break;
//                         case "traffic device":
//                             returnobj.datalist[i].e_etext = "超速摄像头或者其他监控头";
//                             break;
//                         case "lane divider":
//                             returnobj.datalist[i].e_etext = "车道分离栏（物）";
//                             break;
//                         case "traffic sign frame":
//                             returnobj.datalist[i].e_etext = "高速路上交通标志的外框";
//                             break;
//                         case "parking sign":
//                             returnobj.datalist[i].e_etext = "停车场标识";
//                             break;
//                         case "traffic cone":
//                             returnobj.datalist[i].e_etext = "交通桩（如三角桩）";
//                             break;
//                         case "vegetation":
//                             returnobj.datalist[i].e_etext = "垂直生长的乔木、灌木植物";
//                             break;
//                         case "terrain":
//                             returnobj.datalist[i].e_etext = "平着生长的草，沙地，土地等";
//                             break;
//                         case "sky":
//                             returnobj.datalist[i].e_etext = "天空";
//                             break;
//                         case "ground":
//                             returnobj.datalist[i].e_etext = "其他地面";
//                             break;
//                         case "dynamic":
//                             returnobj.datalist[i].e_etext = "其他动态物体";
//                             break;
//                         case "static":
//                             returnobj.datalist[i].e_etext = "其他静态物体";
//                             break;
//                         default:
//                             break;
//                     }
//                 }
//                 if (returnobj.datalist[i].e_etext != undefined) {
//                     switch (returnobj.datalist[i].e_etext) {
//                         case "路面":
//                             returnobj.datalist[i].e_etext_num = "1_1";
//                             break;
//                         case "人行道":
//                             returnobj.datalist[i].e_etext_num = "1_2";
//                             break;
//                         case "停车场":
//                             returnobj.datalist[i].e_etext_num = "1_3";
//                             break;
//                         case "火车道、地铁车道":
//                             returnobj.datalist[i].e_etext_num = "1_4";
//                             break;
//                         case "行人或推车的人":
//                             returnobj.datalist[i].e_etext_num = "2_5";
//                             break;
//                         case "骑车的人":
//                             returnobj.datalist[i].e_etext_num = "2_6";
//                             break;
//                         case "小汽车":
//                             returnobj.datalist[i].e_etext_num = "3_7";
//                             break;
//                         case "卡车":
//                             returnobj.datalist[i].e_etext_num = "3_8";
//                             break;
//                         case "公共汽车":
//                             returnobj.datalist[i].e_etext_num = "3_9";
//                             break;
//                         case "轨道上的火车、地铁列车、有轨电车":
//                             returnobj.datalist[i].e_etext_num = "3_10";
//                             break;
//                         case "摩托车、电动车":
//                             returnobj.datalist[i].e_etext_num = "3_11";
//                             break;
//                         case "自行车":
//                             returnobj.datalist[i].e_etext_num = "3_12";
//                             break;
//                         case "房车":
//                             returnobj.datalist[i].e_etext_num = "3_13";
//                             break;
//                         case "小汽车后面的拖车":
//                             returnobj.datalist[i].e_etext_num = "3_14";
//                             break;
//                         case "建筑物，包含脚手架":
//                             returnobj.datalist[i].e_etext_num = "4_15";
//                             break;
//                         case "单独的墙":
//                             returnobj.datalist[i].e_etext_num = "4_16";
//                             break;
//                         case "篱笆":
//                             returnobj.datalist[i].e_etext_num = "4_17";
//                             break;
//                         case "护栏":
//                             returnobj.datalist[i].e_etext_num = "4_18";
//                             break;
//                         case "桥体":
//                             returnobj.datalist[i].e_etext_num = "4_19";
//                             break;
//                         case "隧道":
//                             returnobj.datalist[i].e_etext_num = "4_20";
//                             break;
//                         case "各类杆子":
//                             returnobj.datalist[i].e_etext_num = "5_21";
//                             break;
//                         case "一群远处的杆子":
//                             returnobj.datalist[i].e_etext_num = "5_21";
//                             break;
//                         case "交通标志":
//                             returnobj.datalist[i].e_etext_num = "5_21";
//                             break;
//                         case "红绿灯":
//                             returnobj.datalist[i].e_etext_num = "5_21";
//                             break;
//                         case "垂直生长的乔木、灌木植物":
//                             returnobj.datalist[i].e_etext_num = "6_25";
//                             break;
//                         case "平着生长的草，沙地，土地等":
//                             returnobj.datalist[i].e_etext_num = "6_26";
//                             break;
//                         case "天空":
//                             returnobj.datalist[i].e_etext_num = "7_27";
//                             break;
//                         case "其他地面":
//                             returnobj.datalist[i].e_etext_num = "8_28";
//                             break;
//                         case "其他动态物体":
//                             returnobj.datalist[i].e_etext_num = "8_29";
//                             break;
//                         case "其他静态物体":
//                             returnobj.datalist[i].e_etext_num = "8_30";
//                             break;
//                         default:
//                             break;
//                     }
//                 }
//             }
//             var result = {
//                 datalist: returnobj.datalist,
//                 tnum: retnum,
//                 pixdata: getPixelData(),
//                 img: $img,
//                 workload: {
//                     count: 1,
//                     r: ~~(_pdata1),
//                     c: ~~(_pdata2),
//                     e: ~~(_pdata3),
//                     d: ~~(_pdata4),
//                     t: ~~(_pdata5),
//                     flat: ~~(_vdata1),
//                     human: ~~(_vdata2),
//                     vehicle: ~~(_vdata3),
//                     construction: ~~(_vdata4),
//                     object: ~~(_vdata5),
//                     nature: ~~(_vdata6),
//                     sky: ~~(_vdata7),
//                     void1: ~~(_vdata8)
//                 }
//             };
//             result.effective = $("[name='effective']:checked").val();
//             var postData = {
//                 ProjectId: args.taskId,
//                 DataId: args.dataId,
//                 DataTitle: args.dataTitle,
//                 AssignId: args.personInTaskId,
//                 ResultJson: JSON.stringify(result),
//                 IsValid: true,
//                 FeedBack: args.FeedBack
//             };
//             $.ajax({
//                 url: "/api/dataresult/save2",
//                 data: postData,
//                 method: "POST",
//                 async: false
//             }).success(function(response) {
//                 if (trig == true) {
//                     alert("保存成功")
//                 }
//                 console.log("保存成功");
//             }).fail(function(msg) {
//                 if (trig == true) {
//                     alert("保存失败")
//                 }
//                 console.log("保存失败");
//             });
//         }
//     }
//     $("#localsave").bind("click", function() {
//         timingsave(true);
//     });
//     $(window).keydown(function(e) {
//         if (e.keyCode == 83 && e.ctrlKey) {
//             e.preventDefault();
//             timingsave(true);
//         } else if (e.keyCode == 82) {
//             $("#rectangle").click();
//         } else if (e.keyCode == 67) {
//             $("#circle").click();
//         } else if (e.keyCode == 68) {
//             $("#polygon").click();
//         } else if (e.keyCode == 69) {
//             $("#ellipse").click();
//         } else if (e.keyCode == 84) {
//             $("#polygonb").click();
//         }
//     });
// });

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
                var imgsrc;
                if (source.data != undefined) {

                    if (source.data.substring(0, 4) == "http") {
                        imgsrc = source.data;
                    } else {
                        imgsrc = crowd.dataMark.getFile(encodeURIComponent(source.data));
                        // imgsrc=$img="http://crowdweb.blob.core.chinacloudapi.cn/100056/1.jpg";
                    }
                } else {
                    if (source.images.substring(0, 4) == "http") {
                        imgsrc = source.images;
                    } else {
                        imgsrc = crowd.dataMark.getFile(encodeURIComponent(source.images));
                        // imgsrc=$img="http://crowdweb.blob.core.chinacloudapi.cn/100056/1.jpg";
                    }
                }
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

            //高级质检
            if (markInfo.operationCase == 32 || markInfo.operationCase == 4) {
                requirejs(['crowd.mark.quality'], function(quality) {
                    $("#do-quality-qualified").unbind("click");
                    $("#do-quality-substandard").unbind("click");
                    $("#do-quality-modify_qualified").unbind("click");
                    $("#do-quality-qualified").click(function() {
                        var chk_value = []; //定义一个数组
                        $("input[name='qualityProperty']:checked").each(function() { //遍历每一个名字为interest的复选框，其中选中的执行函数
                            chk_value.push($(this).val()); //将选中的值添加到数组chk_value中
                        });
                        if (chk_value.length != 0) {
                            alert("质检合格时不允许选择错误类型！");
                        } else if ($("textarea[name='qualityOpinion']").val() != undefined && $("textarea[name='qualityOpinion']").val() != "" && $("textarea[name='qualityOpinion']").val() != null) {
                            alert("质检合格时不允许填写审核意见！");
                        } else {
                            if (markInfo.operationCase == 32) {
                                timingsave(true);
                            }
                            quality.save(1, $(this));
                        }
                    });
                    $("#do-quality-substandard").click(function() {
                        var chk_value = []; //定义一个数组
                        $("input[name='qualityProperty']:checked").each(function() { //遍历每一个名字为interest的复选框，其中选中的执行函数
                            chk_value.push($(this).val()); //将选中的值添加到数组chk_value中
                        });
                        if (chk_value.length == 0 && ($("textarea[name='qualityOpinion']").val() == undefined || $("textarea[name='qualityOpinion']").val() == "" || $("textarea[name='qualityOpinion']").val() == null)) {
                            alert("质检不合格时选择错误类型或填写审核意见！");
                        } else {
                            if (markInfo.operationCase == 32) {
                                timingsave(true);
                            }
                            quality.save(3, $(this));
                        }
                    });
                    $("#do-quality-modify_qualified").click(function() {
                        var chk_value = []; //定义一个数组
                        $("input[name='qualityProperty']:checked").each(function() { //遍历每一个名字为interest的复选框，其中选中的执行函数
                            chk_value.push($(this).val()); //将选中的值添加到数组chk_value中
                        });
                        if (chk_value.length != 0) {
                            alert("质检修改通过时不允许选择错误类型！");
                        } else if ($("textarea[name='qualityOpinion']").val() != undefined && $("textarea[name='qualityOpinion']").val() != "" && $("textarea[name='qualityOpinion']").val() != null) {
                            alert("质检修改通过时不允许填写审核意见！");
                        } else {
                            if (markInfo.operationCase == 32) {
                                timingsave(true);
                            }
                            quality.save(2, $(this));
                        }
                    });
                });
            }
            //质检判断
            //被质检人员标记为合格的记录不允许质检人员和标注人员进行修改，只允许查看
            if ($("form[id='markForm'] div").hasClass("seal seal-success")) {
                $("#do-quality-qualified").attr("disabled", true);
                $("#do-quality-substandard").attr("disabled", false);
                $("#do-quality-modify_qualified").attr("disabled", true);
            } else if ($("form[id='markForm'] div").hasClass("seal seal-danger")) {
                //标记为不合格的数据
                $("#do-quality-qualified").attr("disabled", false);
                $("#do-quality-substandard").attr("disabled", false);
                $("#do-quality-modify_qualified").attr("disabled", false);
            } else {
                //标记为待审核的数据
                $("#do-quality-qualified").attr("disabled", false);
                $("#do-quality-substandard").attr("disabled", false);
                $("#do-quality-modify_qualified").attr("disabled", true);
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