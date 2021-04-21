<template>
  <div class="home">
    <b-loading
      :is-full-page="loader.isFullPage"
      :active.sync="loader.isLoading"
      :can-cancel="true"
    ></b-loading>
    <div class="card-wrapper">
      <div class="card" v-for="post in posts" :key="post.id">
        <div class="card-content">
          <h1 class="card-header-title">{{ post.title }}</h1>
          <p class="card-description">{{ post.description }}</p>

          <template v-if="role === 'reader'">
            <div class="card-button">
              <b-button type="is-primary" @click="addLike(post)">
                <font-awesome-icon :icon="['fa', 'hand-paper']" />
                <span class="button-counter"></span>
              </b-button>
              <span class="counter">{{ post.claps }}</span>
            </div>
          </template>

          <template v-if="role === 'writer'">
            <div class="card-buttons">
              <b-button
                class="button-right"
                type="is-primary"
                @click="deletePost(post)"
              >
                <font-awesome-icon :icon="['fa', 'trash']" />
                Удалить
              </b-button>
              <b-button type="is-primary" @click="changePost(post)">
                <font-awesome-icon :icon="['fa', 'pen']" />
                Изменить
              </b-button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="custom-pagination" v-if="isPaginated">
      <b-pagination
        :total="total"
        :page="pagination.page"
        :current.sync="currentPage"
        :per-page="pagination.perPage"
        :icon-prev="pagination.prevIcon"
        :icon-next="pagination.nextIcon"
        @change="paginated((page = $event))"
      >
      </b-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      pagination: {
        total: this.total,
        perPage: 10,
        rangeBefore: 3,
        rangeAfter: 3,
        page: 1,
        prevIcon: "arrow-left",
        nextIcon: "arrow-right",
        isPagination: false
      },
      loader: {
        isFullPage: false,
        isLoading: true
      }
    };
  },
  computed: {
    role() {
      return this.$store.state.role;
    },

    posts() {
      return this.$store.getters["posts/getAllPosts"];
    },
    total() {
      return this.$store.getters["posts/getTotal"];
    },
    isPaginated() {
      return this.total > 10;
    },
    claps() {
      return this.$store.getters["posts/getClaps"];
    },
    currentPage: {
      get() {
        return this.$store.getters["posts/getCurrentPage"];
      },
      set(value) {
        this.$store.commit("posts/setCurrentPage", value);
      }
    }
  },
  mounted() {
    this.refreshRole();
    this["posts/getTotalPages"]();
    this["posts/getPosts"](this.currentPage).then(
      () => (this.loader.isLoading = false)
    );
  },
  methods: {
    ...mapActions([
      "refreshRole",
      "posts/getTotalPages",
      "posts/getPosts",
      "posts/addClaps",
      "posts/deletePost"
    ]),
    deletePost(post) {
      this["posts/deletePost"](post.id).then(() =>
        this["posts/getPosts"](this.currentPage)
      );
    },
    changePost(post) {
      this.$store.commit("posts/changingPost", post);
      this.$router.push("/changepost");
    },
    paginated(page) {
      this.$store.commit("posts/setCurrentPage", page);
      this.loader.isLoading = true;
      this["posts/getPosts"](this.currentPage).then(
        () => (this.loader.isLoading = false)
      );
    },
    addLike(post) {
      this["posts/addClaps"](post);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  margin: 15px;
  width: 45%;

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  &-description {
    padding: 0 0 20px 13px;
    text-align: left;
    color: #7a7a7a;
  }

  &-buttons,
  &-button {
    text-align: right;
  }
}

.button {
  &-right {
    margin-right: 10px;
  }
}

.custom {
  &-pagination {
    margin-top: 30px;
  }
}

.counter {
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
