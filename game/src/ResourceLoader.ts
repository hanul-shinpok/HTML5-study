class ResourceLoader {
    public tiles = {};

    public constructor() {
    }

    public async loadMainResource(grpNames: Array<string>, path: string) {
        for (let grp of grpNames) await this.loadResource(grp, path);
    }

    public async loadResource(key: string, path: string) {
        try {
            await RES.loadConfig(path, "resource/");
            await RES.loadGroup(key, 0);
            console.log("Load Complete!! [" + path + "]" + key);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async loadTiledMapResource(mapName: string) {
        let tmxMap: tiled.TMXTilemap;
        let urlLoader: egret.URLLoader = new egret.URLLoader();

        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        let path = "resource/tmx/" + mapName + ".tmx";

        let that = this;
        return new Promise((resolve, reject) => {
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
                let data: any = egret.XML.parse(event.target.data);
                tmxMap = new tiled.TMXTilemap(1136, 1136, data, path);
                tmxMap.render(); // 랜더링 완료를 대기해야 함
                tmxMap.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE,
                    () => {
                        that.tiles[mapName] = tmxMap;
                        resolve(tmxMap);
                    }, this);
            }, path);
            urlLoader.load(new egret.URLRequest(path));
        })
    }

    public createObj(pkgName: string, objName: string) {
        if (!this.tiles[objName]) return null;
        console.log("TMX Created!! " + objName);
        return this.tiles[objName];
    }

    public createMovieClip(textureJson: string, texturePng: string, clipName: string): egret.MovieClip {
        let factorty = new egret.MovieClipDataFactory(RES.getRes(textureJson), RES.getRes(texturePng));
        let clip = new egret.MovieClip(factorty.generateMovieClipData(clipName));
        return clip;
    }


}