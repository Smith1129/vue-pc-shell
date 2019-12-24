<template>
  <div id="app">
    <verify v-if="verifyState"></verify>
    <!-- 登录框 -->
    <ttzPopUp v-if="loginPop"></ttzPopUp>
    <!-- 公用弹出框 -->
    <ttzFrame v-if="framePop"></ttzFrame>
    <!-- 开通VIP框 -->
    <ttzVip v-if="vipPop"></ttzVip>
    <!-- 游戏充值中间层 -->
    <fream v-if="freamPop"></fream>
    <!-- 游戏充值 -->
    <ttzGame v-if="openGame"></ttzGame>
    <!-- 银猪存款箱子 -->
    <access v-if="accessPop"></access>
    <!-- 兑换银猪 -->
    <exbean v-if="exBeanPop"></exbean>
    <!-- 查看卡密 -->
    <getCard v-if="cardPop"></getCard>
    <!-- 设置备注 -->
    <remark v-if="remarkPop"></remark>
    <!-- 注册游戏提示 -->
    <rgsPop v-if="rgsPop"></rgsPop>
    <!-- 老用户激活 -->
    <oldUser v-if="oldUserPop"></oldUser>
    <!-- 红包 -->
    <packet v-if="packetPop"></packet>
    <!-- 侧边栏 -->
    <!-- 二维码 -->
    <qrcode v-if="qrCodePop"></qrcode>
    <div v-if="$route.meta.keepAlive" class="ttz_box">
      <router-view></router-view>
    </div>
    <div v-else class="ttz_box">
      <!-- 导航 -->
      <ttzNav></ttzNav>
      <!-- 打开侧边栏 -->
      <flex v-show="flexRight"></flex>
      <span class="openFlex" v-show="!flexRight" @click="openFlex"></span>
      <router-view/>
      <ttzFooter></ttzFooter>
    </div>
  </div>
</template>

<script>
import ttzNav from "@/components/index/nav"
import ttzPopUp from "@/components/common/popup"
import ttzFrame from "@/components/common/frame"
import ttzFooter from '@/components/common/footer'
import ttzVip from '@/components/vip/openvip'
import access from '@/components/common/access'
import getCard from '@/components/common/getcard'
import remark from '@/components/common/remark'
import rgsPop from '@/components/common/poprgs'
import oldUser from '@/components/common/olduser'
import exbean from '@/components/common/exbean'
import flex from '@/components/index/flex'
import packet from '@/components/index/packet'
import ttzGame from '@/components/vip/opengame'
import qrcode from '@/components/vip/qrcode'
import fream from '@/components/vip/fream'
import actNav from '@/view/activity/common/nav'
import verify from '@/components/index/verify'

