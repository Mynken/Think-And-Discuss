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

export default {
  data() {
		return {
			login: '',
			password: ''
		}
    },
    methods: {
    logIn() {
      // check token if exsist then no request
         this.$http.post('http://localhost:8000/api/users/login', {
            user: {
                email: this.login,
                password: this.password
            }
            })
            .then(res => {
                this.$toast.add({severity: 'success', summary: res.data, detail: 'Successfull login', life: 3000});
                this.$store.commit('updateUserInfo', res.data)
                this.$router.push('/home');
                });
		}
  }
}
</script>

<style scoped>
</style>
