<template>
	<div class="row">
		<div class="col-sm-4">
			<Panel header="Original text">
				<Editor
					v-model="originalText"
					@text-change="originalTextChanged($event)"
					editorStyle="height: 420px"
				>
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
				Make analytics Great again!
				<ul id="example-1">
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
		originalTextChanged(event) {
            let coloredText = event.source.ops.filter( x => x.attributes && x.attributes.background);
            this.analyticList = [];
            coloredText.forEach(el => {
                this.analyticList.push(el.insert);
            });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
