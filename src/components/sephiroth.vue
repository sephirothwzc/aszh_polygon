<template>
<div>
  <div class="content">
      <!-- 操作区域 -->
      <div class="container" style="padding-top:10px;outline: 0;width:825px;">
          <div class="col-xs-7" style="padding:0 0 0;">
              <button type="button" id="rectangle" 
              class="btn btn-primary" 
              title="Tooltip on left" 
              style="border-radius: 6px;"
              v-bind:disabled="btnenable"
              >矩形(R)</button>
              <button type="button" id="polygon"
               class="btn btn-primary" 
               style="border-radius: 6px;"
               v-bind:disabled="btnenable"
               >多边形(D)</button>
          </div>
          <a id="tmphide" class="btn btn-default" 
          role="button"
          >隐藏文字</a>
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
  <!-- 选中属性区域 -->
  <template v-if="this.proshow">
    <div class="box-form-base" id="box-form" style="position: relative;float:right;margin-top:2px;box-shadow: rgb(191, 191, 191) 1px 0px 10px; z-index: 999; width: 300px; background-color: rgb(255, 255, 255);">
        <div class="box-form-content">     
        <h4>{{this.proshow}}</h4>     
        <div class="box-form-footer">
            <span id="box_save" v-on:click="saveItem" >保存</span>
            <span id="box_cancel" v-on:click="cancelItem" >取消</span>
            <div style="color:#f00;margin-top:10px">操作完成请记得点击“保存”</div>
        </div>
        </div>
    </div>
  </template>
</div>
</template>

<script>
import 'jquery.mousewheel'
import {
  sephiroth,
  set as sephirothSet
} from '@/assets/sephiroth/sephiroth.default'

var __markInfo = ''

export default {
  name: 'picapp',
  data() {
    return {
      btnenable: false, // 按钮是否启用
      proshow: false,
      juststage: {
        // 当前绘制对象
      }
    }
  },
  mounted() {
    console.log('123')
    __markInfo = {
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
    sephirothSet(this.disablebtns, this.ablebtns, this.fieldshow)
    sephiroth.initialization(__markInfo)
  },
  methods: {
    ttload() {
      console.log('123')
    },
    click_rectangle() {
      // 矩形按钮点击
    },
    click_polygon() {
      // 多边形点击
    },
    click_sdelbtn() {
      // 删除按钮点击
    },
    disablebtns() {
      // 所有按钮不可用
      this.btnenable = true
    },
    ablebtns() {
      // 启用所有按钮
      this.btnenable = false
    },
    fieldshow(stage) {
      // 显属性窗口
      this.proshow = true
    },
    saveItem() {
      // 保存按钮点击
    },
    cancelItem() {
      // 取消保存按钮
    }
  }
}
</script>

<style scoped>
.main-page {
  min-height: 500px;
}

.w {
  background-color: #eee;
  padding: 10px;
}

.recent .item {
  display: block;
  line-height: 25px;
}

.recent {
  background-color: #f5f5f5;
  padding: 10px;
}

.recent .tit {
  margin-bottom: 5px;
}

.quote {
  position: absolute;
  right: 0;
  top: -15px;
  border-radius: 50px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  z-index: 99999;
  font-weight: lighter;
  display: none;
}

.hg {
  background-color: #20bb51;
  color: #ffffff;
}

.bhg {
  background-color: #ff0055;
  color: #ffffff;
}
</style>

