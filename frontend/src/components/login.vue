<template>
  <div class="container">
    <div class="row">
      <!--<div class="col m6">
        <h2>Heading 2</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
          quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius
          modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          </p>
      </div>-->
      <div class="col m4 offset-m4">
        <h2 class="center-align">Login</h2>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" class="validate" v-model="input.email" required>
                <label for="email">Email</label>
              </div>
            </div>            
            <div class="row">
              <div class="input-field col s12">
                <input id="pass" type="password" class="validate" v-model="input.password" required>
                <label for="pass">Password</label>
              </div>
            </div>
            <!--<div>
              <div class="col s12">
                <p>
                  <input type="checkbox" id="remember">
                  <label for="remember">Lembra-me</label>
                </p>
              </div>
            </div>
            <div class="divider"></div>-->
            <div class="row">
              <div class="col m12">
                <p class="right-align">
                  <button class="btn btn-large waves-effect waves-light" type="button" name="action" @click="login(input)">Login</button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>      
    </div>
    <div class="col s12">
      <transition name="output-panel" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
        <div v-if="displayError" id="error">
          <span class="red-text ">Email ou password inválido!</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Pagina de login',
      input: {},
      displayError: false
    }
  },
  methods: {
    login (input) {
      console.log('email: ' + input.email)
      console.log('pass: ' + input.password)
      const checkLogin = true
      if (checkLogin) {
        window.location = '/dashboard'
        return
      }

      this.showError()
    },
    showError () {
      this.displayError = true
    }
  }
}
</script>

<style scoped>

</style>
