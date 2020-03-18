<template>
  <div id="editblog">
      <!-- 一个表单,两个按钮,修改和删除 -->
       <Form ref="formInline" :model="formInline" 
         style="width: 500px">
            <FormItem prop="content" label="内容">
                <Input type="textarea" v-model="formInline.content" clearable>
                </Input>
            </FormItem>
            <FormItem id="submit">
                <Button type="primary" @click="handleSubmit('change')">修改</Button>
                <Button type="error" @click="handleSubmit('delete')">删除</Button>
            </FormItem>
        </Form>
  </div>
</template>

<script>
export default {
    data(){
        // let msg = this.$store.state.user_id 获取状态
        // this.$store.commit('newAuthor', '1234') 修改状态
        return {
            'user_id': this.$store.state.user_id,
            'formInline': {
                'content': this.$store.state.content,
            },
            'blog_id': this.$store.state.blog_id,
        }
    },
    methods:{
        handleSubmit(msg){
            if (msg==='change'){
                // update 
                tw_request.put({
                    url: '/blog/api/v0.1/blog_view',
                    data: {
                        "user_id": this.user_id,
                        "id": this.blog_id,
                        "content": this.formInline.content,
                    },
                    cb:(res)=>{
                        if(res.status === 0)
                        {
                            this.$Message.success("修改成功!")
                            this.$router.push({path:'/news'});
                        }
                        else
                        {
                            this.$Message.error({
                                content: res.msg,
                                duration: 5
                            })
                        }
                    }
                })
            }
            else {
                // delete
                tw_request.delete({
                    url: '/blog/api/v0.1/blog_view',
                    config: {
                        params:{
                            "user_id": this.user_id,
                            "id": this.blog_id,
                        }
                    },
                    cb:(res)=>{
                        if(res.status === 0)
                        {
                            this.$Message.success("删除成功!")
                            this.$router.push({path:'/news'});
                        }
                        else
                        {
                            this.$Message.error({
                                content: res.msg,
                                duration: 5
                            })
                        }
                    }
                })
            }
        },
    },
}
</script>

<style scoped>
#editblog form{
    text-align: center;
    margin: 50px auto;
}

</style>