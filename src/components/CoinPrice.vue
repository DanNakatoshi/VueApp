<template>
  <a-card size="small" title="ビットコインの値段" class="card" style="width:300px;">
    <div>{{ coins.time.updated }} 現在</div>
    <div>{{ coins.bpi.USD.rate }} USD</div>
    <a-button
      type="primary"
      href="https://api.coindesk.com/v1/bpi/currentprice.json"
      >APIデータを直で見る</a-button
    >
  </a-card>
</template>

<script>
import EventService from "../plugins/EventService.js";

export default {
  components: {},
  data() {
    return {
      coins: [],
    };
  },
  created() {
    EventService.getCurrentPrice()
      .then((response) => {
        this.coins = response.data;
        console.log(this.coins);
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
};
</script>


