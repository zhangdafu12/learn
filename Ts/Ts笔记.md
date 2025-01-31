<!--
 * @Author: your name
 * @Date: 2021-01-12 17:18:39
 * @LastEditTime: 2021-01-18 16:06:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\Ts笔记.md
-->

# tsconfig.json

    {
        "compilerOptions": {

            /* 基本选项 */
            "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
            "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
            "lib": [],                             // 指定要包含在编译中的库文件
            "allowJs": true,                       // 允许编译 javascript 文件
            "checkJs": true,                       // 报告 javascript 文件中的错误
            "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
            "declaration": true,                   // 生成相应的 '.d.ts' 文件
            "sourceMap": true,                     // 生成相应的 '.map' 文件
            "outFile": "./",                       // 将输出文件合并为一个文件
            "outDir": "./",                        // 指定输出目录
            "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
            "removeComments": true,                // 删除编译后的所有的注释
            "noEmit": true,                        // 不生成输出文件
            "importHelpers": true,                 // 从 tslib 导入辅助工具函数
            "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

            /* 严格的类型检查选项 */
            "strict": true,                        // 启用所有严格类型检查选项
            "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
            "strictNullChecks": true,              // 启用严格的 null 检查
            "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
            "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

            /* 额外的检查 */
            "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
            "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
            "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
            "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

            /* 模块解析选项 */
            "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
            "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
            "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
            "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
            "typeRoots": [],                       // 包含类型声明的文件列表
            "types": [],                           // 需要包含的类型声明文件名列表
            "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

            /* Source Map Options */
            "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
            "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
            "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
            "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

            /* 其他选项 */
            "experimentalDecorators": true,        // 启用装饰器
            "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
        }
    }


#  TypeScript 编译

好的 IDE 支持对 TypeScript 的即时编译。但是，如果你想在使用 tsconfig.json 时从命令行手动运行 TypeScript 编译器，你可以通过以下方式：

* 运行 tsc，它会在当前目录或者是父级目录寻找 tsconfig.json 文件。
* 运行 tsc -p ./path-to-project-directory 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。
* 你甚至可以使用 tsc -w 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译



# 指定文件
## 你也可以显式指定需要编译的文件：

    {
        "files": [
            "./some/file.ts"
        ]
    }

## 你还可以使用 include 和 exclude 选项来指定需要包含的文件和排除的文件：

    {
        "include": [
            "./folder"
        ],
        "exclude": [
            "./folder/**/*.spec.ts",
            "./folder/someSubFolder"
        ]
    }
   ## 注意

  使用 globs：**/* （一个示例用法：some/folder/**/*）意味着匹配所有的文件夹和所有文件（扩展名为 .ts/.tsx，当开启了 allowJs: true 选项时，扩展名可以是 .js/.jsx）。

  # 声明空间:分为声明类型和声明变量，除了class定义的值除外，其他的两者不能相互赋值

  ## 在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。

  # 类型声明空间


类型声明空间包含用来当做类型注解的内容


    class Foo {}//可以当做变量
    interface Bar {}//不能当做变量
    type Bas = {};//不能当做变量
    
你可以将 Foo, Bar, Bas 作为类型注解使用，示例如下：

    let foo: Foo;
    let bar: Bar;
    let bas: Bas;

注意，尽管你定义了 interface Bar，却并不能够把它作为一个变量来使用，因为它没有定义在变量声明空间中。

    interface Bar {}
    const bar = Bar; // Error: "cannot find name 'Bar'"

出现错误提示提示： cannot find name 'Bar' 的原因是名称 Bar 并未定义在变量声明空间。

# 变量声明空间

变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间，如下所示：

class Foo {}
const someVar = Foo;
const someOtherVar = 123;

与此相似，一些用 var 声明的变量，也只能在变量声明空间使用，不能用作类型注解。

    const foo = 123;
    let bar: foo; // ERROR: "cannot find name 'foo'"

提示 ERROR: "cannot find name 'foo'" 原因是，名称 foo 没有定义在类型声明空间里。



# 模块

## 全局模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码。

    const foo = 123;

