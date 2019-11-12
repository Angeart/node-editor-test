import { Editor } from "@baklavajs/core";
import { NodeConstructor } from "@baklavajs/core/dist/types";
import { InterfaceTypePlugin } from "@baklavajs/plugin-interface-types";
import UniformNode from "./nodes/random/UniformNode";
import NormalNode from "./nodes/random/NormalNode";
import ExponentialNode from "./nodes/random/ExponentialNode";
import PercentageNode from "./nodes/random/PercentageNode";
import FunctionNode from "./nodes/FunctionNode";
import MathNode from "./nodes/MathNode";

export default function editorFactory(): Editor {
  const editor = new Editor();
  const interfaceTypes = new InterfaceTypePlugin();
  editor.use(interfaceTypes);

  editor.registerNodeType(UniformNode.name, UniformNode, "Random");
  editor.registerNodeType(NormalNode.name, NormalNode, "Random");
  editor.registerNodeType(ExponentialNode.name, ExponentialNode, "Random");
  editor.registerNodeType(PercentageNode.name, PercentageNode, "Random");

  editor.registerNodeType(FunctionNode.name, FunctionNode);
  editor.registerNodeType(MathNode.name, MathNode);

  interfaceTypes
    .addType("number", "cyan")
    .addType("string", "crimson")
    .addType("boolean", "lightgreen")
    .addType("any", "white")
    .addConversion("number", "string", String)
    .addConversion("number", "boolean", v => !!v)
    .addConversion("number", "any", v => v)
    .addConversion("string", "number", parseFloat)
    .addConversion("string", "any", v => v)
    .addConversion("boolean", "number", v => (v ? 1 : 0))
    .addConversion("boolean", "string", String)
    .addConversion("boolean", "any", v => v)
    .addConversion("any", "number", parseFloat)
    .addConversion("any", "string", String)
    .addConversion("any", "boolean", Boolean);
  return editor;
}
