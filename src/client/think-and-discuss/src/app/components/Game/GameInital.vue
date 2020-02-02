<template>
	
	<div class="container-fluid">
    <div class="row">

      <div id="mainTextColumn" class="col-sm-5">
          <h4 class="mainTextHeader">Main Text</h4>
          <button v-show="editorMode" 
              @click="editorToText">
              Finished with quotes</button>
          <Editor
            v-show="editorMode"
            v-model="turn.mainText"
            @text-change="mainTextChanged($event)"
            editorStyle="height: 450px">
            <template slot="toolbar">
              <span class="ql-formats">
  <!--						<select class="ql-color"></select>					-->
                <select class="ql-background"></select>
              </span>
            </template>
          </Editor>
          <div v-show="!editorMode">
            <button @click="textToEditor">Back to editing</button>
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
        
        <div id="multipleRows" class="row" v-for="(item, i) in turn.actions" v-bind:key="i">

          <div id="quotesColumn" class="col-sm-5">
            <div>
              <span class="example-1">{{ item.post.quote }} </span>
            </div>
          </div>
        
          <div id="commentsColumn" class="col-sm-7">
            <div>       <!--  v-on:click="mouseOverComment(i)" --> 
              <button v-if="item.post.editorIsVisible" @click="item.post.editorIsVisible = !item.post.editorIsVisible">Edit Comment</button>            
              <button v-if="!item.post.editorIsVisible" @click="item.post.editorIsVisible = !item.post.editorIsVisible">Done</button>      
              <Editor v-if="!item.post.editorIsVisible" v-model="item.post.comment">
                <template slot="toolbar">
                  <span class="ql-formats">
  <!--								<select class="ql-color"></select>             -->
                    <select class="ql-background"></select>
                  </span>
                </template>
              </Editor>
              <p v-if="item.post.editorIsVisible" v-html=" item.post.comment"></p>
            </div>
          </div>
        </div>
      
        <div class="miscVariables">
          <hr>
          <b>Misc. variables output:</b>
          <p>Editor mode = {{ editorMode }}</p>
          <div v-for="(item, i) in turn.actions" v-bind:key="i">
            <p>{{ turn.actions[i].post.quote }}</p>	
            <p>{{ turn.actions[i].post.comment }}</p>
          </div>
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
					post: {
					id: 0,
					quote: '',
					comment: '',
					editorIsVisible: true,
					},
				},
			],
			mainText: "<p>Мы уже говорили о гипотезе, которая приписывает звездным цивилизациям время жизни, <span style=\"background-color: rgb(255, 255, 0);\">сравнимое </span>с временем жизни материнских звезд, о гипотезе, практически означающей, что единожды возникшая <span style=\"background-color: rgb(255, 255, 0);\">цивилизация </span>существует на протяжении миллиардов лет.</p>", 
		},

		temporaryCommentArray: [],

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

			for (let i = 0; i < this.turn.actions.length; i++) {
				this.temporaryCommentArray[i] = this.turn.actions[i].post.comment;
			}
			this.turn.actions = [];

			let div = document.createElement('div');
			div.innerHTML = text.htmlValue;
			const spans = div.querySelectorAll('span');

			for (let i = 0; i < spans.length; i++) {
				if (spans[i].style[0] === 'background-color') {
					this.turn.actions.push( {post: {quote: spans[i].innerText, editorIsVisible: true, id: i, comment: ''}} );
					this.turn.actions[i].post.comment = this.temporaryCommentArray[i];
				}
			}
    },
    
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mainTextPure {
	text-align: left;
}
.mainTextHeader{
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
.miscVariables{
	border: 0px solid blue;
	text-align: left;
	padding-left: 7px;
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










