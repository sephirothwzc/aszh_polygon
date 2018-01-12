<template>  
<div>
    <nav class="navbar navbar-default" role="navigation">  
    <div class="container-fluid">  
      <!-- Brand and toggle get grouped for better mobile display -->  
      <div class="navbar-header">  
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">  
          <span class="sr-only">Toggle navigation</span>  
          <span class="icon-bar"></span>  
          <span class="icon-bar"></span>  
          <span class="icon-bar"></span>  
        </button>  
        <a class="navbar-brand" href="#">{{ msg }}</a>  
      </div>  
  
      <!-- Collect the nav links, forms, and other content for toggling -->  
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">  
        <ul class="nav navbar-nav">  
          <li class="active"><a href="#">Link</a></li>  
          <li><a href="#">Link</a></li>  
          <li class="dropdown">  
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>  
            <ul class="dropdown-menu" role="menu">  
              <li><a href="#">Action</a></li>  
              <li><a href="#">Another action</a></li>  
              <li><a href="#">Something else here</a></li>  
              <li class="divider"></li>  
              <li><a href="#">Separated link</a></li>  
              <li class="divider"></li>  
              <li><a href="#">One more separated link</a></li>  
            </ul>  
          </li>  
        </ul>  
        <form class="navbar-form navbar-left" role="search">  
          <div class="form-group">  
            <input type="text" class="form-control" placeholder="Search">  
          </div>  
          <button type="submit" class="btn btn-default">Submit</button>  
        </form>  
        <ul class="nav navbar-nav navbar-right">  
          <li><a href="#">Link</a></li>  
          <li class="dropdown">  
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>  
            <ul class="dropdown-menu" role="menu">  
              <li><a href="#">Action</a></li>  
              <li><a href="#">Another action</a></li>  
              <li><a href="#">Something else here</a></li>  
              <li class="divider"></li>  
              <li><a href="#">Separated link</a></li>  
            </ul>  
          </li>  
        </ul>  
      </div><!-- /.navbar-collapse -->  
    </div><!-- /.container-fluid -->  
  </nav>  
  <template>
  <div class="content">
      <!-- 操作区域 -->
      <div class="container" style="padding-top:10px;outline: 0;width:825px;">
          <div class="col-xs-7" style="padding:0 0 0;">
              <button type="button" id="rectangle" class="btn btn-primary" title="Tooltip on left" style="border-radius: 6px;">矩形(R)</button>
              <button type="button" id="polygon" class="btn btn-primary" style="border-radius: 6px;">多边形(D)</button>
          </div>
          <a id="tmphide" class="btn btn-default" role="button">隐藏文字</a>
          <a id="tmpshow" class="btn btn-default" role="button" style="display:none">显示文字</a>
          <a id="allshow" class="btn btn-default" role="button">全部隐藏</a>
          <a id="tmpsave" class="btn btn-primary" role="button" style="border-radius: 6px;float: right;width: 100px;">保存</a>
          <div>
              <button type="button" id="sdelbtn" class="btn btn-default" style="float: left; position: absolute; top: 100px; z-index: 102; width: 66px; left: -10px;display:none">删除</button>
          </div>
      </div>
      <!-- 标柱区域 -->
      <div class="container">
          <div class="row">
              <div class="col-md-9">
                  <div class="main-page">
                      <div id="work-space-loading" style="color: rgb(221, 221, 221); font-size: 50px; left: 0px; position: absolute; right: 0px; text-align: center; top: 100px; display: none;">加载中...</div>
                      <div id="work-space">
                          <h5 style="margin-bottom:10px;">277</h5>
                          <!--标注内容区域-->
                              <div class="container" style="padding-top:10px;outline: 0;width:825px;">
                                  <div class="canvasframe">
                                      <div id="zommDiv" style="position:absolute;left:10px;top:5px;background:#fffef9;width:90px;height:20px;z-index:9999">级别：25%</div>
                                      <canvas id="myCanvas" tabindex="1" width="1936" height="608" class="canvascont" style="width: 489.6px; top: 102.08px; left: 76.52px;">您的浏览器版本过低</canvas>
                                      <div class="canvasmask" id="test1" style="display: none;"></div>
                                  </div>
                              </div>
                              <canvas id="tcanvas" tabindex="1" width="1024" height="768" style="display:none">您的浏览器版本过低</canvas>
                          <div class="btn-group btn-group-justified">
                              <!--修改-->
                              <a id="btnModify" class="btn btn-freeze btn-success btn-lg">修改</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
</div>
</template> 

<script>

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
