import { CreatureState } from "./creatureState.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Monster {
    constructor(monsterData = {}) {
        this.name = monsterData.name ?? "未知怪物";
        this.id = monsterData.id ?? "monster_id";

        // 🔹 使用 CreatureState 管理狀態
        this.state = new CreatureState(this, monsterData.states);
    }

    attack(target) {
        if (!target.state.alive) {
            SystemLog.addMessage(`${target.name} 已死亡，無法攻擊`);
            return;
        }
        SystemLog.addMessage(`${this.name} 攻擊 ${target.name}`);
        target.state.takeDamage(this.state.attackPower);
    }
}
