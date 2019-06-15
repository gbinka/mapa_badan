<template>
  <div class="row flex-fill">
    <div class="left-menu" :class="panels['left']">
      <div class="row h-100 flex-column">
        <div class="my-auto">
          <div class="my-5">ENG</div>
          <div class="my-5">
            <img src="../../static/img/search.png" alt>
          </div>
          <div class="my-5">
            <img src="../../static/img/kafelki_.png" alt>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 h-100" v-if="showPanel">
      <ResearchDetails :researchData="panelData" @leftBarClosed="showPanel=false;"></ResearchDetails>
    </div>
    <div :class="panels['right']">
      <Map @markerClicked="displayPanel"></Map>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Map from "../components/Map";
import ResearchDetails from "../components/ResearchDetails";

export default {
  name: "Main",
  data: () => ({
    showPanel: false,
    panelData: ""
  }),
  components: { Map, ResearchDetails },
  methods: {
    displayPanel(markerData) {
      this.showPanel = true;
      this.panelData = markerData;
    }
  },
  computed: {
    panels() {
      if (!this.showPanel)
        return { right: "col-lg-11 col-10", left: "col-lg-1 col-2" };
      else return { right: "col-lg-8 col-7", left: "col-lg-1 col-2" };
    }
  }
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
  vertical-align: middle;
}
.left-menu-wrapper {
}
</style>
