<template>
  <div id="mainmap" class="row w-100 h-100"></div>
</template>

<script>
// @ is an alias to /src
import { getGoogleMapsApi } from "../utils.js";
require("../styles/map-style.js");

import researchImage from "../../static/img/badania/mateusz.jpg";
import pointB from "../assets/point_blue.png";
import pointG from "../assets/point_green.png";
import pointY from "../assets/point_yellow.png";
import pointBG from "../assets/point_bg.png";
import pointBY from "../assets/point_by.png";
import pointGY from "../assets/point_gy.png";
import pointBGY from "../assets/point_bgy.png";

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
      var markerCluster = new MarkerClusterer(this.gmap, this.markers);
      this.setupClusterIcon();
    },
    setupClusterIcon() {
      ClusterIcon.prototype.createCss = function(pos) {
        var style = [];
        let iconColor = [];
        for (let marker of this.cluster_.getMarkers()) {
          let color = "G";
          if (marker.researchType == "student") color = "B";
          else if (marker.researchType == "phd_student") color = "Y";
          if (!iconColor.includes(color)) iconColor.push(color);
        }
        iconColor = iconColor.sort().join("");
        let iconItem = pointB;

        switch (iconColor) {
          case "G": {
            iconItem = pointG;
            break;
          }
          case "Y": {
            iconItem = pointY;
            break;
          }
          case "BG": {
            iconItem = pointBG;
            break;
          }
          case "BY": {
            iconItem = pointBY;
            break;
          }
          case "GY": {
            iconItem = pointGY;
            break;
          }
          case "BGY": {
            iconItem = pointBGY;
            break;
          }
          default: {
            iconItem = pointB;
            break;
          }
        }

        style.push("background-image:url(" + iconItem + ");");
        var backgroundPosition = this.backgroundPosition_
          ? this.backgroundPosition_
          : "0 0";
        style.push("background-position:" + backgroundPosition + ";");
        let width = 31;
        let height = 40;
        if (iconColor.length == 1) {
          width = 20;
          height = 30;
        }
        style.push("padding-top:7px;");

        style.push(
          "height:" +
            height +
            "px; line-height:" +
            height +
            "px; width:" +
            width +
            "px; text-align:center;"
        );

        var txtColor = this.textColor_ ? this.textColor_ : "white";
        var txtSize = this.textSize_ ? this.textSize_ : 13;

        style.push(
          "cursor:pointer; top:" +
            pos.y +
            "px; left:" +
            pos.x +
            "px; color:" +
            txtColor +
            "; position:absolute; font-size:" +
            txtSize +
            "px; font-family:Arial,sans-serif; font-weight:bold"
        );
        return style.join("");
      };
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

      let currentIcon = pointG;
      if (point.researchType == "student") {
        currentIcon = pointB;
      } else if (point.researchType == "phd_student") {
        currentIcon = pointY;
      }
      let iconImage = {
        url: currentIcon,
        anchor: new google.maps.Point(16, 30)
      };
      let marker = new google.maps.Marker({
        position: point.placeCoords,
        map: this.gmap,
        title: point.title,
        icon: iconImage,
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

      google.maps.event.addListener(marker.infowindow, "domready", function() {
        console.log(marker.infowindow);
      });

      this.markers.push(marker);
    },
    filterMarkers() {
      if (this.tagsSelected.length === 0 || this.tagsSelected.length === 0)
        this.showAll();
      else {
        for (let marker of this.markers) {
          let keepMarker = false;
          keepMarker = this._filterTags(keepMarker, marker);
          keepMarker = this._filterTypes(keepMarker, marker);

          marker.setVisible(keepMarker);
        }
      }
    },
    _filterTags(keep, marker) {
      if (!this.tagsSelected.length) return keep;
      for (let tag of this.tagsSelected) {
        if (marker.tags.find(k => k.toLowerCase() == tag.toLowerCase())) {
          keep = true;
        }
      }
      return keep;
    },
    _filterTypes(keep, marker) {
      if (!this.researchTypesSelected.length) return keep;
      let keepType = false;
      for (let typeSelected of this.researchTypesSelected) {
        if (marker.researchType == typeSelected) {
          keepType = true;
        }
      }
      return keep && keepType;
    },
    showAll() {
      if (
        this.researchTypesSelected.length === 0 &&
        this.tagsSelected.length === 0
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
      this.filterMarkers();
    },
    researchTypesSelected(newType) {
      this.filterMarkers();
    }
  }
};
</script>
