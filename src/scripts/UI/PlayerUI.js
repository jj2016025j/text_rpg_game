import { SystemLog } from "../utils/SystemLog.js";

export class PlayerUI {
  static initialize(gameSystem) {
    if (!gameSystem.player) {
      console.error("Player 未正確初始化");
      return;
    }

    this.gameSystem = gameSystem;
    this.player = gameSystem.player;

    SystemLog.addMessage("[玩家UI] 開始初始化...");
    this.update();
    this.addEventListeners();
    SystemLog.addMessage("[玩家UI] 初始化完成 ✅");
  }

  static update() {
    if (!this.player) {
      console.error("玩家未初始化，無法更新 UI");
      return;
    }

    const { state, inventory } = this.player;

    try {
      document.querySelector("#player-name").textContent = this.player.name;
      document.querySelector("#player-level").textContent = `LV.${state.level}`;
      // document.querySelector("#player-gold").textContent = `${inventory.gold} G`;

      // 更新血條、魔力條、經驗條
      document.querySelector(".player-hp").style.width = `${(state.health / state.maxHealth) * 100}%`;
      document.querySelector(".player-mp").style.width = `${(state.mana / state.maxMana) * 100}%`;
      document.querySelector(".player-exp").style.width = `${(state.experience / state.maxExperience) * 100}%`;

      // 更新玩家狀態標籤
      const statusList = document.querySelector("#status-list");
      statusList.innerHTML = "";
      // state.effects.forEach(effect => {
      //   const tag = document.createElement("div");
      //   tag.classList.add("status-tag");
      //   tag.innerHTML = `<h6>${effect}</h6>`;
      //   statusList.appendChild(tag);
      // });

    } catch (err) {
      console.error("更新玩家 UI 時出錯:", err);
    }
  }

  static addEventListeners() {
    const buttonConfigs = [
      {
        id: "addGoldButton", // 新增金錢按鈕
        handler: () => {
          const randomGold = Math.floor(Math.random() * 50) + 1; // 隨機增加 1-50 金幣
          this.player.inventory.addMoney(randomGold);
          this.update();
          SystemLog.addMessage(`💰 增加金錢：${randomGold}`);
        },
      }, {
        id: "removeGoldButton", // 消耗金錢按鈕
        handler: () => {
          const randomGold = Math.floor(Math.random() * 30) + 1; // 隨機消耗 1-30 金幣
          if (this.player.inventory.checkMoney(randomGold)) { // 修改方法名稱
            this.player.inventory.removeMoney(randomGold);
            this.update();
            SystemLog.addMessage(`消耗金錢：${randomGold}`);
          } else {
            SystemLog.addMessage(`金幣不足，無法消耗 ${randomGold}`);
          }
        },
      },
      {
        id: "randomHealthButton",
        handler: () => {
          const randomHealthChange = Math.floor(Math.random() * 20) - 10;
          if (randomHealthChange > 0) {
            this.player.state.healing(randomHealthChange);
          } else {
            this.player.state.takeDamage(-randomHealthChange);
          }
          this.update();
          SystemLog.addMessage(`血量隨機變動：${randomHealthChange}`);
        },
      },
      {
        id: "randomManaButton",
        handler: () => {
          const randomManaChange = Math.floor(Math.random() * 20) - 10;
          this.player.state.mana = Math.max(0, Math.min(this.player.state.maxMana, this.player.state.mana + randomManaChange));
          this.update();
          SystemLog.addMessage(`🔵 魔力隨機變動：${randomManaChange}`);
        },
      },
      {
        id: "randomExpButton",
        handler: () => {
          const randomExp = Math.floor(Math.random() * 50);
          this.player.state.gainExperience(randomExp);
          this.update();
          SystemLog.addMessage(`🆙 經驗值隨機增加：${randomExp}`);
        },
      },
      {
        id: "levelUpButton",
        handler: () => {
          this.player.state.levelUp();
          this.update();
          SystemLog.addMessage("🔥 升級成功");
        },
      },
      {
        id: "randomLocationButton",
        handler: () => {
          const locations = ["古林", "城鎮", "沙漠", "雪山"];
          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          this.player.location = randomLocation;
          this.update();
          SystemLog.addMessage(`📍 隨機位置變動：${randomLocation}`);
        },
      },
      {
        id: "poisonButton",
        handler: () => {
          this.player.state.addEffect("PoisonEffect");
          this.update();
          SystemLog.addMessage("☠️ 中毒效果已添加");
        },
      },
      {
        id: "cleanseButton",
        handler: () => {
          this.player.state.removeEffect("PoisonEffect");
          this.update();
          SystemLog.addMessage("✨ 中毒效果已移除");
        },
      },
      {
        id: "saveGameButton",
        handler: () => {
          this.gameSystem.saveGameToCookie();
          SystemLog.addMessage("💾 遊戲進度已儲存");
        },
      },
      {
        id: "loadGameButton",
        handler: () => {
          this.gameSystem.loadGameFromCookie();
          this.update();
          SystemLog.addMessage("📂 遊戲進度已載入");
        },
      },
    ];

    // buttonConfigs.forEach(({ id, handler }) => {
    //   const button = document.getElementById(id);
    //   if (button) {
    //     button.addEventListener("click", handler);
    //   } else {
    //     console.warn(`⚠️ 按鈕 ${id} 未找到`);
    //   }
    // });
  }
}
