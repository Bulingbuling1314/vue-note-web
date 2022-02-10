<template>
    <div class="set-box">
        <div class="theme_box theme_all_02">
            <b-icon icon="MehOutlined" />
        </div>
        <div class="set-item">
            <div class="set-th">
                <div class="set-th-title theme_all_01">目前主题</div>
                <div class="th-1" @click="colorChange('dark')">切换暗色</div>
                <div class="th-2" @click="colorChange('white')">切换亮色</div>
            </div>
            <!-- <div class="theme-all cancat-btn" @click="goEvent">
                联 系 我 们
            </div> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router=useRouter();
        const colorChange = (name: string) => {
            window.document.documentElement.setAttribute("data-theme", name);
            //通过本地缓存进行处理刷新
            localStorage.setItem("theme", name);
        };
        const goEvent=()=>{
            router.push("/contact");
        };
        return { colorChange ,goEvent};
    },
});
</script>
<style lang="scss" scoped>
@mixin th {
    width: 130px;
    line-height: 30px;
    border-radius: 5px;
    margin: 10px auto;
    cursor: pointer;
    font-size: 14px;
}
.set-box {
    position: fixed;
    top: 50%;
    right: -165px;
    transform: translate(0, -50%);
    z-index: 999999999;
    display: flex;
    align-items: center;
    text-align: center;
    transition: 0.5s;
    cursor: pointer;
    .theme_box {
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
    }
    .set-item {
        padding: 15px;
        background: #dedede;
        border-radius: 5px;
        margin-left: 10px;
    }
    .set-th-title {
        font-size: 16px;
        text-align: center;
        padding: 5px;
        border-radius: 20px;
        width: 130px;
        line-height: 30px;
    }
    .th-1 {
        background: #304156;
        color: #fff;
        @include th;
    }
    .th-2 {
        background: #409eff;
        color: #fff;
        @include th;
    }
    .th-more {
        font-size: 14px;
        cursor: pointer;
        padding-bottom: 5px;
    }
    .cancat-btn{
        line-height: 30px;
        margin-top: 10px;
        font-weight: 600;
        font-size: 14px;
    }
}
.set-box:hover{
    right: 10px;
}
</style>
