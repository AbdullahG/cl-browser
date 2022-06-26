import parseHtmlResource, {endsWithHtmlTag, getTagFromString} from "./HtmlParser";
import Node from "./types/Node";
import {TagName} from "./types/TagName";
import {NodeType} from "./types/NodeType";
import {ElementNode} from "./types/ElementNode";
import {TextNode} from "./types/TextNode";

const example = "<html>\n" +
    "<head>\n" +
    "    <title>example page title</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "    <h3>\n" +
    "        Hello\n" +
    "    </h3>\n" +
    "    <p>\n" +
    "        You are seeing an example page\n" +
    "    </p>\n" +
    "    <div>\n" +
    "        Try other pages to see more\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        This browser is only supporting html tags for now\n" +
    "    </div>\n" +
    "    <ul>\n" +
    "        <li>\n" +
    "            HTML4\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            Maybe CSS2 in the future\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</body>\n" +
    "</html>";

describe("parses html", () => {

    it('should load nodes', () => {
        const node: Node = parseHtmlResource(example);
        expect(node.nodeType === NodeType.ELEMENT_NODE);
        const root = node as ElementNode;
        expect(root.tagName).toStrictEqual(TagName.HTML);
        expect(root.children.length).toStrictEqual(2);
        const head: ElementNode = root.children[0] as ElementNode;
        const body: ElementNode = root.children[1] as ElementNode;
        expect(head.tagName).toStrictEqual(TagName.HEAD);
        expect(body.tagName).toStrictEqual(TagName.BODY);
        const title = head.children[0] as ElementNode;
        expect(title.tagName).toStrictEqual(TagName.TITLE);
        expect((title.children[0] as TextNode).value).toBe("example page title");

        const h3 = body.children[0] as ElementNode;
        expect(h3.tagName).toBe(TagName.H3);
        expect((h3.children[0] as TextNode).value).toBe("Hello");

        const p = body.children[1] as ElementNode;
        expect(p.tagName).toBe(TagName.P);
        expect((p.children[0] as TextNode).value).toBe("You are seeing an example page");

        const div = body.children[2] as ElementNode;
        expect(div.tagName).toBe(TagName.DIV);
        expect((div.children[0] as TextNode).value).toBe("Try other pages to see more");

        const div2 = body.children[3] as ElementNode;
        expect(div2.tagName).toBe(TagName.DIV);
        expect((div2.children[0] as TextNode).value).toBe("This browser is only supporting html tags for now");

        const ul = body.children[4] as ElementNode;
        expect(ul.tagName).toBe(TagName.UL);
        expect(ul.children.length).toBe(2);

        const li1 = ul.children[0] as ElementNode;
        expect(li1.tagName).toBe(TagName.LI);
        expect((li1.children[0] as TextNode).value).toBe("HTML4");

        const li2 = ul.children[1] as ElementNode;
        expect(li2.tagName).toBe(TagName.LI);
        expect((li2.children[0] as TextNode).value).toBe("Maybe CSS2 in the future");
    });
    it("returns index if ends with start-tag", () => {
        let index = endsWithHtmlTag("<html>")
        expect(index).toBe(0);

        index = endsWithHtmlTag("asdkj<aksd kaskd <div>");
        expect(index).toBe(17);
    });
    it("returns tag and fixes text node", () => {
        const resource = "asjfas  asf asf jsafj saf > fk </html>";
        const index = resource.indexOf("</html>");
        const resourceAsArray = resource.split("");
        const tagStr = resourceAsArray.splice(index, resource.length - index);
        const tag = getTagFromString(tagStr);
        expect(tag)
            .toStrictEqual({
                tagName: TagName.HTML,
                isEndTag: true
            })

        expect(resourceAsArray)
            .toStrictEqual("asjfas  asf asf jsafj saf > fk ".split(""));
    })

    it("",  () => {

    });
});