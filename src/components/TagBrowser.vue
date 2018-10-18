<template>
    <div>
        <div class="d-flex flex-row text-uppercase">
            <div class="mx-3 my-auto tag-item tag-navigation" @click="tagScroll('right')"> &lt; </div>
            <div id="tag-items-wrapper" :style="{width:width}" class="d-flex flex-row">
            <div class="p-2 mx-2 my-3 tag-item " v-for="tag in tags" :key="tag" @click="$emit('tagSelected',tag)">{{tag}}</div>
            </div>
            <div class="mx-3 my-auto tag-item tag-navigation" @click="tagScroll('left')"> &gt; </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["tags", "width"],
  methods: {
    tagScroll(direction) {
      const amount = 130;
      const item = document.getElementById("tag-items-wrapper");
      if (direction === "left") {
        item.scrollLeft += amount;
      } else {
        item.scrollLeft -= amount;
      }
    }
  }
};
</script>

<style lang="scss">
#tag-items-wrapper {
  scroll-behavior: smooth;
  width: 700px;
  height: 70px;
  overflow-x: hidden;
}
.tag-item {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  cursor: pointer;
  &.tag-navigation {
    font-size: 1.7rem;
    background-color: transparent;
  }
}
</style>

