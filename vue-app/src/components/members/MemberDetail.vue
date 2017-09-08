<template>
  <div class="user">
    <md-layout md-align="center" md-gutter="40">
      <md-layout md-flex="90" class="user__header" md-tag="header">
        <span class="md-display-1">{{ (user.name) ? `${user.name.first} ${user.name.last}` : 'User name' }}</span>
      </md-layout>
    </md-layout>
    <md-layout md-align="center" md-gutter="40">
      <md-layout md-flex="30">
        <img class="user__img" :src="user.thumbnail.base64 || '/static/images/empty.png'" :alt="user.name.first || 'user Thumbnail'">
      </md-layout>
      <md-layout md-flex="60" class="user__meta">
        <div class="user__attr">
          <label class="user__attr__key">Email</label>
          <span class="user__attr__value">{{ user.email || 'Email'}}</span>
        </div>
      </md-layout>
    </md-layout>

    <md-button class="md-fab md-fab-bottom-right md-primary">
      <router-link :to="'/user/edit/' + user._id">
        <md-icon>edit</md-icon>
      </router-link>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      user: {
        _id: '',
        name: {
          first: '',
          last: '',
        },
        email: '',
        role: '',
        thumbnail: {
          name: '',
          base64: '',
        },
      },
    };
  },
  methods: {
    getUser() {
      this.$store.dispatch('users/getById', this.$router.currentRoute.params.id);
    },
  },
  mounted() {
    /* eslint no-underscore-dangle:0, no-console:0 */
    this.getUser();
    const localUser = this.$store.getters['users/user'];
    if (localUser) {
      this.user._id = localUser._id || '';
      this.user.name.first = localUser.name.first || '';
      this.user.name.last = localUser.name.last || '';
      this.user.email = localUser.email || '';
      this.user.role = localUser.role || '';
      if (localUser.thumbnail) {
        this.user.thumbnail.name = localUser.thumbnail.name || '';
        this.user.thumbnail.base64 = localUser.thumbnail.base64 || '';
      }
    }
  },
};
</script>

<style scoped lang="scss">
  .user {
    padding: 0 20px;

    &__header {
      flex-direction: column;
      margin-bottom: 30px;

      .md-subheading {
        text-transform: uppercase;
        font-size: 12px;
      }
    }

    &__img {
      max-width: 100%;
    }

    &__meta {
      flex-direction: column;
    }

    &__attr {
      margin-bottom: 15px;

      &__key {
        display: block;
        font-weight: 700;
        font-size: 18px;
      }

      &__value {
        font-size: 14px;

      }
    }
  }
</style>
