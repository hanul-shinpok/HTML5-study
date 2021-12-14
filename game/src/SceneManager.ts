class SceneManager {
    public static dispatcher: egret.EventDispatcher = new egret.EventDispatcher();;
    public static loader: ResourceLoader;

    public static mainScene: Main;
    public static stage;
    public static ui;

    public constructor(main) {
        SceneManager.mainScene = main;
        this.createLoader();
    }

    public onStart() {
        this.createInitScene();
    }

    private createLoader() {
        if (!SceneManager.loader) SceneManager.loader = new ResourceLoader();
    }

    private async createInitScene() {
        await SceneManager.loader.loadMainResource(["ingame"], "resource/default.res.json");
        await SceneManager.loader.loadTiledMapResource("home");
        this.createComponent();
    }

    private createComponent() {
        SceneManager.stage = SceneManager.loader.createObj("TMX", "home");
        SceneManager.mainScene.addChild(SceneManager.stage);
    }
}