如果你在相同的项目里创建了一个新的文件 bar.ts，TypeScript 类型系统将会允许你使用变量 foo，就好像它在全局可用一样：

    const bar = foo; // allowed

毋庸置疑，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块

# 文件模块


文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域。因此，我们需要把上文 foo.ts 改成如下方式（注意 export 用法）：

    export const foo = 123;

在全局命名空间里，我们不再有 foo，这可以通过创建一个新文件 bar.ts 来证明：

    const bar = foo; // ERROR: "cannot find name 'foo'"

如果你想在 bar.ts 里使用来自 foo.ts 的内容，你必须显式地导入它，更新后的 bar.ts 如下所示。

    import { foo } from './foo';
    const bar = foo; // allow

在 bar.ts 文件里使用 import 时，它不仅允许你使用从其他文件导入的内容，还会将此文件 bar.ts 标记为一个模块，文件内定义的声明也不会“污染”全局命名空间

# 文件模块详情

使用 module: commonjs 选项以及使用 ES 模块语法导入、导出、编写模块

# 模块路径

如果你需要使用 moduleResolution: node 选项，你应该将此选项放入你的配置文件中。如果你使用了 module: commonjs 选项， moduleResolution: node 将会默认开启。

这里存在两种截然不同的模块：

* 相对模块路径（路径以 . 开头，例如：./someFile 或者 ../../someFolder/someFile 等）；
* 其他动态查找模块（如：core-js，typestyle，react 或者甚至是 react/core 等）。

## 它们的主要区别在于系统如何解析模块。


    我将会使用一个概念性术语，place -- 将在提及查找模式后解释它。


# 相对模块路径：就是简单的相对路径；

    import * as foo from './foo'
    import * as foo from '../foo'
    import * as foo from '../someFolder/foo'

# 动态查找：当导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略，
* 当你使用 import * as foo from 'foo'，将会按如下顺序查找模块：
  
   * ./node_modules/foo 
   * ../node_modules/foo
   * ../../node_modules/foo
   * 直到系统的根目录

* 当你使用 import * as foo from 'something/foo'，将会按照如下顺序查找内容
  
   * ./node_modules/something/foo
   * ../node_modules/something/foo
   * ../../node_modules/something/foo
   * 直到系统的根目录

# 什么是 place
当我提及被检查的 place 时，我想表达的是在这个 place 上，TypeScript 将会检查以下内容（例如一个 foo 的 place）：

* 如果这个 place 表示一个文件，如：foo.ts，欢呼！
* 否则，如果这个 place 是一个文件夹，并且存在一个文件 foo/index.ts，欢呼！
* 否则，如果这个 place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在，那么就欢呼！
* 否则，如果这个 place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在，那么就欢呼！
* 从文件类型上来说，我实际上是指 .ts， .d.ts 或者 .js

从文件类型上来说，我实际上是指 .ts， .d.ts 或者 .js


# 重写类型的动态查找


在你的项目里，你可以通过 declare module 'somePath' 声明一个全局模块的方式，来解决查找模块路径的问题。

    // global.d.ts
    declare module 'foo' {
    // some variable declarations
    export var bar: number;
    }

接着 ：

    // anyOtherTsFileInYourProject.ts
    import * as foo from 'foo';
    // TypeScript 将假设（在没有做其他查找的情况下）
    // foo 是 { bar: number }


# import/require 仅仅是导入类型


以下导入语法：

    import foo = require('foo');

它实际上只做了两件事：

1.导入 foo 模块的所有类型信息；
2.确定 foo 模块运行时的依赖关系。


# global.d.ts 文件

global.d.ts 文件，用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用

tips：对于任何需要编译成 JavaScript 的代码，我们强烈建议你放入文件模块里。

* global.d.ts 是一种扩充 lib.d.ts 很好的方式，如果你需要的话。
* 当你从 JS 迁移到 TS 时，定义 declare module "some-library-you-dont-care-to-get-defs-for" 能让你快速开始


# 命名空间

在确保创建的变量不会泄漏至全局命名空间时，这种方式在 JavaScript 中很常见。当基于文件模块使用时，你无须担心这点，但是该模式仍然适用于一组函数的逻辑分组。因此 TypeScript 提供了 namespace 关键字来描述这种分组，如下所示。

    namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.log(msg);
    }
    }

    // usage
    Utility.log('Call me');
    Utility.error('maybe');

