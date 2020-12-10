<template>
  <div>
    <v-row>
      <v-col
        sm="4"
        lg="3"
        v-for="(card,index) in cardList"
        :key="index"
      >
        <v-skeleton-loader
          elevation="2"
          v-if="loading"
          type="card,card-heading,actions"
        ></v-skeleton-loader>
        <v-card
          height="100%"
          v-else
          :loading="card.loading"
        >
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title>{{card.title}}</v-card-title>
          <v-img
            height="250"
            :src="card.img"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
          <v-card-text>{{card.text}}</v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outlined
              rounded
              color="primary"
              @click="go(card.url)"
              :disabled="!card.url||new Date().getTime()<new Date('2020/12/10 18:00:00').getTime()"
            >{{card.btnText}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-skeleton-loader
      v-if="loading"
      type="image"
    ></v-skeleton-loader>
    <v-sparkline
      v-else
      :value="sparkLineData.value"
      :gradient="sparkLineData.gradient"
      :smooth="sparkLineData.radius || false"
      :padding="sparkLineData.padding"
      :line-width="sparkLineData.width"
      :stroke-linecap="sparkLineData.lineCap"
      :gradient-direction="sparkLineData.gradientDirection"
      :fill="sparkLineData.fill"
      :type="sparkLineData.type"
      :auto-line-width="sparkLineData.autoLineWidth"
      auto-draw
    ></v-sparkline>
  </div>
</template>

<script lang="ts">
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  private cardList = [
    {
      loading: false,
      img: require('@/assets/img/ai/ai-img3.jpg'),
      title: 'AI Compose',
      text: 'Two pictures make a new picture',
      url: '/ai-compose',
      btnText: 'Go AI Compose'
    },
    {
      loading: false,
      img: require('@/assets/img/ai/ai-img.jpg'),
      title: 'AI People Img',
      text: 'A program for deal people face by param.',
      url: '/ai-img',
      btnText: 'Go AI Img'
    },
    {
      loading: false,
      img: require('@/assets/img/ai/ai-img1.jpg'),
      title: 'AI People Create',
      text: 'A program for product people.',
      url: '/ai-create',
      btnText: 'Go AI Create'
    },
    {
      loading: false,
      img: require('@/assets/img/ai/ai-img2.jpg'),
      title: 'AI Magic',
      text: 'AI face generation art portrait',
      url: '/ai-magic',
      btnText: 'Go AI Magic'
    },
    {
      loading: false,
      img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
      title: 'On My Way',
      text: '......................',
      url: '',
      btnText: 'Go'
    },
  ];
  private sparkLineData = {
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false
  }
  private loading = true;

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  private go(url) {
    this.$router.push({
      path: url
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
