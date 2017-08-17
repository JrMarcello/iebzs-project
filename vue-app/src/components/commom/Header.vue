<template>
  <header id="header">
    <div class="phone-viewport">
      <md-toolbar v-if="this.$auth.isAuthenticated()">
        <md-button id="menu" class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">IEBZS | {{ pageTitle }}</h2>

        <md-button id="btn-search" class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

        <md-button id="btn-notifications" class="md-icon-button">
          <md-icon>notifications</md-icon>
        </md-button>
        
        <md-menu md-align-trigger md-direction="bottom left">
          <md-button id="btn-logged" md-menu-trigger>logged as (Marcello Jr) <md-icon>arrow_drop_down</md-icon></md-button>

          <md-menu-content>
            <md-list>
              <md-list-item @click="logout()">
                <md-icon>exit_to_app</md-icon>
                <span>Logout</span>
              </md-list-item>
            </md-list>
          </md-menu-content>
        </md-menu>
      </md-toolbar>
      <md-toolbar v-else>
        <h2 class="md-title" style="flex: 1">IEBZS | {{ pageTitle }}</h2>
      </md-toolbar>


      <md-sidenav class="md-left" ref="leftSidenav">
        <md-toolbar class="sidenav-header md-large">
          <div class="md-toolbar-container">
            <md-avatar class="md-large">
              <img src="https://placeimg.com/40/40/nature/1" alt="User name">
            </md-avatar>
            <h3 class="md-title">
              <span>João Silva</span>
              <md-menu md-align-trigger>
                <span md-menu-trigger>joaosilva@example.com <md-icon>arrow_drop_down</md-icon></span>

                <md-menu-content>
                  <md-menu-item disabled>Edit my account</md-menu-item>
                  <md-menu-item @click="logout()">Logout</md-menu-item>
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

          <md-list-item id="menu-products">
            <md-icon>shopping_cart</md-icon>
            <span><a href="#!">Usuários</a></span>
            <md-list-expand>
              <md-list>
                <md-list-item id="menu-users-all-users" class="md-inset"><router-link to="/user">Listar</router-link></md-list-item>
                <md-list-item id="menu-users-add-new" class="md-inset"><router-link to="/user/add">Novo</router-link></md-list-item>                
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item id="menu-suppliers">
            <md-icon>local_shipping</md-icon>
            <span><a href="#!">Membros</a></span>
            <md-list-expand>
              <md-list>
                <md-list-item id="menu-members-all-members" class="md-inset"><router-link to="/members">Listar</router-link></md-list-item>
                <md-list-item id="menu-members-add-new" class="md-inset"><router-link to="/members/add">Novo</router-link></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>  
      </md-sidenav>
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
      this.$auth.logout();
      this.$router.push('/login');
    },
  },
  mounted() {
    this.updatePageTitle(this.$router.currentRoute.name);
  },
  watch: {
    $route(to) {
      this.$refs.leftSidenav.close();
      this.updatePageTitle(to.name);
    },
  },
};
</script>

<style scoped lang="scss">
  #header {
    margin-bottom: 40px;

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