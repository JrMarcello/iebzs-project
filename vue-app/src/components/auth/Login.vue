<template>
  <div class="login">
    <md-snackbar id="message" :md-position="message.vertical + ' ' + message.horizontal" ref="snackbar" :md-duration="message.duration">
      <span>{{ message.text }}</span>
    </md-snackbar>
    <md-layout md-align="center" md-gutter="40">
      <md-layout md-flex="25" md-tag="form">
        <md-whiteframe md-elevation="2" class="login-whiteframe">
          <form v-on:submit.prevent="login()">
            <md-input-container id="login-email">
              <label>Email</label>
              <md-input v-model="credentials.email" placeholder="Email"></md-input>
            </md-input-container>

            <md-input-container md-has-password id="login-password">
              <label>Password</label>
              <md-input type="password" v-model="credentials.password"></md-input>
            </md-input-container>

            <md-button id="login-btn" type="submit" class="md-raised md-primary login-icon">
              <md-icon>send</md-icon> Login
            </md-button>
          </form>
        </md-whiteframe>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        remember: false,
      },
      message: {
        text: '',
        vertical: '',
        horizontal: '',
        duration: 4000,
      },
    };
  },
  methods: {
    login() {
      this.$auth.login(this.credentials)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          const errorMessage = (err.body.error) ? err.body.error : 'Unexpected error';
          this.showMessage(errorMessage, 'top', 'center', 4000);
        });
    },
    showMessage(text, vertical, horizontal, duration) {
      this.message.text = text;
      this.message.vertical = vertical;
      this.message.horizontal = horizontal;
      this.message.duration = duration;

      this.$refs.snackbar.open();
    },
  },
};
</script>

<style scoped lang="scss">
  .login {

    &-whiteframe {
      width: 100%;
      padding: 15px 25px;
    }

    &-icon {
      float: right;
    }
    
  }
</style>
