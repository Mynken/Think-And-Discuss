<template>

  <div class="center-login">
<Panel header="Log in" :style="{width: '50vw'}">
    <h3>Email</h3>
    <InputText type="text" v-model="login" />
    <h3>Password</h3>
    <InputText type="password" v-model="password" />
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
