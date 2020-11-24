<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple"
      dark
      prominent
      shrink-on-scroll
      fade-img-on-scroll
      elevate-on-scroll
      src="https://picsum.photos/1920/128?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <div
        class="d-flex align-center app-logo"
        @click="goHome"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title class="text-h4">AI</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/YangJianFei/flyyang"
        target="_blank"
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="main-contain">
      <v-container>
        <router-view></router-view>
      </v-container>
      <v-fab-transition>
        <v-btn
          v-show="showUp"
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          v-scroll="onScroll"
          @click="goTop"
        >
          <v-icon>mdi-publish</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
    <v-footer padless>
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
      >
        <v-divider></v-divider>
        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>@flyyang</strong>
          <v-btn
            href="https://github.com/YangJianFei/flyyang"
            target="_blank"
            icon
          >
            <v-icon>mdi-github</v-icon>
          </v-btn> / Power by <strong>@EthanLee</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LayoutFlow extends Vue {
  private showUp = false;

  mounted() {
    this.onScroll();
  }

  private goHome() {
    this.$router.push({
      path: '/home'
    });
  }
  private onScroll() {
    let scrollY = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (scrollY > 200) {
      this.showUp = true;
    } else {
      this.showUp = false;
    }
  }
  private goTop() {
    this.$vuetify.goTo(0);
  }
}
</script>

<style lang="scss" scoped>
.app-logo {
  cursor: pointer;
}
</style>