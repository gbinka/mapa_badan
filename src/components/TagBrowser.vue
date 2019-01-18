<template>
  <div class="d-flex flex-row text-uppercase h-100">
    <div class="mx-2 tag-item tag-navigation" @click="tagScroll('right')">
      <img src="../../static/img/tag_nav_left.png">
    </div>
    <div id="tag-items-wrapper" :style="{width:width}" class="d-flex flex-row my-auto">
      <div
        class="mx-2 tag-item"
        v-for="tag in tags"
        :key="tag"
        :class="tagClass(tag)"
        @click="$emit('tagSelected',tag)"
      >{{tag}}</div>
    </div>
    <div class="mx-2 my-auto tag-item tag-navigation" @click="tagScroll('left')">
      <img src="../../static/img/tag_nav_right.png">
    </div>
  </div>
</template>

<script>
export default {
  props: ["tags", "width"],
  computed: {
    tagsSelected() {
      return this.$store.state.tagsSelected;
    }
  },
  methods: {
    tagScroll(direction) {
      const amount = 130;
      const item = document.getElementById("tag-items-wrapper");
      if (direction === "left") {
        item.scrollLeft += amount;
      } else {
        item.scrollLeft -= amount;
      }
    },
    tagClass(tag) {
      if (this.tagsSelected.find(k => k === tag)) return ["active"];
      else return [];
    }
  }
};
</script>
