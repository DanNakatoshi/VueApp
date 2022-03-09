<template>
Hi
  {{ record }}
  <a-table
    :columns="columns"
    :data-source="data"
    :bordered="true"
    :pagination="true"
    rowKey="id"
    size="middle"
  >
    <template #date="{text}">
      <DateTimeFormat :datetime="text"></DateTimeFormat>
    </template>

    <template #expandedRowRender="{ record }">
      <TableDetailsVue :record="record"></TableDetailsVue>
    </template>
  </a-table>
</template>

<script>
import TableDetailsVue from "@/components/TableDetails.vue";
import DateTimeFormat from './DateTimeFormat.vue';
// import { ref } from '@vue/reactivity';
// import moment, { Moment } from 'moment';

export default {
  components: {
    TableDetailsVue,
    DateTimeFormat,
  },
  props: [
    "data",
    "columns",
  ],
  // setup(props) {
  //   const datetime = ref(props.record)
  //   return {
  //     datetime,
  //   }
  // }
};
</script>

