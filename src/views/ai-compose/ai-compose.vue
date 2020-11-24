<template>
  <div>
    <v-row v-if="loading">
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="list-item-avatar-two-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="list-item-avatar-two-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-skeleton-loader
          class="mb-6"
          type="list-item-two-line"
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
      v-if="!loading"
      ref="uploadBox"
      v-model="uploadBox.form"
    >
      <v-row>

        <v-col
          cols="12"
          md="6"
        >
          <v-file-input
            v-model="uploadBox.data.content"
            placeholder="请选择图片"
            label="content"
            prepend-icon="mdi-paperclip"
            @change="(e)=>{inputChange(e,'content')}"
            :disabled="uploadBox.loading"
          >
            <template v-slot:selection="{text}">
              <v-chip
                small
                label
                color="primary"
              >{{text}}</v-chip>
            </template>
          </v-file-input>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-file-input
            v-model="uploadBox.data.style"
            placeholder="请选择图片"
            label="style"
            prepend-icon="mdi-paperclip"
            @change="(e)=>{inputChange(e,'style')}"
            :disabled="uploadBox.loading"
          >
            <template v-slot:selection="{text}">
              <v-chip
                small
                label
                color="primary"
              >{{text}}</v-chip>
            </template>
          </v-file-input>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            :value="uploadBox.data.alpha"
            :rules="uploadBox.rules.alpha"
            label="alpha"
            @input="(value)=>{dataInput(value,'alpha')}"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            type="number"
            :value="uploadBox.data.beta"
            :rules="uploadBox.rules.beta"
            label="beta"
            @input="(value)=>{dataInput(value,'beta')}"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            type="number"
            v-model="uploadBox.data.noise"
            :rules="uploadBox.rules.noise"
            label="noise"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            type="number"
            :value="uploadBox.data.trainSteps"
            :rules="uploadBox.rules.trainSteps"
            label="train steps"
            @input="(value)=>{dataInput(value,'trainSteps')}"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="text-center">
            <v-btn
              color="primary"
              @click="run"
              :loading="uploadBox.loading"
              :disabled="uploadBox.loading"
            >run</v-btn>
          </div>
          <v-slide-x-transition>
            <div
              class="text-center text-h5 my-5"
              v-show="uploadBox.loading"
            >{{uploadBox.loading?uploadBox.infoText[uploadBox.activeInfoIndex]:''}}</div>
          </v-slide-x-transition>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-img
            :src="uploadBox.urls.content"
            max-height="260"
            contain
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-img
            :src="uploadBox.urls.style"
            max-height="260"
            contain
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-img
            :src="$tool.getResourceUrl('/'+ uploadBox.resultUrl)"
            max-height="260"
            contain
          ></v-img>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AiCompose extends Vue {
  private loading = true;

  private uploadBox = {
    timer: 0,
    form: true,
    data: {
      content: undefined,
      style: undefined,
      alpha: '1',
      beta: '500',
      noise: '0.2',
      trainSteps: '300'
    },
    rules: {
      alpha: [
        v => !!v || 'style is required'
      ],
      beta: [
        v => !!v || 'model name is required'
      ],
      noise: [
        v => {
          if (0 <= v && v <= 0.8) {
            return true;
          } else {
            return '0 < noise < 0.8'
          }
        }
      ],
      trainSteps: [
        v => {
          if (0 <= v && v <= 3000) {
            return true;
          } else {
            return '0 < trainSteps < 3000'
          }
        }
      ]
    },
    loading: false,
    resultUrl: '',
    infoText: [
      '启动图片标准化处理程序...',
      '图片微调并生成潜向量...',
      '处理中（此过程大约2~3分钟）...',
      '处理完成！'
    ],
    activeInfoIndex: 0,
    urls: {
      content: '',
      style: ''
    }
  }


  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  private inputChange(e: any, type) {
    if (/^image/.test(e.type)) {
      this.createObjectUrl(e, type);
    } else {
      this.uploadBox.data[type] = '';
    }
  }
  private run() {
    if (this.uploadBox.data.content && this.uploadBox.data.style) {
      this.uploadBox.loading = true;
      this.uploadBox.loading = true;
      if ((this.$refs.uploadBox as any).validate()) {
        this.uploadBox.activeInfoIndex = 0;
        this.createImgMessage();
        let formData = new FormData();
        formData.append('content', this.uploadBox.data.content || '');
        formData.append('style', this.uploadBox.data.style || '');
        formData.append('alpha', this.uploadBox.data.alpha);
        formData.append('beta', this.uploadBox.data.beta);
        formData.append('noise', this.uploadBox.data.noise);
        formData.append('trainSteps', this.uploadBox.data.trainSteps);
        this.$axios.post('/nature_style_transform', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          formData: true
        }).then(res => {
          this.uploadBox.resultUrl = res;
          this.uploadBox.loading = false;
        }).catch(() => {
          this.uploadBox.loading = false;
        });
      } else {
        this.uploadBox.loading = false;
      }
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
  private createObjectUrl(file, type) {
    let that = this.uploadBox;
    if (window.FileReader) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.urls[type] = this.result;
      }
    }
  }
  private dataInput(value, field) {
    this.uploadBox.data[field] = value.replace(/[^0-9]/g, '');
  }
}
</script>

<style lang="scss" scoped>
</style>