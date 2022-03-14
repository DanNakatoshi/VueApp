<template>
  <div class="container mt-4">
    <h1 id="app-name" class="text-center">チケット管理システム</h1>

    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap");

* {
  font-family: "Noto Sans JP", sans-serif;
}

#app-name {
  background-color: rgb(17, 120, 138);
  color: white;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
