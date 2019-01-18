<template>
  <div>
    <div class="row row-no-gutter">
      <div class="col-1"></div>
      <div id="logos" class="col-11 d-flex align-items-center">
        <a class="navbar-brand" href="#">
          <img src="../assets/ieiak_logo.png">
        </a>
        <a class="navbar-brand" href="#">
          <img src="../assets/uw_logo.jpg">
        </a>
      </div>
    </div>

    <div class="row row-no-gutter">
      <div class="col-12">
        <nav class="navbar p-0 navbar-expand-lg navbar-dark col">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto nav-fill text-uppercase main-menu">
              <li class="nav-item">
                <a class="nav-link" href="#">Instytut</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Dla studentów</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Dla kandydatów</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Wokół etnologii</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Biblioteka i archiwum</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">En</a>
              </li>
              <li class="nav-item nav-indicator">
                <a class="nav-link" href="#">Mapa</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="row row-no-gutter tags-menu">
      <div class="col-1"></div>
      <div class="col-6">
        <TagBrowser :tags="tags" :width="'100%'" @tagSelected="tagSelected($event)"></TagBrowser>
      </div>
      <div class="col-5">
        <div class="row h-100 ml-2">
          <div class="dropdown my-auto ml-2">
            <button class="dropbtn" @click="researchType =! researchType">Wybierz rodzaj badań</button>
            <div class="dropdown-content" v-show="researchType">
              <a @click="typeSelected('student')" href="#home">Studenckie</a>
              <a @click="typeSelected('phd_student')" href="#about">Doktoranckie</a>
              <a @click="typeSelected('scientist')" href="#contact">Pracownicze</a>
            </div>
          </div>
          <div class="dropdown my-auto ml-4">
            <button class="dropbtn" @click="timeRange =! timeRange">Wybierz zakres czasowy</button>
            <div class="dropdown-content" v-show="timeRange">
              <a href="#home">do 2018</a>
              <a href="#about">2018</a>
              <a href="#contact">po 2018</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagBrowser from "./TagBrowser.vue";

export default {
  components: { TagBrowser },
  data: () => ({
    tags: [
      "religia",
      "gender",
      "seksualność",
      "medycyna",
      "ciało",
      "dzieciństwo",
      "internet",
      "sztuka",
      "technologia",
      "literatura"
    ],
    researchType: false,
    timeRange: false
  }),
  methods: {
    tagSelected(tekst) {
      console.log(tekst);
      this.$store.commit("selectTag", tekst);
    },
    typeSelected(tekst) {
      console.log(tekst);
      this.$store.commit("selectResearchType", tekst);
    }
  }
};
</script>

