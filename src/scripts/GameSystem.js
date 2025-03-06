import { CookieManager } from "./utils/cookieManager.js";
import { Player } from "./entity/creature/player/player.js";
import { ItemManager } from "./Inventory/itemManager.js";
import { SkillManager } from "./entity/creature/Skill/skillManager.js";
import { MapManager } from "./map/mapManager.js";
import { NPCManager } from "./entity/creature/NPC/npcManager.js";
import { ShopManager } from "./shop/shopManager.js";
import { CreatureManager } from "./entity/creature/creatureManager.js";
import { ObjectManager } from "./entity/Object/objectManager.js";
import { UIManager } from "./UI/uiManager.js";
import { SystemLog } from "./utils/systemLog.js";

export class GameSystem {
  constructor() {
    this.itemManager = new ItemManager();
    this.skillManager = new SkillManager();
    this.mapManager = new MapManager(); // 玩家資料
    this.npcManager = new NPCManager();
    this.shopManager = new ShopManager(this);
    this.creatureManager = new CreatureManager();
    this.objectManager = new ObjectManager();
    this.player = new Player(this); // 玩家資料
    this.currentLocation = this.mapManager.getDefaultRegion();
    // console.log(this.currentLocation)
    this.initializeGame();
  }

  // 初始化遊戲
  initializeGame() {
    // this.loadGameFromCookie();
    SystemLog.addMessage("[系統] 初始化中...");
    UIManager.initialize(this); // 初始化 UI
    
    // // 定期保存遊戲進度
    // setInterval(() => this.saveGameToCookie(), 10000);

    // // 頁面關閉時保存遊戲進度
    // window.addEventListener("beforeunload", () => this.saveGameToCookie());
  }

  // 切換地圖
  switchMap(newLocationId) {
    const newMapRegion = this.mapManager.getMapRegionById(newLocationId);
    if (!newMapRegion) {
      console.warn(`⚠️ 地點 ${newLocationId} 不存在`);
      return;
    }

    this.currentLocation = newMapRegion; // ✅ 確保 `currentLocation` 是 ID
    SystemLog.addMessage(`🔄 切換到地點: ${newMapRegion.name}`);
    
    UIManager.updateAllUI(this); // ✅ 更新 UI
  }

  // 保存遊戲進度到 Cookie
  saveGameToCookie() {
    const gameData = {
      player: this.player.toJSON(),
      time: new Date().toISOString(),
    };
    CookieManager.setCookie("gameData", JSON.stringify(gameData));
    SystemLog.addMessage("遊戲進度已保存到 Cookie。");
  }

  // 從 Cookie 加載遊戲進度
  loadGameFromCookie() {
    const savedData = CookieManager.getCookie("gameData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.player = Object.assign(new Player(), parsedData.player);
      SystemLog.addMessage("遊戲進度從 Cookie 加載成功。");
    } else {
      SystemLog.addMessage("未找到存檔，使用默認遊戲數據初始化。");
    }
  }
}
