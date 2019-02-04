class Hilitor {

    constructor(id, tag) {
        this.targetNode =  document.body;
        this.hiliteTag =  "MARK";
        this.skipTags = new RegExp("^(?:" + this.hiliteTag + "|SCRIPT|FORM|SPAN)$");
        this.color = "#ff6";
        this.wordColor = [];
        this.matchRegExp = "";

        // characters to strip from start and end of the input string
        this.endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', "g");

        // characters used to break up the input string into words
        this.breakRegExp = new RegExp('[^\\w\'-]+', "g");

    }

    setRegex(input)
    {
        input = input.replace(this.endRegExp, "");
        input = input.replace(this.breakRegExp, "|");
        input = input.replace(/^\||\|$/g, "");
        if(input) {
            var re = "(" + input + ")";
            if(!this.openLeft) re = "\\b" + re;
            if(!this.openRight) re = re + "\\b";
            this.matchRegExp = new RegExp(re, "i");
            return this.matchRegExp;
        }
        return false;
    };

    // recursively apply word highlighting
    hiliteWords(node)
    {
        if(node === undefined || !node) return;
        if(!this.matchRegExp) return;
        if(this.skipTags.test(node.nodeName)) return;

        if(node.hasChildNodes()) {
            for(var i=0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        //console.log(node.text);
        if(node.nodeType == 3) { // NODE_TEXT
            let nv = node.nodeValue;
            let regs = this.matchRegExp.exec(nv);
            if(nv && regs) {
                if(!this.wordColor[regs[0].toLowerCase()]) {
                    this.wordColor[regs[0].toLowerCase()] = this.color;
                }
                var match = document.createElement(this.hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = this.wordColor[regs[0].toLowerCase()];
                match.style.color = "#000";

                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };

    // remove highlighting
    remove()
    {
        let arr = document.getElementsByTagName(this.hiliteTag);
        let i=0;
        while(i < arr.length) {
            let el = arr[0];
            let parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
            i++;
        }
    };

    // start highlighting at target node
    apply(input)
    {
        this.remove();
        if(input === undefined || !input) return;
        if(this.setRegex(input)) {
            this.hiliteWords(this.targetNode);
        }
        return this.matchRegExp;
    };

}