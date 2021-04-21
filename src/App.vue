<template>
  <div id="app">
    <header class="header">
      <template v-if="role === 'writer'">
        <b-button type="is-primary" class="header-post-btn" @click="addPost">
          <router-link to="/signin" class="signin">
            Добавить пост
          </router-link>
        </b-button>
      </template>

      <template v-if="!isAuthenticated">
        <b-button type="is-primary">
          <router-link to="/signin" class="signin">
            Войти
          </router-link>
        </b-button>
      </template>
      <template v-if="isAuthenticated">
        <b-button type="is-primary" @click="logout">
          Выйти
        </b-button>
      </template>
    </header>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    },
    role() {
      return this.$store.state.role;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    addPost() {
      this.$router.push("/addPost");
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 20px 10px;

  &-post {
    &-btn {
      margin-right: 20px;
    }
  }
}
.form {
  top: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 30%;

  &-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  &-row {
    margin-bottom: 20px;
  }
}

.invalid {
  margin-bottom: 20px;
  font-size: 13px;
  color: #ff3860;
}
.btn {
  &-wrapper {
    position: absolute;
    top: 50px;
    right: 30px;
  }
}
.loading {
  &-overlay {
    &.is-active {
      z-index: 1;
    }
  }
}
.signin {
  color: #fff;
}
</style>
