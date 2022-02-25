import { createApp } from "vue";
import App from "./App.vue";
import { Card, Button } from "ant-design-vue";
// import "ant-design-vue/lib/date-picker/style/css"; // for css
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(Button);
app.use(Card);
app.mount("#app");

