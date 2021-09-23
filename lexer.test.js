const {Lexer, SyntaxKind} = require('./lexer')

const lexer = new Lexer(`
const str = 'hello, world';
const foo = 123;
`)

const tokens = []
while (lexer.scan() !== SyntaxKind.EndOfFileToken) {
    tokens.push({
        kind: lexer.getToken(),
        value: lexer.getTokenValue()
    })
}

console.table(tokens)
