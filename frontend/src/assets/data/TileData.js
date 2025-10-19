export const tileLegend = {
    "v": "void",
    "g": "grass",
    "w": "water",
    "b": "boulder",
    "t": "tree",
    "s": "snow",
    "n": "sand",
    "p": "palm",
    "i": "ice"
}

export const tileImages = {
    "void": "null",
    "grass": "/b.png",
    "boulder": "/b.png",
    "water": "/b.png",
    "tree": "/b.png",
    "snow": "/b.png",
    "sand": "/b.png",
    "palm": "/b.png",
    "ice": "/b.png",
}

export const buildingToTime = {
    "Clay": 2400000,
    "Wood": 3600000,
    "Stone": 7200000,
    "Steel": 9600000,
    "Gold": 14400000
}

export const buildingToPrice = {
    "Clay": 50,
    "Wood": 100,
    "Stone": 200,
    "Steel": 500,
    "Gold": 1000,
}

export const buildingXpToLevel = {
    0: 0,
    50: 1,
    250: 2,
    1250: 3,
    6250: 4
}

export const baseBuildingStats = {
    "Clay": 5,
    "Wood": 4,
    "Stone": 3,
    "Steel": 2,
    "Gold": 1
}

// Process times: Clay 1h, Wood 1.5h, Stone 2.5h, Steel 4h, Gold 6h
export const plotsToData = {
    "Urn": {
        "Clay": 5,
        "Wood": 0,
        "Stone": 0,
        "Steel": 0,
        "Gold": 0
    },
    "Coffin": {
        "Clay": 0,
        "Wood": 5,
        "Stone": 0,
        "Steel": 0,
        "Gold": 0
    },
    "Mausoleum": {
        "Clay": 0,
        "Wood": 0,
        "Stone": 5,
        "Steel": 0,
        "Gold": 0
    },
}
