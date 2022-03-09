<template>
  <TicketTable :data="tickets" :columns="columns">
  </TicketTable>
</template>

<script>
import EventService from "@/plugins/EventService";
import TicketTable from "@/components/TicketTable.vue";
import { ref, watch } from 'vue'

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

    const getTicketList = () => {
      EventService.getTickets()
        .then((response) => {
          tickets.value = response.data;
        })
        // .catch((error) => {
        //   console.log("Error" + error.response);
        // });
    }
    getTicketList()

    watch(tickets, function () {
      getTicketList()
    })

    return {
      getTicketList,
      columns,
      tickets,
    };
  },

};
</script>

