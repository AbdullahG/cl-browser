import Node from "./types/Node";
import {ElementNode} from "./types/ElementNode";
import {TagName} from "./types/TagName";
import {NodeType} from "./types/NodeType";
import {TextNode} from "./types/TextNode";

function parseHtmlResource(resource: string): Node {
    resource = resource.split("\n").join("");
    const stack: Node[] = [];
    let pointer = 0;
    const read: string[] = [];
    let node: Node = null;
    while(pointer !== resource.length) {
        read.push(resource.charAt(pointer++));
        const index = endsWithHtmlTag(read.join(""));
        if (index > -1) {
            const tag = getTagFromString(read.splice(index, read.length - index));
            if (tag.isEndTag === false) {
                const elementNode = new ElementNode(tag.tagName, new Map(), []);
                if (node === null) {
                    node = elementNode;
                } else {
                    peek(stack).children.push(elementNode);
                }
                insertTextNode(read, peek(stack));
                stack.push(elementNode);
            } else {
                if ((peek(stack) as ElementNode).tagName !== tag.tagName) {
                    throw Error("Invalid Html");
                }
                insertTextNode(read, peek(stack));
                stack.pop();
            }
        }
    }
    // printDOM(node as ElementNode);
    return node;
}

function insertTextNode(text: string[], root: Node): void {
    if (root === null) {
        return;
    }
    const textAsStr = text.splice(0, text.length).join("").trim();
    if (textAsStr.length === 0) {
        return;
    }
    root.children.push(new TextNode(textAsStr));
}

function peek(array: Node[]): Node {
    if (array.length > 0) {
        return array[array.length - 1];
    }
    return null;
}

export function printDOM(root: ElementNode): void {
    printElementNode(root);
}

function printElementNode(node: ElementNode): void {
    console.log(JSON.stringify({
        nodeType: node.nodeType,
        tagName: node.tagName,
    }))
    node.children.forEach(child => {
        if (child.nodeType === NodeType.ELEMENT_NODE) {
            printElementNode(child as ElementNode);
        } else {
            printTextNode(child as TextNode);
        }
    })
}

function printTextNode(node: TextNode): void {
    console.log(JSON.stringify({
        nodeType: NodeType.TEXT_NODE,
        value: node.value
    }));
}

export function getTagFromString(read: string[]): Tag {
    const tagStr = read.join("");
    const tag: Tag = {
        tagName: Object.values(TagName).find(v => tagStr.toUpperCase().includes(v)) as TagName,
        isEndTag: tagStr.includes("/")
    };
    return tag;
}

export type Tag = {
    tagName: TagName;
    isEndTag: boolean;
}


// -1 = no
// any positive number = index of starting char
export function endsWithHtmlTag(value: string): number {
    for (const valuesKey in TagName) {
        const startTag = `<${valuesKey}>`;
        const endTag = `</${valuesKey}>`;
        if (value.toUpperCase().endsWith(startTag)) {
            return value.toUpperCase().indexOf(startTag);
        }
        if (value.toUpperCase().endsWith(endTag)) {
            return value.toUpperCase().indexOf(endTag);
        }
    }
    return -1;
}

export default parseHtmlResource;