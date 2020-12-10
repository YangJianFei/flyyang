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
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <template v-if="loading">
          <v-skeleton-loader
            class="mb-6"
            v-for="k in 4"
            :key="k"
            type="paragraph"
          ></v-skeleton-loader>
        </template>
        <v-form
          v-if="!loading"
          ref="uploadBox"
          v-model="uploadBox.form"
        >
          <v-select
            v-model="uploadBox.data.style"
            :items="uploadBox.styleList"
            :rules="uploadBox.rules.style"
            label="style"
            @change="styleChange"
            required
          ></v-select>
          <v-select
            v-model="uploadBox.data.modelName"
            :items="uploadBox.modelNameList"
            :rules="uploadBox.rules.modelName"
            label="model name"
            required
          ></v-select>
          <v-text-field
            type="number"
            v-model="uploadBox.data.st"
            :rules="uploadBox.rules.st"
            label="start"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="uploadBox.data.ed"
            :rules="uploadBox.rules.ed"
            label="end"
          ></v-text-field>
        </v-form>
        <div class="text-center">
          <v-skeleton-loader
            v-if="loading"
            style="display:inline-block"
            width="100"
            type="button"
          ></v-skeleton-loader>
          <v-btn
            v-else
            color="primary"
            @click="run"
            :loading="uploadBox.loading"
            :disabled="uploadImg.loading"
          >run</v-btn>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-img
          :src="uploadImg.url"
          max-height="260"
          contain
        ></v-img>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-img
          :src="resultGif"
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
export default class AiImg extends Vue {
  private loading = true;
  private uploadImg: { [key: string]: any } = {
    upPhoto: undefined,
    loading: false,
    infoText: [
      '启动图片标准化处理程序...',
      '图片微调并生成潜向量...',
      '处理中（此过程大约2~3分钟）...',
      '处理完成！'
    ],
    activeInfoIndex: 0,
    timer: 0,
    url: ''
  };

  private uploadBox = {
    form: true,
    data: {
      style: 'smile',
      modelName: 'stylegan_ffhq',
      st: '3',
      ed: '-3'
    },
    rules: {
      style: [
        v => !!v || 'style is required'
      ],
      modelName: [
        v => !!v || 'model name is required'
      ],
      st: [
        v => {
          if (Math.abs(v - Number(this.uploadBox.data.ed)) > 6) {
            return 'Math.abs(st-ed) < 6'
          } else {
            return true;
          }
        }
      ],
      ed: [
        v => {
          if (Math.abs(v - Number(this.uploadBox.data.st)) > 6) {
            return 'Math.abs(st-ed) < 6'
          } else {
            return true;
          }
        }
      ]
    },
    styleList: [],
    modelNameList: [],
    loading: false,
    infoText: [
      '加载框架...',
      '加载模型...',
      '编辑图片...'
    ],
    activeInfoIndex: 0,
  }

  private resultGif = '';

  created() {
    this.getSelect();
  }
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
  private getSelect() {
    this.$axios.get('/getF', {}).then(res => {
      res = res || [[], []];
      this.uploadBox.styleList = res[0] || [];
      this.uploadBox.modelNameList = res[1] || [];
    });
  }
  private inputChange(e: any) {
    if (e) {
      if (/^image/.test(e.type)) {
        this.createObjectUrl(e);
        this.uploadImg.loading = true;
        this.uploadImg.activeInfoIndex = 0;
        this.createImgMessage();
        let formData = new FormData();
        formData.append('files', e);
        this.$axios.post('/up_photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          formData: true
        }).then(() => {
          this.uploadImg.loading = false;
        }).catch(() => {
          this.uploadImg.loading = false;
        });
      }
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
    }, 1000 * 30);
  }
  private run() {
    this.uploadBox.loading = true;
    if ((this.$refs.uploadBox as any).validate()) {
      this.$axios.post('/edit_pic', this.uploadBox.data).then(res => {
        this.resultGif = this.$tool.getResourceUrl(res + '?time=' + new Date().getTime());
        this.uploadBox.loading = false;
      }).catch(() => {
        this.uploadBox.loading = false;
      });
    } else {
      this.uploadBox.loading = false;
    }
  }
  private createObjectUrl(file) {
    let that = this.uploadImg;
    if (window.FileReader) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.url = this.result;
      }
    }
  }
  private styleChange(value) {
    if (value == 'bald' || value == 'bangs' || value == 'wave_hair') {
      this.uploadBox.data.modelName = 'stylegan_ffhq';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>