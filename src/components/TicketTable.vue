<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :bordered="true"
    :pagination="true"
    rowKey="id"
    size="middle"
  >
    <template #date="{ text }">
      <span >{{ text }}</span>
    </template>

    <template #expandedRowRender="{ record }">
      <TableDetailsVue :record="record"></TableDetailsVue>
    </template>
  </a-table>
</template>

<script>
import TableDetailsVue from "@/components/TableDetails.vue";
// import dayjs from 'dayjs';

export default {
  components: {
    TableDetailsVue,
  },
  props: [
    "data",
    "columns",
  ],
};
</script>

