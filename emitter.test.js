const Parser = require('./parser')
const Emitter = require('./emitter')

const parser = new Parser(`
    const str = 'hello, world';
    let foo = 123;
`)
const ast = parser.parse()

const emitter = new Emitter(ast)
console.log(emitter.emit())
