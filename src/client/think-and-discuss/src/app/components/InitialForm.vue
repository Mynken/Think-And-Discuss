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
      page ? this.$router.push('/login') : this.$router.push('/register');

      // this.$socket.emit('news', { hello: 'world12312' });
      // this.$socket.on('my other event', function (data) {
      //   console.log(data);
		}
  },

  sockets: {
    connect() {
      this.isConnected = true;
      console.log('socket connected');
    },

    disconnect() {
      this.isConnected = false;
         console.log('socket disconnected');
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data
    }

  }
}

</script>

<style scoped>
</style>
