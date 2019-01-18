<template>
  <div class="row w-80 left-bar-content">
    <div class="col">
      <div class="close-button" @click="$emit('leftBarClosed')"></div>
      <div class="justify-content-between m-5">
        <div id="research-badge">
          <span
            class="research-badge research-ball"
            :class="researchTypeMap[researchData.researchType]['color']"
          ></span>
          <span class="research-badge">{{researchTypeMap[researchData.researchType]['text']}}</span>
        </div>
        <div class="mt-4 research-title">{{researchData.title}}</div>
        <div id="tag-items-wrapper" class="d-flex flex-row my-auto">
          <div
            v-for="tag in researchData.tags"
            class="mr-3 my-4 tag-item dark small"
            :key="tag"
          >{{tag}}</div>
        </div>
        <div class="research-image">
          <img src="../media/foto.jpg">
        </div>
        <table class="my-4 desc-fields">
          <tr v-for="(fieldKey, title) in descFields" :key="fieldKey" class="w-100">
            <td class="desc-field-title">{{title}}:</td>
            <td class="desc-field-value">{{researchData[fieldKey]}}</td>
          </tr>
        </table>
        <div class="my-3 description">{{researchData.description}}</div>
        <div class="mt-5 mb-3 desc-field-title">Informacje o grancie:</div>
        <div class="mb-5 description grant">{{researchData.grant}}</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["researchData"],
  methods: {},
  computed: {
    descFields() {
      return {
        "Osoba prowadząca": "author",
        Zespół: "team",
        Lokalizacja: "placeName",
        Początek: "yearStart",
        Koniec: "yearEnd"
      };
    },
    researchTypeMap() {
      return {
        student: { text: "badania studentów", color: "blue" },
        phd_student: { text: "badania doktorantów", color: "yellow" },
        scientist: { text: "badania pracowników", color: "green" }
      };
    }
  }
};
</script>