namespace 关键字编译后的 JavaScript 代码，与我们早些时候看到的 JavaScript 代码一样。

    (function (Utility) {
    // 添加属性至 Utility
    })(Utility || Utility = {});


 #   动态导入表达式
 
动态导入表达式是 ECMAScript 的一个新功能，它允许你在程序的任意位置异步加载一个模块，TC39 JavaScript 委员会有一个提案，目前处于第四阶段，它被称为 import() proposal for JavaScript。

此外，webpack bundler 有一个 Code Splitting 功能，它能允许你将代码拆分为许多块，这些块在将来可被异步下载。因此，你可以在程序中首先提供一个最小的程序启动包，并在将来异步加载其他模块。

这很自然就会让人想到（如果我们工作在 webpack dev 的工作流程中）TypeScript 2.4 dynamic import expressions 将会把你最终生成的 JavaScript 代码自动分割成很多块。但是这似乎并不容易实现，因为它依赖于我们正在使用的 tsconfig.json 配置文件。

webpack 实现代码分割的方式有两种：使用 import() （首选，ECMAScript 的提案）和 require.ensure() （最后考虑，webpack 具体实现）。因此，我们期望 TypeScript 的输出是保留 import() 语句，而不是将其转化为其他任何代码。

让我们来看一个例子，在这个例子中，我们演示了如何配置 webpack 和 TypeScript 2.4 +。

在下面的代码中，我希望懒加载 moment 库，同时我也希望使用代码分割的功能，这意味 moment 会被分割到一个单独的 JavaScript 文件，当它被使用时，会被异步加载。

        import(/* webpackChunkName: "momentjs" */ 'moment')
            .then(moment => {
                // 懒加载的模块拥有所有的类型，并且能够按期工作
                // 类型检查会工作，代码引用也会工作  :100:
                const time = moment().format();
                console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
                console.log(time);
            })
            .catch(err => {
                console.log('Failed to load moment', err);
            });

 这是 tsconfig.json 的配置文件：

            {
                "compilerOptions": {
                    "target": "es5",
                    "module": "esnext",
                    "lib": [
                    "dom",
                    "es5",
                    "scripthost",
                    "es2015.promise"
                    ],
                    "jsx": "react",
                    "declaration": false,
                    "sourceMap": true,
                    "outDir": "./dist/js",
                    "strict": true,
                    "moduleResolution": "node",
                    "typeRoots": [
                    "./node_modules/@types"
                    ],
                    "types": [
                    "node",
                    "react",
                    "react-dom"
                    ]
                }
            }

##重要的提示

使用 "module": "esnext" 选项：TypeScript 保留 import() 语句，该语句用于 Webpack Code Splitting。


# TypeScript 类型系统


# 基本注解

如前文所提及，类型注解使用 :TypeAnnotation 语法。在类型声明空间中可用的任何内容都可以用作类型注解。

在下面这个例子中，使用了变量、函数参数以及函数返回值的类型注解：

    const num: number = 123;
    function identity(num: number): number {
    return num;
    }
    
# 原始类型

JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 string、number、boolean 也可以被用作类型注解：

    let num: number;
    let str: string;
    let bool: boolean;

    num = 123;
    num = 123.456;
    num = '123'; // Error

    str = '123';
    str = 123; // Error

    bool = true;
    bool = false;
    bool = 'false'; // Error
    
# 数组
TypeScript 为数组提供了专用的类型语法，因此你可以很轻易的注解数组。它使用后缀 []， 接着你可以根据需要补充任何有效的类型注解（如：:boolean[]）。它能让你安全的使用任何有关数组的操作，而且它也能防止一些类似于赋值错误类型给成员的行为。如下所示：

    let boolArray: boolean[];

    boolArray = [true, false];
    console.log(boolArray[0]); // true
    console.log(boolArray.length); // 2

    boolArray[1] = true;
    boolArray = [false, false];

    boolArray[0] = 'false'; // Error
    boolArray = 'false'; // Error
    boolArray = [true, 'false']; // Error

