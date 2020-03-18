<template>
    <div id="register">
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
                <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
            </FormItem>
         </Form>
         <router-link to="login">
            <Icon type="ios-contact"></Icon>
            已有帐号?直接登录
         </router-link>
    </div>
</template>

<script>
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
        const validatePasswdAgain = (rule, value, callback)=>{
            if(value === '')
            {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.formInline.password){
                callback(new Error("两次输入的密码不一致"));
            }
            callback();
        }
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
                repeated: '',
                code: '',
                pict_code: '',
                nickname: '',
            },
            ruleInline: {
                phone: [
                    { required: true, trigger: 'blur', validator: validatePhone }
                ],
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
                    {required: true, trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    tw_request.post({
                        url: 'user/register/',
                        data: {
                                "phone": this.formInline.phone,
                                "code": this.formInline.code,
                                "password": this.formInline.password,
                                "nickname": this.formInline.nickname
                              },
                        cb: (res)=>{
                            if (res.status === 0)
                            {
                                this.$Message.success('注册成功!');
                                this.$router.push({path:'/login'});
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
                //     this.$Message.success('Success!');
                // } else {
                //     this.$Message.error('Fail!');
                }
            })
        },
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

    },
    created(){
        this.get_register_code();
    }
}
</script>

<style scoped>
#register form{
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
#register #submit button
{
    margin-left: -20px;
    width: 300px;
}
</style>