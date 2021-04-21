<template>
  <div class="form-wrapper">
    <div class="btn-wrapper">
      <b-button type="is-light" @click="goBack">Назад</b-button>
    </div>
    <form action="" class="form">
      <div :class="{ invalid: $v.postData.title.$error }">
        <b-field class="form-row">
          <b-input
            placeholder="Название поста"
            type="text"
            v-model="postData.title"
            @blur="$v.postData.title.$touch()"
          ></b-input>
        </b-field>
        <div v-if="$v.postData.title.$error">
          <p class="error_label" v-if="!$v.postData.title.required">
            Это поле обязательно!
          </p>
        </div>
      </div>
      <b-field>
        <b-input
          type="textarea"
          placeholder="Описание поста"
          v-model="postData.description"
          minLength="10"
        >
        </b-input>
      </b-field>
      <b-button type="is-primary" @click="savePost">Сохранить</b-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      postData: {
        title: null,
        description: null
      }
    };
  },
  validations: {
    postData: {
      title: {
        required
      }
    }
  },
  methods: {
    ...mapActions(["posts/changePost"]),
    savePost() {
      this["posts/changePost"]({
        id: this.post.id,
        title: this.postData.title,
        description: this.postData.description,
        updatedDate: new Date()
      });
    },
    fillPostForm() {
      this.postData.title = this.post.title;
      this.postData.description = this.post.description;
    },
    goBack() {
      this.$router.go("-1");
    }
  },
  computed: {
    post() {
      return this.$store.getters["posts/getChangingPost"];
    }
  },
  mounted() {
    this.fillPostForm();
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 40px 20px 20px;
  max-width: 50%;
  border: 1px solid lightgray;
}
</style>
