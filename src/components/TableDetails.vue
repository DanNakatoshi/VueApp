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
</template>
<script>
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    record: Object,
  },
  components: {
    CaretRightOutlined,
  },

  setup() {
    const activeKey = ref(['1']);
    const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
    return {
      activeKey,
      customStyle,
    };
  },

});
</script>


