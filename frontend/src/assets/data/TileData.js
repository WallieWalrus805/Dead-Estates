export const tileLegend = {
    ".": "void",
    "g": "grass",
    "w": "water",
    "b": "boulder",
    "t": "tree",
    "s": "snow",
    "n": "sand",
    "p": "palm",
    "i": "ice"
}

export const tileColors = {
    "void": "#000000",
    "grass": "#128f12",
    "boulder": "#827f7f",
    "water": "#2185db",
    "tree": "#24d424",
    "snow": "#d9f9ff",
    "sand": "#ffd894",
    "palm": "#86ff39",
    "ice": "#82cdff",
}

export const buildingToTime = {
    "deposit": 2400000,
    "lumber": 3600000,
    "quarry": 7200000,
    "mill": 9600000,
    "mine": 14400000
}

export const buildingToPrice = {
    "deposit": 50,
    "lumber": 100,
    "quarry": 200,
    "mill": 500,
    "mine": 1000,
}

export const partsToPrice = {
    "plank": {
        "wood": 4
    },
    "board": {
        "clay": 3,
        "wood": 10
    },
    "pillar": {
        "wood": 10,
        "stone": 5
    },
    "brick": {
        "clay": 8,
        "stone": 2
    },
    "tile": {
        "clay": 6,
        "stone": 6
    },
    "nail": {
        "steel": 1
    },
    "beam": {
        "steel": 4
    },
}

export const buildingXpToLevel = {
    0: 0,
    50: 1,
    250: 2,
    1250: 3,
    6250: 4
}

export const baseBuildingStats = {
    "deposit": 5,
    "lumber": 4,
    "quarry": 3,
    "mill": 2,
    "mine": 1
}