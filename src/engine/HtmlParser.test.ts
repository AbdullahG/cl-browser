import parseHtmlResource, {endsWithHtmlTag, getTagFromString} from "./HtmlParser";
import Node from "./types/Node";
import {TagName} from "./types/TagName";

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
        console.log(node);
        // expect(node.nodeType === NodeType.ELEMENT_NODE);
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
        console.log({ tag })
        expect(tag)
            .toStrictEqual({
                tagName: TagName.HTML,
                isEndTag: true
            })

        expect(resourceAsArray)
            .toStrictEqual("asjfas  asf asf jsafj saf > fk ".split(""));
    })

});