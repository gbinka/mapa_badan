<template>
    <div class="container-fluid full-width">
        <div class="row row-no-gutter">
            <div class="col-1"></div>
            <div id="logos" class="col-11 d-flex align-items-center">
                <a class="navbar-brand" href="#"><img src="../assets/ieiak_logo.png" />  </a>
                <a class="navbar-brand" href="#"><img src="../assets/uw_logo.jpg" />  </a>
            </div>
        </div>

        <div class="row row-no-gutter">
            <div class="col-12">
                <nav class="navbar p-0 navbar-expand-lg navbar-dark ">
    
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                            </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto nav-fill text-uppercase main-menu ">
                            <li class="nav-item"><a class="nav-link" href="#">Instytut</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Dla studentów</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Dla kandydatów</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Wokół etnologii</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Biblioteka i archiwum</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">En</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Mapa</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    
        <div class='row row-no-gutter tags-menu'>
            <div class="col-1"></div>
            <div class="col-6">
                <TagBrowser :tags="tags" :width="'100%'" @tagSelected="tagSelected($event)"></TagBrowser>
            </div>
            <div class="col-5"></div>
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
    ]
  }),
  methods: {
    tagSelected(tekst) {
      console.log(tekst);
    }
  }
};
</script>


<style lang="scss">
@import "../styles/_variables";
#navbarNav {
  background-color: $nav-bg-color;
}

#navbarTags .nav-link {
  color: $tags-font-color !important;
}

.nav-link {
  color: $light-font-color !important;
}

.navbar-header {
  background-color: white;
}

.container-fluid.full-width {
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
}

.row.row-no-gutter {
  margin: 0;
}

.row.row-no-gutter [class*="col-"] {
  padding: 0;
}

#logos {
  height: 11rem;
}

.main-menu {
  width: 70vw;
  height: 45px;
}

.tags-menu {
  background-color: $tags-bg-color;
  background-image: url("../assets/tagbar_image.png");
  background-repeat: no-repeat;
  background-position: right;
  height: 70px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
</style>
