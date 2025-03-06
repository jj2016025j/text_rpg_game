import { SystemLog } from "../../utils/systemLog.js";

export class BehaviorManager {
    constructor(player, eventManager) {
        this.player = player;
        this.events = eventManager;
    }

    // ✅ 移動
    moveTo(newLocation) {
        if (newLocation !== this.player.location) {
            const oldLocation = this.player.location;
            this.player.location = newLocation;
            this.events.emit("move", { player: this.player, oldLocation, newLocation });
        } else {
            SystemLog.addMessage(`⚠️ ${this.player.name} 已經在 ${newLocation}`);
        }
    }

    // ✅ 死亡
    death() {
        if (this.player.states.state === "DEAD") {
            SystemLog.addMessage(`⚠️ ${this.player.name} 已經是死亡狀態`);
            return;
        }
        this.player.states.state = "DEAD";
        this.events.emit("death", { player: this.player });
    }

    // ✅ 使用技能
    useSkill(skillId, target) {
        const skill = this.player.skillManager.useSkill(skillId, target);
        if (skill) {
            this.events.emit("skillUsed", { skill, target });
        } else {
            SystemLog.addMessage(`⚠️ ${this.player.name} 無法使用技能 ${skillId}`);
        }
    }

    // ✅ 解鎖技能
    learnSkill(skillId) {
        const success = this.player.skillManager.learnSkill(skillId);
        if (success) {
            SystemLog.addMessage(`🎉 ${this.player.name} 解鎖新技能：${skillId}`);
        } else {
            SystemLog.addMessage(`⚠️ ${this.player.name} 已經擁有技能 ${skillId}`);
        }
    }

    // ✅ 基礎攻擊
    attack(target) {
        if (!target || target.states.state === "DEAD") {
            SystemLog.addMessage(`⚠️ ${this.player.name} 無法攻擊無效目標`);
            return;
        }

        const damage = this.calculateDamage();
        SystemLog.addMessage(`⚔️ ${this.player.name} 攻擊 ${target.name}，造成 ${damage} 傷害`);
        target.states.takeDamage(damage);

        this.events.emit("attack", { player: this.player, target, damage });

        if (target.states.state === "DEAD") {
            SystemLog.addMessage(`💀 ${target.name} 被 ${this.player.name} 擊敗`);
            this.events.emit("enemyDefeated", { player: this.player, target });
        }
    }

    // 計算攻擊傷害（可以擴展成不同攻擊類型）
    calculateDamage() {
        return Math.floor(Math.random() * 10) + 5; // 5~15 隨機傷害
    }

    // ✅ 更新狀態（冷卻時間、狀態恢復等）
    update(deltaTime) {
        this.player.skillManager.updateCooldowns(deltaTime);

        if (typeof this.player.states.update === "function") {
            this.player.states.update(deltaTime);
        }
    }
}
