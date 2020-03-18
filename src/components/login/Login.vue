<template>
    <div id="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" 
        :label-width="100" style="width: 400px">
            <FormItem prop="phone" label="手机号">
                <Input type="text" v-model="formInline.phone" placeholder="请输入用户名" clearable>
                    <Icon type="ios-phone-portrait" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password" label="输入密码">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码" clearable>
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="code" label="验证码">
                <Input type="text" v-model="formInline.code" placeholder="请输入验证码" clearable>
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem id="register_code">
                <h1>{{ formInline.pict_code }}</h1>
            </FormItem>
            <FormItem id="submit">
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
         </Form>
         <router-link to="register">
            <Icon type="ios-contact"></Icon>
            没有帐号?注册一个
         </router-link>
    </div>
</template>

<script>

import {setCookie, getCookie} from '../../cookie/cook.js';
export default {
    data () {
        // 自定义检查器,检查值是否存在以及返回对应的值
        const validatePhone = (rule, value, callback)=>{
            if(value === ''){
                callback(new Error("请输入手机号码"));
            } else if(!(/^1[3456789]\d{9}$/.test(value))){
                callback(new Error("请输入正确的手机号"));
            }
            callback();
        };
        const validatePasswd = (rule, value, callback)=>{
            if(value === ''){
                callback(new Error("请输入密码"));
            }
            callback();
        };
        const validateCode = (rule, value, callback)=>{
            if(value === '')
            {
                callback(new Error("请输入验证码"));
            } else if (value !== this.formInline.pict_code)
            {
                callback(new Error("请输入正确的验证码"));
            }
            callback();
        }
        return {
            formInline: {
                phone: '',
                password: '',
                code: '',
                pict_code: '',
            },
            ruleInline: {
                phone: [
                    { required: true, trigger: 'blur', validator: validatePhone }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePasswd },
                    { type: 'string', min: 6, message: '密码最低6位', trigger: 'blur' }
                ],
                code: [
                    {required: true, trigger: 'blur', validator: validateCode},
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    tw_request.post({
                        url: 'user/login/',
                        data: {
                                "phone": this.formInline.phone,
                                "code": this.formInline.code,
                                "password": this.formInline.password
                              },
                        cb: (res)=>{
                            if (res.status === 0)
                            {
                                this.$Message.success('登录成功!');
                                localStorage.setItem('token', res.data.token)
                                localStorage.setItem('user_id', this.formInline.phone)
                                this.$router.push({path:'/news'});
                                setCookie('user_id' , this.formInline.phone)
                                setCookie('passwd', this.formInline.password)
                                this.$store.commit('newLogin', true)
                                this.$emit("event1", "1234567")
                            }
                            else{
                                this.$Message.error(
                                {
                                content: res.msg,   
                                duration: 5
                                });
                            }
                        }
                    });
                }
            })
        },
        get_register_code(){
            tw_request.get({
                url: 'user/login_code/',
                config: {
                    
                },
                cb: (res)=>{
                    if(res.status === 0){
                        let result = res.data;
                        this.formInline.pict_code = result.code;
                    };
                    this.formInline.phone = getCookie('user_id');
                    this.formInline.password = getCookie('passwd');
                    this.formInline.code = this.formInline.pict_code;
                }
            })
        },

    },
    created(){
        this.get_register_code();
        this.$Message.warning("请先登录!")
    },

}
</script>

<style scoped>
#login form{
    text-align: center;
    margin: 50px auto;
}
#register_code h1{
    width: 100px;
    height: 30px;
    background: #d6d9df;
    position: center;
    border-radius: 3px;
    top: 15px;
    margin-left: 80px;
}
#login #submit button
{
    margin-left: -20px;
    width: 300px;
}
</style>