<template>

  <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="対応内容" :style="customStyle">
      <p>{{ record.respond }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="チケット情報" :style="customStyle">
      <div>
        対応状況：
        <span v-if="record.status == true">完了</span>
        <span v-else-if="record.status == false">未完了</span>
      </div>
      <div>
        上司報告：
        <span v-if="record.escalated == true">報告済み</span>
        <span v-else-if="record.escalated == false">報告不要</span>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="お客様インフォ" :style="customStyle">
      <div>Name: {{ record.contact_name }}</div>
      <div>Email: {{ record.email }}</div>
      <div>Phone: {{ record.phone }}</div>
    </a-collapse-panel>
  </a-collapse>
  <div class="d-flex justify-content-end">
    <EditModal :record="record">

    </EditModal>
    <DeleteModal :record="record" :submitDelete="submitDelete" >
      <template v-slot:delete-content>
        <p>日付: {{ record.date }}</p>
        <p>問い合わせ内容: {{ record.inquiry }}</p>
        <p>対応内容: {{ record.respond }}</p>
      </template>
    </DeleteModal>
  </div>
</template>
<script>
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import DeleteModal from '@/components/DeleteModal.vue';
import EditModal from '@/components/EditModal.vue';
import EventService from '@/plugins/EventService';

export default defineComponent({
  props: [
    "record"
  ],
  components: {
    CaretRightOutlined,
    DeleteModal,
    EditModal
  },

  setup(props) {
    // const title = "このチケットを削除しますか？"
    const id = ref(props.record.id)

    const activeKey = ref(['1']);
    const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';

    const submitDelete = () => {
      EventService.deleteTicket(id.value)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error" + error.response);
        });
    };

    return {
      activeKey,
      customStyle,
      submitDelete,
    };
  },




});
</script>