# 接口:接口是 TypeScript 的一个核心知识，它能合并众多类型声明至一个类型声明：

    interface Name {
    first: string;
    second: string;
    }

    let name: Name;
    name = {
    first: 'John',
    second: 'Doe'
    };

# 内联类型注解: 与创建一个接口不同，你可以使用内联注解语法注解任何内容：:{ /*Structure*/ }

    let name: {
    first: string;
    second: string;
    };

    name = {
    first: 'John',
    second: 'Doe'
    };

# 特殊类型
除了被提到的一些原始类型，在 TypeScript 中，还存在一些特殊的类型，它们是 any、 null、 undefined 以及 void。


# any：所有类型都能被赋值给它，它也能被赋值给其他任何类型

# unknown 类型：
// unknown 类型也被认为是 top type ，但它更安全。
// 与 any 一样，所有类型都可以分配给unknown。

let uncertain: unknown = 'Hello'!;
uncertain = 12;
uncertain = { hello: () => 'Hello!' };

// 我们只能将 unknown 类型的变量赋值给 any 和 unknown。
let notSure: any = uncertain;


# null 和 undefined
在类型系统中，JavaScript 中的 null 和 undefined 字面量和其他被标注了 any 类型的变量一样，都能被赋值给任意类型的变量，如下例子所示：

    // strictNullChecks: false

    let num: number;
    let str: string;

    // 这些类型能被赋予
    num = null;
    str = undefined;

# void：使用 :void 来表示一个函数没有一个返回值


# 枚举enum

    enum Tristate {
    False,
    True,
    Unknown
    }

其被编译成 JavaScript 后如下所示：

    var Tristate;
    (function(Tristate) {
    Tristate[(Tristate['False'] = 0)] = 'False';
    Tristate[(Tristate['True'] = 1)] = 'True';
    Tristate[(Tristate['Unknown'] = 2)] = 'Unknown';
    })(Tristate || (Tristate = {}));

    console.log(Tristate['False'] = 0)// ==> 0

注意，JavaScript 赋值运算符返回的值是被赋予的值（在此例子中是 0），因此下一次 JavaScript 运行时执行的代码是 Tristate[0] = 'False'。
所以会得出：

    Tristate[0]='False';
    Tristate['False'] = 0

# 函数

## 参数注解
你可以注解函数参数，就像你可以注解其他变量一样:

    // variable annotation
    let sampleVariable: { bar: number };

    // function parameter annotation
    function foo(sampleParameter: { bar: number }) {}

 ##  重载  

只需多次声明函数头。最后一个函数头是在函数体内实际处于活动状态但不可用于外部。

        // 重载
        function padding(all: number);
        function padding(topAndBottom: number, leftAndRight: number);
        function padding(top: number, right: number, bottom: number, left: number);
        function padding(a: number, b?: number, c?: number, d?: number) {
            if (b === undefined && c === undefined && d === undefined) {
                b = c = d = a;
            } else if (c === undefined && d === undefined) {
                c = a;
                d = b;
            }
            return {
                top: a,
                right: b,
                bottom: c,
                left: d
            };
        }
 这里前三个函数头可有效调用 padding:

        padding(1); // Okay: all
        padding(1, 1); // Okay: topAndBottom, leftAndRight
        padding(1, 1, 1, 1); // Okay: top, right, bottom, left
        //-
        padding(1, 1, 1); // Error: Not a part of the available overloads

# 函数声明的时候重载

在没有提供函数实现的情况下，有两种声明函数类型的方式:

    type LongHand = {
    (a: number): number;
    };

    type ShortHand = (a: number) => number;
    
上面代码中的两个例子完全相同。但是，当你想使用函数重载时，只能用第一种方式:

    type LongHandAllowsOverloadDeclarations = {
        (a: number): number;
        (a: string): string;
    };


