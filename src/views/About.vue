<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-text-field
      :value="text"
      @input="input"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    input(value) {
      this.text = parseInt(this.text || 1);
    }
  }
}
</script>
