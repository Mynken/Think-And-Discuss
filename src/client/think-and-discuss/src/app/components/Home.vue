<template>
  <div class="center-login">
<Panel header="Log in" :style="{width: '50vw'}">
    <h3>Table of all games</h3>
    <Button label="Create new game" @click="createGame()"/>
</Panel>

</div>
</template>

<script>
// import axios from 'axios';
export default {
    methods: {
    createGame() {
      this.$router.push('/newGame');
		}
  },
      mounted() {
    this.$toast.add({severity: 'success', summary: 'home page loaded', detail: 'home page loaded', life: 5000});
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
