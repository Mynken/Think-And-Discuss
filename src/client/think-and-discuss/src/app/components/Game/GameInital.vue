<template>
  <div>
    <div class="row gameRow">
      <div class="col-sm-4">
        <Panel header="Original text">
          <Editor
            v-model="turn.mainText"
            @input="mainTextChanged($event)"
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
      <div class="col-sm-8">
        <Panel header="Analitics">
          <div v-for="(item, index) in turn.actions" v-bind:key="index">
            <Card>
              <template slot="title">
                {{ item.quote }}
              </template>
              <template slot="content">
                <Button
                  label="Add comment"
                  v-if="item.editorIsVisible && item.comments.length < 5"
                  @click="item.editorIsVisible = !item.editorIsVisible"
                />

                <Editor
                  v-model="item.temporaryText"
                  v-if="!item.editorIsVisible"
                >
                  <template slot="toolbar">
                    <span class="ql-formats">
                      <select class="ql-color"></select>
                      <select class="ql-background"></select>
                    </span>
                  </template>
                </Editor>
                <Button
                  label="Save"
                  v-if="!item.editorIsVisible"
                  @click="saveComment(index)"
                />

                <template v-if="item.editorIsVisible">
                  <div v-for="comment of item.comments" v-bind:key="comment">
                    <p v-html="comment"></p>
                  </div>
                </template>
              </template>
            </Card>
          </div>
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
      turn: {
        actions: [
          {
            id: 0,
            quote: "",
            editorIsVisible: true,
            comments: [],
            temporaryText: ""
          }
        ],
        mainText:
          '<p>Мы уже говорили о гипотезе, которая приписывает звездным цивилизациям время жизни, <span style="background-color: rgb(255, 255, 0);">сравнимое </span>с временем жизни материнских звезд, о гипотезе, практически означающей, что единожды возникшая <span style="background-color: rgb(255, 255, 0);">цивилизация </span>существует на протяжении миллиардов лет.</p>' // Editor text
      }
    };
  },

  methods: {
    mainTextChanged(text) {
      //eslint-disable-next-line
      // const regex = new RegExp('\<span\\b[^>]*style=["][^]*[^>]>(.*?)<\/span>');
      // console.log(text.match(regex));
      const oldModel = this.turn.actions;
      this.turn.actions = [];
      let div = document.createElement("div");
      div.innerHTML = text;

      const spans = div.querySelectorAll("span");
      for (let i = 0; i < spans.length; i++) {
        if (spans[i].style[0] === "background-color") {
          const index = oldModel.findIndex(x => x.quote === spans[i].innerText);

          if (index !== -1) {
            this.turn.actions.push(oldModel[index]);
            oldModel.splice(index, 1);
          } else {
            this.turn.actions.push({
              quote: spans[i].innerText,
              editorIsVisible: true,
              comments: []
            });
          }
        }
      }
    },

    saveComment(i) {
      this.turn.actions[i].editorIsVisible = true;
      this.turn.actions[i].comments.push(this.turn.actions[i].temporaryText);
      this.turn.actions[i].temporaryText = "";
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
