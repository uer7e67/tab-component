
cc.Class({
    extends: cc.Component,

    properties: {
        tabs: {
            type: require("tab_component"), default: null,
        },
        views: cc.Node, 
    },

    editor: {
        executeInEditMode: true,
    },

    onLoad() {
        if(CC_EDITOR) {
            this.tabs.initTab();
        }
    },

    onClick(event, index) {
        index = parseInt(index);
        this.tabs.changeTab(index); 
        this.views.children.forEach((element, idx) => {
            element.active = idx == index;
        });
    },

});
