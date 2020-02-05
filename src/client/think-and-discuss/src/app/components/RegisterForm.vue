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
import userService from '../common/services/userService';
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
        userService.register(data).then(res => {
          this.$toast.add({
            severity: 'success',
            summary: res.data,
            detail: 'User created!',
            life: 3000
          });
          this.$router.push('/login');
        });
		}
  }
}
</script>

<style scoped>
</style>
