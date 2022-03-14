<template>
  <h2 class="d-flex justify-content-center m-5">アプリにログインしてください。</h2>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    class="d-flex justify-content-center"
  >
    <a-form-item>
      <a-input v-model:value="formState.username" placeholder="Email">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
        @click.prevent="submitLogin"
      >Log in</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRaw } from 'vue';
import EventService from '@/plugins/EventService.js'
import router from '@/router';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formState = reactive({
      username: '',
      password: '',
    });

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const submitLogin = () => {
      EventService.submitLogin(toRaw(formState))
        .then((response) => {
          console.log(response.data)
          window.localStorage.setItem('token', response.data.token)
          window.localStorage.setItem('user_id', response.data.user_id)
          window.localStorage.setItem('user_name', response.data.user_name)
          router.push({ name: 'home' })
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    }


    return {
      submitLogin,
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },


});
</script>