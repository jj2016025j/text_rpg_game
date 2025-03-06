import { EffectManager } from "./state/effectManager.js";
import { SystemLog } from "../utils/systemLog.js";

export class EntityState {
    constructor(entity, stateConfig = {}) {
        this.entity = entity || null; // 綁定對應的實體（玩家、NPC、物件）

        // 🔹 基本屬性（適用於所有實體）
        this.health = stateConfig.health ?? 100;
        this.mana = stateConfig.mana ?? 50;
        this.alive = stateConfig.alive ?? true; // 存活狀態: true(活) | false(死)

        // 🔹 最大值
        this.maxHealth = stateConfig.maxHealth ?? 100;
        this.maxMana = stateConfig.maxMana ?? 50;

        // 🔹 狀態效果管理
        this.effectManager = new EffectManager(this, stateConfig.effects ?? []);
        this.applyDefaultEffects();
    }

    // 🔹 應用預設效果
    applyDefaultEffects() {
        this.effectManager.activeEffects.forEach(effect => {
            this.addEffect(effect.id);
        });
    }

    // 🔹 添加效果
    addEffect(effectId) {
        this.effectManager.addEffect(effectId);
    }

    // 🔹 移除效果
    removeEffect(effectId) {
        this.effectManager.removeEffect(effectId);
    }

    // 🔹 受傷
    takeDamage(amount) {
        if (!this.alive) return;
        this.health = Math.max(0, this.health - amount);
        SystemLog.addMessage(`${this.entity.name} 受到 ${amount} 點傷害`);

        if (this.health === 0) this.death();
    }

    // 🔹 死亡
    death() {
        this.alive = false;
        this.effectManager.removeAllEffects();
        SystemLog.addMessage(`${this.entity.name} 已死亡`);
    }

    // 🔹 復活
    resurrect() {
        if (!this.alive) {
            this.alive = true;
            this.health = Math.floor(this.maxHealth * 0.5);
            this.mana = Math.floor(this.maxMana * 0.3);
            SystemLog.addMessage(`${this.entity.name} 已復活`);
        }
    }

    // 🔹 獲取序列化數據
    getSerializableData() {
        return {
            health: this.health,
            mana: this.mana,
            alive: this.alive,
            maxHealth: this.maxHealth,
            maxMana: this.maxMana
        };
    }
}
