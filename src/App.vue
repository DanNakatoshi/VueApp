<template>
  <div class="container mt-4">
    <h1 id="app-name" class="text-center">チケット管理システム</h1>

    <nav class="text-center m-3">
      <CreateModal></CreateModal>
    </nav>

    <router-view />
  </div>
</template>

<script>
import CreateModal from "@/components/CreateModal.vue"

export default {
  components: {
    CreateModal,
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap");

* {
  font-family: "Noto Sans JP", sans-serif;
}

</style>
