
<template>
  <div>
    {{ queryDb() }}
  </div>
</template>

<script>
  import gameSrv from '../../common/services/gameService';

  export default {
    data() {
      return {
      }
    },

    methods: {
      queryDb() {
        let answer = 0;
        let model = 'SELECT';
        gameSrv.getTurn(model).then(res => {
          answer = res.data;
          this.$alert.showSuccess(res.data, 'success');
        });
        return answer;
      },
    },
  }
</script>

<style>
</style>