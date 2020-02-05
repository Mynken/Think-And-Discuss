<template>
  <div class="center-login">
    <Panel header="Log in" :style="{ width: '50vw' }">
      <h3>Email</h3>
      <InputText type="text" v-model="login" />
      <h3>Password</h3>
      <InputText type="password" v-model="password" />
      <br />
      <br />
      <Button label="Login" @click="logIn()" />
    </Panel>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import userService from '../common/services/userService';
import { USER_UPDATE_INFO } from '../store/actions';

export default {
  data() {
    return {
      login: '',
      password: ''
    };
  },
  methods: {
    ...mapActions([
      //  { add: 'updateUserInfo' }
      USER_UPDATE_INFO
    ]),

    logIn() {
      const data = {
        user: {
          email: this.login,
          password: this.password
        }
      };
      userService.logIn(data).then(res => {
        this.$toast.add({
          severity: 'success',
          summary: 'Successfully loged in',
          detail: 'Welcome back!',
          life: 3000
        });
        this.updateUserInfo(res.data);
        this.$router.push('/home');
      });
    }
  }
};
</script>

<style scoped></style>
