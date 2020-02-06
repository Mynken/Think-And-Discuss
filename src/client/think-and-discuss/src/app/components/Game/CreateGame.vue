<template>
  <div class="center-login">
    <Panel header="Game options:" :style="{ width: '50vw' }">
      <h3>Game name</h3>
      <InputText type="text" v-model="name" />
      <h3>Players quantity</h3>
      <Dropdown
        v-model="playersQuantity"
        :options="playersQuantityList"
        optionLabel="name"
        placeholder="Сhoose"
      />
      <br />
      <br />
      <Button label="Create new game" @click="createNewGame()" />
    </Panel>
  </div>
</template>

<script>
import gameSrv from '../../common/services/gameService';
export default {
  data() {
    return {
      // Array.from(Array(8), (_, x) => x + 1)
      playersQuantityList: [
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' }
      ],
      name: '',
      playersQuantity: 0
    };
  },
  methods: {
    createNewGame() {
      const data = {
        gameInfo: {
          name: this.name,
          playersQuantity: this.playersQuantity.value,
          status: 1000
        }
      };
      gameSrv.create(data).then(res => {
        this.$alert.showSuccess(res.data, 'Game created');
        this.$router.push(`/game/${res.data.gameId}`);
      });
    }
  }
};
</script>

<style scoped></style>
