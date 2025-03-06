import { SystemLog } from "../utils/systemLog.js";

export class CreatureUI {
  static initialize(gameSystem) {
    SystemLog.addMessage("[生物 UI] 開始初始化");
    this.gameSystem = gameSystem;
    this.update();
    SystemLog.addMessage("[生物 UI] 已初始化 ✅");
  }

  // ✅ 更新 UI
  static update() {
    const mapRegion = this.gameSystem.currentLocation;
    if (!mapRegion || typeof mapRegion.listCreatures !== "function") {
      console.error("❌ 當前地圖數據異常，無法獲取生物");
      return;
    }

    this.creatures = mapRegion.listCreatures(this.gameSystem.creatureManager);
    this.render();
    SystemLog.addMessage(`[生物 UI] 更新 ${this.creatures.length} 種生物`);
  }

  // ✅ 渲染生物 UI
  static render() {
    const monsterList = document.querySelector("#monster-list");
    if (!monsterList) {
      console.error("❌ 無法找到 #creaturesList，請確認 HTML 結構");
      return;
    }

    monsterList.innerHTML = ""; // 清空列表

    if (!this.creatures || this.creatures.length === 0) {
      monsterList.innerHTML = "<div class='no-monsters'>🌿 這個地點沒有生物</div>";
      return;
    }

    // this.creatures.forEach(creature => {
    //   const li = document.createElement("li");
    //   li.textContent = `${creature.name} - ${creature.state.health} HP`;
    //   li.dataset.creatureId = creature.id; // 綁定 ID

    //   monsterList.appendChild(li);
    // });
    // console.log(this.creatures)
    this.creatures.forEach(creature => {
      const monsterElement = CreatureUI.createMonsterElement(creature);
      monsterList.appendChild(monsterElement);
    });
  }

  // ✅ 創建單個怪物 UI 元素
  static createMonsterElement(creature) {
    const monsterDiv = document.createElement("div");
    monsterDiv.className = "monster";
    monsterDiv.dataset.creatureId = creature.id; // 綁定生物 ID

    // 名稱 & 等級
    const nameLevelDiv = document.createElement("div");
    nameLevelDiv.className = "monster-name-level";
    nameLevelDiv.innerHTML = `<h3 class="monster-name">${creature.name}</h3>
                              <h4 class="monster-level">LV${creature.state.level}</h4>`;

    // 狀態標籤
    const statusListDiv = document.createElement("div");
    statusListDiv.className = "monster-status-list";
    // creature.state.effects.forEach(effect => {
    //   const statusTag = document.createElement("div");
    //   statusTag.className = "monster-status-tag";
    //   statusTag.innerHTML = `<h6>${effect}</h6>`;
    //   statusListDiv.appendChild(statusTag);
    // });

    // 血量條
    const healthBar = CreatureUI.createStatBar("血量", creature.state.health, creature.state.maxHealth, "monster-hp");

    // 魔力條
    const manaBar = CreatureUI.createStatBar("魔力", creature.state.mana, creature.state.maxMana, "monster-mp");

    // 組合所有元素
    monsterDiv.appendChild(nameLevelDiv);
    if (statusListDiv.childElementCount > 0) {
      monsterDiv.appendChild(statusListDiv);
    }
    monsterDiv.appendChild(healthBar);
    monsterDiv.appendChild(manaBar);

    return monsterDiv;
  }

  // ✅ 創建數值條（血量、魔力）
  static createStatBar(label, value, maxValue, className) {
    const statDiv = document.createElement("div");
    statDiv.className = "monster-stat";
    statDiv.innerHTML = `<label><h6>${label}</h6></label>
                         <div class="monster-bar">
                           <div class="${className}" style="width:${(value / maxValue) * 100}%;"></div>
                         </div>`;
    return statDiv;
  }
}
