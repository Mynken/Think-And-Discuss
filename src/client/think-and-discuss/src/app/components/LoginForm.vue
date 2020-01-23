<template>
  <div class="center-login">
<Panel header="Log in" :style="{width: '50vw'}">
    <h3>Email</h3>
    <InputText type="text" v-model="login" />
    <h3>Password</h3>
    <InputText type="password" v-model="password" />
    <br />
    <br />
    <Button label="Login" @click="logIn()"/>
</Panel>

</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
		return {
			login: '',
			password: ''
		}
    },
    methods: {
    logIn() {
      // TODO: check token and exp from localstorage or Vuex
         axios.post('http://localhost:8000/api/users/login', {
            user: {
                email: this.login,
                password: this.password
            }
            })
            .then(res => {
                this.$toast.add({severity: 'success', summary: res.data, detail: 'successfull login', life: 3000});
                console.log(res.data);
                this.$router.push('/home');
                });
		}
  }
}
</script>a

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
