const DfaState = {
    Initial: 'initial',
    ID: 'id'
}
const TokenType = {
    Identifier:'Identifier',
    IntLiteral: 'intLiteral',
    GT: 'gt',

}

function isAlpha(char) {
    return char.match(/[a-zA-Z]/);
}

class TokenParser {
    _input;
    state;
    token;
    tokenText;
    constructor(input) {
        this._input = input
    }

    handleInitialState(char){
        if (isAlpha(char)) { //第一个字符是字母
            this.state = DfaState.id;
            this.token.type = TokenType.Identifier;
            this.tokenText += char;
        }else if(char === '>'){
            this.state = DfaState.GT;
            this.token.type = TokenType.GT;
            this.tokenText += char;
        }
    }
    getParseResult() {
        const input = this._input;
        let tokenText = '';
        let token = {};
        let result = []
        this.state = DfaState.Initial;
        for (const char of input) {
            if (isAlpha(char)) { //第一个字符是字母
                this.state = DfaState.id;
                token.type = TokenType.Identifier;
                tokenText += char;
            }else if(char === '>'){
                this.state = DfaState.GT;
                token.type = TokenType.GT;
                tokenText += char;
            }
        }
        token.value = tokenText
        result.push(token)
        return result;
    }
}

describe('简单的解析器', function () {
    it('可以识别标识符age', function () {
        // give
        const input = 'age'
        // when
        const tokenList = new TokenParser(input).getParseResult();
        // then
        expect(tokenList).toEqual([
            {
                type: "Identifier",
                value: 'age',
            }
        ])
    });
    it('可以识别大小操作符',function () {
        // give
        const input = '>='
        // when
        const tokenList = new TokenParser(input).getParseResult();
        // then
        expect(tokenList).toEqual([
            {
                type:TokenType.GT,
                value:'>='
            }
        ])
    })
});
