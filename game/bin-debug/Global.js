var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
    }
    Global.defaultResouceJson = "resource/default.res.json";
    Global.urlTML = "resource/tmx/";
    // 스테이지 포지션 관련 값
    Global.sWidth = 1136;
    Global.sHeight = 1136;
    return Global;
}());
__reflect(Global.prototype, "Global");
