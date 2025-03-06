import { MapRegion } from "./mapRegion.js";
import { defaultMapData } from "./mapData.js";

export class MapManager {
  constructor(insertMapData = []) {
    // 確保 insertMapData 是陣列，防止 undefined 出錯
    const combinedMapData = [...defaultMapData, ...(Array.isArray(insertMapData) ? insertMapData : [])];
    // console.log(combinedMapData)

    // ✅ 使用 new Map() 而不是 new MapRegion()
    this.mapRegions = new Map(
      combinedMapData.map(region => [region.id, new MapRegion(region)])
    );
    // console.log(this.mapRegions)
  }

  getDefaultRegion() {
    // console.log(this.mapRegions.values().next().value)
    return this.mapRegions.values().next().value || null; // ✅ 預設回傳第一個地圖
  }

  getMapRegionById(id) {
    // console.log(this.mapRegions.get(id))
    return this.mapRegions.get(id) || null;
  }

  listAllRegions() {
    // console.log(...this.mapRegions.values())
    return [...this.mapRegions.values()]; // 確保回傳陣列
  }
}