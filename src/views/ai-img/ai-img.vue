<template>
  <div>
    <v-file-input
      v-model="uploadData.upPhoto"
      placeholder="请选择图片"
      label="图片"
      prepend-icon="mdi-paperclip"
      @change="inputChange"
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
        sm="6"
      >
        <v-form
          ref="uploadBox"
          v-model="uploadBox.form"
        >
          <v-select
            :items="uploadBox.selectList1"
            :rules="uploadBox.rules.select1"
            label="选项一"
          ></v-select>
          <v-select
            :items="uploadBox.selectList2"
            label="选项二"
          ></v-select>
          <v-text-field
            v-model="uploadBox.data.input1"
            label="选项三"
            :rules="uploadBox.rules.input1"
            required
          ></v-text-field>
          <v-text-field
            v-model="uploadBox.data.input2"
            label="选项四"
            :rules="uploadBox.rules.input2"
            required
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AiImg extends Vue {
  private uploadData = {
    upPhoto: undefined
  };

  private uploadBox = {
    form: true,
    data: {
      select1: undefined,
      select2: undefined,
      input1: undefined,
      input2: undefined
    },
    rules: {
      select1: [
        v => !!v || 'Select1 is required'
      ],
      input1: [
        v => !!v || 'input1 is required'
      ]
    },
    selectList1: [],
    selectList2: []
  }

  created() {
    this.getSelect();
  }
  private getSelect() {
    this.$axios.get('/getF', {}, {
      loading: true
    }).then(res => {
      res = res || [[], []];
      this.uploadBox.selectList1 = res[0] || [];
      this.uploadBox.selectList2 = res[1] || [];
    });
  }
  private inputChange(e: any) {
    if (e) {
      let formData = new FormData();
      formData.append('files', e);
      this.$axios.post('/up_photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        formData: true
      });
    }
  }

}
</script>

<style lang="scss" scoped>
</style>