<template>
  <div class="hello">
    <h1>Welcome to Think & Discuss App</h1>

     <Button label="Login" @click="goToPage(true)"/>
      <br/>
      <br/>
      <br/>
    <Button label="Register" @click="goToPage()"/>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(page) {
      page ? this.$router.push('/login') : this.$router.push('/login');
			// this.$toast.add({severity: 'success', summary: page, detail: 'Data Saved', life: 3000});
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
