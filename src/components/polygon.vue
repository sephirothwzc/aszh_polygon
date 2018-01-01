<template>
<div>
<!--标注表单-->
   <div class="container" style="padding-top:10px;outline: 0;width:825px;">
      <div class="canvasframe">
          <div id="zommDiv" style="position:absolute;left:10px;top:5px;background:#fffef9;width:90px;height:20px;z-index:9999">
              级别：25%
              </div>
         <canvas 
         id="myCanvas" 
         tabindex="1" 
         width="1936" 
         height="608" 
         class="canvascont" 
         style="width: 490px; top: 238.993px; left: 159.451px;">
         您的浏览器版本过低
         </canvas>
      </div>
   </div>
</div>
</template>

<script>
export default {
  name: 'polygon',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>

