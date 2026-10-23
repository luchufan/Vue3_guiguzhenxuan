import { defineStore } from "pinia";

export const home = defineStore('home', {

  actions: {
    collapseMenu() {
      this.$state.collapseMenu = true
    },
    showMenu() {
      this.$state.collapseMenu = false
    }
  },
  state() {
    return {
      collapseMenu: false,
      reFlash: true
    }
  },
  getters: {}
})