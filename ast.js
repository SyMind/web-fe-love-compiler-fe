exports.Program = class Program {
    constructor(body /* VariableDeclaration[] */) {
        this.type = 'Program'
        this.body = body
    }
}

exports.VariableDeclaration = class VariableDeclaration {
    constructor(kind /* const or let */, bindings /* LexicalBinding */) {
        this.type = 'VariableDeclaration'
        this.kind = kind
        this.bindings = bindings
    }
}

exports.LexicalBinding = class LexicalBinding {
    constructor(id /* Identifier */, init /* Literal */) {
        this.type = 'LexicalBinding'
        this.id = id
        this.init = init
    }
}

exports.Identifier = class Identifier {
    constructor(name) {
        this.type = 'Identifier'
        this.name = name
    }
}

class Literal {
    constructor(value) {
        this.value = value
    }
}

exports.StringLiteral = class StringLiteral extends Literal {
    constructor(value) {
        super(value)
        this.type = 'StringLiteral'
    }
}

exports.NumberLiteral = class NumberLiteral extends Literal {
    constructor(value) {
        super(value)
        this.type = 'NumberLiteral'
    }
}
