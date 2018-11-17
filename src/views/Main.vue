<template>
    <div class="row row-no-gutter d-flex flex-fill">
        <div class="col-lg-1 col-2 left-menu flex-fill d-flex">
          <span style="width:100%">ENG</span>
                
            </div>
        <div class="col-lg-11 col-10">MAPA</div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Main"
};
</script>

<style lang="scss">
@import "../styles/_variables";
.left-menu {
  background-color: $nav-bg-color;
  font-size: 21px;
  color: white;
  text-align: center;
  align-items: center;
  flex: 1;
}
</style>
