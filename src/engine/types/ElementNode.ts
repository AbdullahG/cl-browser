import Node from "./Node"
import {NodeType} from "./NodeType";
import {TagName} from "./TagName";

export class ElementNode implements Node {
    private readonly _tagName: TagName;
    private readonly _attributes: Map<string, string>;
    private readonly _children: Node[];
    private readonly _nodeType: NodeType = NodeType.ELEMENT_NODE;


    constructor(tagName: TagName, attributes: Map<string, string>, children: Node[]) {
        this._tagName = tagName;
        this._attributes = attributes;
        this._children = children;
    }


    get tagName(): TagName {
        return this._tagName;
    }

    get attributes(): Map<string, string> {
        return this._attributes;
    }

    get children(): Node[] {
        return this._children;
    }


    get nodeType(): NodeType {
        return this._nodeType;
    }
}