
<template>
	
	<div class="container-fluid">
	<div class="row">

<!-- 	1st panel, Main text Editor -->
		<div id="editorColumn" class="col-sm-5">
				<h4 class="panel1HeaderText">Source Text</h4>
				<Editor
					v-model="turn.mainText"
					@text-change="originalTextChanged($event)"
					editorStyle="height: 700px"
				>
					<template slot="toolbar">
						<span class="ql-formats">
							<select class="ql-color"></select>
							<select class="ql-background"></select>
						</span>
					</template>
				</Editor>
		</div>


		<div id="rightHalfScreen" class="col-sm-7">
			<div id="rightRows" class="row">
				<div id="quotesHeader" class="col-sm-5">	
					<h4>Quotes</h4>
					<br>
					<br>
				</div>	
				<div id="commentsHeader" class="col-sm-7">
					<h4>Comments</h4>
					<br>
					<br>
				</div>
			</div>
			
			<div id="multipleRows" class="row" v-for="(item, index) in analyticList" v-bind:key="index">

<!-- 			2nd panel, Quotes -->
				<div id="quotesColumn" class="col-sm-5">
						<div>
							<span class="example-1">{{ item }} </span>
							<p></p>
						</div>
						<br>
				</div>
			
<!-- 			3rd panel, Comments -->
				<div id="commentsColumn" class="col-sm-7">
					<div>
						<!-- Test comment Editor -->
						<Editor v-model="testText">
							<template slot="toolbar">
								<span class="ql-formats">
									<select class="ql-color"></select>
									<select class="ql-background"></select>
								</span>
							</template>
						</Editor>
					</div>
				</div>



			</div>

<!-- 		Area for misc variables output, aka console                             -->			
			<div class="miscVariables">
				<hr>
				<b>Misc. variables output:</b>
				<p>{{ analyticList }}</p>
				<p>{{ turn.actions[0].post.quote }}</p>				                            
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

		turn: {                     	// объект данного хода
			actions: [                	// массив действий
				{   
					post: {
					id: 0,              // commentIndex: null,
					quote: 'Hello, this is a dummy quote, to test "turn" object', 
										// highlightedQuotes: [],
					comment: '',        // commentsForQuotes: [],
					isVisible: true,    // commentInEditorMode: [],
					},
				},
			],
			mainText: "<p>Мы уже говорили о гипотезе, которая приписывает звездным цивилизациям время жизни, <span style=\"background-color: rgb(255, 255, 0);\">сравнимое </span>с временем жизни материнских звезд, о гипотезе, практически означающей, что единожды возникшая <span style=\"background-color: rgb(255, 255, 0);\">цивилизация </span>существует на протяжении миллиардов лет.</p>", // Editor text
		},

		analyticList: [],
		testText: '',
		
        };
	},

	methods: {

		originalTextChanged(text) {
			console.log('text = ', text.htmlValue);

			this.analyticList = [];

			let div = document.createElement('div');
			console.log('div = ', div);
			
			div.innerHTML = text.htmlValue;
			console.log('div.innerHTML = ', div.innerHTML); 

			const spans = div.querySelectorAll('span');
			console.log('spans = ', spans); 

			for (let i = 0; i < spans.length; i++) {
				if (spans[i].style[0] === 'background-color') {
					this.analyticList.push(spans[i].innerText);
				}
				
			}
			console.log('analyticList = ', this.analyticList);
		},

//          for (let i = 0; i < spans.length; i++) {
//				if (spans[i].style[0] === 'background-color') {
//  				this.turn.actions[i].post.quote.push(spans[i].innerText);
//				};
//			};



	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.panel1HeaderText {
	text-align: left;
}
#editorColumn {	
	border: 0px solid blue;
	padding-right: 7px;
}
#quotesHeader {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
	padding-right: 7px;
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
}
#commentsColumn {
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
}
.example-1 {
	background-color: yellow;
}
.miscVariables{
	border: 0px solid blue;
	text-align: left;
	padding-left: 0px;
}
#rightHalfScreen {
	padding-left: 7px;

}
#rightRows{
	padding-left: 7px;
}
#multipleRows {
	padding-left: 7px;
}


</style>










