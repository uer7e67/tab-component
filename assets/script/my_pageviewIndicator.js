
// 重写 Pageview 指示器的样式 

cc.Class({
    extends: cc.PageViewIndicator,

    properties: {
        otherSprite: {
            type: cc.SpriteFrame, 
            default: null, 
        },
    },

    // 重写下样式 
    _changedState: function () {
        var indicators = this._indicators;
        if (indicators.length === 0) return;
        var idx = this._pageView._curPageIdx;
        if (idx >= indicators.length) return;
        for (var i = 0; i < indicators.length; ++i) {
            var node = indicators[i];
            node.getComponent(cc.Sprite).spriteFrame = this.otherSprite; 
            node.scale = 1; 
        }
        indicators[idx].getComponent(cc.Sprite).spriteFrame = this.spriteFrame; 
        indicators[idx].scale = 0.9;
    },

});
