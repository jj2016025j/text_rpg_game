import { SystemLog } from "../utils/systemLog.js";

export class NPCUI {
  static initialize(gameSystem) {
    SystemLog.addMessage("[NPC UI] 開始初始化");
    this.gameSystem = gameSystem; 
    this.update();
    SystemLog.addMessage("[NPC UI] 已初始化 ✅");
  }

  static update() {
    const mapRegion = this.gameSystem.currentLocation;
    if (!mapRegion || typeof mapRegion.listShops !== "function") {
        console.error("❌ 當前地圖數據異常，無法獲取商店");
        return;
    }

    this.npcs = mapRegion.listNPCs(this.gameSystem.npcManager);
    this.render();
    SystemLog.addMessage(`[NPC UI] 更新 ${this.npcs.length} 位 NPC`);
  }

  static render() {
    const npcList = document.querySelector("#npc-list");
    if (!npcList) {
      console.error("❌ 無法找到 #npcList，請確認 HTML 結構");
      return;
    }

    npcList.innerHTML = ""; // 清空列表

    if (!this.npcs || this.npcs.length === 0) {
      npcList.innerHTML = "<div class='no-npc'>📜 這個地點沒有 NPC</div>";
      return;
    }

    this.npcs.forEach(npc => {
      const npcElement = NPCUI.createNPCElement(npc);
      npcList.appendChild(npcElement);
    });
    // this.npcs.forEach(npc => {
    //   const li = document.createElement("li");
    //   li.textContent = npc.name;
    //   li.dataset.npcId = npc.id; // 綁定 NPC ID

    //   const greetButton = document.createElement("button");
    //   greetButton.textContent = "打招呼";
    //   greetButton.classList.add("greet-button"); // ✅ 添加 class 方便事件委派
    //   greetButton.dataset.npcId = npc.id; // 綁定 NPC ID

    //   li.appendChild(greetButton);
    //   npcList.appendChild(li);
    // });
  }

  // ✅ 創建 NPC UI 元素
  static createNPCElement(npc) {
    const npcDiv = document.createElement("div");
    npcDiv.className = "npc";
    npcDiv.dataset.npcId = npc.id; // 綁定 NPC ID

    // NPC 名稱
    const npcName = document.createElement("h3");
    npcName.textContent = npc.name;

    // NPC 按鈕
    const greetButton = document.createElement("div");
    greetButton.className = "npc-button";
    greetButton.textContent = "對話";
    greetButton.dataset.npcId = npc.id;

    // 點擊對話
    greetButton.addEventListener("click", () => NPCUI.handleGreet(npc.id));

    // 組合
    npcDiv.appendChild(npcName);
    npcDiv.appendChild(greetButton);

    return npcDiv;
  }

  static handleGreet(npcId) {
    const npc = this.npcs.find(n => n.id === npcId);
    if (!npc) {
      console.error(`❌ 找不到 NPC ID: ${npcId}`);
      return;
    }

    if (npc.dialogue && npc.dialogue.length > 0) {
      const randomDialogue = npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
      SystemLog.addMessage(`🗣️ ${npc.name}: "${randomDialogue}"`);
    } else {
      SystemLog.addMessage(`🗣️ ${npc.name} 沒有話要說`);
    }
  }
}

// ✅ 事件委派，確保即使 NPC 清單變動也能正常運行
document.addEventListener("click", (event) => {
  if (event.target.matches(".greet-button")) {
    const npcId = event.target.dataset.npcId;
    NPCUI.handleGreet(npcId);
  }
});
