<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="On to completed task">
      <a-switch v-model:checked="formState.completed" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRaw } from "vue";
import EventService from "@/plugins/EventService";

export default defineComponent({
  setup() {
    const formState = reactive({
      name: "",
      completed: false,
    });

    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
      EventService.postTodo(formState)
      .then((response) => {
        console.log(response.data)
        // this.todos = response.data;
      })
    };

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
    };
  },
});
</script>