import Node from "./Node";
import {NodeType} from "./NodeType";

// @ts-ignore
export class TextNode implements Node {
    private readonly _value: string
    private readonly _nodeType: NodeType = NodeType.TEXT_NODE;

    constructor(value: string) {
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    get nodeType(): NodeType {
        return this._nodeType;
    }
}