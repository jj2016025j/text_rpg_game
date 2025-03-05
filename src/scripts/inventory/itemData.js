export const itemsData = [
    // 🌱 食物類
    {
      id: "apple",
      type: "Food",
      name: "蘋果",
      value: 5,
      description: "多汁的紅蘋果。",
      quantity: 10,
      attributes: {
        effects: {
          heal: 0,
          saturation: 30,
          mood: 10
        },
        durability: null
      }
    },
    {
      id: "bread",
      type: "Food",
      name: "麵包",
      value: 8,
      description: "能填飽肚子的麵包。",
      quantity: 5,
      attributes: {
        effects: {
          heal: 10
        },
        durability: null
      }
    },
    {
      id: "fish",
      type: "Food",
      name: "新鮮魚類",
      value: 20,
      description: "剛打撈上來的魚。",
      quantity: 10,
      attributes: {
        effects: {
          heal: 15
        },
        durability: null
      }
    },
    {
      id: "foodPack",
      type: "Food",
      name: "乾糧包",
      value: 50,
      description: "適合長途旅行的乾糧。",
      quantity: 5,
      attributes: {
        effects: {
          heal: 25
        },
        durability: null
      }
    },
  
    // 💊 藥水類
    {
      id: "magicGrass",
      type: "Material",
      name: "魔法草",
      value: 30,
      description: "能夠恢復魔力的草藥。",
      quantity: 20,
      attributes: {
        effects: {
          mana: 10
        },
        durability: null
      }
    },
    {
      id: "healingHerb",
      type: "Material",
      name: "治療草藥",
      value: 15,
      description: "能夠治療輕微傷口的草藥。",
      quantity: 50,
      attributes: {
        effects: {
          heal: 15
        },
        durability: null
      }
    },
    {
      id: "lifePotion",
      type: "Potion",
      name: "生命藥水",
      value: 30,
      description: "恢復 50 點生命值的藥水。",
      quantity: 10,
      attributes: {
        effects: {
          health: 50
        },
        durability: null
      }
    },
    {
      id: "manaPotion",
      type: "Potion",
      name: "魔力藥水",
      value: 30,
      description: "恢復 100 點魔力的藥水。",
      quantity: 20,
      attributes: {
        effects: {
          mana: 100
        },
        durability: null
      }
    },
    {
      id: "waterBottle",
      type: "Potion",
      name: "水壺",
      value: 20,
      description: "可攜帶的水瓶，能補充水分。",
      quantity: 5,
      attributes: {
        effects: {
          hydration: 100
        },
        durability: null
      }
    },
  
    // ⚔️ 武器類
    {
      id: "sword",
      type: "Weapon",
      name: "鋼劍",
      value: 150,
      description: "鋒利的鋼劍，適合近戰。",
      quantity: 1,
      attributes: {
        effects: {
          damage: 15
        },
        durability: 100
      }
    },
    {
      id: "bow",
      type: "Weapon",
      name: "弓箭",
      value: 120,
      description: "遠距離攻擊的武器。",
      quantity: 2,
      attributes: {
        effects: {
          damage: 12
        },
        durability: 80
      }
    },
    {
      id: "elvenBow",
      type: "Weapon",
      name: "精靈弓",
      value: 400,
      description: "精靈製作的高級弓。",
      quantity: 1,
      attributes: {
        effects: {
          damage: 20
        },
        durability: 100
      }
    },
  
    // 🛡️ 防具類
    {
      id: "travelerCloak",
      type: "Armor",
      name: "旅行者披風",
      value: 75,
      description: "適合長途旅行的披風。",
      quantity: 1,
      attributes: {
        effects: {
          defense: 5
        },
        durability: 50
      }
    },
    {
      id: "leatherBoots",
      type: "Armor",
      name: "皮革戰靴",
      value: 85,
      description: "輕便且堅固的靴子。",
      quantity: 1,
      attributes: {
        effects: {
          defense: 8
        },
        durability: 60
      }
    },
    {
      id: "winterJacket",
      type: "Armor",
      name: "冬季外套",
      value: 200,
      description: "適合在寒冷地區穿著。",
      quantity: 1,
      attributes: {
        effects: {
          defense: 15,
          coldResistance: 50
        },
        durability: 100
      }
    },
    {
      id: "snowBoots",
      type: "Armor",
      name: "雪靴",
      value: 180,
      description: "在雪地行走的最佳選擇。",
      quantity: 1,
      attributes: {
        effects: {
          defense: 12,
          coldResistance: 30
        },
        durability: 80
      }
    },
  
    // 🎒 旅行用品
    {
      id: "backpack",
      type: "Gear",
      name: "旅行背包",
      value: 200,
      description: "適合攜帶大量物品。",
      quantity: 1,
      attributes: {
        effects: {
          storage: 20
        },
        durability: 100
      }
    },
    {
      id: "compass",
      type: "Gear",
      name: "指南針",
      value: 80,
      description: "能幫助你找到方向。",
      quantity: 1,
      attributes: {
        effects: {
          navigation: true
        },
        durability: null
      }
    },
    {
      id: "tent",
      type: "Gear",
      name: "帳篷",
      value: 350,
      description: "適合野外露營。",
      quantity: 1,
      attributes: {
        effects: {
          shelter: true
        },
        durability: 100
      }
    },
    {
      id: "campfireKit",
      type: "Gear",
      name: "營火組",
      value: 120,
      description: "野外生火的必備工具。",
      quantity: 1,
      attributes: {
        effects: {
          warmth: 20
        },
        durability: 50
      }
    },
  
    // 🎭 收藏品與裝飾
    {
      id: "woodenStatue",
      type: "Collectible",
      name: "木雕",
      value: 90,
      description: "手工雕刻的藝術品。",
      quantity: 1,
      attributes: {
        effects: null,
        durability: null
      }
    },
    {
      id: "handmadeBracelet",
      type: "Collectible",
      name: "手工手環",
      value: 60,
      description: "精美的手工製作飾品。",
      quantity: 1,
      attributes: {
        effects: null,
        durability: null
      }
    },
    {
      id: "pearlNecklace",
      type: "Collectible",
      name: "珍珠項鍊",
      value: 200,
      description: "用稀有珍珠製作的高級飾品。",
      quantity: 1,
      attributes: {
        effects: null,
        durability: null
      }
    }
  ];
  