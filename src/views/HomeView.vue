<template>
  <div class="d-flex justify-content-center mb-4">
    <CreateModal></CreateModal>
    <a-button type="primary mx-4" @click.prevent="logOut">ログアウト</a-button>
  </div>
  <TicketTable :data="tickets" :columns="columns">
    <!-- <slot name="店舗名">Hi</slot> -->
  </TicketTable>
</template>

<script>
import EventService from "@/plugins/EventService.js";
import TicketTable from "@/components/TicketTable.vue";
import { ref, watch } from 'vue'
import CreateModal from "@/components/CreateModal.vue"
import router from '@/router'


export default {
  components: {
    TicketTable,
    CreateModal
  },
  setup() {
    const columns = [
      {
        title: "日付",
        dataIndex: "date",
        width: 200,
        slots: {
          customRender: 'date',
        },
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

    const getTicketList = async () => {
      await EventService.getTickets()
        .then((response) => {
          tickets.value = response.data;
        })
        .catch((error) => {
          console.log(localStorage.getItem('token'))
          console.log("Error" + error);
        });
    }
    getTicketList()

    watch(tickets, async function() {
      getTicketList()
    })

    const logOut = () => {
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    }

    return {
      getTicketList,
      columns,
      tickets,
      logOut
    };
  },

};
</script>

