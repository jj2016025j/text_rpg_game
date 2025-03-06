import { SystemLog } from "../utils/systemLog.js";

export class MapUI {
  static initialize(gameSystem) {
    this.gameSystem = gameSystem; // ✅ 儲存 gameSystem 以便 switchMap
    this.mapManager = gameSystem.mapManager; // ✅ 儲存 gameSystem 以便 switchMap
    this.mapData = this.mapManager.listAllRegions(); // ✅ 儲存 gameSystem 以便 switchMap
    this.currentLocation = gameSystem.currentLocation; // ✅ 儲存 gameSystem 以便 switchMap
    this.update();
    SystemLog.addMessage("[地圖UI] 已初始化 🗺️");
  }

  static update() {
    if (!Array.isArray(this.mapData)) {
        console.error("❌ `mapData` 不是有效的陣列:", this.mapData);
        return;
    }

    const mapListContainer = document.getElementById("map-list");
    if (!mapListContainer) {
      console.error("❌ 找不到地圖列表元素");
      return;
    }

    mapListContainer.innerHTML = "";


    // 生成地圖按鈕
    this.mapData.forEach(location => {
      const mapButton = document.createElement("div");
      mapButton.classList.add("map-button");

      const title = document.createElement("h3");
      title.textContent = location.name;

      const description = document.createElement("h6");
      description.textContent = location.description;

      // 如果是當前地點，加上高亮標記
      if (location.id === this.currentLocation) {
        mapButton.classList.add("current-location");
      }

      mapButton.addEventListener("click", () => {
        this.switchLocation(location.id);
      });

      // 加入按鈕內容
      mapButton.appendChild(title);
      mapButton.appendChild(description);
      mapListContainer.appendChild(mapButton);
    });
  }

  static switchLocation(locationId) {
    if (!this.gameSystem) {
      console.error("❌ `gameSystem` 未初始化");
      return;
    }

    this.gameSystem.switchMap(locationId);
    this.currentLocation = locationId;
    this.update(); // 重新渲染 UI
  }
}

// this.mapData.forEach(location => {
//       const li = document.createElement("li");
//       li.textContent = `${location.name}`;
//       // (${location.description})
//       if (location.id === this.currentLocation) {
//         li.classList.add("current-location");
//       }

//       const button = document.createElement("button");
//       button.textContent = "前往";
//       button.addEventListener("click", () => this.gameSystem.switchMap(location.id)); // ✅ 修正 switchMap 的調用

//       li.appendChild(button);
//       mapListContainer.appendChild(li);
//     });
//   }
// }
