<template>
  <div>
    <v-skeleton-loader
      class="mb-6"
      v-if="loading"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader>
    <v-file-input
      v-if="!loading"
      v-model="uploadImg.upPhoto"
      placeholder="请选择图片"
      multiple
      label="图片"
      prepend-icon="mdi-paperclip"
      @change="inputChange"
      :loading="uploadImg.loading"
      :disabled="uploadImg.loading"
      :messages="uploadImg.loading?uploadImg.infoText[uploadImg.activeInfoIndex]:(uploadImg.activeInfoIndex?uploadImg.infoText[uploadImg.infoText.length-1]:'')"
    >
      <template v-slot:selection="{text}">
        <v-chip
          small
          label
          color="primary"
        >{{text}}</v-chip>
      </template>
    </v-file-input>
    <v-row justify="space-around">
      <v-col
        cols="6"
        md="4"
      >
        <v-img
          class="my-2"
          v-for="(url,index) in uploadImg.urls"
          :key="index"
          :src="url"
          max-height="260"
          contain
        ></v-img>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-img
          class="my-2"
          v-for="(name,index) in uploadImg.names"
          :key="index"
          :src="$tool.getResourceUrl('/'+uploadImg.resultUrl+'/'+ name)"
          max-height="260"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AiMagic extends Vue {
  private loading = true;
  private uploadImg: { [key: string]: any } = {
    upPhoto: [],
    loading: false,
    infoText: [
      '启动图片标准化处理程序...',
      '图片微调并生成潜向量...',
      '处理中（此过程大约2~3分钟）...',
      '处理完成！'
    ],
    activeInfoIndex: 0,
    timer: 0,
    urls: [],
    names: [],
    resultUrl: ''
  }


  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  private inputChange(e: any) {
    this.uploadImg.urls = [];
    this.uploadImg.names = [];
    if (e.length) {
      this.uploadImg.loading = true;
      this.uploadImg.activeInfoIndex = 0;
      this.createImgMessage();
      let formData = new FormData();
      e.forEach(file => {
        if (/^image/.test(file.type)) {
          this.createObjectUrl(file);
          formData.append('files', file);
        }
      });
      this.$axios.post('/u2net_test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        formData: true
      }).then(res => {
        this.uploadImg.resultUrl = res;
        this.uploadImg.loading = false;
      }).catch(() => {
        this.uploadImg.loading = false;
      });
    }
  }
  private createImgMessage() {
    clearInterval(this.uploadImg.timer);
    this.uploadImg.timer = setInterval(() => {
      if (this.uploadImg.activeInfoIndex >= this.uploadImg.infoText.length - 2) {
        clearInterval(this.uploadImg.timer);
      } else {
        this.uploadImg.activeInfoIndex++;
      }
    }, 1000 * 2);
  }
  private createObjectUrl(file) {
    let that = this.uploadImg;
    if (window.FileReader) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.urls.push(this.result);
        that.names.push(file.name);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>