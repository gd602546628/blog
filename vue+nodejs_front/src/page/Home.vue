<template>
  <div class="home" v-if="isInList">
    <Card v-for="(item,index) in articalList" class="artical-card">

      <h2 class="title">{{item.title}}</h2>
      <div class="artical-item">
        <span>分类：</span>
        <p>{{item.catagory.name}}</p>
      </div>

      <div class="artical-item">
        <span>简介：</span>
        <p>{{item.discription}}</p>
      </div>

      <div class="artical-item">
        <span>创建时间：</span>
        <p>{{dataFrom(item.addTime)}}</p>
      </div>
      <div class="artical-item">
        <span>阅读量：</span>
        <p>{{item.views}}</p>
      </div>

      <div class="button-wrap">
        <Button type="primary" class="readArtical" @click="readArtical(index)">查看文章</Button>
      </div>

    </Card>
  </div>


  <Card v-else class="artical">
    <div >
      <h1 class="tittle">{{currentArtical.title}}</h1>
      <div class="top">
        <div>分类：<i>{{currentArtical.catagory.name}}</i></div>
        <div>添加时间：<i>{{dataFrom(currentArtical.addTime)}}</i></div>
        <div>阅读量：<i>{{currentArtical.views}}</i></div>
      </div>
      <div class="discription" v-show="currentArtical.discription">
        <p>简介</p>
        <div>{{currentArtical.discription}}</div>
      </div>
      <div class="content">
        <p>正文</p>
        <div v-html="currentArtical.content"></div>
      </div>
    </div>
    <Button class="close" type="primary" ref="closeBtn" @click="closeArtical()">关闭文章</Button>
  </Card>
</template>

<script>
  import Api from '../api/api'
  export default{
    name: 'home',
    data () {
      return {
        limit: 10,
        total: 0,
        articalList: [],
        isInList:true,
        currentArtical:{}
      }
    },
    methods: {
      dataFrom(value){
        return new Date(value).toLocaleString()
      },

      /*节流函数*/
      throttle(method,delay,duration){
        var timer=null, begin=new Date();
        return function(){
          var context=this, args=arguments, current=new Date();;
          clearTimeout(timer);
          if(current-begin>=duration){
            method.apply(context,args);
            begin=current;
          }else{
            timer=setTimeout(function(){
              method.apply(context,args);
            },delay);
          }
        }
      },

      fixedBtn(obj){
           let oBtn=obj;
          let body=document.body;
          let fix = function(){
            oBtn.style.top=body.scrollTop+200+'px';
          };
          document.addEventListener('scroll',this.throttle(fix,300,1000))
      },
      readArtical(index){
          this.currentArtical=this.articalList[index];
          this.isInList=false;

          setTimeout(()=>{
            let oBtn=this.$refs.closeBtn.$el
            this.fixedBtn(oBtn)
          },100)
      },

      closeArtical(){
        this.isInList=true;
      }
    },

    created(){
      Api.getArtical({
        page: 1,
        limit: this.limit
      }).then((data) => {
        this.articalList = data.data.articals;
      })
    },

  }

</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .home {
    margin-right: 440px;
    margin-left: 100px;
    margin-top: 10px;
    .artical-card {
      margin-bottom: 50px;
      .button-wrap{
        display: flex;
        width: 100%;
       justify-content: flex-end;
        .readArtical{
        }
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      .artical-item{
        display: flex;
        margin-bottom: 10px;
        font-size: 16px;
        span{
          width: 100px;
          text-align: left;
        }
        p{
          flex: 1;
          word-break: break-all;

        }
      }
    }
  }

  .artical{
    position:relative;
    margin-right: 440px;
    margin-top: 10px;
    .tittle{
      text-align: center;
      font-size: 40px;
    }
    .top{
      display: flex;
      justify-content: center;
      margin-top:20px;
      div{
        margin-left: 20px;
        i{
          color:#39f;
        }
      }
    }
    .discription{
      margin-top:10px;
      p{font-size: 20px}
      div{
        font-size: 20px;
        margin-top:10px;
      }
    }

    .content{
    margin-top:10px;
      p{font-size: 20px}
      div{margin-top:10px}
    }

    .close{
      position: absolute;
      top:150px;
      right: 40px;
    }
  }
</style>
