<template>
  <div id="mainmap" class="row w-100 h-100"></div>
</template>

<script>
// @ is an alias to /src
import { getGoogleMapsApi } from "../utils.js";
require("../styles/map-style.js");

import researchImage from "../../static/img/badania/mateusz.jpg";
import pointBlue from "../assets/point_blue.png";
import pointGreen from "../assets/point_green.png";
import pointYellow from "../assets/point_yellow.png";

export default {
  name: "Map",
  data: () => ({
    gmap: {},
    lastMarker: {},
    markers: []
  }),
  mounted() {
    getGoogleMapsApi()
      .then(this.initMap)
      .catch(() => console.error);
  },
  methods: {
    initMap() {
      this.gmap = new google.maps.Map(document.getElementById("mainmap"), {
        center: { lat: 45, lng: 75.644 },
        zoom: 4,
        styles: mapStyleFile.styles,
        disableDefaultUI: true
      });
      for (let point of this.points) {
        this.addMarker(point);
      }
    },

    addMarker(point) {
      let contentString =
        "<div id='infobox-content' class='infobox-container'>" +
        "<img src='" +
        researchImage +
        "' class='infobox-img' />" +
        "<p class='infobox-text'>" +
        point.title +
        "<br/>" +
        "<span style='color: #464646;'> " +
        point.author +
        "</span>" +
        "</p></div>";

      let currentIcon = pointGreen;
      if (point.researchType == "student") {
        currentIcon = pointBlue;
      } else if (point.researchType == "phd_student") {
        currentIcon = pointYellow;
      }
      let marker = new google.maps.Marker({
        position: point.placeCoords,
        map: this.gmap,
        title: point.title,
        icon: currentIcon,
        tags: point.tags,
        researchType: point.researchType
      });
      marker.infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      let self = this;
      marker.addListener("click", function() {
        if (Object.keys(self.lastMarker).length) {
          self.lastMarker.infowindow.close();
        }
        marker.infowindow.open(this.gmap, marker);
        self.lastMarker = marker;
        self.$emit("markerClicked", point);
      });
      this.markers.push(marker);
    },
    filterMarkersByTag() {
      for (let marker of this.markers) {
        let keep = false;
        for (let tag of this.tagsSelected) {
          if (marker.tags.find(k => k.toLowerCase() == tag.toLowerCase())) {
            keep = true;
          }
        }
        marker.setVisible(keep);
      }
    },
    filterMarkersByType() {
      for (let marker of this.markers) {
        let keep = false;
        for (let typeSelected of this.researchTypesSelected) {
          if (marker.researchType == typeSelected) {
            keep = true;
          }
        }
        marker.setVisible(keep);
      }
    },
    showAll() {
      if (
        this.researchTypesSelected.length === 0 &&
        this.researchTypesSelected.length === 0
      ) {
        for (let marker of this.markers) {
          marker.setVisible(true);
        }
      }
    }
  },
  computed: {
    points() {
      return this.$store.state.points;
    },
    tagsSelected() {
      return this.$store.state.tagsSelected;
    },
    researchTypesSelected() {
      return this.$store.state.researchTypes;
    }
  },
  watch: {
    tagsSelected(newTag) {
      if (this.tagsSelected.length === 0) this.showAll();
      else this.filterMarkersByTag();
    },
    researchTypesSelected(newType) {
      if (this.researchTypesSelected.length === 0) this.showAll();
      else this.filterMarkersByType();
    }
  }
};
</script>
