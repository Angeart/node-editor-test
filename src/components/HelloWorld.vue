<template>
  <div class="fit">
    <baklava-editor :plugin="view"></baklava-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import editorFactory from "./EditorFactory";
import { Engine } from "@baklavajs/plugin-engine";
import CustomRandom from "./nodes/random/custom/CustomRandom.vue";
import StringListOption from "./options/StringListOption";
import CustomButtonOption from "./options/CustomButtonOption.vue";
import CodeOption from "./options/CodeOption.vue";
import DiscreteOption from "./nodes/random/discrete/DiscreteOption.vue";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private editor = editorFactory();
  private view: ViewPlugin = new ViewPlugin();
  constructor() {
    super();
    this.editor.use(this.view);
    this.editor.use(new OptionPlugin());
    this.editor.use(new Engine(false));

    this.view.registerOption(CustomRandom.name, CustomRandom);
    this.view.registerOption("DiscreteRandomOption", DiscreteOption);

    this.view.registerOption(StringListOption.name, StringListOption);
    this.view.registerOption(CustomButtonOption.name, CustomButtonOption);
    this.view.registerOption("FunctionSidebarOption", CodeOption);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fit {
  width: 100%;
  height: 100%;
}
</style>
