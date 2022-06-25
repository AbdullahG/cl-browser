import {NodeType} from "./NodeType";

export default interface Node {
    children?: Node[],
    nodeType: NodeType
}