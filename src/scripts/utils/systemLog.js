export class SystemLog {
    static logContainer = null;
    static maxMessages = 50; // 最多保留 50 條訊息

    /**
     * 初始化系統訊息容器
     * @param {string} logElementId - 日誌容器的 HTML ID
     */
    static initialize(logElementId = "messages") {
        this.logContainer = document.getElementById(logElementId);
        if (!this.logContainer) {
            console.error(`❌ 找不到 ID 為 '${logElementId}' 的元素，請確認 HTML 結構`);
            return;
        }
        SystemLog.addMessage("✅ [系統提示] 初始化完成");
    }

    /**
     * 新增訊息至系統日誌
     * @param {string} message - 訊息內容
     * @param {string} type - 訊息類型 (system, player, warning, error)
     */
    static addMessage(message, type = "info") {
        if (!this.logContainer) return;

        // 取得當前時間
        const timestamp = new Date().toLocaleTimeString("zh-TW", { hour12: false });

        // 設定不同類型的前綴符號
        const messageConfig  = {
            system: { prefix: "ℹ️", class: "system-message" },
            player: { prefix: "🗣️", class: "player-message" },
            warning: { prefix: "⚠️", class: "warning-message" },
            error: { prefix: "❌", class: "error-message" },
        };

        const { prefix, class: messageClass } = messageConfig[type] || messageConfig.system;
        const formattedMessage = `[${timestamp}] ${prefix} ${message}\n`;

        console.warn(formattedMessage)

        // 創建訊息元素
        const messageElement = document.createElement("div");
        messageElement.classList.add(messageClass, "message");
        messageElement.innerHTML = `<h6>${formattedMessage}</h6>`;

        // 新增到日誌
        this.logContainer.appendChild(messageElement);

        // 限制訊息數量
        while (this.logContainer.children.length > this.maxMessages) {
            this.logContainer.removeChild(this.logContainer.firstChild);
        }

        // 自動滾動到底部
        this.logContainer.scrollTop = this.logContainer.scrollHeight;

        // // 限制訊息長度
        // let lines = this.logContainer.value.split("\n");
        // if (lines.length >= this.maxMessages) {
        //     lines.shift(); // 移除最舊的訊息
        // }
        // lines.push(formattedMessage);

        // // 更新顯示
        // this.logContainer.value = lines.join("\n");

        // // 自動滾動到最新訊息
        // this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
}
