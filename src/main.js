import { createApp } from "vue";
import App from "./App.vue";
import { DatePicker } from "ant-design-vue";
// import "ant-design-vue/lib/date-picker/style/css"; // for css
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(DatePicker);
app.mount("#app");

