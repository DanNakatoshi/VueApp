<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :bordered="true"
    :pagination="true"
  >
    <!-- <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.respond }}
      </p>
    </template> -->
    <a-table :columns="innerColumns" :data-source="innerData" :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'state'">
            <span>
              <a-badge status="success" />
              Finished
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span class="table-operation">
              <a>Pause</a>
              <a>Stop</a>
              <a-dropdown>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>Action 1</a-menu-item>
                    <a-menu-item>Action 2</a-menu-item>
                  </a-menu>
                </template>
                <a>
                  More
                  <down-outlined />
                </a>
              </a-dropdown>
            </span>
          </template>
        </template>
      </a-table>
  </a-table>
</template>
<script>
export default {
  data() {
    // return {
    //   columns,
    // };
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

