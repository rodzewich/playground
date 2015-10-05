/// <reference path="../../../types/node/node.d.ts" />

declare module Stylus {

    export interface Static {
        (str:string): Renderer;
        (str:string, options:RenderOptions): Renderer;
        version: string;
        nodes: NodeStatic;
        functions: Functions;
        utils: Utils;
        Visitor: typeof Visitor;
        Parser: typeof Parser;
        Evaluator: typeof Evaluator;
        Compiler: typeof Compiler;
        middleware(dir:string): Middleware;
        middleware(options:any): Middleware;
        convertCSS(css:string): string;
        render(str:string, callback:RenderCallback): void;
        render(str:string, options:RenderOptions, callback:RenderCallback): void;
        url: UrlFunction;
        resolver(options:any): LiteralFunction;
    }

    export interface NodeStatic {
        Node: typeof Nodes.Node;
        Root: typeof Nodes.Root;
        Null: typeof Nodes.Null;
        Each: typeof Nodes.Each;
        If: typeof Nodes.If;
        Call: typeof Nodes.Call;
        UnaryOp: typeof Nodes.UnaryOp;
        BinOp: typeof Nodes.BinOp;
        Ternary: typeof Nodes.Ternary;
        Block: typeof Nodes.Block;
        Unit: typeof Nodes.Unit;
        String: typeof Nodes.String;
        HSLA: typeof Nodes.HSLA;
        RGBA: typeof Nodes.RGBA;
        Ident: typeof Nodes.Ident;
        Group: typeof Nodes.Group;
        Literal: typeof Nodes.Literal;
        Boolean: typeof Nodes.Boolean;
        Return: typeof Nodes.Return;
        Media: typeof Nodes.Media;
        QueryList: typeof Nodes.QueryList;
        Query: typeof Nodes.Query;
        QueryExpr: typeof Nodes.QueryExpr;
        Params: typeof Nodes.Params;
        Comment: typeof Nodes.Comment;
        Keyframes: typeof Nodes.Keyframes;
        Member: typeof Nodes.Member;
        Charset: typeof Nodes.Charset;
        Namespace: typeof Nodes.Namespace;
        Import: typeof Nodes.Import;
        Extend: typeof Nodes.Extend;
        Object: typeof Nodes.Object;
        Function: typeof Nodes.Function;
        Property: typeof Nodes.Property;
        Selector: typeof Nodes.Selector;
        Expression: typeof Nodes.Expression;
        Arguments: typeof Nodes.Arguments;
        Atblock: typeof Nodes.Atblock;
        Atrule: typeof Nodes.Atrule;
        true: Nodes.Boolean;
        false: Nodes.Boolean;
        null: Nodes.Null;
    }

