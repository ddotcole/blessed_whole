let container = document.getElementById("tree")
let doc = {
    Element: {
        Box: {
            ANSIImage: {},	
            BigText: {},
            Line: {},		
            Forms: {},		
            Input: {
                Textarea: {
                    Textbox: {},
                },	
                Button: {},	
                Checkbox: {
                    RadioButton: {},
                },  
                ProgressBar: {},
            },
            Image: {},
            List: {
                FileManager: {},
                ListTable: {},
            }, 
            Listbar: {}, 
            Loading: {},		
            Message: {},	
            Prompt: {},		
            Question: {},		
            RadIoSet: {},	
            Table: {},		
            Terminal: {},
            OverlayImage: {},		
            Video: {},
        },
        Layout: {},
        Text: {}
    },
    Node: {
        Info: {
            Options: {
                screen: "The screen to be associated with",
                parent: "The desired parent",
                children: "An arrray of children"
            },
            Properties: {
                type: "Type of the node (e.g. box)",
                options: "Original options object",
                parent: "Parent node",
                screen: "Parent screen",
                children: "Array of node's children",
                index: " Render index (document order index) of the last render call",
            },
            Events: {
                adopt: "Received when node is added to a parent",
                remove: "Received when node is removed from it's current parent",
                reparent: "Received when node gains a new parent",
                attach: "Received when node is attached to the screen directly or somewhere in its ancestry",
                detach: "Received when node is detached from the screen directly or somewhere in its ancestry",
            },
            Methods: {
                "prepend(node)": "Prepend a node to this node's children",
                "append(node)": "Append a node to this node's children",
                "remove(node)": "Remove child node from node",
                "insert(node, i)": "Insert a node to this node's children at index i",
                "insertBefore(node, refNode)": "Insert a node to this node's children before the reference node",
                "insertAfter(node, refNode)": "Insert a node from node after the reference node",
                "detach()": "Remove node from its parent",
                "emitDescendants(type, args..., [iterator])": "Emit event for element, and recursively emit same event for all descendants",
                "get(name, [default])": "Get user property with a potential default value",
                "set(name, value)": "Set user property to value",
            }
        }
    },
    Screen: {}
}

createTree(container, doc)

function createTree(container, object) {
    let root = Object.keys(object)
    for(i in root){
        if(root[i] === 'Info'){continue;}
        let element = document.createElement('ul')
        if(Object.keys(object[root[i]]).length <= 1){
            insertNode(container, root[i], false)
        }
        else {
            let returnedElement = insertNode(container, root[i], true)
            createTree(element, object[root[i]])
            returnedElement.append(element)
        }
    }
}

function insertNode(container, item, control){
    let element = document.createElement('li')
    if(control){
        element.innerHTML = "<a href=\"#\" onclick=\"sign(event)\">+</a>  "
    }
    else {
        element.innerHTML = "\u00A0\u00A0"
    }
    let link = document.createElement('a')
    link.href = "#"
    link.onclick = (what) => {
        console.log(what)
        let string = what.target.innerHTML
        showInfo(string);
    }
    link.append(item)
    element.append(link)
    container.append(element)
    return element;
}

function sign(what){
    var parent = what.target.parentElement;
    var classList = parent.classList;
    if(classList.contains("open")) {
      classList.remove('open');
      what.path[0].innerHTML = '+'
    } else {
      classList.add('open');
      what.path[0].innerHTML = '-'
    }
}

function showInfo(what){    
    let content = document.getElementById('content')
    content.innerHTML = ''
    let headings = Object.keys(doc[what].Info)
    for(i in headings){
        let element = document.createElement('h3')
        element.innerHTML = headings[i]
        content.append(element)
        let heading = doc[what].Info[headings[i]]
        for (const [key, value] of Object.entries(heading)) {
            content.append(`${key} : ${value}`)
            content.append(document.createElement('br'))
        }
    }
}