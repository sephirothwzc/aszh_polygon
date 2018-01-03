/* eslint-disable */
import $ from 'jquery'
import { data1, data2 } from '@/assets/scripts/data.js'
import e_canvastrim from '@/assets/sephiroth/sephiroth.e_canvastrim'
import e_enlarge from '@/assets/sephiroth/sephiroth.e_enlarge'
// import '@/assets/sephiroth/sephiroth.e_polygon'
// import '@/assets/sephiroth/sephiroth.e_rectangle'
import '@/assets/scripts/e_color_road_jx'

var img = new Image()

// 设置按钮不可用接口 相当于 interface 抽象
var disablebtns,
  ablebtns // 启用所有按钮 事件

function set (bd, ab) {
  disablebtns = bd
  ablebtns = ab
}

// 当前是否处于编辑状态
var _isedit = false
var _editings = null

// 私有变量
// 绘制十字架
var lastX, lastY, can, context, cw, ch
var imgRate
// 是否显示文本
var _showtext = true

// 承载容器
var stage_t,stage_b
// 图片宽高比
var imgWidth,imgHeight

// 是否显示辅助线，多边形为false 矩形为true
var displayCross = true;

// 画图对象
var stage;

// #region public function 

// 画图结束 弹出选择属性的窗口
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

// #endregion

// #region private function 