    export interface Functions {
        hsla(rgba:Nodes.RGBA): Nodes.HSLA;
        hsla(hsla:Nodes.HSLA): Nodes.HSLA;
        hsla(hue:Nodes.Unit, saturation:Nodes.Unit, lightness:Nodes.Unit, alpha:Nodes.Unit): Nodes.HSLA;
        hsl(rgba:Nodes.RGBA): Nodes.HSLA;
        hsl(hsla:Nodes.HSLA): Nodes.HSLA;
        hsl(hue:Nodes.Unit, saturation:Nodes.Unit, lightness:Nodes.Unit): Nodes.HSLA;
        type(node:Nodes.Node): string;
        typeof(node:Nodes.Node): string;
        "type-of"(node:Nodes.Node): string;
        component(color:Nodes.RGBA, name:Nodes.String): Nodes.Unit;
        component(color:Nodes.HSLA, name:Nodes.String): Nodes.Unit;
        basename(path:Nodes.String): string;
        basename(path:Nodes.String, ext:Nodes.String): string;
        dirname(path:Nodes.String): string;
        extname(path:Nodes.String): string;
        pathjoin(...paths:Nodes.String[]): string;
        red(color:Nodes.RGBA): Nodes.Unit;
        red(color:Nodes.HSLA): Nodes.Unit;
        red(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        red(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        green(color:Nodes.RGBA): Nodes.Unit;
        green(color:Nodes.HSLA): Nodes.Unit;
        green(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        green(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        blue(color:Nodes.RGBA): Nodes.Unit;
        blue(color:Nodes.HSLA): Nodes.Unit;
        blue(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        blue(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        alpha(color:Nodes.RGBA): Nodes.Unit;
        alpha(color:Nodes.HSLA): Nodes.Unit;
        alpha(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        alpha(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        hue(color:Nodes.RGBA): Nodes.Unit;
        hue(color:Nodes.HSLA): Nodes.Unit;
        hue(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        hue(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        saturation(color:Nodes.RGBA): Nodes.Unit;
        saturation(color:Nodes.HSLA): Nodes.Unit;
        saturation(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        saturation(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        lightness(color:Nodes.RGBA): Nodes.Unit;
        lightness(color:Nodes.HSLA): Nodes.Unit;
        lightness(color:Nodes.RGBA, value:Nodes.Unit): Nodes.RGBA;
        lightness(color:Nodes.HSLA, value:Nodes.Unit): Nodes.RGBA;
        rgba(rgba:Nodes.RGBA): Nodes.RGBA;
        rgba(hsla:Nodes.HSLA): Nodes.RGBA;
        rgba(hue:Nodes.Unit, saturation:Nodes.Unit, lightness:Nodes.Unit, alpha:Nodes.Unit): Nodes.RGBA;
        rgb(rgba:Nodes.RGBA): Nodes.RGBA;
        rgb(hsla:Nodes.HSLA): Nodes.RGBA;
        rgb(hue:Nodes.Unit, saturation:Nodes.Unit, lightness:Nodes.Unit, alpha:Nodes.Unit): Nodes.RGBA;
        blend(top:Nodes.RGBA): Nodes.RGBA;
        blend(top:Nodes.RGBA, bottom:Nodes.RGBA): Nodes.RGBA;
        blend(top:Nodes.RGBA, bottom:Nodes.HSLA): Nodes.RGBA;
        blend(top:Nodes.HSLA): Nodes.RGBA;
        blend(top:Nodes.HSLA, bottom:Nodes.RGBA): Nodes.RGBA;
        blend(top:Nodes.HSLA, bottom:Nodes.HSLA): Nodes.RGBA;
        luminosity(rgba:Nodes.RGBA): Nodes.Unit;
        luminosity(rgba:Nodes.HSLA): Nodes.Unit;
        contrast(top:Nodes.RGBA): Nodes.Object;
        contrast(top:Nodes.RGBA, bottom:Nodes.RGBA): Nodes.Object;
        contrast(top:Nodes.RGBA, bottom:Nodes.HSLA): Nodes.Object;
        contrast(top:Nodes.HSLA): Nodes.Object;
        contrast(top:Nodes.HSLA, bottom:Nodes.RGBA): Nodes.Object;
        contrast(top:Nodes.HSLA, bottom:Nodes.HSLA): Nodes.Object;
        transparentify(top:Nodes.RGBA): Nodes.Object;
        transparentify(top:Nodes.RGBA, bottom:Nodes.RGBA, alpha?:Nodes.Unit): Nodes.Object;
        transparentify(top:Nodes.RGBA, bottom:Nodes.HSLA, alpha?:Nodes.Unit): Nodes.Object;
        transparentify(top:Nodes.HSLA): Nodes.Object;
        transparentify(top:Nodes.HSLA, bottom:Nodes.RGBA, alpha?:Nodes.Unit): Nodes.Object;
        transparentify(top:Nodes.HSLA, bottom:Nodes.HSLA, alpha?:Nodes.Unit): Nodes.Object;
        json(path:Nodes.String, local:Nodes.Boolean, namePrefix:Nodes.String): any;
        use(plugin:Nodes.String): void;
        use(plugin:Nodes.String, options:any): void;
        unquote(str:Nodes.String): Nodes.Literal;
        convert(str:Nodes.String): Nodes.Node;
        unit(unit:Nodes.Unit, type:Nodes.String): Nodes.Unit;
        lookup(name:Nodes.String): Nodes.Node;
        define(name:Nodes.String, expr:Nodes.Expression): Nodes.Node;
        operate(op:Nodes.String, left:Nodes.Node, right:Nodes.Node): Nodes.Node;
        match(pattern:Nodes.String, val:Nodes.String): Nodes.Boolean;
        match(pattern:Nodes.String, val:Nodes.Ident): Nodes.Boolean;
        substr(val:Nodes.String, start:Nodes.Number, length:Nodes.Number): Nodes.String;
        substr(val:Nodes.Ident, start:Nodes.Number, length:Nodes.Number): Nodes.Ident;
        replace(pattern:Nodes.String, replacement:Nodes.String, val:Nodes.String): Nodes.String;
        replace(pattern:Nodes.String, replacement:Nodes.String, val:Nodes.Ident): Nodes.Ident;
        split(pattern:Nodes.String, val:Nodes.String): Nodes.Expression;
        split(pattern:Nodes.String, val:Nodes.Ident): Nodes.Expression;
        length(expr:Nodes.Expression): Nodes.Unit;
        length(...expr:Nodes.Expression[]): Nodes.Null;
        error(msg:Nodes.String): void;
        warn(msg:Nodes.String): Nodes.Null;
        trace(): Nodes.Null;
        push(expr:Nodes.Expression, ...nodes:Nodes.Node[]): Nodes.Unit;
        pop(expr:Nodes.Expression): Nodes.Node;
        unshift(expr:Nodes.Expression, ...nodes:Nodes.Node[]): Nodes.Unit;
        prepend(expr:Nodes.Expression, ...nodes:Nodes.Node[]): Nodes.Unit;
        shift(expr:Nodes.Expression): Nodes.Node;
        s(fmt:Nodes.String, ...nodes:Nodes.Node[]): Nodes.Literal;
        "base-convert"(num:Nodes.Number, base:Nodes.Number, width:Nodes.Number): Nodes.Literal;
        "opposite-position"(positions:Nodes.Expression): Nodes.Expression;
        "image-size"(img:Nodes.String, ignoreErr:Nodes.Boolean): Nodes.Expression;
        tan(angle:Nodes.Unit): Nodes.Unit;
        math(n:Nodes.Unit, fn:Nodes.String): Nodes.Unit;
        "-math-prop"(prop:Nodes.String): Nodes.Unit;
        adjust(rgba:Nodes.RGBA, prop:Nodes.String, amount:Nodes.Unit): Nodes.RGBA;
        adjust(hsla:Nodes.HSLA, prop:Nodes.String, amount:Nodes.Unit): Nodes.RGBA;
        clone(expr:Nodes.Expression): Nodes.Expression;
        "add-property"(name:Nodes.String, expr:Nodes.Expression): Nodes.Property;
        merge(dest:Nodes.Object, ...objs:Nodes.Object[]): Nodes.Object;
        extend(dest:Nodes.Object, ...objs:Nodes.Object[]): Nodes.Object;
        selector(): string;
        selector(sel:Nodes.String): string;
        "-prefix-classes"(prefix:Nodes.String, block:Nodes.Block): Nodes.Block;
        "current-media"(): Nodes.String;
        "list-separator"(list:Nodes.Expression): Nodes.String;
    }

    export interface Utils {
        absolute(path:string): boolean;
        lookup(path:string, paths:string, ignore:string, resolveURL:boolean): string;
        lookupIndex(path:string, paths:string, filename:string): string[];
        find(path:string, paths:string, ignore:string): string[];
        formatException(err:Error, options:ExceptionOptions): Error;
        assertType(node:Nodes.Node, type:string, param:string): void;
        assertString(node:Nodes.Node, param:string): void;
        assertColor(node:Nodes.Node, param:string): void;
        assertPresent(node:Nodes.Node, name:string): void;
        unwrap(expr:Nodes.Expression): Nodes.Node;
        coerce(val:any): Nodes.Node;
        coerce(val:any, raw:boolean): Nodes.Node;
        coerceArray(val:any): Nodes.Expression;
        coerceArray(val:any, raw:boolean): Nodes.Expression;
        coerceObject(obj:any): Nodes.Expression;
        coerceObject(obj:any, raw:boolean): Nodes.Expression;
        params(fn:Function): string[];
        merge(a:any, b:any): any;
        uniq(arr:any[]): any[];
        compileSelectors(arr:string[], leaveHidden:boolean): string[];
    }

    export interface UrlFunction {
        (options:UrlOptions): LiteralFunction;
        mimes: {
            ".gif": string;
            ".png": string;
            ".jpg": string;
            ".jpeg": string;
            ".svg": string;
            ".ttf": string;
            ".eot": string;
            ".woff": string;
        };
    }

    export interface Middleware {
        (req:any, res:any, next:Function): void;
    }

    export class Visitor {
    }

    export class Parser {
    }

    export class Evaluator {
    }

    export class Compiler {
    }

    export class Renderer implements NodeJS.EventEmitter {
        options:RenderOptions;
        sourcemap:string;
        str:string;
        events:any;

        constructor(str:string);
        constructor(str:string, options:RenderOptions);

        render(callback:RenderCallback):void;

        deps(filename:string):string[];

        set(key:string, val:any):Renderer;

        get(key:string):any;

        include(path:string):Renderer;

        use(fn:(renderer:Renderer) => any):Renderer;

        define(name:string, fn:Function):Renderer;
        define(name:string, node:Nodes.Node):Renderer;
        define(name:string, val:any):Renderer;
        define(name:string, fn:Function, raw:boolean):Renderer;
        define(name:string, node:Nodes.Node, raw:boolean):Renderer;
        define(name:string, val:any, raw:boolean):Renderer;

        import(file:string):Renderer;

        addListener(event:string, listener:Function):Renderer;

        on(event:string, listener:Function):Renderer;

        once(event:string, listener:Function):Renderer;

        removeListener(event:string, listener:Function):Renderer;

        removeAllListeners(event?:string):Renderer;

        setMaxListeners(n:number):void;

        listeners(event:string):Function[];

        emit(event:string, ...args:any[]):boolean;
    }

    export module Nodes {

        export class Node {
            lineno:number;
            column:number;
            filename:string;
            first:Node;
            hash:string;
            nodeName:string;

            constructor();

            clone():Node;

            toJSON():{ lineno: number; column: number; filename: string };

            eval():Node;

            toBoolean():Boolean;

            toExpression():Expression;

            shouldCoerce(op:string):boolean;

            operate(op:string, right:Node):Node;

            coerce(other:Node):Node;
        }

        export class Root extends Node {
            nodes:Node[];

            push(node:Node):void;

            unshift(node:Node):void;

            toJSON():{ nodes: Node[]; lineno: number; column: number; filename: string };
        }

        export class String extends Node {
            val:string;
            string:string;
            prefixed:boolean;
            quote:string;

            constructor(val:string);
            constructor(val:string, quote:string);

            toJSON():{ val: string; quote: string; lineno: number; column: number; filename: string };
        }

        export class Number extends Node {
        }

        export class Boolean extends Node {
            val:boolean;
            isTrue:boolean;
            isFalse:boolean;

            constructor();
            constructor(val:boolean);

            negate():Boolean;

            inspect():Boolean;

            toJSON():{ __type: string; val: boolean; lineno: number; column: number; filename: string };
        }

        export class Object extends Node {
            vals:Dictionary<Node>;
            length:number;

            constructor();

            set(key:string, value:Node):Object;

            get(key:string):Node;

            has(key:string):boolean;

            toBlock():string;

            toJSON():{ __type: string; vals: Dictionary<Node>; lineno: number; column: number; filename: string };
        }

        export class Null extends Node {
            isNull:boolean;

            constructor();

            toJSON():{ __type: string; lineno: number; column: number; filename: string };
        }

        export class Ident extends Node {
            name:string;
            string:string;
            val:Node;
            mixin:boolean;
            isEmpty:boolean;

            constructor(name:string, val:Node);
            constructor(name:string, val:Node, mixin:boolean);

            toJSON():{ __type: string; name: string; val: Node; mixin: boolean; lineno: number; column: number; filename: string };
        }

        export class Literal extends Node {
            val:string;
            string:string;
            prefixed:boolean;

            constructor(str:string);

            toJSON():{ __type: string; string: string; val: string; prefixed: boolean; lineno: number; column: number; filename: string };
        }

        export class Unit extends Node {
            val:number;
            type:string;

            constructor(val:number, type:string);

            toJSON():{ __type: string; val: number; type: string; lineno: number; column: number; filename: string };
        }

        export class RGBA extends Node {
            r:number;
            g:number;
            b:number;
            a:number;
            rgba:RGBA;
            hsla:HSLA;

            constructor(r:number, g:number, b:number, a:number);

            static withoutClamping(r:number, g:number, b:number, a:number):RGBA;

            static fromHSLA(hsla:HSLA):RGBA;

            add(r:number, g:number, b:number, a:number):RGBA;

            substract(r:number, g:number, b:number, a:number):RGBA;

            multiply(n:number):RGBA;

            divide(n:number):RGBA;

            toJSON():{ __type: string; r: number; g: number; b: number; a: number; lineno: number; column: number; filename: string };
        }

        export class HSLA extends Node {
            h:number;
            s:number;
            l:number;
            a:number;
            hsla:HSLA;
            rgba:RGBA;

            constructor(h:number, s:number, l:number, a:number);

            static fromRGBA(rgba:RGBA):HSLA;

            add(h:number, s:number, l:number):HSLA;

            substract(h:number, s:number, l:number):HSLA;

            adjustLightness(percent:number):HSLA;

            adjustHue(deg:number):HSLA;

            toJSON():{ __type: string; h: number; s: number; l: number; a: number; lineno: number; column: number; filename: string };
        }

        export class Block extends Node {
            nodes:Node[];
            parent:Block;
            node:Node;
            scope:boolean;
            hasProperties:boolean;
            hasMedia:boolean;
            isEmpty:boolean;

            constructor(parent:Block);
            constructor(parent:Block, node:Node);

            push(node:Node):void;

            toJSON():{ __type: string; nodes: Node[]; scope: boolean; lineno: number; column: number; filename: string };
        }

        export class Group extends Node {
            nodes:Node[];
            block:Block;
            hasOnlyPlaceholders:boolean;

            constructor();

            push(node:Node):void;

            toJSON():{ __type: string; nodes: Node[]; block: Block; lineno: number; column: number; filename: string };
        }

        export class Expression extends Node {
            nodes:Node[];
            isList:boolean;
            isEmpty:boolean;
            first:Node;

            constructor(isList:boolean);

            push(node:Node):void;

            toJSON():{ __type: string; nodes: Node[]; isList: boolean; lineno: number; column: number; filename: string };
        }

        export class Property extends Node {
            segments:Node[];
            expr:Expression;

            constructor(segs:Node[], expr:Expression);

            toJSON():{ __type: string; segments: Node[]; name: string; expr?: Expression; literal?: Literal; lineno: number; column: number; filename: string };
        }

        export class Each extends Node {
            val:string;
            key:string;
            expr:Expression;
            block:Block;

            toJSON():{ __type: string; val: string; key: string; expr: Expression; block: Block; lineno: number; column: number; filename: string };
        }

        export class If extends Node {
            cond:Expression;
            elses:Expression[];
            block:Block;
            negate:boolean;

            constructor(cond:Expression, negate:boolean);
            constructor(cond:Expression, block:Block);

            toJSON():{ __type: string; cond: Expression; elses: Expression[]; block: Block; negate: boolean; lineno: number; column: number; filename: string };
        }

        export class Call extends Node {
            name:string;
            args:Expression;

            constructor(name:string, args:Expression);

            toJSON():{ __type: string; name: string; args: Expression; lineno: number; column: number; filename: string };
        }

        export class UnaryOp extends Node {
            op:string;
            expr:Expression;

            constructor(op:string, expr:Expression);

            toJSON():{ __type: string; op: string; expr: Expression; lineno: number; column: number; filename: string };
        }

        export class BinOp extends Node {
            op:string;
            left:Expression;
            right:Expression;

            constructor(op:string, left:Expression, right:Expression);

            toJSON():{ __type: string; op: string; left: Expression; right: Expression; lineno: number; column: number; filename: string };
        }

        export class Ternary extends Node {
            op:string;
            trueExpr:Expression;
            falseExpr:Expression;

            constructor(op:string, trueExpr:Expression, falseExpr:Expression);

            toJSON():{ __type: string; op: string; trueExpr: Expression; falseExpr: Expression; lineno: number; column: number; filename: string };
        }

        export class Return extends Node {
            expr:Expression;

            constructor(expr:Expression);

            toJSON():{ __type: string; expr: Expression; lineno: number; column: number; filename: string };
        }

        export class Media extends Node {
            val:string;

            constructor(val:string);

            toJSON():{ __type: string; val: string; lineno: number; column: number; filename: string };
        }

        export class QueryList extends Node {
            nodes:Node[];

            constructor();

            push(node:Node):void;

            merge(other:MediaQueryList):MediaQueryList;

            toJSON():{ __type: string; nodes: Node[]; lineno: number; column: number; filename: string };
        }

        export class Query extends Node {
            nodes:QueryExpr[];
            type:string;
            predicate:string;
            resolvedType:string;
            resolvedPredicate:string;

            constructor();

            push(expr:QueryExpr):void;

            merge(other:Query):Query;

            toJSON():{ __type: string; nodes: QueryExpr[]; predicate: string; type: string; lineno: number; column: number; filename: string };
        }

        export class QueryExpr extends Node {
            segments:Node[];
            expr:Expression;

            constructor(segs:Node[]);

            toJSON():{ __type: string; segments: Node[]; lineno: number; column: number; filename: string };
        }

        export class Params extends Node {
            nodes:Node[];
            length:number;

            push(node:Node):void;

            toJSON():{ __type: string; nodes: Node[]; lineno: number; column: number; filename: string };
        }

        export class Comment extends Node {
            str:string;
            suppress:boolean;
            inline:boolean;

            constructor(str:string, suppress:boolean, inline:boolean);

            toJSON():{ __type: string; str: string; suppress: boolean; inline: boolean; lineno: number; column: number; filename: string };
        }

        export class Keyframes extends Node {
            segments:Node[];
            prefix:string;

            constructor(segs:Node[]);
            constructor(segs:Node[], prefix:string);

            toJSON():{ __type: string; segments: Node[]; prefix: string; block: Block; lineno: number; column: number; filename: string };
        }

        export class Member extends Node {
            left:Node;
            right:Node;

            constructor(left:Node, right:Node);

            toJSON():{ __type: string; left: Node; right: Node; val?: string; lineno: number; column: number; filename: string };
        }

        export class Charset extends Node {
            val:string;

            constructor(val:string);

            toJSON():{ __type: string; val: string; lineno: number; column: number; filename: string };
        }

        export class Namespace extends Node {
            val:string;
            prefix:string;

            constructor(val:string, prefix:string);

            toJSON():{ __type: string; val: string; prefix: string; lineno: number; column: number; filename: string };
        }

        export class Import extends Node {
            path:Expression;
            once:boolean;

            constructor(path:Expression);
            constructor(path:Expression, once:boolean);

            toJSON():{ __type: string; path: Expression; lineno: number; column: number; filename: string };
        }

        export class Extend extends Node {
            selectors:Selector[];

            constructor(selectors:Selector[]);

            toJSON():{ __type: string; selectors: Selector[]; lineno: number; column: number; filename: string };
        }

        export class Function extends Node {
            name:string;
            params:Params;
            body:Block;

            constructor(name:string, params:Params, body:Block);

            toJSON():{ __type: string; name: string; params: Params; body: Block; lineno: number; column: number; filename: string };
        }

        export class Selector extends Node {
            inherits:boolean;
            segments:Node[];

            constructor(segs:Node[]);

            toJSON():{ __type: string; segments: Node[]; inherits: boolean; val: string; lineno: number; column: number; filename: string };
        }

        export class Arguments extends Expression {
            map:Dictionary<Node>;

            constructor();

            toJSON():{ __type: string; map: Dictionary<Node>; isList: boolean; preserve: boolean; nodes: Node[]; lineno: number; column: number; filename: string };
        }

        export class Atblock extends Node {
            block:Block;
            nodes:Node[];

            constructor();

            toJSON():{ __type: string; block: Block; lineno: number; column: number; filename: string };
        }

        export class Atrule extends Node {
            type:string;
            hasOnlyProperties:boolean;

            constructor(type:string);

            toJSON():{ __type: string; type: string; segments: Node[]; block?: Block; lineno: number; column: number; filename: string };
        }
    }

    export interface Dictionary<T> {
        [key: string]: T;
    }

    export interface RenderOptions {
        globals?: Dictionary<any>;
        functions?: Dictionary<any>;
        imports?: string[];
        paths?: string[];
        filename?: string;
        Evaluator?: typeof Evaluator;
    }

    export interface RenderCallback {
        (err:Error, css:string, js:string): void;
    }

    export interface UrlOptions {
        limit?: string;
        path: string;
    }

    export interface LiteralFunction {
        (url:string): Nodes.Literal;
        raw: boolean;
    }

    export interface ExceptionOptions {
        filename: string;
        context: number;
        lineno: number;
        column: number;
        input: string;
    }
}

declare module "stylus" {
    var stylus:Stylus.Static;
    export = stylus;
}
