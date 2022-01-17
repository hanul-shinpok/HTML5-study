class game {
    // 이 코드에서는 '기본 게임 루프'에 대해 설명합니다.
    // 기본 게임 루프 패턴의 행동 순서는 다음과 같습니다.
    // 유저 입력 처리 -> 게임 상태 업데이트 -> 게임 화면 렌더링

    /** 생성자에는 꼭 필요한 최소한의 코드를 간결히 넣습니다.
     * 브라우저에서의 통상적인 게임 루프 실행순서는 다음과 같습니다.
     * constructor() -> onCreate() -> onStart() -> onUpdate() -> destroy()
     */
    constructor() {
        this.onCreate();
    }

    /** 인스턴스가 생성 될 때, 초기화 목적 == MonoBehaviour.Awake()*/
    public onCreate() {

    }

    /** 인스턴스가 시작 될 때 == MonoBehaviour.Start() */
    public onStart() {
        /** Egret에서는 유니티의 MonoBehaviour.Update()와 같은 함수를 자동으로 호출하지 않습니다.
         * 따라서 인스턴스가 실행을 시작 할 때 수동으로 onUpdate()를 불러줘야 합니다.
         * 
         * 60FPS(16.6ms당 1회)의 속도로 콜백 메서드를 호출합니다.
         *  stopTick() 메서드를 호출하여 중지할 수 있습니다.*/
        egret.startTick(() => {
            this.onUpdate();
            return true;
        }, this);
    }

    /** 인스턴스가 프레임마다 업데이트 될 때 ==  MonoBehaviour.Update()
     * 저같은 경우는 렌더링도 여기에서 합니다.
     */
    public onUpdate() {
        console.log("Update!!");

    }

    /** 인스턴스를 더이상 사용하지 않아 명시적으로 지울 때 == MonoBehaviour.OnDestroy() */
    public destroy() {

    }


}