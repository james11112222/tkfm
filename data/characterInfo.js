const CHARACTERS = {
  "100": {
    "name": "魔王 巴爾",
    "rarity": 3,
    "status": { "initATK": 920, "initHP": 3476.8 },
    "potentialType": 0
  },
  "101": {
    "name": "魔王 撒旦",
    "rarity": 3,
    "status": { "initATK": 640, "initHP": 5000 },
    "potentialType": 1
  },
  "102": {
    "name": "魔王 伊布力斯",
    "rarity": 3,
    "status": { "initATK": 1000, "initHP": 3200 },
    "potentialType": 0
  },
  "103": {
    "name": "精靈王 賽露西亞",
    "rarity": 3,
    "status": { "initATK": 880, "initHP": 3635.2 },
    "potentialType": 2
  },
  "104": {
    "name": "矮人王 蘭兒",
    "rarity": 3,
    "status": { "initATK": 849.6, "initHP": 3763.2 },
    "potentialType": 0
  },
  "105": {
    "name": "法斯公主 露露",
    "rarity": 3,
    "status": { "initATK": 899.2, "initHP": 3555.2 },
    "potentialType": 2
  },
  "106": {
    "name": "天使長 聖米勒",
    "rarity": 3,
    "status": { "initATK": 940.8, "initHP": 3395.2 },
    "potentialType": 0
  },
  "107": {
    "name": "魔人偶 KS-Ⅷ",
    "rarity": 3,
    "status": { "initATK": 944, "initHP": 3388.8 },
    "potentialType": 0
  },
  "108": {
    "name": "祭典狂歡 巴爾",
    "rarity": 3,
    "status": { "initATK": 939.2, "initHP": 3403.2 },
    "potentialType": 0
  },
  "109": {
    "name": "偶像 伊布力斯",
    "rarity": 3,
    "status": { "initATK": 726.4, "initHP": 4400 },
    "potentialType": 2
  },
  "110": {
    "name": "偶像 黑白諾艾莉",
    "rarity": 3,
    "status": { "initATK": 904, "initHP": 3539.2 },
    "potentialType": 2
  },
  "111": {
    "name": "復活兔 撒旦",
    "rarity": 3,
    "status": { "initATK": 580.8, "initHP": 5499.2 },
    "potentialType": 1
  },
  "112": {
    "name": "復生公主 千鶴",
    "rarity": 3,
    "status": { "initATK": 928, "initHP": 3448 },
    "potentialType": 0
  },
  "113": {
    "name": "夏日 靜",
    "rarity": 3,
    "status": { "initATK": 995.2, "initHP": 3544 },
    "potentialType": 0
  },
  "114": {
    "name": "夏日 露露",
    "rarity": 3,
    "status": { "initATK": 940.8, "initHP": 3748.8 },
    "potentialType": 2
  },
  "115": {
    "name": "夏日 KS-Ⅷ",
    "rarity": 3,
    "status": { "initATK": 947.2, "initHP": 3720 },
    "potentialType": 0
  },
  "116": {
    "name": "夏日 娜娜",
    "rarity": 3,
    "status": { "initATK": 1008, "initHP": 3499.2 },
    "potentialType": 0
  },
  "160": {
    "name": "食夢 阿爾蒂雅",
    "rarity": 3,
    "status": { "initATK": 675.2, "initHP": 4729.6 },
    "potentialType": 2
  },
  "117": {
    "name": "剪裁之紅 安絲蒂",
    "rarity": 3,
    "status": { "initATK": 1024, "initHP": 3441.6 },
    "potentialType": 0
  },
  "118": {
    "name": "縫紉之藍 安絲娜",
    "rarity": 3,
    "status": { "initATK": 1024, "initHP": 3441.6 },
    "potentialType": 0
  },
  "119": {
    "name": "蛇女之后 梅絲米奈雅",
    "rarity": 3,
    "status": { "initATK": 904, "initHP": 3539.2 },
    "potentialType": 2
  },
  "161": {
    "name": "千年血族 洛緹亞",
    "rarity": 3,
    "status": { "initATK": 948.8, "initHP": 3368 },
    "potentialType": 0
  },
  "120": {
    "name": "煌星 妲絲艾菲娜",
    "rarity": 3,
    "status": { "initATK": 896, "initHP": 3571.2 },
    "potentialType": 0
  },
  "162": {
    "name": "膽小紙袋狼 沃沃",
    "rarity": 3,
    "status": { "initATK": 948.8, "initHP": 3368 },
    "potentialType": 0
  },
  "163": {
    "name": "豐收聖女 菲歐菈",
    "rarity": 3,
    "status": { "initATK": 745.6 , "initHP": 4724.8 },
    "potentialType": 2
  },
  "165": {
    "name": "墮龍 凱茜菲娜",
    "rarity": 3,
    "status": { "initATK": 632 , "initHP": 5059.2 },
    "potentialType": 1
  },
  "167": {
    "name": "極樂之鬼 伊吹朱點",
    "rarity": 3,
    "status": { "initATK": 958.4 , "initHP": 3332.8 },
    "potentialType": 0
  },
  "169": {
    "name": "小惡魔 布蘭妮",
    "rarity": 3,
    "status": { "initATK": 1001.6, "initHP": 3521.6 },
    "potentialType": 0
  },
  "170": {
    "name": "機靈古怪 賽露西亞",
    "rarity": 3,
    "status": { "initATK": 1016 , "initHP": 3470.4 },
    "potentialType": 0
  },
  "172": {
    "name": "音速魅影 祈",
    "rarity": 3,
    "status": { "initATK": 907.2, "initHP": 3523.2 },
    "potentialType": 0
  },
  "173": {
    "name": "夢天堂店長 咲野夢",
    "rarity": 3,
    "status": { "initATK": 984, "initHP": 3580.8 },
    "potentialType": 0
  },
  "121": {
    "name": "魔管家 艾可",
    "rarity": 2,
    "status": { "initATK": 767.2, "initHP": 3032.4 },
    "potentialType": 2
  },
  "122": {
    "name": "聖騎士長 雷歐娜",
    "rarity": 2,
    "status": { "initATK": 546, "initHP": 4264.4 },
    "potentialType": 1
  },
  "123": {
    "name": "神官長 菲歐菈",
    "rarity": 2,
    "status": { "initATK": 750.4, "initHP": 3101 },
    "potentialType": 2
  },
  "124": {
    "name": "女忍者 凜月",
    "rarity": 2,
    "status": { "initATK": 831.6, "initHP": 2795.8 },
    "potentialType": 0
  },
  "125": {
    "name": "劍聖 神無雪",
    "rarity": 2,
    "status": { "initATK": 838.6, "initHP": 2773.4 },
    "potentialType": 0
  },
  "126": {
    "name": "妖狐 靜",
    "rarity": 2,
    "status": { "initATK": 767.2, "initHP": 3032.4 },
    "potentialType": 0
  },
  "127": {
    "name": "大將軍 朱諾安",
    "rarity": 2,
    "status": { "initATK": 777, "initHP": 2993.2 },
    "potentialType": 2
  },
  "128": {
    "name": "天才女軍師 布蘭妮",
    "rarity": 2,
    "status": { "initATK": 736.4, "initHP": 3158.4 },
    "potentialType": 2
  },
  "129": {
    "name": "史萊姆女王 娜芙菈菈",
    "rarity": 2,
    "status": { "initATK": 534.8, "initHP": 4349.8 },
    "potentialType": 1
  },
  "130": {
    "name": "魔法少女 托特拉",
    "rarity": 2,
    "status": { "initATK": 799.4, "initHP": 2909.2 },
    "potentialType": 0
  },
  "164": {
    "name": "地方媽媽 提爾絲",
    "rarity": 2,
    "status": { "initATK": 537.6 , "initHP": 4550 },
    "potentialType": 1
  },
  "166": {
    "name": "最後的銀龍 普莉希拉",
    "rarity": 2,
    "status": { "initATK": 793.8 , "initHP": 2928.8 },
    "potentialType": 0
  },
  "168": {
    "name": "刺針 嘉維爾",
    "rarity": 2,
    "status": { "initATK": 750.4 , "initHP": 3102.4 },
    "potentialType": 0
  },
  "131": {
    "name": "雙蛇軍團護士長 艾琳",
    "rarity": 1,
    "rarity": 1,
    "status": { "initATK": 684, "initHP": 2374.8 },
    "potentialType": 3
  },
  "132": {
    "name": "貓妖 娜娜",
    "rarity": 1,
    "status": { "initATK": 700.8, "initHP": 2316 },
    "potentialType": 3
  },
  "133": {
    "name": "龍女 伊維絲",
    "rarity": 1,
    "status": { "initATK": 535.2, "initHP": 3034.8 },
    "potentialType": 3
  },
  "134": {
    "name": "犬人族 朵拉",
    "rarity": 1,
    "status": { "initATK": 464.4, "initHP": 3490.8 },
    "potentialType": 3
  },
  "135": {
    "name": "魅魔 撒芭斯",
    "rarity": 1,
    "status": { "initATK": 655.2, "initHP": 2478 },
    "potentialType": 3
  },
  "136": {
    "name": "美人魚 瑪蓮",
    "rarity": 1,
    "status": { "initATK": 626.4, "initHP": 2590.8 },
    "potentialType": 3
  },
  "137": {
    "name": "流浪魔法師 尤依",
    "rarity": 1,
    "status": { "initATK": 703.2, "initHP": 2307.6 },
    "potentialType": 3
  },
  "138": {
    "name": "暗黑精靈 索拉卡",
    "rarity": 1,
    "status": { "initATK": 663.6, "initHP": 2445.6 },
    "potentialType": 3
  },
  "171": {
    "name": "南瓜仙子 帕奈奈",
    "rarity": 1,
    "status": { "initATK": 638.4, "initHP": 2544 },
    "potentialType": 3
  },
  "174": {
    "name": "人馬女僕 蘇菲",
    "rarity": 1,
    "status": { "initATK": 634.8, "initHP": 2556 },
    "potentialType": 3
  },
  "175": {
    "name": "冷豔美醫 嘉莉娜",
    "rarity": 1,
    "status": { "initATK": 628.8, "initHP": 2578.8 },
    "potentialType": 3
  },
  "139": {
    "name": "法斯帝國士兵 賽蓮",
    "rarity": 0,
    "status": { "initATK": 360, "initHP": 2812 },
    "potentialType": 3
  },
  "140": {
    "name": "法斯帝國法師 佩托拉",
    "rarity": 0,
    "status": { "initATK": 483, "initHP": 2093 },
    "potentialType": 3
  },
  "141": {
    "name": "魔族戰士 芙蕾",
    "rarity": 0,
    "status": { "initATK": 364, "initHP": 2778 },
    "potentialType": 3
  },
  "142": {
    "name": "魔族法師 瑪努艾拉",
    "rarity": 0,
    "status": { "initATK": 555, "initHP": 1821 },
    "potentialType": 3
  },
  "143": {
    "name": "烈日國武士 桔梗",
    "rarity": 0,
    "status": { "initATK": 549, "initHP": 1844 },
    "potentialType": 3
  },
  "144": {
    "name": "烈日國巫女 楓",
    "rarity": 0,
    "status": { "initATK": 368, "initHP": 2745 },
    "potentialType": 3
  },
  "145": {
    "name": "精靈射手 奧菈",
    "rarity": 0,
    "status": { "initATK": 528, "initHP": 1914 },
    "potentialType": 3
  },
  "146": {
    "name": "矮人戰士 可兒",
    "rarity": 0,
    "status": { "initATK": 495, "initHP": 2045 },
    "potentialType": 3
  },
  "147": {
    "name": "雙蛇軍團士兵 夏琳",
    "rarity": 0,
    "status": { "initATK": 365, "initHP": 2767 },
    "potentialType": 3
  },
  "148": {
    "name": "聖光騎士 瑪蒂娜",
    "rarity": 0,
    "status": { "initATK": 367, "initHP": 2756 },
    "potentialType": 3
  },
  "149": {
    "name": "主神教團僧兵 克蕾雅",
    "rarity": 0,
    "status": { "initATK": 528, "initHP": 1914 },
    "potentialType": 3
  },
  "150": {
    "name": "史萊姆娘 蘿爾",
    "rarity": 0,
    "status": { "initATK": 361, "initHP": 2801 },
    "potentialType": 3
  },
  "151": {
    "name": "牛女 米諾",
    "rarity": 0,
    "status": { "initATK": 428, "initHP": 2362 },
    "potentialType": 3
  },
  "152": {
    "name": "蛇女 拉米亞",
    "rarity": 0,
    "status": { "initATK": 495, "initHP": 2045 },
    "potentialType": 3
  },
  "153": {
    "name": "鳥身女妖 哈比",
    "rarity": 0,
    "status": { "initATK": 492, "initHP": 2054 },
    "potentialType": 3
  },
  "154": {
    "name": "法斯精銳近衛 安娜",
    "rarity": 0,
    "status": { "initATK": 375, "initHP": 2700 },
    "potentialType": 3
  },
  "155": {
    "name": "法斯精銳騎士 布蘭",
    "rarity": 0,
    "status": { "initATK": 506, "initHP": 2000 },
    "potentialType": 3
  },
  "156": {
    "name": "法斯高階法師 諾諾可",
    "rarity": 0,
    "status": { "initATK": 546, "initHP": 1851 },
    "potentialType": 3
  },
  "157": {
    "name": "懲戒天使",
    "rarity": 0,
    "status": { "initATK": 361, "initHP": 2801 },
    "potentialType": 3
  },
  "158": {
    "name": "福音天使",
    "rarity": 0,
    "status": { "initATK": 522, "initHP": 1939 },
    "potentialType": 3
  },
  "159": {
    "name": "試作機三號",
    "rarity": 0,
    "status": { "initATK": 522, "initHP": 1939 },
    "potentialType": 3
  }
}