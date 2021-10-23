const MATERIALS = [{
    "0": { "name": "野獸之爪", "src": "../src/material/item_101.webp" },
    "1": { "name": "鐵錠", "src": "../src/material/item_102.webp" },
    "2": { "name": "純淨水", "src": "../src/material/item_103.webp" },
    "3": { "name": "史萊姆殘液", "src": "../src/material/item_104.webp" },
    "4": { "name": "毒之粉", "src": "../src/material/item_105.webp" }
  }, {
    "0": { "name": "巨獸之爪", "src": "../src/material/item_201.webp" },
    "1": { "name": "鍛鐵錠", "src": "../src/material/item_202.webp" },
    "2": { "name": "月光水", "src": "../src/material/item_203.webp" },
    "3": { "name": "高級合劑", "src": "../src/material/item_204.webp" },
    "4": { "name": "星之粉", "src": "../src/material/item_205.webp" }
  }, {
    "0": { "name": "惡魔之爪", "src": "../src/material/item_301.webp" },
    "1": { "name": "純源鋼錠", "src": "../src/material/item_302.webp" },
    "2": { "name": "精靈露水", "src": "../src/material/item_303.webp" },
    "3": { "name": "彩虹合劑", "src": "../src/material/item_304.webp" },
    "4": { "name": "暗之粉", "src": "../src/material/item_305.webp" }
  }, {
    "5": {
      "name": "堅固之角",
      "src": "../src/material/item_401.webp",
      "exchange": [
        { "tier": 1, "type": 0, "amount": 4 },
        { "tier": 0, "type": 4, "amount": 4 }
      ]
    },
    "6": {
      "name": "銀錠",
      "src": "../src/material/item_402.webp",
      "exchange": [
        { "tier": 1, "type": 1, "amount": 4 },
        { "tier": 0, "type": 2, "amount": 4 }
      ]
    },
    "7": {
      "name": "儀式之油",
      "src": "../src/material/item_403.webp",
      "exchange": [
        { "tier": 1, "type": 2, "amount": 4 },
        { "tier": 0, "type": 3, "amount": 4 }
      ]
    },
    "8": {
      "name": "腐蝕之塵",
      "src": "../src/material/item_404.webp",
      "exchange": [
        { "tier": 1, "type": 4, "amount": 4 },
        { "tier": 0, "type": 0, "amount": 4 }
      ]
    },
    "9": {
      "name": "劇毒蛇牙",
      "src": "../src/material/item_405.webp",
      "exchange": [
        { "tier": 1, "type": 0, "amount": 4 },
        { "tier": 0, "type": 2, "amount": 4 }
      ]
    },
    "10": {
      "name": "獅鷲之喙",
      "src": "../src/material/item_406.webp",
      "exchange": [
        { "tier": 1, "type": 1, "amount": 4 },
        { "tier": 0, "type": 4, "amount": 4 }
      ]
    },
    "11": {
      "name": "熊皮",
      "src": "../src/material/item_407.webp",
      "exchange": [
        { "tier": 1, "type": 3, "amount": 4 },
        { "tier": 0, "type": 1, "amount": 4 }
      ]
    },
    "12": {
      "name": "邪語之書",
      "src": "../src/material/item_408.webp",
      "exchange": [
        { "tier": 1, "type": 4, "amount": 4 },
        { "tier": 0, "type": 0, "amount": 4 }
      ]
    },
    "13": {
      "name": "精緻尾羽",
      "src": "../src/material/item_409.webp",
      "exchange": [
        { "tier": 1, "type": 3, "amount": 4 },
        { "tier": 0, "type": 3, "amount": 4 }
      ]
    },
    "14": {
      "name": "蟲巢之絲",
      "src": "../src/material/item_410.webp",
      "exchange": [
        { "tier": 1, "type": 2, "amount": 4 },
        { "tier": 0, "type": 1, "amount": 4 }
      ]
    }
  }, {
    "5": {
      "name": "狂牛之角",
      "src": "../src/material/item_501.webp",
      "exchange": [
        { "tier": 1, "type": 0, "amount": 8 },
        { "tier": 1, "type": 4, "amount": 3 },
        { "tier": 0, "type": 4, "amount": 8 }
      ]
    },
    "6": {
      "name": "聖銀錠",
      "src": "../src/material/item_502.webp",
      "exchange": [
        { "tier": 1, "type": 1, "amount": 8 },
        { "tier": 1, "type": 3, "amount": 3 },
        { "tier": 0, "type": 2, "amount": 8 }
      ]
    },
    "7": {
      "name": "聖油",
      "src": "../src/material/item_503.webp",
      "exchange": [
        { "tier": 1, "type": 2, "amount": 8 },
        { "tier": 1, "type": 4, "amount": 3 },
        { "tier": 0, "type": 3, "amount": 8 }
      ]
    },
    "8": {
      "name": "暗龍結晶",
      "src": "../src/material/item_504.webp",
      "exchange": [
        { "tier": 1, "type": 4, "amount": 8 },
        { "tier": 1, "type": 2, "amount": 3 },
        { "tier": 0, "type": 0, "amount": 8 }
      ]
    },
    "9": {
      "name": "邪龍毒牙",
      "src": "../src/material/item_505.webp",
      "exchange": [
        { "tier": 1, "type": 0, "amount": 8 },
        { "tier": 1, "type": 3, "amount": 3 },
        { "tier": 0, "type": 2, "amount": 8 }
      ]
    },
    "10": {
      "name": "聖鷲之喙",
      "src": "../src/material/item_506.webp",
      "exchange": [
        { "tier": 1, "type": 1, "amount": 8 },
        { "tier": 1, "type": 0, "amount": 3 },
        { "tier": 0, "type": 4, "amount": 8 }
      ]
    },
    "11": {
      "name": "巨鹿毛皮",
      "src": "../src/material/item_507.webp",
      "exchange": [
        { "tier": 1, "type": 3, "amount": 8 },
        { "tier": 1, "type": 0, "amount": 3 },
        { "tier": 0, "type": 1, "amount": 8 }
      ]
    },
    "12": {
      "name": "墮天之書",
      "src": "../src/material/item_508.webp",
      "exchange": [
        { "tier": 1, "type": 4, "amount": 8 },
        { "tier": 1, "type": 1, "amount": 3 },
        { "tier": 0, "type": 0, "amount": 8 }
      ]
    },
    "13": {
      "name": "女妖尾羽",
      "src": "../src/material/item_509.webp",
      "exchange": [
        { "tier": 1, "type": 3, "amount": 8 },
        { "tier": 1, "type": 2, "amount": 3 },
        { "tier": 0, "type": 3, "amount": 8 }
      ]
    },
    "14": {
      "name": "蛛后之絲",
      "src": "../src/material/item_510.webp",
      "exchange": [
        { "tier": 1, "type": 2, "amount": 8 },
        { "tier": 1, "type": 1, "amount": 3 },
        { "tier": 0, "type": 1, "amount": 8 }
      ]
    }
  }, {
    "998": { "name": "技之碎片", "src": "../src/material/item_901.webp" },
    "999": { "name": "技之原石", "src": "../src/material/item_902.webp" }
  }
]