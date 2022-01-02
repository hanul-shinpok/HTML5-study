class SceneManager {
    public static loader: ResourceLoader;

    public static mainScene: Main;
    public static stage: tiled.TMXTilemap;

    public constructor(main) {
        SceneManager.mainScene = main;
        this.createLoader();
    }

    public onStart() {
        /** JS에서는 함수를 메서드(.)로 호출하는 경우 
         * 호출의 주체가 함수명 바로 앞의 객체가 됩니다.
         * 즉, 점 바로 앞에 명시된 객체가 this가 됩니다. */
        this.createInitScene().then(() => {
            this.createScene();
            this.testFunction();
        });
    }

    private createLoader() {
        if (!SceneManager.loader) SceneManager.loader = new ResourceLoader();
    }

    private async createInitScene() {
        await SceneManager.loader.loadMainResource(["preload", "sprite"], "resource/default.res.json");
        return await SceneManager.loader.loadTiledMapResource("home");
    }

    private createScene() {
        SceneManager.stage = SceneManager.loader.createObj("TMX", "home");
        SceneManager.mainScene.addChild(SceneManager.stage);
    }

    /** for tmx test */
    private testFunction() {
        // 오브젝트의 타입 알아내기
        console.log(SceneManager.stage);
        console.log(typeof SceneManager.stage); // object
        console.log(SceneManager.stage instanceof tiled.TMXTilemap); // true

        // 오브젝트 레이어와 그 자식 찾기
        console.log(SceneManager.stage);
        console.log(SceneManager.stage.getChildByName("trigger"));
        console.log(SceneManager.stage.getChildByName("trigger").$children);

        const spawnPoint = SceneManager.stage.getChildByName("trigger").$children.filter(obj => obj.name == 'spawn');
        console.log(spawnPoint);

        const sprite = SceneManager.loader.createMovieClip("actor_json", "actor_png", "actor");
        sprite.gotoAndPlay("run", -1);

        SceneManager.stage.addChild(sprite);
    }
}