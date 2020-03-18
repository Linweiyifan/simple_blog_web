<template>
    <div id="news">
        <h1>万古长空,一朝风月</h1>
        <Col span="6" class="navbar">
            <Card>
                <div style="text-align:center">
                    <!-- <img src="static/image/tuanzi.jpg" height="300px" width="100%"> -->
                     <Avatar src="static/image/dark_user.jpg" size="300" shape="square" />
                    <h1>{{ nickname }}</h1>
                    <p @click="pathToUserInfo()" class="click-userinfo">用户中心</p>
                </div>
            </Card>
        </Col>
        <Col span="16" class="main-news">
        <!-- 主页,显示博客消息 -->
        <div class="add_news">
             <Form ref="formInline" :model="formInline"  inline>
                <FormItem prop="msg" class="news-input">
                    <p class="input-label">说说你的新鲜事</p>
                    <Input type="textarea" v-model="formInline.msg"
                     :autosize="{minRows: 3,maxRows: 10}"
                     placeholder="我最近..." clearable>
                    </Input>
                </FormItem>
                <FormItem id="submit">
                    <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </Form>
        </div>
        </Col>
        <Col span="16" class="news-tab">
            <div class="friend_news">
                <div>
                    <div style="background:#eee;padding: 20px; margin: 20px"
                         v-for="(item, i) in blogList" :key="item.id" 
                         @click="storeItemInfo(item)" class="blog-card">
                        <Card :bordered="false" >
                            <p slot="title">{{ item.idx_created | dateformat }}</p>
                            <p>{{ item.content }}</p>
                        </Card>
                    </div>
                    <Page :total="dataCount" show-elevator :page-size="pageSize" :current="page"
                    @on-change="changePage" show-sizer @on-page-size-change="changeSize"
                    :page-size-opts="[5, 10, 20, 50]" show-total></Page>
                </div>
            </div>
        </Col>
    </div>
</template>

<script>
export default {
    data(){
        return {
            token: '',
            formInline: {
                msg: ''
            },
            blogList: [],
            dataCount: 0,
            pageSize: 5,
            page: 1,
            nickname: ''
        }
    },
    methods:{
        handleSubmit(formInline){
            // 提交博客内容
            if(this.formInline.msg !== '')
            {   
                console.log(localStorage.getItem('token'))
                tw_request.post({
                    url: 'blog/api/v0.1/blog_view',
                    data: {
                            "user_id": localStorage.getItem('user_id'),
                            "content": this.formInline.msg  
                          },
                    cb: (res)=>{
                        if (res.status === 0)
                        {
                            this.$Message.success('提交成功!');
                            this.formInline.msg = '';
                            this.getBlog();
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
        },
        getBlog(){
            tw_request.get({
                url: 'blog/api/v0.1/blog_view',
                config: {
                    params:{
                        'user_id': localStorage.getItem('user_id'),
                        'page': this.page,
                        'limit': this.pageSize,
                    }
                },
                cb: (res)=>{
                    if(res.status === 0){
                        let result = res.data;
                        this.blogList = result.blogs;
                        this.dataCount = result.count;
                    }
                }
            })
        },
        getName(){
            tw_request.get({
                url: 'user/api/v0.1/user_view',
                config: {
                    params:{
                        'user_id': localStorage.getItem('user_id'),
                    }
                },
                cb: (res)=>{
                    if(res.status === 0){
                        let result = res.data;
                        this.nickname = result.user.user_name;
                        console.log(this.$store.state.is_login)
                        this.$store.commit('newUserName', this.nickname);
                    }
                }
            })
        },
        changePage(val){
            this.page = val;
            this.getBlog();
        },
        changeSize(val){
            this.pageSize = val;
            this.getBlog();
        },
        ok () {
            this.$Message.info('点击了确定');
        },
        cancel () {
            this.$Message.info('点击了取消');
        },
        storeItemInfo(item){
            this.$store.commit('newUser', item.user_id);
            this.$store.commit('newContent', item.content);
            this.$store.commit('newBlogId', item.id);
            this.$router.push({path:'/editblog'});
        },
        pathToUserInfo(){
            this.$router.push({'path': '/userinfo'});
        },
    },
    created(){
        this.getBlog();
        this.getName();
    },
    

}
</script>

<style scoped>
#news .navbar{
    margin-left: 20px;
    height: 1200px;
}
#news .navbar Card{
    padding: 0;
    margin: 0;
}
.main-news{
    margin: 20px 20px;
    border: 1px solid #dcdee2;
    border-color:  #e8eaec;
    background-color: #dfe6e9;
}
.add_news .news-input{
    width: 80%;
}
.add_news #submit{
    margin-top: 70px;
    width: 100px;
}
.add_news #submit Button{
    width: 100%;
}
.input-label{
    float: left;
    color: #00b894;
}
.friend_news{
    margin-top: 20px;
}
.news-tab{
    width: 70%;
}
.blog-card:hover{
    cursor: pointer;
    color: deepskyblue;
}
.click-userinfo:hover{
    cursor: pointer;
    color: deepskyblue;
}
.click-userinfo{
    color: #00b894;
}
</style>