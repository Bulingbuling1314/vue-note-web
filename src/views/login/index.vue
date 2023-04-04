<template>
    <!-- http://bpic.588ku.com/video_listen/588ku_video/19/12/30/18/21/17/video5e09cf9dd0bd4.mp4 -->
    <div id="userLayout">
        <div class="video-container">
            <div class="filter">
                <a href="">
                    <img src="@/assets/logo.png" width="500" alt="" />
                </a>
                <Form ref="formRef" :model="form" :rules="rules" class="b_form">
                    <FormItem path="age" label="年龄">
                        <Input v-model="form.userName" @keydown.enter.prevent />
                    </FormItem>
                    <FormItem path="password" label="密码">
                        <Input v-model="form.password" type="password" @keydown.enter.prevent />
                    </FormItem>
                    <FormItem class="button-group">
                        <Button type="primary" @click="onSubmit" long>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
            <video :style="videoState.fixStyle" autoplay muted loop class="fillWidth" @canplay="canplay">
                <source src="@/assets/video/login-bg.mp4" type="video/mp4" />
                浏览器不支持 video 标签，建议升级浏览器。
                <source src="@/assets/video/login-bg.mp4" type="video/webm" />
                浏览器不支持 video 标签，建议升级浏览器。
            </video>
            <div class="poster hidden" v-if="!videoState.vedioCanPlay">
                <img :style="videoState.fixStyle" src="@/assets/images/bg.jpeg" alt="" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { ILoginParams } from '@/service/interface'

const store = useUserStore()
const router = useRouter()
const formRef = ref()

const videoState = reactive({
    vedioCanPlay: false,
    fixStyle: {}
})
const canplay = () => {
    videoState.vedioCanPlay = true
}
onMounted(() => {
    const windowHeight = document.body.clientHeight
    const windowWidth = document.body.clientWidth
    videoState.fixStyle = {
        width: windowWidth + 'px',
        height: windowHeight + 'px'
    }
})

const form = reactive<ILoginParams>({
    userName: 'admin',
    password: '123456'
})
const rules = {
    userName: { required: true, message: 'Please input userName' },
    password: { required: true, message: 'Please input password' }
}
const onSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', form, toRaw(form))
            login(form)
        })
        .catch((error: any) => {
            console.log('error', error)
        })
}
const login = (form: ILoginParams) => {
    store.login(form)
        .then((res) => {
            router.push('/home')
        })
        .catch((err) => {
            console.log(err)
        })
}

</script>
<style lang="scss" scoped>
#userLayout {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #f0f2f5;
    background-size: 100%;
    overflow: hidden;

    .filter {
        &>a {
            display: block;
            text-align: center;
            margin-bottom: 50px;
        }
    }

    .b_form {
        max-width: 380px;
        margin: 0 auto;
        padding: 42px 24px 24px;
        background-color: rgba(0, 0, 0, 0.1);
    }
}

.video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;

    .poster {
        img {
            z-index: 0;
            position: absolute;
        }
    }

    video {
        width: 100%;
        object-fit: cover;
    }

    .filter {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0);
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
    }

    .button-group {
        margin: 30px 0 0;
    }
}
</style>