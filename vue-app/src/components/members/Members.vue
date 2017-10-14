<template>
  <div class="members">
    <md-snackbar id="message" :md-position="message.vertical + ' ' + message.horizontal" ref="snackbar" :md-duration="message.duration">
      <span>{{ message.text }}</span>
    </md-snackbar>

    <md-layout md-align="center" md-gutter>
      <md-layout md-flex="40">
        <form id="form-search" novalidate @submit.prevent="">
          <md-input-container>
            <md-icon>search</md-icon>
            <label>Digite um email</label>
            <md-input id="member-input-search" type="search" v-model="memberSearchFilter"></md-input>
          </md-input-container>
        </form>
      </md-layout>
    </md-layout>

    <div class="phone-viewport">
      <md-list v-if="filteredMembers.length > 0" class="custom-list md-triple-line">
        <md-list-item :id="'member-listitem-' + index" v-for="(member, index) in filteredMembers" :key="member._id">
          <router-link :to="'/member/detail/' + member._id">
            <md-layout md-align="center" md-gutter>
              <md-layout md-flex="90">

                <md-avatar>
                  <img src="/static/images/avatar.jpg" alt="img">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>{{member.name.first + ' ' + member.name.last}}</span>
                  <span>{{member.email}}</span>
                </div>
                <md-button :id="'member-edit-' + index" class="md-icon-button md-raised">
                  <router-link :to="'/member/edit/' + member._id">
                    <md-icon class="md-primary">edit</md-icon>
                  </router-link>
                </md-button>

                <md-button :id="'member-delete-' + index" class="md-icon-button md-raised" @click.prevent="openDialog('delete' + member._id)">
                  <md-icon class="md-primary">delete</md-icon>
                </md-button>

                <md-dialog-confirm
                  :id="`dialog-${index}`"
                  :md-title="confirm.title"
                  :md-content-html="confirm.contentHtml"
                  :md-ok-text="confirm.delete"
                  :md-cancel-text="confirm.cancel"
                  @open="onOpen(member)"
                  @close="onClose"
                  :ref="'delete' + member._id">
                </md-dialog-confirm>

              </md-layout>
            </md-layout>
            <md-divider></md-divider>
          </router-link>
        </md-list-item>
      </md-list>

      <md-list v-else class="custom-list">
        <md-list-item id="member-listitem-not-found">
          <md-layout md-align="center" md-gutter>
            <md-layout md-flex="90">
              <div class="md-list-text-container">
                <span>Nehum membro encontrado</span>
              </div>
            </md-layout>
          </md-layout>
        </md-list-item>
      </md-list>
      
    </div>

    <md-button class="md-fab md-fab-bottom-right md-primary">
      <router-link to="/member/add">
        <md-icon>add</md-icon>
      </router-link>
    </md-button>
  </div>
</template>

<script>
/* eslint no-underscore-dangle:0 */
export default {
  name: 'members',
  data() {
    return {
      memberSearchFilter: '',
      memberIdRemove: '',
      confirm: {
        title: 'Você realmente quer deletar o Membro selecionado?',
        contentHtml: ' ',
        delete: 'Deletar',
        cancel: 'Cancelar',
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
    members() {
      return this.$store.getters['members/members'];
    },
    filteredMembers() {
      return this.members.filter((item) => {
        if (this.memberSearchFilter === '') {
          return true;
        }
        return item.email.indexOf(this.memberSearchFilter) > -1;
        // @TODO: do this with 'string match' (regex), because case sensitive
      });
    },
  },
  methods: {
    listAllMembers() {
      this.$store.dispatch('members/getAll');
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
    onOpen(member) {
      this.confirm.contentHtml = `${member.name.first} ${member.name.last} &lt;${member.email}&gt;`;
      this.memberIdRemove = member._id;
    },
    onClose(type) {
      if (type === 'ok') {
        this.deleteMember(this.memberIdRemove);
      }
    },
    deleteMember(id) {
      this.$store.dispatch('members/delete', id)
      .then((response) => {
        this.listAllMembers();
        this.showMessage(response.message, 'top', 'center', 4000);
      })
      .catch((err) => {
        this.showMessage(err.error.message, 'top', 'center', 4000);
      });
    },
  },
  mounted() {
    this.listAllMembers();
  },
};
</script>

<style scoped lang="scss">
.members {

  #form-search {
    width: 100%;
  }
}
</style>
