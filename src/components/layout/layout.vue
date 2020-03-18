<template>
  <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" to="news">
                            <Icon type="ios-bulb"/>
                            <span>新鲜事</span>
                        </MenuItem>
                        <MenuItem name="2" to="userinfo">
                            <Icon type="ios-build"></Icon>
                            个人中心
                        </MenuItem>
                        <MenuItem name="3" @click.native="handleLogin" v-show="!isLogin">
                            <Icon type="ios-contact"></Icon>
                            登录
                        </MenuItem>
                        <MenuItem name="4" @click.native="handleLogout" v-show="isLogin">
                            <Icon type="ios-contact"></Icon>
                            logout
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view @event1="showMsgFromChild()"></router-view>
            </Content>
            <Footer class="layout-footer-center">2020- &copy; BTA</Footer>
        </Layout>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isLogin: this.$store.state.is_login,
            //isLogin: localStorage.getItem('user_id'),
        }
    },
    methods: {
        handleLogin(){
            this.$router.push({'path': '/login'});
        },
        handleLogout(){
            //this.isLogin = this.$store.state.is_login
            console.log("执行");
            localStorage.clear();
            this.$router.push({'path': '/login'});
            this.$Message.success("退出登录成功,请重新登录");
        },
        mounted(){
            this.isLogin = this.$store.state.is_login;
        },
        showMsgFromChild(msg){
            console.log("===");
            this.isLogin = this.$store.state.is_login;
        }
    },
}
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 520px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>