const types = require('./ast')

class Emitter {
    constructor(node) {
        if (!(node instanceof types.Program)) {
            throw new Error('Emitter error')
        }
        this.node = node
    }

    emit() {
        return this.node.body.map(declaration => this.emitDeclaration(declaration)).join('\n')
    }

    emitDeclaration(node) {
        if (node instanceof types.VariableDeclaration) {
            return this.emitVariableDeclaration(node)
        } else {
            throw new Error('Emitter error')
        }
    }

    emitVariableDeclaration(node) {
        let output = node.kind + ' '
        output += node.bindings.map(this.emitBinding).join(', ')
        return output
    }

    emitBinding = node => {
        if (node.init) {
            return `${node.id.name} = ${this.emitInitializer(node.init)}`
        } else {
            return node.id.name
        }
    }

    emitInitializer(node) {
        if (node instanceof types.StringLiteral) {
            return `'${node.value}'`
        } else if (node instanceof types.NumberLiteral) {
            return node.value
        } else {
            throw new Error('Emitter error')
        }
    }
}

module.exports = Emitter
