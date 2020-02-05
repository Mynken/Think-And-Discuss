<template>
  <div class="center-login">
<Panel header="Log in" :style="{width: '50vw'}">
    <h3>Table of all games</h3>
    <Button label="Create new game" @click="createGame()"/>
</Panel>

</div>
</template>

<script>
export default {
    methods: {
    createGame() {
      this.$router.push('/createGame');
		}
  }
}
</script>

<style scoped>
</style>
