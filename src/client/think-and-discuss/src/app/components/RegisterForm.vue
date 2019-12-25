<template>
  <div class="center-login">
<Panel header="Register" :style="{width: '50vw'}">
    <h3>Email</h3>
    <InputText type="text" v-model="login" />
    <h3>Password</h3>
    <InputText type="password" v-model="password" />
    <br />
    <br />
    <Button label="Register" @click="register()"/>
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
    register() {
        axios.post('http://localhost:8000/api/users/', {
            user: {
                email: this.login,
                password: this.password
            }
            })
            .then(res => {
                this.$toast.add({severity: 'success', summary: res.data, detail: 'User created', life: 3000});
                console.log(res.data);
                this.$router.push('/login');
                });
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
