<template>
  <div>
    <h3>Custom Distribution</h3>
    <select-option v-model="selectValue"></select-option>
    <custom-random
      :loadedPoints="value.points"
      :min="min"
      :max="max"
      :mode="selectValue.selected"
      @pointsUpdated="updatePoints"
    ></custom-random>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { SelectOption } from "@baklavajs/plugin-options-vue";
import { NodeInterface } from "@baklavajs/core";
import CustomNode from "./CustomNode";
import CustomRandom from "./CustomRandom.vue";

type Vector2D = [number, number];

@Component({
  components: { SelectOption, CustomRandom }
})
export default class CustomOption extends Vue {
  @Prop()
  node!: CustomNode;

  @Prop()
  value!: any;

  width: number = 800;

  selectValue: { selected: string; items: string[] } = {
    selected: this.value.mode,
    items: ["monotone", "linear"]
  };

  minInterface: NodeInterface = this.node.getInterface("Min");
  maxInterface: NodeInterface = this.node.getInterface("Max");
  discreteInterface: NodeInterface = this.node.getInterface("Discrete");

  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D | null;

  @Watch("selectValue")
  onSelectValueChange() {
    this.value.mode = this.selectValue.selected;
  }

  get mode() {
    return this.selectValue.selected;
  }

  get min() {
    return this.minInterface.value;
  }

  get max() {
    return this.maxInterface.value;
  }

  // Save points from component via event
  updatePoints(points: Vector2D[]) {
    this.value.points = points;
  }
}
</script>
