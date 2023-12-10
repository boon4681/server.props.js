

/**
 * @param {String} input 
 * @param {{throw:boolean}} options
 */
const serialize = (input, options) => {
    const lines = input.split("\n");
    let result = new Map()
    let comments = []
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        if (line.trimStart()[0] == "#") {
            comments.push([i, line])
            continue;
        }
        let eq = -1;
        for (let j = 0; j < line.length; j++) {
            if (line[j] == '=') {
                eq = j;
                break
            }
        }
        let trimmed = line.slice(0, eq).trim();
        if (/\s/.test(trimmed)) {
            if (options.throw) throw new Error("key must not have space between at line:" + (i + 1));
        }
        if (trimmed.length) result.set(trimmed, line.slice(eq + 1).trim().length > 0 ? line.slice(eq + 1).trim() : null);
    }
    result.toString = () => {
        return deserialize(result, { comments })
    }
    return result
}

/**
 * @param {Map} input 
 * @param {{comments:[number,String][]}} options
 */
const deserialize = (input, options) => {
    let keys = Array.from(input.keys())
    let output = ""
    if (options) {
        if (!options.comments) options.comments = []
    } else {
        options = {
            comments: []
        }
    }
    for (let i = 0; i < keys.length; i++) {
        if (options.comments[0]) {
            if (options.comments[0][0] == i) {
                output += options.comments.shift()[1] + '\n'
                continue
            }
        }
        output += keys[i] + '=' + (input.get(keys[i]) ?? '')
        if (i < keys.length - 1) {
            output += '\n'
        } else if (options.comments.length > 0) {
            output += '\n'
        }
    }
    for (let i = 0; i < options.comments.length; i++) {
        output += options.comments[i][1]
        if (i < keys.length - 1) {
            output += '\n'
        }
    }
    return output
}

// console.log(serialize(require('fs').readFileSync('./server.properties').toString()).toString())

module.export = { serialize, deserialize }