## 一个实际的例子
当然，像这样一个可被调用的类型注解，你也可以根据实际来传递任何参数、可选参数以及 rest 参数，这有一个稍微复杂的例子：

    interface Complex {
    (foo: string, bar?: number, ...others: boolean[]): number;
    }
    一个接口可提供多种调用签名，用以特殊的函数重载：

    interface Overloaded {
    (foo: string): string;
    (foo: number): number;
    }

    // 实现接口的一个例子：
    function stringOrNumber(foo: number): number;
    function stringOrNumber(foo: string): string;
    function stringOrNumber(foo: any): any {
        if (typeof foo === 'number') {
            return foo * foo;
        } else if (typeof foo === 'string') {
            return `hello ${foo}`;
        }
    }

    const overloaded: Overloaded = stringOrNumber;

    // 使用
    const str = overloaded(''); // str 被推断为 'string'
    const num = overloaded(123); // num 被推断为 'number'


    这也可以用于内联注解中：

    let overloaded: {
        (foo: string): string;
        (foo: number): number;
    };

# 箭头函数：

        let jiantou=(val:number)=>val.toString();

        // 编译: var jiantou = function (val) { return val.toString(); };



        const simple: (foo: number) => string = foo => foo.toString();

        //编译: var simple = function (foo) { return foo.toString(); };

解释：simple: 后面到 =foo 之前的 (foo: number) => string 这部分是对simple的类型注释；
相当于

    type sm=(foo: number) => string;

    const simple2:sm  = foo => foo.toString();

    //编译: var simple2 = function (foo) { return foo.toString(); };


# 可实例化

可实例化仅仅是可调用的一种特殊情况，它使用 new 作为前缀。它意味着你需要使用 new 关键字去调用它：

    interface CallMeWithNewToGetString {
        new (): string;
    }

    // 使用
    declare const Foo: CallMeWithNewToGetString;
    const bar = new Foo(); // bar 被推断为 string 类型


# readonly

TypeScript 类型系统允许你在一个接口里使用 readonly 来标记属性。它能让你以一种更安全的方式工作（不可预期的改变是很糟糕的）：

        function foo(config: { readonly bar: number, readonly bas: number }) {
        // ..
        }

        const config = { bar: 123, bas: 123 };
        foo(config);

        // 现在你能够确保 'config' 不能够被改变了

当然，你也可以在 interface 和 type 里使用 readonly：

        type Foo = {
            readonly bar: number;
            readonly bas: number;
        };

        // 初始化
        const foo: Foo = { bar: 123, bas: 456 };

        // 不能被改变
        foo.bar = 456; // Error: foo.bar 为仅读属性

你也能指定一个类的属性为只读，然后在声明时或者构造函数中初始化它们，如下所示：

        class Foo {
            readonly bar = 1; // OK
            readonly baz: string;
            constructor() {
                this.baz = 'hello'; // OK
            }
        }
# Readonly

这有一个 Readonly 的映射类型，它接收一个泛型 T，用来把它的所有属性标记为只读类型：

        type Foo = {
            bar: number;
            bas: number;
        };

        type FooReadonly = Readonly<Foo>;

        const foo: Foo = { bar: 123, bas: 456 };
        const fooReadonly: FooReadonly = { bar: 123, bas: 456 };

        foo.bar = 456; // ok
        fooReadonly.bar = 456; // Error: bar 属性只读

# 绝对的不可变
你甚至可以把索引签名标记为只读：

        interface Foo {
            readonly [x: number]: number;
        }

        // 使用

        const foo: Foo = { 0: 123, 2: 345 };
        console.log(foo[0]); // ok（读取）
        foo[0] = 456; // Error: 属性只读

如果你想以不变的方式使用原生 JavaScript 数组，可以使用 TypeScript 提供的 ReadonlyArray<T> 接口：

        let foo: ReadonlyArray<number> = [1, 2, 3];
        console.log(foo[0]); // ok
        foo.push(4); // Error: ReadonlyArray 上不存在 `push`，因为他会改变数组
        foo = foo.concat(4); // ok, 创建了一个复制

readonly 能确保“我”不能修改属性，但是当你把这个属性交给其他并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变它。当然，如果 iMutateFoo 明确的表示，他们的参数不可修改，那么编译器会发出错误警告：

        interface Foo {
            readonly bar: number;
        }

        let foo: Foo = {
            bar: 123
        };

        function iTakeFoo(foo: Foo) {
            foo.bar = 456; // Error: bar 属性只读
        }

        iTakeFoo(foo);