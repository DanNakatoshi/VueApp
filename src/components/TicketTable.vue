<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :bordered="true"
    :pagination="true"
    rowKey="id"
    size="middle"
  >
    <!-- <template #date="{ text }">{{ text }}</template> -->

    <template #expandedRowRender="{ record }">
      <TableDetails :record="record"></TableDetails>
    </template>
  </a-table>
</template>

<script>
import TableDetails from "@/components/TableDetails.vue";

export default {
  components: {
    TableDetails,
  },
  props: [
    "data",
    "columns",
  ],
};
</script>

