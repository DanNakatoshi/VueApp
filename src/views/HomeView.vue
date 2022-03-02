<template>
  <h1>To Do List</h1>
  <!-- {{todos}} -->
  <TodoForm></TodoForm>
  <TodoTable :data="todos" :columns="columns">
    <!-- <slot name="expandedRowRender" >{{record.respond}}</slot> -->
  </TodoTable>
</template>

<script>
import EventService from "@/plugins/EventService";
import TodoTable from "@/components/TodoTable.vue";
import TodoForm from "@/components/TodoForm.vue";

const columns = [
  {
    title: "日付",
    dataIndex: "date",
  },
  {
    title: "対応",
    dataIndex: "respond",

  },
  {
    title: "タイトル",
    dataIndex: "title",
  },

  {
    title: "緊急度",
    dataIndex: "urgent",
  },
  {
    title: "ステータス",
    dataIndex: "status",
  },
  {
    title: "問い合わせ内容",
    dataIndex: "inquery",
  },
  {
    title: "弊社回答",
    dataIndex: "respond",
  },
  {
    title: "顧客名",
    dataIndex: "contact_name",
  },
  {
    title: "顧客Email",
    dataIndex: "email",
  },
  {
    title: "顧客電話番号",
    dataIndex: "phone",
  },
  {
    title: "エスカレート可否",
    dataIndex: "escalated",
  },
  {
    title: "カテゴリ",
    dataIndex: "category",
  },
  {
    title: "スタッフ名",
    dataIndex: "staff",
  },
  {
    title: "店舗名",
    dataIndex: "store",
  },
];



export default {
  components: {
    TodoTable,
    TodoForm,
  },
  data() {
    return {
      todos: [],
      columns,
    };
  },
  created() {
    EventService.getTodos()
      .then((response) => {
        this.todos = response.data;
      })
      .catch((error) => {
        console.log("Error" + error.response);
      });
  },
};
</script>

