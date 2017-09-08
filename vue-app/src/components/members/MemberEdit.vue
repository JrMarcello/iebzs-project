<template>
  <div class="user-edit">
    <md-snackbar id="message" :md-position="message.vertical + ' ' + message.horizontal" ref="snackbar" :md-duration="message.duration">
      <span>{{ message.text }}</span>
      <md-button id="btn-message" class="md-secondary">
        <router-link to="/users/">
          back to list <md-icon>view_list</md-icon>
        </router-link>
      </md-button>
    </md-snackbar>
    <md-layout md-align="center" md-gutter="40">
      <md-layout md-flex="60">
        <form id="edit-user" @submit.stop.prevent="save()">
          <md-layout md-align="center" md-gutter="16">
            <md-layout md-flex="50">
              <md-input-container>
                <label>First name</label>
                <md-input id="user-first-name" v-model="user.name.first"></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="50">
              <md-input-container>
                <label>Last name</label>
                <md-input id="user-last-name" v-model="user.name.last"></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="50">
              <md-input-container>
                <label>Email</label>
                <md-input id="user-email" v-model="user.email" disabled></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="50">
              <md-input-container>
                <label>Role</label>
                <md-select id="user-role" v-model="user.role">
                  <md-option value="">--</md-option>
                  <md-option v-for="(role, index) in roles" :key="role._id" :value="role._id" >{{role.name}}</md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="100">
              <md-input-container>
                <label>Avatar</label>
                <md-file id ="user-avatar" accept="image/*"></md-file>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="100">
              <md-button id="btn-register" type="submit" class="md-raised md-primary">register</md-button>
            </md-layout>
          </md-layout>
        </form>
      </md-layout>
    </md-layout>
    <md-layout md-align="center" md-gutter="40">
      <md-layout md-flex="60">
        <form id="edit-user" @submit.stop.prevent="">
          <md-layout md-align="center" md-gutter="16">
            <md-layout md-flex="100">
              <md-input-container>
                <label>Current Password</label>
                <md-input id="user-old-password" disabled></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="100">
              <md-input-container>
                <label>New Password</label>
                <md-input id="user-new-password" disabled></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="100">
              <md-input-container>
                <label>Confirm New Password</label>
                <md-input id="user-confirm-password" disabled></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="100">
              <md-button id="btn-password" type="submit" class="md-raised md-primary">update password</md-button>
            </md-layout>
          </md-layout>
        </form>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0, no-console:0 */
export default {
  name: 'userEdit',
  data() {
    return {
      title: 'Edit User',
      user: {
        name: {
          first: '',
          last: '',
        },
        email: '',
        password: '',
        role: '',
        avatar: '',
      },
      message: {
        text: '',
        vertical: '',
        horizontal: '',
        duration: 4000,
      },
      role: [{}],
    };
  },
  methods: {
    save() {
      this.$store.dispatch('users/updateOne', this.user)
        .then((response) => {
          this.showMessage(response.message, 'top', 'right', 4000);
        })
        .catch((err) => {
          this.showMessage(err.error.message, 'top', 'right', 4000);
        });
    },
    updateUserImage(fileList) {
      const reader = new FileReader();
      const img = fileList[0];

      // @TODO: validate type (img.type === 'image/jpeg')
      reader.onload = (e) => {
        this.user.thumbnail.base64 = e.target.result;
        this.user.thumbnail.name = img.name;
      };
      reader.readAsDataURL(img);
    },
    getUser() {
      this.$store.dispatch('users/getById', this.$router.currentRoute.params.id);
    },
    showMessage(text, vertical, horizontal, duration) {
      this.message.text = text;
      this.message.vertical = vertical;
      this.message.horizontal = horizontal;
      this.message.duration = duration;
      this.$refs.snackbar.open();
    },
    listAllRoles() {
      this.$store.dispatch('roles/getAll');
    },
  },
  computed: {
    roles() {
      return this.$store.getters['roles/roles'] || [];
    },
  },
  mounted() {
    this.getUser();
    this.listAllRoles();
    this.localUser = this.$store.getters['users/user'];

    if (this.localUser) {
      this.user._id = this.localUser._id || '';
      this.user.name.first = this.localUser.name.first || '';
      this.user.name.last = this.localUser.name.last || '';
      this.user.email = this.localUser.email || '';
      this.user.role = this.localUser.role || '';
      // this.user.password = this.localUser.password || '';
      if (this.localUser.thumbnail) {
        this.user.thumbnail.name = this.localUser.thumbnail.name || '';
        this.user.thumbnail.base64 = this.localUser.thumbnail.base64 || '';
      }
    }
  },
};
</script>

<style scoped lang="scss">
  .user-edit {
    box-sizing: border-box;
    padding: 0 20px;
  }

  #edit-user {
    width: 100%;
    margin-bottom: 80px;
  }
</style>
