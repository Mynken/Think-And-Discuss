<template>
	<div class="center-login">
		<Panel header="Game options:" :style="{ width: '50vw' }">
			<h3>Game name</h3>
			<InputText type="text" v-model="name" />
			<h3>Players quantity</h3>
			<Dropdown v-model="playersQuantity" :options="cities" optionLabel="name" placeholder="Сhoose" />
			<br />
			<br />
			<Button label="Create new game" @click="createnewGame()" />
		</Panel>
	</div>
</template>

<script>
import gameService from "../../common/services/gameService";
export default {
	data() {
		return {
			// Array.from(Array(8), (_, x) => x + 1)
			cities: [
				{ name: "1", value: "1" },
				{ name: "2", value: "2" },
				{ name: "3", value: "3" },
				{ name: "4", value: "4" },
				{ name: "5", value: "5" },
				{ name: "6", value: "6" },
				{ name: "7", value: "7" },
				{ name: "8", value: "8" }
			],
			name: "",
			playersQuantity: 0
		};
	},
	methods: {
		createnewGame() {
			console.log(this.$store);

			const gameInfo = {
				name: this.name,
				playersQuantity: this.playersQuantity.value,
				status: 1000
			};
			gameService.create(gameInfo).then(res => {
				this.$toast.add({
					severity: "success",
					summary: res.data,
					detail: "Game created",
					life: 3000
				});
				console.log(res.data);
				this.$router.push(`/game/${res.data.gameId}`);
			});
			// axios
			//   .post("http://localhost:8000/api/game/create", {
			//     gameInfo: {
			//       name: this.name,
			//       playersQuantity: this.playersQuantity.value,
			//       status: 1000
			//     },

			//   }, { headers: {
			//       Authorization: 'Token ' + this.$store.state.user.token
			//     } })
			//   .then(res => {
			//     this.$toast.add({
			//       severity: "success",
			//       summary: res.data,
			//       detail: "Game created",
			//       life: 3000
			//     });
			//     console.log(res.data);
			//     this.$router.push(`/game/${res.data.gameId}`);
			//   });
		}
	}
};
</script>

<style scoped></style>
