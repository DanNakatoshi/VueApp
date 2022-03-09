<template>
  <div>
    <a-button type="danger" @click="showModal">削除</a-button>
    <a-modal
      v-model:visible="visible"
      title="このデータを削除しますか？"
      ok-text="削除"
      cancel-text="キャンセル"
      @ok="submitDelete(); subimitted();"
    >
      <slot name="delete-content"></slot>
      <div v-if="deleted" class="alert alert-success" role="alert">削除できました</div>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
// import { Modal } from 'ant-design-vue';
// import { ExclamationCircleOutlined } from '@ant-design/icons-vue';


export default defineComponent({
  props: [
    "record",
    "submitDelete",
    "title",
  ],
  setup() {
    const deleted = ref(false);
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const hideModal = () => {
      visible.value = false;
    };

    const subimitted = () => {
      deleted.value = true;
      setTimeout(() => {
        visible.value = false;
      }, 1500);
    }
    // const message = ref("")


    return {
      deleted,
      visible,
      showModal,
      hideModal,
      subimitted,
    };
  },
});
</script>