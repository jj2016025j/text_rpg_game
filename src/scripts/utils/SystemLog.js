export class SystemLog {
    static logContainer = null;
    static maxMessages = 50; // 最多保留 50 條訊息

    static initialize(logElementId = "messages") {
        this.logContainer = document.getElementById(logElementId);
        if (!this.logContainer) {
            console.error(`❌ 找不到 ID 為 '${logElementId}' 的元素，請確認 HTML 結構`);
            return;
        }
        SystemLog.addMessage("✅ [系統提示] 初始化完成");
    }

    static addMessage(message, type = "info") {
        if (!this.logContainer) return;

        // 設定不同類型的前綴符號
        const prefixMap = {
            info: "ℹ️",
            warning: "⚠️",
            error: "❌",
        };
        const prefix = prefixMap[type] || "";

        // 取得當前時間
        const timestamp = new Date().toLocaleTimeString("zh-TW", { hour12: false });

        // 建立訊息格式
        const formattedMessage = `[${timestamp}] ${prefix} ${message}\n`;
        console.warn(formattedMessage)

        // 限制訊息長度
        let lines = this.logContainer.value.split("\n");
        if (lines.length >= this.maxMessages) {
            lines.shift(); // 移除最舊的訊息
        }
        lines.push(formattedMessage);

        // 更新顯示
        this.logContainer.value = lines.join("\n");

        // 自動滾動到最新訊息
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
}
