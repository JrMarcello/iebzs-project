<template>
  <div class="user-add">
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
        <form id="add-user" @submit.stop.prevent="register()">
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
                <md-input id="user-email" v-model="user.email"></md-input>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="50">
              <md-input-container md-has-password id="user-password">
                <label>Password</label>
                <md-input type="password" v-model="user.password"></md-input>
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
            <md-layout md-flex="30">
              <md-input-container>
                <label>Avatar</label>
                <md-file id ="user-avatar-name" v-model="user.avatar.name" accept="image/*" md-clearable="true" @selected="updateUserAvatar"></md-file>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="20">
              <md-avatar class="md-large">
                <img :src="user.avatar.base64 || '/static/images/empty.png'" :alt="user.name || 'User Avatar'">>
              </md-avatar>
            </md-layout>
            <md-layout md-flex="100">
              <md-button id="btn-register" type="submit" class="md-raised md-primary">register</md-button>
            </md-layout>
          </md-layout>
        </form>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'userAdd',
  data() {
    return {
      title: 'Add User',
      user: {
        name: {
          first: '',
          last: '',
        },
        email: '',
        password: '',
        role: '',
        avatar: {
          name: '',
          base64: '',
        },
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
    register() {
      this.$store.dispatch('users/register', this.user)
      .then((response) => {
        this.showMessage(response.message, 'top', 'right', 4000);
        this.resetUser();
      }).catch((err) => {
        this.showMessage(err.error.role_id || err.error.message, 'top', 'right', 4000);
      });
    },
    updateUserAvatar(fileList) {
      const reader = new FileReader();
      const img = fileList[0];

      // @TODO: validate type (img.type === 'image/jpeg')
      reader.onload = (e) => {
        this.user.avatar.base64 = e.target.result;
        this.user.avatar.name = img.name;
      };
      reader.readAsDataURL(img);
    },
    resetUser() {
      this.user.name.first = '';
      this.user.name.last = '';
      this.user.email = '';
      this.user.password = '';
      this.user.role = '';
      this.user.avatar.name = '';
      this.user.avatar.base64 = '';
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
    this.listAllRoles();
  },
};
</script>

<style scoped lang="scss">
  .user-add {
    box-sizing: border-box;
    padding: 0 20px;
  }

  #add-user {
    width: 100%;
  }
</style>
