const types = require('./ast')

function traverse(ast, visitor) {
    if (ast instanceof types.Program) {
        visitor?.Program?.(ast)
        ast.body.forEach(node => {
            traverse(node, visitor)
        })
    } else if (ast instanceof types.VariableDeclaration) {
        visitor?.VariableDeclaration?.(ast)
        ast.bindings.forEach(node => {
            traverse(node, visitor)
        })
    } else if (ast instanceof types.LexicalBinding) {
        visitor?.LexicalBinding?.(ast)
        traverse(ast.id, visitor)
        traverse(ast.init, visitor)
    } else if (ast instanceof types.Identifier) {
        visitor?.Identifier?.(ast)
    } else if (ast instanceof types.NumberLiteral) {
        visitor?.NumberLiteral?.(ast)
    } else if (ast instanceof types.StringLiteral) {
        visitor?.StringLiteral?.(ast)
    }
}

module.exports = traverse
