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
          <p v-if="!$v.postData.title.required">
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
      <b-button type="is-primary" @click="addPost">Добавить</b-button>
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
  computed: {
    claps() {
      return this.$store.getters["posts/getClaps"];
    },
    userId() {
      return this.$store.getters["posts/getUserId"];
    }
  },
  methods: {
    ...mapActions(["posts/addOnePost"]),
    addPost() {
      if (this.postData.title && this.postData.description) {
        this["posts/addOnePost"]({
          title: this.postData.title,
          description: this.postData.description,
          claps: this.claps,
          createdAt: new Date(),
          updatedAt: new Date()

        });
        this.$router.push("/");
      } else {
        this.$buefy.toast.open({
          type: "is-danger",
          message: "Поля необходимо заполнить"
        });
      }
      this.clearForm();
    },
    goBack() {
      this.$router.push("/");
    },
    clearForm() {
      this.postData = {
        title: null,
        description: null
      };
    }
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
