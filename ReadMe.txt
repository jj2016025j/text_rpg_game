# Text RPG Game

![Game Preview](https://jj2016025j.github.io/text_rpg_game/preview.png)

這是一款使用 **純 HTML、CSS 和 JavaScript** 開發的文字冒險遊戲，目標是提供一個沉浸式的文字體驗，讓玩家透過選擇影響劇情走向。

## 🔗 [遊玩遊戲](https://jj2016025j.github.io/text_rpg_game/)

## 🚀 遊戲特色
- **無需額外安裝**：直接開啟瀏覽器即可遊玩。
- **純前端技術**：無需後端伺服器，即可儲存進度與進行遊戲。
- **分支劇情**：根據玩家選擇，故事將發展出不同的結局。
- **簡單直觀的 UI**：專為輕量級 RPG 體驗設計。

## 📂 專案結構
```
text_rpg_game/
│── index.html         # 主遊戲頁面
│── styles.css         # 遊戲樣式表
│── script.js          # 遊戲邏輯
│── assets/            # 存放圖片、音效等資源
│── README.md          # 本說明文件
```

## 🛠️ 如何運行
1. **直接點擊** [遊戲連結](https://jj2016025j.github.io/text_rpg_game/) 即可遊玩。
2. **本機運行**
   - 下載或 clone 本專案：
     ```sh
     git clone https://github.com/jj2016025j/text_rpg_game.git
     ```
   - 在本機打開 `index.html` 進行遊戲。

## 🔧 開發指南
### 1️⃣ 修改劇情
所有劇情邏輯都存放在 `script.js`，可以編輯該檔案來變更劇情內容。

### 2️⃣ 設計新場景
- 修改 `index.html` 來調整遊戲 UI。
- 更新 `styles.css` 來改變遊戲外觀。

### 3️⃣ 新增角色或道具
可在 `script.js` 中擴展角色與道具系統，例如：
```js
const player = {
  name: "勇者",
  inventory: [],
  health: 100
};
```

## 🎯 TODO 清單
- [ ] 優化 UI，提升使用者體驗
- [ ] 增加更多劇情選擇與分支結局
- [ ] 加入音效與動畫效果
- [ ] 增加儲存與載入進度的功能

## 📜 授權
本專案採用 **MIT License**，可自由修改與分發。

---
✨ **歡迎提供建議與回饋！一起讓這款遊戲更有趣！** 🎮
