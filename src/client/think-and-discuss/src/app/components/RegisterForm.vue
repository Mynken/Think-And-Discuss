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
import userSrv from '../common/services/userService';
export default {
  data() {
		return {
			login: '',
			password: ''
		}
    },
  methods: {
    register() {
    const data = {
          user: {
            email: this.login,
            password: this.password
          }
        };
        userSrv.register(data).then(res => {
          this.$alert.showSuccess(res.data, 'User created!');
          this.$router.push('/login');
        });
		}
  }
}
</script>

<style scoped>
</style>
