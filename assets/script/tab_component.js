

cc.Class({
    extends: cc.Component,

    properties: {

        _nameArr: {
            type: cc.String, 
            default: [],
        },
        nameArr:{
            type: cc.String, 
            get() {
                return this._nameArr; 
            },
            set(value) {
                if(CC_EDITOR) {
                    this._updateName()
                }
                this._nameArr = value; 
            }, 
        },　

        _tabDir: {
            type: cc.Layout.Type, 
            default: cc.Layout.Type.HORIZONTAL,
        }, 
        tabsDir: {
            type: cc.Layout.Type, 
            get() {
                return this._tabDir; 
            },
            set(type) {
                this._tabDir = type; 
                if(CC_EDITOR) {
                    this._updateDir(); 
                }
            }
        }, 
        defaultTab: cc.Node,
        _onColor: cc.Color,
        onColor: {
            type: cc.Color,
            get() {
                return this._onColor;
            },
            set(color) {
                this._onColor = color;
                if (CC_EDITOR) {
                    this._setColor("on", color);
                }
            },
        },
        _offColor: cc.Color,
        offColor: {
            type: cc.Color,
            get() {
                return this._offColor;
            },
            set(color) {
                this._offColor = color;
                if (CC_EDITOR) {
                    this._setColor("off", color);
                }
            },
        },
        _tabsNode: [cc.Node],
        tabsNode: {
            type: [cc.Node],
            get() {
                return this._tabsNode;
            },
            set(arr) {
                if (arr.length <= 0) {
                    this._tabsNode = [cc.Node];
                    this.tabsNode[0] = this.defaultTab;
                    this._updateLayout(); 
                    return;
                }
                if (CC_EDITOR) {
                    this._tabsNode = arr;
                    this._getTabs(arr.length);
                    this._updateLayout(); 
                    this._updateBtn(); 
                }
            }
        },
        touchEvents: [cc.Component.EventHandler],
    },

    editor: {
        executeInEditMode: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (CC_EDITOR) {
            this._initTabs();
            this._addLayout(); 
        }
    },

    // 更新名字 
    _updateName() {
        this._tabsNode.forEach((element, index) => {
            if(element) {
                element.getChildByName("on").getChildByName("label").getComponent(cc.Label).string = this._nameArr[index]; 
                element.getChildByName("off").getChildByName("label").getComponent(cc.Label).string = this._nameArr[index]; 
            }
        });
    },

    // 更新方向 
    _updateDir() {
        let layout = this.node.getComponent(cc.Layout)
        if(layout) {
            this.node.getComponent(cc.Layout).type = this._tabDir; 
            this.tabsNode.forEach(element => {
                if(layout.type == cc.Layout.Type.HORIZONTAL) {
                    element.y = 0; 
                }
                else if(layout.type == cc.Layout.Type.VERTICAL) {
                    element.x = 0;
                }
            });
            this._updateLayout();
        }
    },

    _addLayout() {
        if(!this.node.getComponent(cc.Layout)) {
            let layout = this.node.addComponent(cc.Layout); 
            layout.type = this.tabsDir; 
            layout.resizeMode = cc.Layout.ResizeMode.CONTAINER; 
            this._updateLayout(); 
        }
    },

    _updateLayout() {
        let layout = this.node.getComponent(cc.Layout); 
        if(!layout) {
            return; 
        }
        let w = 0; 
        let h = 0; 
        if(layout.type == cc.Layout.Type.VERTICAL) {
            w = this.defaultTab.width; 
            h = this.defaultTab.height * this.tabsNode.length; 
        } else if(layout.type == cc.Layout.Type.HORIZONTAL) {
            w = this.defaultTab.width * this.tabsNode.length; 
            h = this.defaultTab.height; 
        }
        this.node.width = w; 
        this.node.height = h; 
    },

    // 更新按钮
    _updateBtn() { 
        cc.log("更新按钮事件")
        this.tabsNode.forEach((element, index) => {
            let button = element.getComponent(cc.Button); 
            if(button == null) {
                button = element.addComponent(cc.Button); 
            }
            
            this.touchEvents.forEach((event, index2) => {
                var e = new cc.Component.EventHandler(); 
                e.component = event['_componentName']; 
                e.handler = event.handler; 
                e.target = event.target; 
                e.customEventData = index.toString(); 
                button.clickEvents[index2] = e; 
            });

        });
    },

    // 设置颜色 
    _setColor(name, color) {
        let children = this.node.children;
        if (children.length > 0) {
            children.forEach(element => {
                element.getChildByName(name).getChildByName("label").color = color; 
            });
        }
    },

    // 初始化 
    _initTabs() {
        let tab = this._getNewTab(0);
        let children = this.node.children;
        if (children.length == 0) {
            this.node.addChild(tab);
            this.defaultTab = tab;
            this.tabsNode[0] = tab;
        }
    },

    _getTabs(num) {
        let children = this.node.children;
        cc.log("children leng", children.length, "num", num);
        if (num < children.length) {
            for (let i = num; i < children.length; i++) {
                if (children[i]) {
                    children[i].removeFromParent(true);
                    children[i].destroy();
                }
            }
        } else {
            for (let i = 0; i < num; i++) {
                if (i < children.length) {
                    this.tabsNode[i] = children[i];
                    continue;
                }
                else {
                    tab = cc.instantiate(this.defaultTab); 
                    tab.parent = this.node;
                    this.tabsNode[i] = tab;
                }
            }
        }
    },

    _getNewTab(i) {
        let tab = new cc.Node("tab");
        let onNode = this._getSub("on");
        let offNode = this._getSub("off");
        tab.setContentSize(cc.size(100, 100));
        tab.addChild(onNode, i);
        tab.addChild(offNode, i);
        tab.addComponent(cc.Button);
        offNode.active = false;
        return tab;
    },

    _getSub(name) {
        let button = new cc.Node(name);
        button.addComponent(cc.Sprite);
        let label = new cc.Node('label');
        label.color = name == "on" ? this.onColor : this.offColor;
        button.addChild(label);
        let lcom = label.addComponent(cc.Label); 
        lcom.string = "tab name"; 
        lcom.verticalAlign = cc.Label.VerticalAlign.CENTER;
        
        return button;
    },

    initTab(index = 0) {
        cc.log("初始化标签页")
        this.changeTab(index); 
    },

    changeTab(index) {
        for(let i = 0; i < this.tabsNode.length; i ++) {
            this.tabsNode[i].getComponent(cc.Button).interactable = true; 
            this.tabsNode[i].getChildByName("on").active = false; 
            this.tabsNode[i].getChildByName("off").active = true; 
        }
        this.tabsNode[index].getComponent(cc.Button).interactable = false; 
        this.tabsNode[index].getChildByName("on").active = true; 
        this.tabsNode[index].getChildByName("off").active = false; 
    },

});
