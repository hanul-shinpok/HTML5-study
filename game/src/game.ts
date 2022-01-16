class game {

    /** 생성자에는 꼭 필요한 최소한의 코드를 간결히 넣습니다.
     * 통상적인 실행순서는 다음과 같습니다.
     * constructor() -> onCreate() -> onStart() -> onUpdate() -> destroy()
     */
    constructor() {
        this.onCreate();
    }

    /** 인스턴스가 생성 될 때 */
    public onCreate() {

    }

    /** 인스턴스가 시작 될 때 */
    public onStart() {
        /** 60FPS(16.6ms당 1회)의 속도로 콜백 메서드를 호출합니다.
         *  stopTick() 메서드를 호출하여 중지할 수 있습니다.*/
        egret.startTick(() => {
            this.onUpdate();
            return true;
        }, this);
    }

    /** 인스턴스가 프레임마다 업데이트 될 때 */
    public onUpdate() {
        console.log("Update!!");

    }

    /** 인스턴스를 더이상 사용하지 않아 명시적으로 지울 때 */
    public destroy() {

    }


}