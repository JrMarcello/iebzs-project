<template>
  <header id="header">
    <div v-if="isAuthenticated" class="phone-viewport">
      <md-toolbar>
        <md-button id="menu" class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">{{ pageTitle }}</h2>

        <div class="header-logo" style="flex: 5">
          <router-link to="/"><img class="header-logo__img" src="/static/images/logo-white.png"/></router-link>
        </div>

        <md-button id="btn-search" class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

        <md-button id="btn-notifications" class="md-icon-button">
          <md-icon>notifications</md-icon>
        </md-button>

        <md-menu md-align-trigger md-direction="bottom left">
          <md-button id="btn-logged" md-menu-trigger>{{(userLogged) ? userLogged.name.first : ''}}<md-icon>arrow_drop_down</md-icon></md-button>

          <md-menu-content>
            <md-list>
              <md-list-item @click="logout()">
                <md-icon>exit_to_app</md-icon>
                <span>Sair</span>
              </md-list-item>
            </md-list>
          </md-menu-content>
        </md-menu>
      </md-toolbar>

      <md-sidenav class="md-left" ref="leftSidenav">
        <md-toolbar class="sidenav-header md-large">
          <div class="md-toolbar-container">
            <md-avatar class="md-large">
              <img :src="(userLogged && userLogged.avatar) ? userLogged.avatar : './static/images/avatar.jpg'" alt="img">
            </md-avatar>
            <h3 class="md-title">
              <span>{{(userLogged) ? userLogged.name.first : ''}}</span>
              <md-menu md-align-trigger>
                <span md-menu-trigger>{{(userLogged) ? userLogged.email : ''}}<md-icon>arrow_drop_down</md-icon></span>

                <md-menu-content>
                  <md-menu-item disabled>Editar conta</md-menu-item>
                  <md-menu-item @click="logout()">Sair</md-menu-item>
                </md-menu-content>
              </md-menu>
            </h3>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item id="menu-dashboard">
            <md-icon>dashboard</md-icon>
            <span><router-link to="/">Dashboard</router-link></span>
          </md-list-item>
          <md-list-item id="menu-members">
            <md-icon>people</md-icon>
            <span><a href="#!">Membros</a></span>
            <md-list-expand>
              <md-list>
                <md-list-item id="menu-members-all-members" class="md-inset"><router-link to="/membros">Listar</router-link></md-list-item>
                <md-list-item id="menu-members-add-new" class="md-inset"><router-link to="/membro/add">Novo</router-link></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <md-list-item id="menu-users">
            <md-icon>person</md-icon>
            <span><a href="#!">Usuários</a></span>
            <md-list-expand>
              <md-list>
                <md-list-item id="menu-users-all-users" class="md-inset"><router-link to="/usuarios">Listar</router-link></md-list-item>
                <md-list-item id="menu-users-add-new" class="md-inset"><router-link to="/usuario/add">Novo</router-link></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </md-sidenav>
      <md-button class="md-fab md-primary" @click.prevent="$router.go(-1)">
        <md-icon>arrow_back</md-icon>
      </md-button>
    </div>    
    <div v-else class="phone-viewport">
      <md-toolbar>
          <div class="header-logo" style="flex: 1">
            <img class="header-logo__img" src="/static/images/logo-white.png"/>
          </div>
      </md-toolbar>    
    </div>  
  </header>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      pageTitle: '',
    };
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    updatePageTitle(text) {
      this.pageTitle = text;
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.updatePageTitle(this.$router.currentRoute.name);
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    userLogged() {
      return this.$store.getters['auth/loggedUser'];
    },
  },
  watch: {
    $route(to) {
      if (this.$refs.leftSidenav) {
        this.$refs.leftSidenav.close();
      }

      this.updatePageTitle(to.name);
    },
  },
};
</script>

<style scoped lang="scss">
  #header {
    margin-bottom: 40px;

    .header-logo {
      text-align: center;
    }

    .header-logo__img {
      width: 90px;
    }

    .sidenav-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;

      .md-toolbar-container {
        align-self: center;

        .md-avatar {
          margin-right: 15px;
        }

        .md-title {
          font-size: 14px;

          & > span {
            font-size: 18px;
          }

          .md-menu {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
