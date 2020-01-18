<template>
  <div class="hello">
    <h1>Welcome to Think & Discuss App</h1>

     <Button label="Login" @click="goToPage(true)"/>
      <br/>
      <br/>
      <br/>
    <Button label="Register" @click="goToPage()"/>

      <!-- <input v-model="count">
      <input v-model="user.counter">  -->
  </div>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
//  import { createHelpers } from 'vuex-map-fields';

// const { mapFields } = createHelpers({
//   getterType: 'getUserCounter',
//   mutationType: 'updateUserCounter',
// });

export default {
  methods: {
    goToPage(page) {
      // page ? this.$router.push('/login') : this.$router.push('/register');
      // this.$toast.add({severity: 'success', summary: page, detail: 'Data Saved', life: 3000});
      console.log(page);
      this.$socket.emit('news', { hello: 'world12312' });
      this.$socket.on('my other event', function (data) {
        console.log(data);
      });
		}
  },
  computed: {
    ...mapFields([
       'email',
      'id'
    ]),
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log(123);
    },

    disconnect() {
      this.isConnected = false;
         console.log(234324324);
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
