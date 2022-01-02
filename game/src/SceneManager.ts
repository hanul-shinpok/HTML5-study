class SceneManager {
    /** 저는 static을 다음과 같은 상황에서 사용합니다. (개인취향입니다)
     * 1. 전체 프로그램에서 단 하나의 객체만을 생성하고 계속 사용하는 경우 - loader, mainScene 등
     * (mainScene의 경우는 실제 가리키는 내용물이 바뀔 수 있으나 개념적으로는 항상 동일함 - '현재 유저에게 보이는 씬')
     * 2. 타 클래스에서 접근이 쉽도록 열어두는 경우 - stage 등
     * 3. 싱글톤 패턴
     */
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
        console.log(spawnPoint); // filter는 이터레이션이 가능한 array를 반환합니다.
        console.log(spawnPoint[0]); // 유니크한 값이라고 약속이 되어 있다면 0번을 써도 좋습니다.

        // movie clip을 활용하여 캐릭터 생성 -> 추후 제어하기 편하도록 자체 클래스를 생성 후 static 변수에 할당해 관리하는 것이 좋습니다 (개인취향)
        const sprite = SceneManager.loader.createMovieClip("actor_json", "actor_png", "actor");
        sprite.gotoAndPlay("run", -1);

        // 위치 설정
        sprite.x = spawnPoint[0].x;
        sprite.y = spawnPoint[0].y;

        // 화면에 붙이기
        SceneManager.stage.addChild(sprite);

        // ...이렇게 짜면 안되지만 일단 예제를 위해 임시로 setInterval을 사용합니다.
        // 참고로 JS의 setInterval과 setTimeout은 게임에서는 사용을 자제해야 합니다.
        setInterval(() => {
            // *** 타일 충돌 구현 ***
            // 특정 x, y 좌표의 타일 가져오기
            let currentTile: tiled.TMXTile = SceneManager.stage.getLayers()[0].getTile(sprite.x, sprite.y);
            // private 객체를 강제로 가져왔습니다...다른 해결방법 아시는 분 제보바람
            if (currentTile['_properties'].filter(a => a.name == 'collision' && a.value == 'true').length > 0) {
                console.log("Collision!!");
            } else {
                // 충돌이 아니라고 판단하므로 캐릭터를 움직입니다.
                sprite.gotoAndStop("run");
                sprite.y += 10;
                sprite.gotoAndPlay("run", -1);
            }

        }, 500);

    }
}