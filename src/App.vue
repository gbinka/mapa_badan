<template>
  <div id="app">
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Main from "@/views/Main.vue";

export default {
  components: {
    Header,
    Main
  }
};
</script>

