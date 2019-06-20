<!--更换手机号-->
<template>
    <div id="box_content">
        <div class="main_box bg_white">
            <div class="binding">
                <p class="pt_64 text_333 f_44">{{title}}</p>
                <div class="sendPhone bt-b" @click.stop="showNumkeybord">
                        <p v-show="phoneTitle" class="text_999 f_24">手机号</p>
                        <div v-show="phoneTitle" @click="clearInput" class="close"><img src="~assets/img/text-delete_black@3x.png" alt=""></div>
                        <input type="text" readonly v-model="pagephone" placeholder="请输入手机号">
                </div>
                <div class="getcode clearfix">
                    <div class="codeInfo" v-show="checkedActive">
                        <p class="warning_text">验证码</p>
                        <div @click="show=true" class="code_box">
                            <span :class="{active:code.length-1>=index}" v-for="(item,index) in codemax" :key="index">{{code[index]}}</span>
                        </div>
                    </div>
                    <button :class="[{'active':checkedActive}]" @click="sendcode" :disabled="allowButton">
                        <template v-if="isresend">
                            {{resendTime}}秒后重发
                        </template>
                            <template v-else>
                            获取验证码
                        </template>
                        </button>
                </div>
                <template v-show="checkedActive">
                    <button v-if="type=='changebind'"  @click="changePhone" :class="['submit_btn',{'submit_btn_acitive':checkedCodelength}]">确定</button>
                    <button v-if="type=='bind'"  @click="bindPhone" :class="['submit_btn',{'submit_btn_acitive':checkedCodelength}]">确定</button>
                </template>
                

            </div>
        </div>
        <van-number-keyboard style="z-index:2000;right:0px;position:absolute;" :show="show" theme="custom" close-button-text="完成" @blur="show = false" @input="onInput" @delete="onDelete"></van-number-keyboard>
        <van-number-keyboard style="z-index:2000;right:0px;position:absolute;" :show="phoneshow" theme="custom" close-button-text="完成"  @blur="phoneshow = false" @input="onInputPhone" @delete="onDeletePhone"></van-number-keyboard>
    </div>
</template>
<script>
import {UserMixin} from '@/mixins/user.mixin'
export default {
    mixins:[UserMixin],
    data(){
        return{
           pagephone:'', 
           phonecode:[],
           phoneshow:false,
           phoneMax:11,
           allowButton:false,
           phoneTitle:false,
           show:false,
           code:[],
           codemax:6,
           isresend:false,
           resendTime:60,
           timer:null,
           title:'绑定手机号',
           type:'bind'
        }
    },
    created () {
        this.title=this.$route.params.title?this.$route.params.title:this.title;
        this.type=this.$route.params.type;
        if(this.type=='bind'&&this.$store.state.phone){
            this.$router.push({name:'home'})
        }    
    },
    computed:{
      checkedActive(){
        var back=false;
        this.phoneTitle=this.pagephone.length?true:false;
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.pagephone))){ 
            this.allowButton=true;
            this.isresend=false;
            if(this.timer){
               clearTimeout(this.timer); 
            }
        }else{
            back=true;
            this.allowButton=false;
            this.phoneshow=false;
        }
        return back;
      },
      checkedCodelength(){
          var back=false;
          if(this.code.length==this.codemax){
              back=true;
          }
          return back;
      }
    },
    methods:{
        showNumkeybord(){
            this.phoneshow=true;
        },
        clearInput(){
            this.pagephone='';
            this.phonecode=[];
        },
        // 执行绑定
        bindPhone(){
            var _self=this;
            if(!this.openId){
                this.$Tools.sendMessage('openId获取失败!');
                return ;
            }
            var verificationCode=this.code.join('');
            this.$store.dispatch('bindPhone',{phone:this.pagephone,openId:this.openId,verificationCode})
            .then(res=>{
                if(res){
                    _self.$store.state.phone=this.pagephone;
                    _self.$Tools.sendMessage('恭喜您,手机号绑定成功！'); 
                    _self.$router.push({name:'home'})
                }
            })
        },

        changePhone(){
            var _self=this;
            if(!this.openId){
                this.$Tools.sendMessage('openId获取失败!');
                return ;
            }
            var verificationCode=this.code.join('');
            this.$store.dispatch('updataPhone',{phone:this.pagephone,openId:this.openId,verificationCode})
            .then(res=>{
                if(res){
                    _self.$store.state.phone=res.data.phone;
                    _self.$Tools.sendMessage('恭喜您,手机号更换成功！'); 
                    _self.$router.push({name:'home'})
                }
            })
        },

        sendcode(){
            var _self=this;
            if(_self.allowButton){
              _self.$Tools.sendMessage('手机号格式不对，请您重新填写');
              return ;
            }
            if(!_self.isresend){
                _self.isresend=true;
                _self.resendTime=60;
                
                if(!_self.openId){
                     _self.$Tools.sendMessage('openId获取失败!');
                    return ;
                }

                // 执行发送验证码
                _self.$store.dispatch('sendCode',{phone:_self.pagephone,openId:_self.openId})

                _self.timer=setInterval(function(){
                    if( _self.resendTime===0){
                        clearTimeout(_self.timer);
                        _self.isresend=false;
                        return ;
                    }
                    _self.resendTime=_self.resendTime-1;
                },1000)  
            }
        },
        onInput(key){
           if(this.code.length+1>this.codemax){
                this.$Tools.sendMessage(`验证码最多为${this.codemax}位！`);
                return ;
           } 
           this.code.push(key);
        },
        onDelete(){
            this.code.splice(this.code.length-1,1)
        },

        onInputPhone(key){
           if(this.phonecode.length+1>this.phoneMax){
                this.$Tools.sendMessage(`手机号最多为${this.phoneMax}位！`);
                return ;
           } 
           this.phonecode.push(key);
           this.pagephone=this.phonecode.join("");
        },
        onDeletePhone(){
            this.phonecode.splice(this.phonecode.length-1,1);
            this.pagephone=this.phonecode.join("");
        }
        
    }

}
</script>
<style type="text/css" scope>
    @import '../css/user.css';
</style>


