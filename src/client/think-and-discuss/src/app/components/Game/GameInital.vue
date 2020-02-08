<template>
	<div class="container-fluid">
		<div class="row">
			<div id="mainTextColumn" class="col-sm-5">
				<h4 class="mainTextHeader">Main Text</h4>
				<Button v-show="editorMode" @click="editorToText" label="Finished with quotes" />
				<Editor
					v-show="editorMode"
					v-model="turn.mainText"
					@text-change="mainTextChanged($event)"
					editorStyle="height: 450px"
				>
					<template slot="toolbar">
						<span class="ql-formats">
							<!--						<select class="ql-color"></select>					-->
							<select class="ql-background"></select>
						</span>
					</template>
				</Editor>
				<div v-show="!editorMode">
					<Button @click="textToEditor" label="Back to editing" />
					<p class="mainTextPure" v-html="turn.mainText"></p>
				</div>
			</div>

			<div id="rightHalfScreen" class="col-sm-7">
				<div id="rightRows" class="row">
					<div id="quotesHeader" class="col-sm-5">
						<h4>Quotes</h4>
					</div>
					<div id="commentsHeader" class="col-sm-7">
						<h4>Comments</h4>
					</div>
				</div>

				<div id="multipleRows" class="row" v-for="(action, i) in turn.actions" v-bind:key="i">
					<div id="quotesColumn" class="col-sm-5">
						<div>
							<span class="example-1">{{ action.quote }}</span>
						</div>
					</div>

					<div id="commentsColumn" class="col-sm-7">
						<Button
							v-if="!action.editorIsVisible && action.comments.length < 5"
							@click="action.editorIsVisible = !action.editorIsVisible"
							label="Add Comment"
						/>

						<Editor v-model="action.temporaryText" v-if="action.editorIsVisible">
							<template slot="toolbar">
								<span class="ql-formats">
									<select class="ql-color"></select>
									<select class="ql-background"></select>
								</span>
							</template>
						</Editor>
						<Button label="Save" v-if="action.editorIsVisible" @click="saveComment(i)" />

						<template v-if="!action.editorIsVisible">
							<div v-for="(comment, j) of action.comments" v-bind:key="comment" class="test">
								<p v-html="comment"></p>
								<Button @click="editComment(i, j)" label="Edit" />
							</div>
						</template>

						<!-- <div v-for="(comment, j) in action.comments" v-bind:key="j">
							<Button
								v-if="!action.editorIsVisible"
								@click="action.editorIsVisible = !action.editorIsVisible"
								label="Edit Comment"
							/>
							<Button v-if="action.editorIsVisible" @click="saveComments(i)" label="Done" />

							<div>
								<Editor v-if="action.editorIsVisible" v-model="action.temporaryText">
									<template slot="toolbar">
										<span class="ql-formats">
											<select class="ql-color"></select>
											<select class="ql-background"></select>
										</span>
									</template>
								</Editor>
								<p v-if="!action.editorIsVisible" v-html="action.comments[j]"></p>
							</div>
						</div>-->
					</div>
				</div>

				<div class="miscVariables">
					<hr />
					<b>Misc. variables output:</b>
					<!--    
          <p>Editor mode = {{ editorMode }}</p>
					-->
					<div v-for="(action, i) in turn.actions" v-bind:key="i">
						<p>{{ action.quote }}</p>
						<p>{{ action.editorIsVisible }}</p>
						<p v-for="(comment, j) in action.comments" v-bind:key="j">{{ comment }}</p>
					</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import axios from 'axios';
export default {
	data() {
		return {
			editorMode: true,
			turn: {
				actions: [
					{
						id: 0,
						quote: "",
						editorIsVisible: false,
						comments: [],
						temporaryText: "",
						fromEditMode: false,
						indexOfEdittedComment: -1
					}
				],
				mainText:
					'<p>Мы уже говорили о гипотезе, которая приписывает звездным цивилизациям время жизни, <span style="background-color: rgb(255, 255, 0);">сравнимое </span>с временем жизни материнских звезд, о гипотезе, практически означающей, что единожды возникшая <span style="background-color: rgb(255, 255, 0);">цивилизация </span>существует на протяжении миллиардов лет.</p>' // Editor text
			}
		};
	},

	methods: {
		textToEditor() {
			this.editorMode = true;
		},

		editorToText() {
			this.editorMode = false;
		},

		mainTextChanged(text) {
			const oldModel = this.turn.actions; // переписать turn.actions в резервный массив
			this.turn.actions = []; // стереть всё в turn.actions
			let div = document.createElement("div");
			div.innerHTML = text.htmlValue;
			const spans = div.querySelectorAll("span"); // выделение цветных цитат
			for (let i = 0; i < spans.length; i++) {
				if (spans[i].style[0] === "background-color") {
					// если style == color
					const index = oldModel.findIndex(
						x => x.quote === spans[i].innerText
					);
					// то записать в резервный массив цитаты
					if (index !== -1) {
						// если больше ничего не найдено
						this.turn.actions.push(oldModel[index]);
						// то переписать этот элемент резервного массива в turn.actions
						oldModel.splice(index, 1);
						// и выбросить этот элемент из резервного массива
					} else {
						// а если найдено
						this.turn.actions.push({
							// то записать в turn.actions его значение
							quote: spans[i].innerText,
							editorIsVisible: false,
							comments: []
						});
					}
				}
			}
		},

		saveComment(i) {
			if (this.turn.actions[i].fromEditMode) {
				this.turn.actions[i].comments[
					this.turn.actions[i].indexOfEdittedComment
				] = this.turn.actions[i].temporaryText;

				this.turn.actions[i].fromEditMode = false;
				this.turn.actions[i].indexOfEdittedComment = -1;
			} else {
				this.turn.actions[i].comments.push(
					this.turn.actions[i].temporaryText
				);
			}

			this.turn.actions[i].temporaryText = "";
			this.turn.actions[i].editorIsVisible = !this.turn.actions[i]
				.editorIsVisible;

			// for (let j = 0; j < this.turn.actions[i].comments.length; j++) {
			// 	if (this.turn.actions[i].comments[j] == "") {
			// 		this.turn.actions[i].comments.splice(j, 1); // array garbage collector
			// 	}
			// }
		},

		editComment(i, j) {
			this.turn.actions[i].editorIsVisible = !this.turn.actions[i]
				.editorIsVisible;
			this.turn.actions[i].fromEditMode = true;
			this.turn.actions[i].indexOfEdittedComment = j;
			this.turn.actions[i].temporaryText = this.turn.actions[i].comments[
				j
			];
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainTextPure {
	text-align: left;
}
.mainTextHeader {
	text-align: left;
}
#mainTextColumn {
	border: 0px solid blue;
	padding-right: 7px;
}
#quotesHeader {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
	padding-right: 7px;
	margin-bottom: 38px;
}
#quotesColumn {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
	padding-right: 7px;
}
#commentsHeader {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
	margin-bottom: 38px;
}
#commentsColumn {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
}
.example-1 {
	background-color: yellow;
}
.miscVariables {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
}
#rightHalfScreen {
	padding-left: 7px;
}
#rightRows {
	padding-left: 7px;
}
#multipleRows {
	padding-left: 7px;
}

.test {
	padding-bottom: 5px;
}
</style>