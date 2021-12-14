class Main extends egret.DisplayObjectContainer {
    private scene: SceneManager;
    public constructor() {
        super();
        this.addEvent();
        this.gameSceneStart();
    }

    private addEvent() {

    }

    private gameSceneStart() {
        this.scene = new SceneManager(this);
        this.scene.onStart();
    }

    private gameEventStart() {

    }

}