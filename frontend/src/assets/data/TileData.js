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

// 3 templates: Forest, Beach, Snowfield
// Forest has grass, water, boulders, trees
// Beach has grass, water, sand, palm trees, boulders
// Snowfield has boulders, snow, trees

export const tileTemplates = [
`ggggggggggggggg
gbgggtggtgggggg
ggnngggggggtggg
gnwwnggggbggggg
gnwwnggtggggggg
gnwwngggggtggtg
ggnwwnggggggggg
gggnnggtgggggww
gtggbgggggggtww
gggggggggtgwwww
gggggtgwwwwwwwg
ggtgwwwwwwwwggb
gggwwgggggggggg
ggwwggggggggtgg
wwwggtgggbggggg`,
`gggggggg
ggddddgg
ggddddgg
ggddddgg
ggddddgg
ggddddgg
ggddddgg
gggggggg`,
`gggggggg
ggddddgg
ggddddgg
ggddddgg
ggddddgg
ggddddgg
ggddddgg
gggggggg`
]
//ggggggggggggggg\ngbgggtggtgggggg\nggnngggggggtggg\ngnwwnggggbggggg\ngnwwnggtggggggg\ngnwwngggggtggtg\nggnwwnggggggggg\ngggnnggtgggggww\ngtggbgggggggtww\ngggggggggtgwwww\ngggggtgwwwwwwwg\nggtgwwwwwwwwggb\ngggwwgggggggggg\nggwwggggggggtgg\nwwwggtgggbggggg