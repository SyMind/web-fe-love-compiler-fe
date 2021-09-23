const traverse = require('./traverse')
const Parser = require('./parser')
const Emitter = require('./emitter')

const parser = new Parser(`
    const str = 'hello, world'
    let foo = 123
    let bar
`)
const ast = parser.parse()

traverse(ast, {
    VariableDeclaration(node) {
        node.kind = 'var'
    }
})

const emitter = new Emitter(ast)
console.log(emitter.emit())

