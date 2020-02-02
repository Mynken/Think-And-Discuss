
<template>
  <div id="app">
    <div id="header">
        <p>Here will come some header with logo</p>
        <router-link to="/">Home link</router-link>
    </div>
        <p></p>
        <router-view></router-view>
    <div class="footer">Footer</div>
    <Toast/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  border: 0px solid blue;
}
#header {
  background-color: lightgrey;
}
.footer {
  position: relative;
  border: 0px solid blue;
  background-color: lightgrey;
  text-align: center;
  height: 40px;
}


</style>