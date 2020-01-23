<template>
<div>
	<div class="row gameRow">
		<div class="col-sm-4">
			<Panel header="Original text">
				<Editor
					v-model="originalText"
					@input="originalTextChanged($event)"
					editorStyle="height: 420px">
					<template slot="toolbar">
						<span class="ql-formats">
							<select class="ql-color"></select>
							<select class="ql-background"></select>
						</span>
					</template>
				</Editor>
			</Panel>
		</div>
		<div class="col-sm-4">
			<Panel header="Key phrases">
				<ul id="example-1">
				Make analytics Great again!
					<li v-for="(item, index) in analyticList" v-bind:key="index">{{ item }}</li>
				</ul>
			</Panel>
		</div>
		<div class="col-sm-4">
			<Panel header="Comments">
				<Editor v-model="testText"  editorStyle="height: 420px">
					<template slot="toolbar">
						<span class="ql-formats">
							<select class="ql-color"></select>
							<select class="ql-background"></select>
						</span>
					</template>
				</Editor>
			</Panel>
		</div>
	</div>
	</div>
</template>

<script>
// import axios from 'axios';
export default {
    
	data() {
        return {
		originalText: "",
        analyticList: [],
        testText: ''
        }
	},

	methods: {
		originalTextChanged(text) {
			console.log(text);

			//eslint-disable-next-line
			// const regex = new RegExp('\<span\\b[^>]*style=["][^]*[^>]>(.*?)<\/span>');
			// console.log(text.match(regex));
			this.analyticList = [];

			let div = document.createElement('div');
			div.innerHTML = text;

			const spans = div.querySelectorAll('span');
			for (let i = 0; i < spans.length; i++) {
				if (spans[i].style[0] === 'background-color') {
					this.analyticList.push(spans[i].innerText);
				}
				
			}

            // let coloredText = event.source.ops.filter( x => x.attributes && x.attributes.background);
            // this.analyticList = [];
            // coloredText.forEach(el => {
            //     this.analyticList.push(el.insert);
            // });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gameRow {
	margin-right: 0px;
	margin-left: 0px;
}

</style>
