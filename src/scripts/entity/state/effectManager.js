import { AttributeHandler } from "./attributeHandler.js";
import { AvailableEffects } from "./availableEffects.js";
import { SystemLog } from "../../utils/systemLog.js";

class EffectManager {
    constructor(state, activeEffects = []) {
        this.state = state; // 玩家狀態
        this.availableEffects = AvailableEffects; // 可用的效果列表
        // 將陣列轉換為 Map（`effectId` 作為鍵）
        this.activeEffects = new Map(
            activeEffects.map(effect => [effect.id, { ...effect }])
        );
    }

    // 🔹 添加效果（如果已經存在，則重置持續時間）
    addEffect(effectId) {
        const effect = this.availableEffects.find(e => e.id === effectId);
        if (!effect) {
            SystemLog.addMessage(`⚠️ 效果 ${effectId} 無效`);
            return;
        }

        if (this.activeEffects.has(effect.id)) {
            this.activeEffects.get(effect.id).remainingTime = effect.duration; // 🔄 重置持續時間
            SystemLog.addMessage(`🔄 效果 ${effect.name} 持續時間已重置`);
        } else {
            this.activeEffects.set(effect.id, { ...effect, remainingTime: effect.duration });
            SystemLog.addMessage(`✅ 添加效果: ${effect.name}`);
        }

        this.state.updateCombatStats(); // ✅ 確保影響戰鬥屬性
    }

    // 🔹 移除效果
    removeEffect(effectId) {
        if (this.activeEffects.has(effectId)) {
            SystemLog.addMessage(`❌ 移除效果: ${this.activeEffects.get(effectId).name}`);
            this.activeEffects.delete(effectId);
            this.state.updateCombatStats(); // ✅ 確保屬性更新
        } else {
            SystemLog.addMessage(`⚠️ 效果 ${effectId} 不存在`);
        }
    }

    // ✅ 新增方法：清空所有效果（死亡時使用）
    removeAllEffects() {
        this.activeEffects.clear();
        SystemLog.addMessage("🛑 所有效果已移除");
        this.state.updateCombatStats(); // ✅ 確保戰鬥狀態重置
    }

    // 🔹 更新所有效果（每回合/每秒調用）
    updateEffects() {
        this.activeEffects.forEach((effect, effectId) => {
            this.applyEffect(effect); // ✅ 直接應用效果

            if (effect.remainingTime !== null) {
                effect.remainingTime -= 1;
                if (effect.remainingTime <= 0) {
                    this.removeEffect(effectId);
                }
            }
        });

        // this.state.updateCombatStats(); // ✅ 確保影響戰鬥屬性
    }

    // 🔹 應用單個效果的影響
    applyEffect(effect) {
        if (effect.impact) {
            Object.entries(effect.impact).forEach(([key, value]) => {
                if (AttributeHandler.handlers[key]) {
                    AttributeHandler.handlers[key](value, this.state);
                } else {
                    SystemLog.addMessage(`⚠️ 未定義的屬性影響: ${key}`);
                }
            });
        }
    }
}

export { EffectManager };
