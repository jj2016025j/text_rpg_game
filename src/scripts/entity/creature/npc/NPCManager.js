// src\scripts\entity\creature\NPC\NPCManager.js
import { NPC } from "./NPC.js";
import { npcData } from "./npcData.js"; // 🔹 先導入預設的 NPC 數據
import { SystemLog } from "../../../utils/SystemLog.js";

class NPCManager {
    constructor(customNpcs = []) {
        // 確保傳入的資料是陣列，防止 undefined 或 null 出錯
        const combinedNpcs = [...npcData, ...(Array.isArray(customNpcs) ? customNpcs : [])];

        // 使用 Map 確保相同 ID 的 NPC 不會重複（傳入的自訂 NPC 可以覆蓋預設 NPC）
        this.npcs = new Map(
            combinedNpcs.map(npc => [npc.id, new NPC(npc)])
        );

        SystemLog.addMessage(`[NPC] 初始化完成，共 ${this.npcs.size} 位 NPC`);
    }

    // 🔹 根據 ID 獲取 NPC
    getNPCById(id) {
        return this.npcs.get(id) || null;
    }

    // 🔹 獲取所有 NPC
    listAllNPCs() {
        return Array.from(this.npcs.values());
    }

    // 🔹 確保 NPC 存在
    validateNPC(id) {
        if (!this.npcs.has(id)) {
            console.warn(`⚠️ NPC ${id} 不存在`);
            return false;
        }
        return true;
    }
}

export { NPCManager };
