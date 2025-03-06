export class Skill {
    constructor(gameManager, player, skillList = []) {
        this.gameManager = gameManager;
        this.player = player;
        this.unlockedSkills = new Set(skillList); // ✅ 只存 ID
    }

    hasSkill(skillId) {
        return this.unlockedSkills.has(skillId);
    }

    learnSkill(skillId) {
        if (!this.gameManager.skillManager.getSkillById(skillId)) {
            SystemLog.addMessage(`⚠️ 技能 ${skillId} 不存在`);
            return false;
        }
        if (this.hasSkill(skillId)) {
            SystemLog.addMessage(`⚠️ 技能已經解鎖`);
            return false;
        }

        this.unlockedSkills.add(skillId);
        SystemLog.addMessage(`✅ 玩家解鎖技能 ID: ${skillId}`);
        return true;
    }

    useSkill(skillId, target) {
        if (!this.hasSkill(skillId)) {
            SystemLog.addMessage(`⚠️ 未解鎖技能：${skillId}`);
            return false;
        }

        const skill = this.gameManager.skillManager.getSkillById(skillId);
        if (!skill) {
            SystemLog.addMessage(`⚠️ 找不到技能 ID: ${skillId}`);
            return false;
        }

        if (this.player.state.mana < skill.manaCost) {
            SystemLog.addMessage(`❌ 魔力不足，無法使用 ${skill.name}`);
            return false;
        }

        this.player.state.mana -= skill.manaCost;
        SystemLog.addMessage(`✨ 使用技能：${skill.name}`);
        return true;
    }

    getSerializableData() {
        return Array.from(this.unlockedSkills); // ✅ 只存 ID
    }
}
