/**
 * Token 类型枚举
 */
 const SyntaxKind = {
    Unknown: 'Unknown',
    EndOfFileToken: 'EndOfFileToken',

    ConstKeyword: 'ConstKeyword',
    LetKeyword: 'LetKeyword',
    Identifier: 'Identifier',
    ColonToken: 'ColonToken',
    StringLiteral: 'StringLiteral',
    NumericLiteral: 'NumericLiteral',
    SemicolonToken: 'SemicolonToken',
    EqualsToken: 'EqualsToken',
    DotToken: 'DotToken',
    OpenParenToken: 'OpenParenToken',
    CloseParenToken: 'CloseParenToken'
}


/**
 * 关键字映射
 */
const textToKeyword = {
    const: SyntaxKind.ConstKeyword,
    let: SyntaxKind.LetKeyword,
}

class Lexer {
    constructor(text) {
        // 源代码
        this.text = text

        // 指针位置
        this.pos = 0

        // 当前符号类型
        this.token = SyntaxKind.Unknown

        // 当前符号值
        this.tokenValue = null
    }

    scan() {
        // while 循环表示指针不断向下读取的过程
        while (true) {

            // 原文本全部读取完毕时，输出『结束符号』
            if (this.pos >= this.text.length) {
                return this.token = SyntaxKind.EndOfFileToken
            }

            const ch = this.text[this.pos]
            switch (ch) {
                case ' ':
                case '\n':
                    this.pos++
                    continue
                case ':':
                    this.pos++
                    this.tokenValue = ':'
                    return this.token = SyntaxKind.ColonToken
                case '':
                    this.pos++
                    this.tokenValue = ''
                    return this.token = SyntaxKind.SemicolonToken
                case '=':
                    this.pos++
                    this.tokenValue = '='
                    return this.token = SyntaxKind.EqualsToken
                case '"':
                case '\'':
                    this.tokenValue = this.scanString()
                    return this.token = SyntaxKind.StringLiteral
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.tokenValue = this.scanNumericLiteral()
                    return this.token = SyntaxKind.NumericLiteral
                default:
                    return this.token = this.scanIdentifier(ch)
            }
        }
    }

    scanNumericLiteral() {
        const start = this.pos
        while (0 <= this.text[this.pos] && this.text[this.pos] <= 9) {
            this.pos++
        }
        return this.tokenValue = Number(this.text.substring(start, this.pos))
    }

    scanString() {
        const quote = this.text[this.pos]
        this.pos++
        const start = this.pos

        while (this.text[this.pos] !== quote) {
            this.pos++
        }
        this.tokenValue = this.text.substring(start, this.pos)
        this.pos++
        return this.tokenValue
    }

    scanIdentifier() {
        const start = this.pos

        while (true) {
            const ch = this.text[this.pos]
            if (!(('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch === '_')) {
                break
            }

            this.pos++
        }

        this.tokenValue = this.text.substring(start, this.pos)
        if (!this.tokenValue) {
            throw new Error('Lexer error')
        }

        // 当前的标识符是否是关键字
        const keyword = textToKeyword[this.tokenValue]
        if (keyword) {
            return keyword
        }

        return this.token = SyntaxKind.Identifier
    }

    getToken() {
        return this.token
    }

    getTokenValue() {
        return this.tokenValue
    }
}

exports.SyntaxKind = SyntaxKind

exports.Lexer = Lexer
