<template>
  <v-app>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="10" md="8" lg="4">
          <h1>Emoji Builder</h1>
          <p>
            <small>接頭辞と語に分かれた絵文字表現を生成できるアプリケーションです。</small>
          </p>

          <v-form>
            <v-text-field label="接頭辞" v-model="form.prefix" @keyup="onInput"></v-text-field>
            <v-text-field label="語" v-model="form.labels" @keyup="onInput"></v-text-field>
          </v-form>

          <p>
            <v-btn text outlined color="primary" @click="onCopy">クリップボードにコピー</v-btn>
          </p>

          <v-card class="mx-auto" outlined>
            <v-card-title>
              <p>生成結果</p>
            </v-card-title>
            <v-card-text>
              <p class="result">{{ result }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted);

const initial = "接頭辞と語を入力してください";
const toastOpts = {
  position: "top-center",
  duration: 1000
};

export default {
  data: () => {
    return {
      form: {
        prefix: "",
        labels: ""
      },

      result: initial
    };
  },
  methods: {
    onInput() {
      const prefix = this.form.prefix.toLowerCase();
      const labels = this.form.labels.split("");

      if (labels.length === 0) {
        this.result = initial;

        return;
      }

      this.result = labels
        .map(label => {
          return label.match(/\s/) ? " " : `:${prefix}${label}:`;
        })
        .join("\u200B");
    },
    onCopy() {
      if (this.result === initial) {
        this.$toasted.error(initial, toastOpts);

        return;
      }

      navigator.clipboard.writeText(this.result).catch(err => {
        console.error(err);
      });

      this.$toasted.success("コピーしました！", toastOpts);
    }
  }
};
</script>

<style lang="scss">
p.result {
  font-family: monospace;
}
</style>
