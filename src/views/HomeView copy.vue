<template>
  <TicketTable :data="tickets" :columns="columns">
    <slot name="店舗名">Hi</slot>
  </TicketTable>
</template>

<script>
import EventService from "@/plugins/EventService";
import TicketTable from "@/components/TicketTable.vue";

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

export default {
  components: {
    TicketTable,
  },
  data() {
    return {
      tickets: [],
      columns,
      // stores: [],
    };
  },
  created() {
    EventService.getTickets()
      .then((response) => {
        this.tickets = response.data;
      })
      .catch((error) => {
        console.log("Error" + error.response);
      });
    // EventService.getStores()
    //   .then((response) => {
    //     this.stores = response.data;
    //   })
    //   .catch((error) => {
    //     console.log("Error" + error.response);
    //   });
  },
  computed() {

  }
};
</script>