export default {
  name: 'App',
  components: {ttzNav,ttzPopUp,ttzFrame,ttzFooter,ttzVip,access,getCard,remark,rgsPop,oldUser,flex,packet,ttzGame,exbean,qrcode,fream,actNav,verify},
  computed:{
    verifyState(){
      return this.$store.state.user.verifyState
    },
    loginPop(){
      return this.$store.state.app.loginBox
    },
    framePop(){
      return this.$store.state.app.frameBox
    },
    vipPop(){
      return this.$store.state.vip.popState
    },
    accessPop(){
      return this.$store.state.app.accessBox.state
    },
    cardPop(){
      return this.$store.state.app.cardBox
    },
    remarkPop(){
      return this.$store.state.app.remarkBox
    },
    rgsPop(){
      return this.$store.state.app.rgsBox
    },
    oldUserPop(){
      return this.$store.state.app.oldUser
      // return true
    },
    flexRight(){
      return this.$store.state.app.flexRight
    },
    loginState(){
        return this.$store.state.user.userToken
    },
    openGame(){
        return this.$store.state.vip.popStateGame
    },
    packetPop(){
      return this.$store.state.app.packetState
    },
    exBeanPop(){
      return this.$store.state.app.exBean
    },
    qrCodePop(){
      return this.$store.state.vip.qrCode
    },
    freamPop(){
      return this.$store.state.vip.fream
    }
  },
  methods:{
    openFlex(){
      this.$store.commit('app/setFlexRight',true)
    },
   
  },
  created(){
    let state = localStorage.getItem('ttz_code')
    if(!state){
      this.$store.dispatch('user/getCookies')
    }
  },
  mounted(){
  },
  watch:{
    $route: {
      handler: function(newVal, oldVal){
        if(newVal.name == 'CardDetails'){
          this.$store.commit('app/setFlexRight',false)
        }
        if (window._czc) {
          let location = window.location;
          let contentUrl = location.pathname + location.hash;
          let refererUrl = "/";
          window._czc.push(["_trackPageview", contentUrl, refererUrl]);
        }
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style>
#app{
      font: 12px Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
      width: 100%;
      min-width: 1200px;
      margin: 0 auto
}
html, body {
    width: 100%;
    min-height: 100%;
    min-width: 1200px;
    margin: 0 auto;
}
.ttz_box{
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
input:focus{ outline:none; }
.openFlex{
  display: block;
  width: 22px;
  height: 24px;
  background: url('./assets/image/unfold.png') no-repeat;
  position: fixed;
  right: 0;
  top:41%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 500;
}
/* 清除内外边距 */
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
pre, /* text formatting elements 文本格式元素 */
fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
th, td { /* table elements 表格元素 */
    margin: 0;
    padding: 0;
}
html,body{
    width: 100%;
    min-height: 100%;
}
/* 设置默认字体 */
body,
button, input, select, textarea { /* for ie */
    /*font: 12px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;*/
    font: 12px/1 Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif; /* 用 ascii 字符表示，使得在任何编码下都无问题 */
}

h1 { font-size: 18px; /* 18px / 12px = 1.5 */ }
h2 { font-size: 16px; }
h3 { font-size: 14px; }
h4, h5, h6 { font-size: 100%; }
i{
  font-style: normal
}
address, cite, dfn, em, var { font-style: normal; } /* 将斜体扶正 */
code, kbd, pre, samp, tt { font-family: "Courier New", Courier, monospace; } /* 统一等宽字体 */
small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */

/* 重置列表元素 */
ul, ol { list-style: none; }

/* 重置文本格式元素 */
a { text-decoration: none;    outline: 0;}
a:hover { text-decoration: underline; }

abbr[title], acronym[title] { /* 注：1.ie6 不支持 abbr; 2.这里用了属性选择符，ie6 下无效果 */
border-bottom: 1px dotted;
cursor: help;
}

q:before, q:after { content: ''; }

/* 重置表单元素 */
legend { color: #000; } /* for ie6 */
fieldset, img { border: none; } /* img 搭车：让链接里的 img 无边框 */
/* 注：optgroup 无法扶正 */
button, input, select, textarea {
    font-size: 100%; /* 使得表单元素在 ie 下能继承字体大小 */
}

/* 重置表格元素 */
table {
border-collapse: collapse;
border-spacing: 0;
}

/* 重置 hr */
hr {
    border: none;
    height: 1px;
}

</style>
<style lang="scss">
   #app  .el-table th>.cell{
      padding: 0!important;
   }
   #app  .el-table td>.cell{
      color: #6A7CA2;
   }
   #app  .el-table th{
      font-weight: 400!important;
      color: #29273A!important;
      font-size: 14px;
      background:rgba(245,246,250,1);
      line-height: 40px;
      padding: 0;
   }
   #app  .el-table td{
      padding: 8px 0;
   }
   #app  .el-table td div{
      padding: 0;
   }
   #app  .el-select{
       width: 156px;
       border:1px solid #F5F6FA;
       box-sizing: border-box;
       font-size: 14px;
   }
   #app  .el-select .el-input__inner{
       height: 36px;
   }
   #app  .el-date-editor.el-input{
    /* //    width: 116px; */
       height: 32px;
       border:1px solid #F5F6FA;
       box-sizing: border-box;
   }
   #app  .el-date-editor.el-input .el-input__inner{
       height: 36px;
       color: #96ABDE;
   }

</style>