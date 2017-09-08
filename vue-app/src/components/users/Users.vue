<template>
  <div class="users">
    <md-snackbar id="message" :md-position="message.vertical + ' ' + message.horizontal" ref="snackbar" :md-duration="message.duration">
      <span>{{ message.text }}</span>
    </md-snackbar>

    <md-layout md-align="center" md-gutter>
      <md-layout md-flex="40">
        <form id="form-search" novalidate @submit.prevent="">
          <md-input-container>
            <md-icon>search</md-icon>
            <label>Type user email</label>
            <md-input id="user-input-search" type="search" v-model="userSearchFilter"></md-input>
          </md-input-container>
        </form>
      </md-layout>
    </md-layout>

    <div class="phone-viewport">

      <md-list v-if="filteredUsers.length > 0" class="custom-list md-triple-line">
        <md-list-item :id="'user-listitem-' + index" v-for="(user, index) in filteredUsers" :key="user._id">
          <router-link :to="'/user/detail/' + user._id">
            <md-layout md-align="center" md-gutter>
              <md-layout md-flex="90">

                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>{{user.name.first + ' ' + user.name.last}}</span>
                  <span>{{user.email}}</span>
                </div>
                <md-button :id="'user-edit-' + index" class="md-icon-button md-raised">
                  <router-link :to="'/user/edit/' + user._id">
                    <md-icon class="md-primary">edit</md-icon>
                  </router-link>
                </md-button>

                <md-button :id="'user-delete-' + index" class="md-icon-button md-raised" @click.prevent="openDialog('delete' + user._id)">
                  <md-icon class="md-primary">delete</md-icon>
                </md-button>

                <md-dialog-confirm
                  :id="`dialog-${index}`"
                  :md-title="confirm.title"
                  :md-content-html="confirm.contentHtml"
                  :md-ok-text="confirm.delete"
                  :md-cancel-text="confirm.cancel"
                  @open="onOpen(user)"
                  @close="onClose"
                  :ref="'delete' + user._id">
                </md-dialog-confirm>

              </md-layout>
            </md-layout>
            <md-divider></md-divider>
          </router-link>
        </md-list-item>
      </md-list>

      <md-list v-else class="custom-list">
        <md-list-item id="user-listitem-not-found">
          <md-layout md-align="center" md-gutter>
            <md-layout md-flex="90">
              <div class="md-list-text-container">
                <span>Not found.</span>
              </div>
            </md-layout>
          </md-layout>
        </md-list-item>
      </md-list>
      
    </div>

    <md-button class="md-fab md-fab-bottom-right md-primary">
      <router-link to="/user/add">
        <md-icon>add</md-icon>
      </router-link>
    </md-button>
  </div>
</template>

<script>
/* eslint no-underscore-dangle:0 */
export default {
  name: 'users',
  data() {
    return {
      userSearchFilter: '',
      userIdRemove: '',
      confirm: {
        title: 'Delete the selected user?',
        contentHtml: ' ',
        delete: 'Delete',
        cancel: 'Cancel',
      },
      message: {
        text: '',
        vertical: '',
        horizontal: '',
        duration: 4000,
      },
    };
  },
  computed: {
    users() {
      return this.$store.getters['users/users'];
    },
    filteredUsers() {
      return this.users.filter((item) => {
        if (this.userSearchFilter === '') {
          return true;
        }
        return item.email.indexOf(this.userSearchFilter) > -1;
        // @TODO: do this with 'string match' (regex), because case sensitive
      });
    },
  },
  methods: {
    listAllUsers() {
      this.$store.dispatch('users/getAll');
    },
    showMessage(text, vertical, horizontal, duration) {
      this.message.text = text;
      this.message.vertical = vertical;
      this.message.horizontal = horizontal;
      this.message.duration = duration;

      this.$refs.snackbar.open();
    },
    openDialog(ref) {
      this.$refs[ref][0].open();
    },
    closeDelete(ref) {
      this.$refs[ref].close();
    },
    onOpen(user) {
      this.confirm.contentHtml = `${user.name.first} ${user.name.last} &lt;${user.email}&gt;`;
      this.userIdRemove = user._id;
    },
    onClose(type) {
      if (type === 'ok') {
        this.deleteUser(this.userIdRemove);
      }
    },
    deleteUser(userId) {
      this.$store.dispatch('users/delete', userId)
      .then((response) => {
        this.listAllUsers();
        this.showMessage(response.message, 'top', 'center', 4000);
      })
      .catch((err) => {
        this.showMessage(err.error.message, 'top', 'center', 4000);
      });
    },
  },
  mounted() {
    this.listAllUsers();
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.users {

  #form-search {
    width: 100%;
  }
}
</style>
