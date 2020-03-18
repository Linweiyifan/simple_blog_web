<template>
    <div id="userinfo">
        <h1>用户修改中心</h1>
         <Form ref="formInline" :model="formInline" :rules="ruleInline" 
        :label-width="100" style="width: 400px">
            <FormItem prop="password" label="输入密码">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码" clearable>
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="repeated" label="确认密码">
                <Input type="password" v-model="formInline.repeated" placeholder="请再次输入密码" clearable>
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="nickname" label="昵称">
                <Input type="text" v-model="formInline.nickname" placeholder="请输入昵称" clearable>
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="code" label="验证码">
                <Input type="text" v-model="formInline.code" placeholder="请输入验证码" clearable>
                    <Icon type="ios-lock" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem id="register_code">
                <h1>{{ formInline.pict_code }}</h1>
            </FormItem>
            <FormItem id="submit">
                <Button type="primary" @click="handleSubmit('formInline')">修改</Button>
            </FormItem>
         </Form>
    </div>
</template>
<script>
    import {setCookie, getCookie, delCookie} from '../../cookie/cook.js';
    export default {
        data () {
            const validatePasswd = (rule, value, callback)=>{
                if(value === ''){
                    callback(new Error("请输入密码"));
                }
                callback();
            };
            const validatePasswdAgain = (rule, value, callback)=>{
                if(value === '')
                {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.formInline.password){
                    callback(new Error("两次输入的密码不一致"));
                }
                callback();
            }
            const validateName = (rule, value, callback)=>{
                if(value === ''){
                    callback(new Error("请输入昵称"));
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
                    password: '',
                    repeated: '',
                    code: '',
                    pict_code: '',
                    nickname: '',
                },
                ruleInline: {
                    password: [
                        { required: true, trigger: 'blur', validator: validatePasswd },
                        { type: 'string', min: 6, message: '密码最低6位', trigger: 'blur' }
                    ],
                    repeated: [
                        {required: true, trigger: 'blur', validator: validatePasswdAgain},
                    ],
                    code: [
                        {required: true, trigger: 'blur', validator: validateCode},
                    ],
                    nickname: [
                        {required: true, trigger: 'blur', validator: validateName},
                    ]
                }
            }
        },
        methods: {
            get_register_code(){
                tw_request.get({
                    url: 'user/register_code/',
                    config: {},
                    cb: (res)=>{
                        if(res.status === 0){
                            let result = res.data;
                            this.formInline.pict_code = result.code;
                        }
                    }
                })
            },
            get_full_info(){
                this.formInline.nickname = this.$store.state.user_name;
                this.formInline.password = getCookie('passwd');  
                this.formInline.repeated = getCookie('passwd');
            },
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                if (valid) {
                    tw_request.put({
                        url: '/user/api/v0.1/user_view',
                        data: {
                                "user_id": getCookie('user_id'),
                                "code": this.formInline.code,
                                "password": this.formInline.password,
                                "nick_name": this.formInline.nickname,
                              },
                        cb: (res)=>{
                            if (res.status === 0)
                            {
                                this.$Message.success('修改成功!');
                                this.$router.push({path:'/login'});
                                delCookie('user_id');
                                delCookie('passwd');    
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
            
        },
        created(){
            this.get_register_code();
            this.get_full_info();
        }
    }
</script>

<style scoped>
#userinfo form{
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
</style>