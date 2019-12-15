<template>
  <div class="hello">
    <h1>{{ msg }} Hello page</h1>

     <Button type="submit" label="Login"/>
      <br/>
      <br/>
      <br/>
    <Button type="submit" label="Register"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
