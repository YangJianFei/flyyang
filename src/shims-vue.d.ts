import Vue from "vue";
import VueRouter, { Route } from "vue-router";
declare module "*.vue" {
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $axios: any;
    $tool: any;
  }
}
