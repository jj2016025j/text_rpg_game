// UIManager.js

import { SystemLog } from "../utils/SystemLog.js";
import { PlayerUI } from "./PlayerUI.js";
import { SkillUI } from "./SkillUI.js";
import { InventoryUI } from "./InventoryUI.js";
import { MapUI } from "./MapUI.js";
import { ShopUI } from "./ShopUI.js";
import { NPCUI } from "./NPCUI.js";
import { ObjectUI } from "./ObjectUI.js";
import { CreatureUI } from "./CreatureUI.js";

export class UIManager {
  static initialize(gameSystem) {
    SystemLog.addMessage("[系統] UI 開始初始化");

    if (!this.validateGameSystem(gameSystem)) return;

    this.gameSystem = gameSystem; // ✅ 儲存 gameSystem
    try {
      PlayerUI.initialize(gameSystem);
      SkillUI.initialize(gameSystem);
      InventoryUI.initialize(gameSystem);
      MapUI.initialize(gameSystem);
      NPCUI.initialize(gameSystem);
      ShopUI.initialize(gameSystem);
      ObjectUI.initialize(gameSystem);
      CreatureUI.initialize(gameSystem);
    } catch (error) {
      console.error("初始化 UI 時出錯：", error);
    }
    SystemLog.addMessage("[系統] UI 初始化完成 ✅");
  }

  static updateAllUI(gameSystem) {
    if (!this.validateGameSystem(gameSystem)) {
      return;
    }

    try {
      PlayerUI.update();
      // SkillUI.update();
      // InventoryUI.update();
      MapUI.update();
      // ✅ 獲取當前地圖的 NPC 並更新 UI
      NPCUI.update();
      ShopUI.update();
      ObjectUI.update();

    } catch (error) {
      console.error("更新 UI 時出錯：", error);
    }
  }

  // 驗證 GameSystem 是否正確初始化
  static validateGameSystem(gameSystem) {
    if (!gameSystem || !gameSystem.player) {
      console.error("GameSystem 尚未正確初始化，無法執行 UI 操作");
      return false;
    }
    return true;
  }
}
