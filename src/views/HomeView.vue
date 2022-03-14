<template>
  <h1>Welcome, {{ userName }}</h1>
  <div class="d-flex justify-content-center mb-4">
    <CreateModal></CreateModal>
    <a-button type="primary mx-4" @click.prevent="logOut">ログアウト</a-button>
  </div>
  <TicketTable :data="tickets" :columns="columns"></TicketTable>
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
      {
        title: "作成者",
        dataIndex: "staff.user_name",
        width: 200,
      },
    ];

    const userName = ref(localStorage.getItem("user_name"))
    const tickets = ref(null)

    const getTicketList = async () => {
      EventService.getTickets()
        .then((response) => {
          tickets.value = response.data;
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    }

    watch(tickets, async function () {
      getTicketList()
    })

    const logOut = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_name')
      router.push({ name: 'login' })
    }

    getTicketList()
    return {
      userName,
      getTicketList,
      columns,
      tickets,
      logOut
    };
  },

};
</script>

