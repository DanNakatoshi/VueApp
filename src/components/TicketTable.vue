<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :bordered="true"
    :pagination="true"
    rowKey="id"
    size="middle"
  >
    <!-- <template #store="{ text }">
      {{ text }}
    </template> -->

    <template #expandedRowRender="{ record }">
      <TableDetailsVue :record="record"></TableDetailsVue>
    </template>
  </a-table>
</template>

<script>
import TableDetailsVue from "@/components/TableDetails.vue";
export default {
  components: {
    TableDetailsVue,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

