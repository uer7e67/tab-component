// 自定义字体组件

cc.Class({
    extends: cc.Component,

    properties: {
        image: {
            type: cc.SpriteFrame, default: null, 
        },
        _string: "", 
        string: {
            type: cc.String,
            set(v) {
                this._string = v; 
                this.show();
            },
            get() {
                return this._string; 
            },
        },
        _chars: "",

        chars: {
            type: cc.String,
            set(v) {
                this._chars = v; 
                this.show();
            },
            get() {
                return this._chars; 
            },
        },

        _fontWidth: 40, 
        fontWidth: {
            type: cc.Integer,
            set(v) {
                this._fontWidth = v; 
                this.show();
            },
            get() {
                return this._fontWidth; 
            },
        },

        _fontHeight: 55, 
        fontHeight: {
            type: cc.Integer,
            set(v) {
                this._fontHeight = v; 
                this.show();
            },
            get() {
                return this._fontHeight; 
            },
        },
    },

    editor: {
        executeInEditMode: true, 
    },

    onLoad() {
        this.fontWidth = 40; 
        this.fontHeight = 55; 
        if(CC_EDITOR) {
            let layout = this.node.getComponent(cc.Layout); 
            if(!layout) {
                layout = this.node.addComponent(cc.Layout)
                layout.type = cc.Layout.Type.HORIZONTAL; 
                layout.resizeMode = cc.Layout.ResizeMode.CONTAINER; 
            }
            if(this.image) {
                this.show();
            }
        }
    },

    show() {
        this.node.removeAllChildren();
        this.charsArr = this._chars.split("");
        let strArr = this.string.split("")
        for(let i = 0; i < strArr.length; i++) {
            let node = this.getCharNode(strArr[i]); 
            this.node.addChild(node); 
        }
    },

    getCharNode(char) {
        let texture = this.image.getTexture();
        if(!texture) {
            cc.error("get texture error！！！")
            return; 
        }
        let node = new cc.Node('char'); 
        let sp01 = node.addComponent(cc.Sprite); 
        let sf = new cc.SpriteFrame(); 
        let index = this.getIndex(char); 
        sf.setTexture(texture, 
            cc.rect(index * this._fontWidth, 0, this._fontWidth, this._fontHeight), 
            false, 
            0, 
            cc.size(this._fontWidth, this._fontHeight),
        ); 
        sp01.spriteFrame = sf;

        return node; 
    },

    getIndex(char) {
        for(let i = 0; i < this.charsArr.length; i ++) {
            if(char.toString() === this.charsArr[i]) {
                return i; 
            }
        }
        return -1; 
    },

});