// 加载插件
var initialize = (source, markInfo) => {

    // 标注基础信息
    if (source != null) {
        var imgsrc = 'src/assets/img/' + source.images
        img.crossOrigin = 'Anonymous'
        img.src = imgsrc
  
        img.onload = function () {
          var c = $('#myCanvas')
          // 加载图片设置画布
          e_canvastrim.init(c,img)
          imgWidth = this.width
          imgHeight = this.height
  
          console.info('origianl image width and height:' + imgWidth + ',' + imgHeight)
  
          //init()
          var _lsendtime = new Date().getTime()
                  // window.crowd_log.DataLoadTime = (_lsendtime - _lssttime) / 1000;
        }

        //矩形
        $("#rectangle").bind("click", function() {
            displayCross = true;
            _isedit = true;
            refreshDrag();
            // _svlogsubtime(1);
            disablebtns();
            var t_re = new createjs.e_rectangle();
            stage_t.addChild(t_re);
            data1.datalist.push(t_re.e_obj);
            this.blur();
        });

        // 多边形点击
        $("#polygon").bind("click", function() {
            displayCross = false;
            _isedit = true;
            refreshDrag();
            // _svlogsubtime(4);
            disablebtns();
            var t_pl = new createjs.e_polygon();
            stage_t.addChild(t_pl);
            data1.datalist.push(t_pl.e_obj);
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
    }
        
}

// 加载图片
var initImage=()=> {
    // 加载图片
    stage = new createjs.Stage('myCanvas')
    stage.enableMouseOver(10)

    var t1 = new createjs.Bitmap(img) // 街景图片
    stage.addChild(t1)

    stage_t = new createjs.Container()
    stage_b = new createjs.Container()
    stage.addChild(stage_t)
    stage.addChild(stage_b)

    e_enlarge.init(stage)

    $(document).keydown(function (evt) {
    if (evt.keyCode == 32) {
        if ($('.canvasmask').css('display') == 'none') {
            $('.canvasmask').css('display', 'block')
        }
        evt.stopPropagation()
        evt.preventDefault()
        }
    })

    $(document).keyup(function (evt) {
    if (evt.keyCode == 32) {
        $('.canvasmask').css('display', 'none')
        }
    })

    var tc_x, tc_y
    var tempt, templ
    var width = img.width
    var widthInit = Number($('#myCanvas').css('width').replace('px', ''))
    var rateWidth = parseInt(widthInit / width * 100)
    imgRate = rateWidth

    var zoomDiv = "<div id='zommDiv' style='position:absolute;left:10px;top:5px;background:#fffef9;width:90px;height:20px;z-index:9999'>级别：" + rateWidth + '% </div>'
    $('.canvasframe').prepend(zoomDiv)

    function cm_mousemove (evt) {
    console.log('tc_x:' + tc_x + '|tc_y:' + tc_y)
    var t__x = (tempt + evt.pageY - tc_y)
    var t__y = (templ + evt.pageX - tc_x)
    $('#myCanvas').css('left', t__y + 'px')
    $('#myCanvas').css('top', t__x + 'px')
    }

    $('.canvasmask').bind('mousedown', function (evt) {
    tempt = Number($('#myCanvas').css('top').replace('px', ''))
    templ = Number($('#myCanvas').css('left').replace('px', ''))
    tc_x = evt.pageX
    tc_y = evt.pageY
    console.log('downx:' + evt.pageX + '|y:' + evt.pageY)
    $('.canvasmask').bind('mousemove', cm_mousemove)
    evt.stopPropagation()
    evt.preventDefault()
    })

    $('.canvasmask').bind('mouseup', function (evt) {
    console.log('upx:' + evt.pageX + '|y:' + evt.pageY)
    $('.canvasmask').unbind('mousemove', cm_mousemove)
    tempt = Number($('#myCanvas').css('top').replace('px', ''))
    templ = Number($('#myCanvas').css('left').replace('px', ''))
    evt.stopPropagation()
    evt.preventDefault()
    })

    $('.canvasframe').mousewheel(function (evt, del) {
    console.log('offsetx:' + evt.offsetX + '|offsety:' + evt.offsetY)

    var tempw = Number($('#myCanvas').css('width').replace('px', ''))
    var tempt = Number($('#myCanvas').css('top').replace('px', ''))
    var templ = Number($('#myCanvas').css('left').replace('px', ''))

    var scale = 1.2
    var newTop, newLeft

    if (del > 0) {
        var newWidth = tempw * scale
        $('#myCanvas').css('width', newWidth + 'px')
        imgRate = parseInt(newWidth / width * 100)

        newLeft = templ - (scale * evt.offsetX - evt.offsetX)
        newTop = tempt - (scale * evt.offsetY - evt.offsetY)

        $('#myCanvas').css('top', newTop + 'px')
        $('#myCanvas').css('left', newLeft + 'px')

        $('#zommDiv').html('级别：' + imgRate + '%')
        } else {
        var newWidth = tempw / scale
        imgRate = parseInt(newWidth / width * 100)

        newLeft = templ + (evt.offsetX - evt.offsetX / scale)
        newTop = tempt + (evt.offsetY - evt.offsetY / scale)

        $('#myCanvas').css('width', newWidth + 'px')
        $('#myCanvas').css('top', newTop + 'px')
        $('#myCanvas').css('left', newLeft + 'px')

        $('#zommDiv').html('级别：' + imgRate + '%')
        }

    evt.stopPropagation()
    evt.preventDefault()
    })

    stage_t.addEventListener('click', function (e) {
    if (e.nativeEvent.which == 3 && _editings != null) {
        sdelbtnshow()
        }
    })

    $(document).bind('click', function () {
    sdelbtnhide()
    })

    createjs.Ticker.setFPS(30)

    createjs.Ticker.addEventListener('tick', stage)

    // 为stage添加mousemove事件，来监听mouseover事件 画图
    stage.addEventListener('stagemousemove', evt_mousemove)

    // 加载历史数据 data1
    if(data1 != undefined){
        $("[name='effective']:checked").val(data1.effective)
        for (var ii = 0; ii < data1.datalist.length; ii++) {
            data1.datalist[ii].visible = true
            }

        setdatas(data1.datalist)

        // retnum = data1.tnum
        // setvdata()
    }
}

// private 
// 处理stage的mouse over事件
 var evt_mousemove=(e)=> {
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
var drawCross=(e)=> {

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

// 刷新画布 
var refreshDrag = () => {
    stage_t.removeAllChildren()
    // $("#mycont").empty();
    e_canvastrim.tnum = 0
    // $("#mycont").dragsort("destroy");
    setdatas(data1.datalist)
    _editings = null
    stage_b.removeAllChildren()
    sdelbtnhide()
    fieldhide()
    ablebtns()
}

// 删除按钮隐藏
var sdelbtnhide = () => {
    $("#sdelbtn").hide()
}

var fieldhide = () => {
    $("#typelist").attr("disabled", "true")
    $("#typelist").hide()
    $(".dropdown-submenu.open").removeClass("open")
    $("input[name='typeOpts']").unbind("change")
    setvdata()
}

var setvdata=()=> {
    trimvdatas()
    // for (var i = 1; i < 9; i++) {
    //     $("#vdata" + i).text(eval("_vdata" + i))
    // }
    // for (var i = 1; i < 6; i++) {
    //     $("#pdata" + i).text(eval("_pdata" + i))
    // }
}


// 启动画线 暂时不用
function init() {
    stage = new createjs.Stage("myCanvas")
    stage.enableMouseOver(10)

    var t1 = new createjs.Bitmap(img) //街景图片
    stage.addChild(t1)

    stage_t = new createjs.Container()
    stage_b = new createjs.Container()
    stage.addChild(stage_t)
    stage.addChild(stage_b)

    e_enlarge.init(stage)

    $(document).keydown(function(evt) {
        if (evt.keyCode == 32) {
            if ($(".canvasmask").css("display") == "none") {
                $(".canvasmask").css("display", "block");
            }
            evt.stopPropagation()
            evt.preventDefault()
        }
    });

    $(document).keyup(function(evt) {
        if (evt.keyCode == 32) {
            $(".canvasmask").css("display", "none")
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

        // 加载历史数据 data1
    if(data1 != undefined){
        $("[name='effective']:checked").val(data1.effective)
        for (var ii = 0; ii < data1.datalist.length; ii++) {
            data1.datalist[ii].visible = true
            }

        setdatas(data1.datalist)

        // retnum = data1.tnum
        // setvdata()
    }
}

function trimvdatas() {
    // 初始化属性
    // _vdata1 = _vdata2 = _vdata3 = _vdata4 = _vdata5 = _vdata6 = _vdata7 = _vdata8 = 0;
    // _pdata1 = _pdata2 = _pdata3 = _pdata4 = _pdata5 = 0;
    // for (var i = 0; i < returnobj.datalist.length; i++) {
    //     switch (returnobj.datalist[i].type) {
    //         case "road":
    //         case "sidewalk":
    //         case "parking":
    //         case "rail track":
    //             _vdata1++;
    //             break;
    //         case "person":
    //         case "rider":
    //             _vdata2++;
    //             break;
    //         case "car":
    //         case "truck":
    //         case "bus":
    //         case "on rails":
    //         case "motorcycle":
    //         case "bicycle":
    //         case "caravan":
    //         case "trailer":
    //             _vdata3++;
    //             break;
    //         case "building":
    //         case "wall":
    //         case "fence":
    //         case "guard rail":
    //         case "bridge":
    //         case "tunnel":
    //         case "garage":
    //             _vdata4++;
    //             break;
    //         case "pole":
    //         case "pole group":
    //         case "traffic sign":
    //         case "traffic light":
    //         case "banner":
    //         case "billboard":
    //         case "street light":
    //         case "traffic device":
    //         case "lane divider":
    //         case "traffic sign frame":
    //         case "parking sign":
    //         case "traffic cone":
    //             _vdata5++;
    //             break;
    //         case "vegetation":
    //         case "terrain":
    //             _vdata6++;
    //             break;
    //         case "sky":
    //             _vdata7++;
    //             break;
    //         case "ground":
    //         case "dynamic":
    //         case "static":
    //             _vdata8++;
    //             break;


    //     }
    //     switch (returnobj.datalist[i].e_type) {
    //         case 1:
    //             _pdata1++;
    //             break;
    //         case 2:
    //             _pdata2++;
    //             break;
    //         case 3:
    //             _pdata3++;
    //             break;
    //         case 4:
    //             _pdata4++;
    //             break;
    //         case 5:
    //             _pdata5++;
    //             break;
    //     }
    // }
}

// 设置历史框
var setdatas=(data)=> {
    if (data == undefined || data == null || data.length == 0) {
        setvdata();
        return;
    } else {
        for (var i = 0; i < data.length; i++) {
            var temp;
            var visible = data[i].visible == undefined ? true : data[i].visible;
            switch (data[i].e_type) {
                case 1:
                    temp = new createjs.e_rectangle(true, _showtext,stage);
                    temp.visible = visible;
                    temp.fontSize = 16;
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
                case 4:
                    temp = new createjs.e_polygon(true, _showtext,stage);
                    temp.visible = visible;
                    temp.fontSize = 16;
                    temp.setobj(data[i]);
                    stage_t.addChild(temp);
                    break;
            }
        }
        // 下层按钮栏
        //draginit();

    }
}

// #endregion

var sephiroth = {
  initialization: (config) => {
    // 初始化加载
    $('#work-space').hide()// 隐藏工作区域

    this.configInfo = config
    this.configInfo.dataId = config.dataId
    this.configInfo.personInTaskId = config.assignId
    console.log(data1)
    // 加载插件
    initialize(data2, config)
    // 加载图像
    initImage()
    // 显示界面
    $('#work-space').show()
    $('#work-space-loading').hide()
  }
}

export {
    sephiroth,
    set
}

// #region  e_polygon.js
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
// #endregion

// #region e_rectangle.js
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
// #endregion