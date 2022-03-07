import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from 'ant-design-vue';
// import { Table,
//   Collapse,
//   Form,
//   Input,
//   Button
// } from "ant-design-vue";

import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(Antd);
// app.use(Button);
// app.use(Input);
// app.use(Form);
// app.use(Collapse);
// app.use(Table);
app.use(store);
app.use(router);
app.mount("#app");
