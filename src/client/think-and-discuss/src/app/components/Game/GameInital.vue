<template>
	<div class="container-fluid">
		<div class="row">
			<div id="mainTextColumn" class="col-sm-5">
				<h4 class="mainTextHeader">Main Text</h4>
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
				<Button
					class="buttonFinishedWithQuotes p-button-raised p-button-secondary"
					v-show="editorMode"
					@click="editorToText"
					label="Finished with quotes"
				/>
				<div v-show="!editorMode">
					<p class="mainTextPure" v-html="turn.mainText"></p>
					<Button
						class="buttonBackToEdit p-button-raised p-button-secondary"
						@click="textToEditor"
						label="Back to editing"
					/>
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
					<div id="quotesColumn" class="col-sm-4">
						<div>
							<div>
								<span class="example-1">{{ action.quote }}</span>
							</div>
							<Button
								class="buttonAddComment p-button-raised p-button-secondary"
								v-if="!action.editorIsVisible && action.comments.length < 5"
								@click="action.editorIsVisible = !action.editorIsVisible"
								label="Add Comment"
							/>
						</div>
					</div>

					<div id="commentsColumn" class="col-sm-8">
						<Editor v-model="action.temporaryText" v-if="action.editorIsVisible">
							<template slot="toolbar">
								<span class="ql-formats">
									<select class="ql-color"></select>
									<select class="ql-background"></select>
								</span>
							</template>
						</Editor>
						<Button
							class="buttonSave p-button-raised p-button-secondary"
							label="Save"
							v-if="action.editorIsVisible"
							@click="saveComment(i)"
						/>

						<template v-if="!action.editorIsVisible">
							<div v-for="(comment, j) of action.comments" v-bind:key="comment" class="test">
								<span class="comment" v-html="comment"></span>
								<Button
									class="buttonEditComment p-button-raised p-button-secondary"
									@click="editComment(i, j)"
									label="Edit"
								/>
								<Button
									class="buttonDeleteComment p-button-raised p-button-secondary"
									@click="deleteComment(i, j)"
									label="Delete"
								/>
							</div>
						</template>
					</div>
				</div>
			<Button
			@click="saveTurn()"
			label="Save turn"
			/>
				<!--		<div class="miscVariables">
					<hr />
					<b>Misc. variables output:</b> 
          <p>Editor mode = {{ editorMode }}</p>
					<div v-for="(action, i) in turn.actions" v-bind:key="i">
						<p>{{ action.quote }}</p>
						<p>{{ action.editorIsVisible }}</p>
						<p v-for="(comment, j) in action.comments" v-bind:key="j">{{ comment }}</p>
					</div>
				</div>
				-->
			</div>
		</div>
	</div>
</template>

<script>
import gameSrv from '../../common/services/gameService';

export default {
	data() {
		return {
			editorMode: true,
			turn: {
				actions: [
					{
						id: 0,
						quote: '',
						editorIsVisible: false,
						comments: [],
						temporaryText: '',
						fromEditMode: false,
						indexOfEdittedComment: -1
					}
				],
				mainText:
					'<p>Мы уже говорили о гипотезе, которая приписывает звездным цивилизациям время жизни, <span style="background-color: rgb(255, 255, 0);">сравнимое </span>с временем жизни материнских звезд, о гипотезе, практически означающей, что единожды возникшая <span style="background-color: rgb(255, 255, 0);">цивилизация </span>существует на протяжении миллиардов лет.</p>'
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
			const oldModel = this.turn.actions;
			this.turn.actions = [];
			let div = document.createElement('div');
			div.innerHTML = text.htmlValue;
			const spans = div.querySelectorAll('span');
			for (let i = 0; i < spans.length; i++) {
				if (spans[i].style[0] === 'background-color') {
					const index = oldModel.findIndex(
						x => x.quote === spans[i].innerText
					);
					if (index !== -1) {
						this.turn.actions.push(oldModel[index]);
						oldModel.splice(index, 1);
					} else {
						this.turn.actions.push({
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
			// console.log(this.turn.actions[i].temporaryText)
			this.turn.actions[i].temporaryText = '';
			this.turn.actions[i].editorIsVisible = !this.turn.actions[i]
				.editorIsVisible;
		},

		editComment(i, j) {
			this.turn.actions[i].editorIsVisible = !this.turn.actions[i]
				.editorIsVisible;
			this.turn.actions[i].fromEditMode = true;
			this.turn.actions[i].indexOfEdittedComment = j;
			this.turn.actions[i].temporaryText = this.turn.actions[i].comments[
				j
			];
		},
		deleteComment(i, j) {
			this.turn.actions[i].comments.splice(j, 1);
		},

		saveTurn() {
			const data = {
				newTurn: {
					gameId: this.$route.params.id,
					turn: this.turn
				}
			};

        this.$alert.showSuccess(res.data, 'Turn saved');
        this.$router.push('/game/turns');
      });
		}
	}
};
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style>
.mainTextPure {
	text-align: left;
}
.mainTextHeader {
	text-align: left;
}
.buttonAddComment {
	float: right;
	margin: 7px 0px 7px 0px;
}
.buttonBackToEdit {
	float: right;
	margin: 7px 0px 17px 0px;
}
.buttonEditComment {
	margin-right: 7px;
}
.buttonFinishedWithQuotes {
	float: right;
	margin: 7px 0px 17px 0px;
}
.buttonSave {
	margin: 7px 0px 7px 0px;
	padding-bottom: 0px;
}
#mainTextColumn {
	border: 0px solid blue;
	padding-right: 7px;
}
#quotesHeader {
	border: 0px solid blue;
	text-align: left;
	padding-left: 17px;
	padding-right: 7px;
	margin-bottom: 12px;
}
#quotesColumn {
	border: 0px solid blue;
	text-align: left;
	padding-left: 17px;
	padding-right: 7px;
	padding-top: 7px;
}
#commentsHeader {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
	margin-bottom: 12px;
}
#commentsColumn {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
	padding-top: 7px;
}

.comment {
	width: full-width;
	position: relative;
	margin: 0px 0px 0px 0px;
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

.ql-snow .ql-editor img {
	width: 100% !important;
}
</style>
