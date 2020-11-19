<template>
  <div>
    <v-row v-if="loading">
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="paragraph"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="paragraph"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <div class="text-center">
          <v-skeleton-loader
            style="display:inline-block"
            width="100"
            type="button"
          ></v-skeleton-loader>
        </div>
      </v-col>
    </v-row>

    <v-form
      v-else
      ref="uploadBox"
      v-model="uploadBox.form"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="uploadBox.data.model"
            :items="uploadBox.modelList"
            :rules="uploadBox.rules.model"
            label="model"
            required
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            type="number"
            v-model="uploadBox.data.num"
            :rules="uploadBox.rules.num"
            label="num"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          color="primary"
          :loading="uploadBox.loading"
          @click="generate"
        >Generate</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AiImg extends Vue {
  private loading = true;

  private uploadBox = {
    form: true,
    data: {
      model: undefined,
      num: ''
    },
    rules: {
      model: [
        v => !!v || 'model is required'
      ],
      num: [
        v => !!v || 'num is required'
      ]
    },
    infoText: [
      '启动框架...',
      '加载模型...',
      '处理中（此过程大约2~3分钟）...',
      '处理成功！'
    ],
    activeInfoIndex: 0,
    timer: 0,
    modelList: ['model', 'baby', 'star', 'wanghong', 'yellow'],
    loading: false
  }

  private resultGif = [];

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
  private generate() {
    this.uploadBox.loading = true;
    if ((this.$refs.uploadBox as any).validate()) {
      this.$axios.post('/generate_face', this.uploadBox.data).then(res => {
        this.resultGif = res.pics;
        this.uploadBox.loading = false;
      }).catch(() => {
        this.uploadBox.loading = false;
      });
    } else {
      this.uploadBox.loading = false;
    }
  }
  private createImgMessage() {
    clearInterval(this.uploadBox.timer);
    this.uploadBox.timer = setInterval(() => {
      if (this.uploadBox.activeInfoIndex >= this.uploadBox.infoText.length - 2) {
        clearInterval(this.uploadBox.timer);
      } else {
        this.uploadBox.activeInfoIndex++;
      }
    }, 1000 * 2);
  }
}
</script>

<style lang="scss" scoped>
</style>