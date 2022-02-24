<template>
  <a-layout>
    <a-layout-sider
      class="theme_slider_01"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo"></div>
      <a-menu
        class="theme_slider_01"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
      >
        <b-menu :menuList="sliderList"></b-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="theme_all_02">
      <a-layout-header class="b_header theme_slider_01">
        <div class="b_header_left">
          <b-icon
            icon="MenuUnfoldOutlined"
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <b-icon
            icon="MenuFoldOutlined"
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div class="b_header_right">
          <div class="b_header_right_full">
            <b-icon
              v-show="!isFullscreen"
              icon="FullscreenOutlined"
              @click="full"
            />
            <b-icon
              v-show="isFullscreen"
              icon="FullscreenExitOutlined"
              @click="full"
            />
          </div>
          <div @click="changeLanguage">
            {{ languageName === 0 ? "简体中文" : "English" }}
          </div>
          <div class="b_header_right_user">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                {{ store.state.user.userInfo.userName }}
                <b-icon icon="DownOutlined" />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">{{ $t("NavTop.userName") }}</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div class="b_header_right_logout theme_slider_01" @click="logout">
            <b-icon icon="ApiOutlined" />
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        class="theme_all_01"
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  createVNode,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BMenu from "@/components/Menu/index.vue";
import screenfull from "screenfull";
import { notification } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import { timeFix } from "@/utils/util";
export default defineComponent({
  components: {
    BMenu,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // @ts-ignore //忽略提示
    const { proxy } = getCurrentInstance();
    let languageName = ref(0);

    const changeLanguage = () => {
      languageName.value = languageName.value === 0 ? 1 : 0;
      proxy.$i18n.locale = languageName.value === 0 ? "zh-CN" : "en-US";
    };
    const isFullscreen = ref(false);
    let full = () => {
      isFullscreen.value = !isFullscreen.value;
      screenfull.isEnabled && screenfull.toggle();
    };
    const logout = () => {
      store.dispatch("Logout");
    };
    console.log(store.state.user);
    onMounted(() => {
      console.log(store);
      notification.open({
        message:
          `Small Boby ${store.getters.userInfo.nickName}，` + timeFix() + " !",
        description: `您的账号截至目前已经登陆过本网站${
          store.getters.userInfo.loginCount || 0
        }次`,
        icon: createVNode(SmileOutlined, { style: "color: #108ee9" }),
        duration: null,
      });
    });
    return {
      selectedKeys: ref<string[]>([store.getters.currentMenu]),
      collapsed: ref<boolean>(false),
      route: useRoute(),
      router,
      store,
      sliderList: store.getters.userMenu,
      full,
      isFullscreen,
      logout,
      languageName,
      changeLanguage,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
