<template>
    <div>
        <img alt="Vue logo" src="@/assets/logo.png" />
        <a-form ref="formRef" :model="form" :rules="rules">
            <a-form-item label="Activity name" name="userName">
                <a-input v-model:value="form.userName" />
            </a-form-item>
            <a-form-item label="Sub name" name="password">
                <a-input v-model:value="form.password" />
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">Create</a-button>
                <a-button style="margin-left: 10px" @click="resetForm"
                    >Reset</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        const formRef = ref();
        const form = reactive({
            userName: 'admin',
            password: '123456',
        });
        const rules = {
            userName: { required: true, message: "Please input userName" },
            password: { required: true, message: "Please input password" }
        };
        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    console.log("values", form, toRaw(form));
                    login(form)
                })
                .catch((error: any) => {
                    console.log("error", error);
                });
        };
        const resetForm = () => {
            formRef.value.resetFields();
        };
        const login = (form: Object) => {
            console.log(store)
            store.dispatch('Login', form)
            .then(res => {
                store.dispatch('SetMenu', res.rolu).then(res => {
                    router.addRoute(res)
                    console.log(res, 123)
                    router.push('/home')
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        return {
            formRef,
            form,
            rules,
            onSubmit,
            resetForm,
        };
    },
});
</script>

