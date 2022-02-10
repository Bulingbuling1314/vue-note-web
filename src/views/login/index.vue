<template>
    <!-- http://bpic.588ku.com/video_listen/588ku_video/19/12/30/18/21/17/video5e09cf9dd0bd4.mp4 -->
    <div id="userLayout">
        <div class="video-container">
            <div :style="fixStyle" class="filter">
                <a href="">
                    <img src="@/assets/logo.png" width="500" alt="" />
                </a>
                <a-form :label-col="{ span: 8 }" ref="formRef" :model="form" :rules="rules" class="b_form">
                    <a-form-item label="username" name="userName">
                        <a-input v-model:value="form.userName" />
                    </a-form-item>
                    <a-form-item label="password" name="password">
                        <a-input v-model:value="form.password" />
                    </a-form-item>

                    <a-form-item class="login_btn">
                        <a-button type="primary" @click="onSubmit">Lgoin</a-button>
                        <!-- <a-button style="margin-left: 24px" @click="resetForm">Reset</a-button> -->
                    </a-form-item>
                </a-form>
            </div>
            <video
                :style="fixStyle"
                autoplay
                muted
                loop
                class="fillWidth"
                @canplay="canplay"
            >
                <source src="@/assets/video/login-bg.mp4" type="video/mp4" />
                浏览器不支持 video 标签，建议升级浏览器。
                <source src="@/assets/video/login-bg.mp4" type="video/webm" />
                浏览器不支持 video 标签，建议升级浏览器。
            </video>
            <div class="poster hidden" v-if="!vedioCanPlay">
                <img :style="fixStyle" src="PATH_TO_JPEG" alt="" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
    name: "userLayout",

    setup() {
        const store = useStore();
        const router = useRouter();
        const formRef = ref();
        const form = reactive({
            userName: "admin",
            password: "123456",
        });
        const rules = {
            userName: { required: true, message: "Please input userName" },
            password: { required: true, message: "Please input password" },
        };
        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    console.log("values", form, toRaw(form));
                    login(form);
                })
                .catch((error: any) => {
                    console.log("error", error);
                });
        };
        const resetForm = () => {
            formRef.value.resetFields();
        };
        const login = (form: Object) => {
            store
                .dispatch("Login", form)
                .then((res) => {
                    router.push("/home");
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        return {
            formRef,
            form,
            rules,
            onSubmit,
            resetForm,
        };
    },
    data() {
        return {
            vedioCanPlay: false,
            fixStyle: {},
        };
    },
    methods: {
        canplay() {
            this.vedioCanPlay = true;
        },
    },
    mounted: function () {
        window.onresize = () => {
            const windowWidth = document.body.clientWidth;
            const windowHeight = document.body.clientHeight;
            const windowAspectRatio = windowHeight / windowWidth;
            let videoWidth;
            let videoHeight;
            if (windowAspectRatio < 0.5625) {
                videoWidth = windowWidth;
                videoHeight = videoWidth * 0.5625;
                this.fixStyle = {
                    height: windowWidth * 0.5625 + "px",
                    width: windowWidth + "px",
                    "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
                    "margin-left": "initial",
                };
            } else {
                videoHeight = windowHeight;
                videoWidth = videoHeight / 0.5625;
                this.fixStyle = {
                    height: windowHeight + "px",
                    width: windowHeight / 0.5625 + "px",
                    "margin-left": (windowWidth - videoWidth) / 2 + "px",
                    "margin-bottom": "initial",
                };
            }
        };
    },
});
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
        & > a {
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
        .login_btn {
            margin: 30px 0 0;
            /deep/ .ant-form-item-control-input-content {
                .ant-btn {
                    width: 100%;
                }
            }
        }
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
    }
    .filter {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0);
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>