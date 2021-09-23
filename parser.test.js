const Parser = require('./parser')

const parser = new Parser(`
    const str = 'hello, world';
    let foo = 123;
`)
const ast = parser.parse()
console.log(JSON.stringify(ast, null, 4))
