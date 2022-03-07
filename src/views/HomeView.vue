<template>

  <TicketTable :data="tickets" :columns="columns">
    <slot name="店舗名">Hi</slot>
  </TicketTable>
</template>

<script>
import EventService from "@/plugins/EventService";
import TicketTable from "@/components/TicketTable.vue";
import { ref } from 'vue'

export default {
  components: {
    TicketTable,
  },
  setup() {
    const columns = [
      {
        title: "日付",
        dataIndex: "date",
        width: 200,
      },
      {
        title: "店舗名",
        dataIndex: "store.name",
        width: 200,
        // slots: {
        //   customRender: 'store.name',
        // },
      },
      {
        title: "カテゴリ",
        dataIndex: "category.name",
        width: 100,
      },
      {
        title: "問い合わせ内容",
        dataIndex: "inquiry",
        width: 400,
      },
    ];

    const tickets = ref(null)
    EventService.getTickets()
      .then((response) => {
        tickets.value = response.data;
      })
      .catch((error) => {
        console.log("Error" + error.response);
      });

    return {
      columns,
      tickets,
    };
  },

};
</script>

