<template>
  <div class="form-wrapper">
    <form class="form" action="#">
      <div :class="{ invalid: $v.signInData.email.$error }">
        <b-field label="Email" class="form-row">
          <b-input
            type="email"
            v-model="signInData.email"
            placeholder="Enter your email"
            @blur="$v.signInData.email.$touch()"
          >
          </b-input>
        </b-field>
        <div v-if="$v.signInData.email.$error">
          <p class="error_label" v-if="!$v.signInData.email.required">
            This field is required
          </p>
          <p class="error_label" v-if="!$v.signInData.email.email">
            Это поле обязательно!
          </p>
        </div>
      </div>

      <div :class="{ invalid: $v.signInData.password.$error }">
        <b-field label="Password" class="form-row">
          <b-input
            type="password"
            v-model="signInData.password"
            placeholder="Enter your password"
            @blur="$v.signInData.password.$touch()"
          >
          </b-input>
        </b-field>
        <div v-if="$v.signInData.password.$error">
          <p class="error_label" v-if="!$v.signInData.password.required">
            Это поле обязательно!
          </p>
          <p class="error_label" v-if="!$v.signInData.password.minLength">
            Длина пароля не менее 6 символов!
          </p>
        </div>
      </div>
      <b-button type="is-primary" @click="getUserData">Sign In</b-button>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      signInData: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    signInData: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    getUserData() {
      this.$store.dispatch("signIn", this.signInData);
    }
  }
};
</script>
