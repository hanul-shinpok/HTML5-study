var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SceneManager = (function () {
    function SceneManager(main) {
        SceneManager.mainScene = main;
        this.createLoader();
    }
    SceneManager.prototype.onStart = function () {
        var _this = this;
        /** JS에서는 함수를 메서드(.)로 호출하는 경우
         * 호출의 주체가 함수명 바로 앞의 객체가 됩니다.
         * 즉, 점 바로 앞에 명시된 객체가 this가 됩니다. */
        this.createInitScene().then(function () {
            _this.createScene();
            _this.testFunction();
        });
    };
    SceneManager.prototype.createLoader = function () {
        if (!SceneManager.loader)
            SceneManager.loader = new ResourceLoader();
    };
    SceneManager.prototype.createInitScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SceneManager.loader.loadMainResource(["preload", "sprite"], "resource/default.res.json")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, SceneManager.loader.loadTiledMapResource("home")];
                }
            });
        });
    };
    SceneManager.prototype.createScene = function () {
        SceneManager.stage = SceneManager.loader.createObj("TMX", "home");
        SceneManager.mainScene.addChild(SceneManager.stage); // mainScene의 자식으로 stage를 넣어줍니다.
    };
    /** for tmx test */
    SceneManager.prototype.testFunction = function () {
        // 오브젝트의 타입 알아내기
        console.log(SceneManager.stage);
        console.log(typeof SceneManager.stage); // object
        console.log(SceneManager.stage instanceof tiled.TMXTilemap); // true
        // 오브젝트 레이어와 그 자식 찾기
        console.log(SceneManager.stage);
        console.log(SceneManager.stage.getChildByName("trigger"));
        console.log(SceneManager.stage.getChildByName("trigger").$children);
        var spawnPoint = SceneManager.stage.getChildByName("trigger").$children.filter(function (obj) { return obj.name == 'spawn'; });
        console.log(spawnPoint); // filter는 이터레이션이 가능한 array를 반환합니다.
        console.log(spawnPoint[0]); // 유니크한 값이라고 약속이 되어 있다면 0번을 써도 좋습니다.
        // const spawnPoint = SceneManager.stage.getChildByName("trigger").$children.filter(obj => obj.name == 'spawn')[0];
        // movie clip을 활용하여 캐릭터 생성 -> 추후 제어하기 편하도록 자체 클래스를 생성 후 static 변수에 할당해 관리하는 것이 좋습니다 (개인취향)
        var sprite = SceneManager.loader.createMovieClip("actor_json", "actor_png", "actor");
        sprite.gotoAndPlay("run", -1);
        // 위치 설정
        sprite.x = spawnPoint[0].x;
        sprite.y = spawnPoint[0].y;
        // 화면에 붙이기
        SceneManager.stage.addChild(sprite);
        // ...이렇게 짜면 안되지만 일단 예제를 위해 임시로 setInterval을 사용합니다.
        // 참고로 JS의 setInterval과 setTimeout은 게임에서는 사용을 자제해야 합니다.
        setInterval(function () {
            // *** 타일 충돌 구현 ***
            // 특정 x, y 좌표의 타일 가져오기
            var currentTile = SceneManager.stage.getLayers()[0].getTile(sprite.x, sprite.y);
            // private 객체를 강제로 가져왔습니다...다른 해결방법 아시는 분 제보바람
            if (currentTile['_properties'].filter(function (a) { return a.name == 'collision' && a.value == 'true'; }).length > 0) {
                console.log("Collision!!");
            }
            else {
                // 충돌이 아니라고 판단하므로 캐릭터를 움직입니다.
                sprite.gotoAndStop("run"); // 애니메이션 재생중에는 이동시킬 좌표에 새로 스프라이트를 그리는것이 어렵습니다. 잠시멈춰줍니다.
                sprite.y += 10; // 좌표 이동 후
                sprite.gotoAndPlay("run", -1); // 다시 재생
            }
        }, 500);
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
