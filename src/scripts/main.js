import { GameSystem } from "./gameSystem.js";
import { SystemLog } from "./utils/systemLog.js";

document.addEventListener("DOMContentLoaded", () => {
  SystemLog.initialize(); // 初始化系統提示 UI
  SystemLog.addMessage("遊戲開始！歡迎來到這個世界。", "info");
  SystemLog.addMessage("[系統] 開始初始化");
  new GameSystem(); // 初始化遊戲系統

});
