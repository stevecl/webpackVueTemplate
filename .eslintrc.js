module.exports = {
    root: true,
    parser: 'babel-eslint', //解析器，这里我们使用babel-eslint
    parserOptions: {
        sourceType: 'module' //类型为module，因为代码使用了使用了ECMAScript模块
    },
    env: {
        browser: true, //预定义的全局变量，这里是浏览器环境
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    //extends: 'standard', //扩展，可以通过字符串或者一个数组来扩展规则
    // required to lint *.vue files
    plugins: [
        'html' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
    ],
    // add your custom rules here
    'rules': {
        //这里写自定义规则
        "indent": ["error", 4],//缩进2格
        // "indent": 2,//缩进4格
        // "no-console": 0, //不允许出现console语句
        "quotes": ["error", "single"], //引号风格
        // "no-undef": 2, //不允许未声明的变量
        "no-dupe-args": "error",//禁止在 function 定义中出现重复的参数
        "no-dupe-keys": "error", //禁止对象字面量中出现重复的 key
        "no-duplicate-case": "error",//禁止出现重复的 case 标签
        "no-empty": "error", //不允许出现空的代码块
        "no-trailing-spaces": "error", //禁用行尾空白
        // "eol-last": ["error", "always"],//要求或禁止文件末尾存在空行
        // "no-unused-vars": "error", //禁止出现未使用过的变量
        // "no-use-before-define": [2, "nofunc"], //不允许在未定义之前就使用变量
        // "newline-after-var": 0, //变量声明后必须空一行
        // "fun-call-spacing": 2, //函数调用时，函数名与()之间不能有空格
    }
}