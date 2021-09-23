const {Lexer, SyntaxKind} = require('./lexer')
const types = require('./ast')

/*
精简的产生式

Program :
    Body

Body :
    LexicalDeclaration
    LexicalDeclaration Body

LexicalDeclaration :
    LetOrConst BindingList

LetOrConst :
    let
    const

BindingList :
    LexicalBinding
    BindingList, LexicalBinding

LexicalBinding :
    Identifier
    Identifier Initializer

Initializer :
    = Literal

Literal:
    NullLiteral
    BooleanLiteral
    NumericLiteral
    StringLiteral
*/

class Parser {
    constructor(text) {
        // 创建词法分析器
        this.lexer = new Lexer(text)

        // 扫描第一个符号
        this.lexer.scan()
        this.currentToken = this.lexer.getToken()
    }

    nextToken() {
        return this.currentToken = this.lexer.scan()
    }

    /*
        Program :
            Body
    */
    parse() {
        return new types.Program(this.parseBody())
    }

    /*
        Body :
            LexicalDeclaration
            LexicalDeclaration Body
    */
    parseBody() {
        const bodys = []
        while (this.currentToken !== SyntaxKind.EndOfFileToken) {
            bodys.push(this.parseLexicalDeclaration())
        }
        return bodys
    }

    /*
        LexicalDeclaration :
            LetOrConst BindingList
    */
    parseLexicalDeclaration() {
        const kind = this.currentToken === SyntaxKind.ConstKeyword ? 'const' : 'let'
        this.nextToken()
        const bindings = this.parseBindingList()
        this.parseOptionalSemicolon()
        return new types.VariableDeclaration(kind, bindings)
    }

    /*
        BindingList :
            LexicalBinding
            BindingList, LexicalBinding
    */
    parseBindingList() {
        const bindings = []
        do {
            bindings.push(this.parseLexicalBinding())
        } while (this.currentToken === SyntaxKind.CommaToken)

        return bindings
    }

    /*
        LexicalBinding :
            Identifier
            Identifier Initializer
    */
    parseLexicalBinding() {
        if (this.currentToken === SyntaxKind.Identifier) {
            const id = new types.Identifier(this.lexer.getTokenValue())

            this.nextToken()
            const init = this.parseOptionalInitializer()
            return new types.LexicalBinding(id, init)
        } else {
            throw new Error('Syntax error')
        }
    }

    parseOptionalInitializer() {
        if (this.currentToken === SyntaxKind.EqualsToken) {
            this.nextToken()
            return this.parseLiteral()
        }
        return null
    }

    /*
        Literal:
            NullLiteral
            BooleanLiteral
            NumericLiteral
            StringLiteral
    */
    parseLiteral() {
        if (this.currentToken === SyntaxKind.StringLiteral) {
            const literal = new types.StringLiteral(this.lexer.getTokenValue())
            this.nextToken()
            return literal
        } else if (this.currentToken === SyntaxKind.NumericLiteral) {
            const literal = new types.NumberLiteral(this.lexer.getTokenValue())
            this.nextToken()
            return literal
        } else {
            throw new Error('Syntax error')
        }
    }

    parseOptionalSemicolon() {
        if (this.currentToken === SyntaxKind.SemicolonToken) {
            this.nextToken()
        }
    }
}

module.exports = Parser
