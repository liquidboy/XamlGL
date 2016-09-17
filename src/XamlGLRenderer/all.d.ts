/// <reference path="node_modules/bower-typings/node_modules/fayde-unify/node_modules/inquirer/node_modules/rx/ts/rx.async.d.ts" />
/// <reference path="node_modules/bower-typings/node_modules/fayde-unify/node_modules/inquirer/node_modules/rx/ts/rx.d.ts" />
/// <reference path="node_modules/bower-typings/node_modules/fayde-unify/node_modules/inquirer/node_modules/rx/ts/rx.backpressure.d.ts" />
declare module "XamlGL/Renderer" {
    export class Renderer {
        constructor();
        Test(): void;
    }
}
declare module "XamlGL/Core" {
    export * from "XamlGL/Renderer";
}
declare module "Bootstrap/XamlApp" {
    export class XamlApp {
        element: HTMLElement;
        span: HTMLElement;
        timerToken: number;
        constructor(element: HTMLElement);
        Start(): void;
        Stop(): void;
    }
}
declare class Expression {
    nodeType: ExpressionType;
    constructor(nodeType: ExpressionType);
    Accept(visitor: ExpressionVisitor): Expression;
    static Constant(value: any): ConstantExpression;
    static Parameter(name: string): ParameterExpression;
    static Condition(test: Expression, ifTrue: Expression, ifFalse: Expression): ConditionalExpression;
    static Add(left: Expression, right: Expression): BinaryExpression;
    static Subtract(left: Expression, right: Expression): BinaryExpression;
    static Multiply(left: Expression, right: Expression): BinaryExpression;
    static Divide(left: Expression, right: Expression): BinaryExpression;
    static Modulo(left: Expression, right: Expression): BinaryExpression;
    static And(left: Expression, right: Expression): BinaryExpression;
    static AndAlso(left: Expression, right: Expression): BinaryExpression;
    static Or(left: Expression, right: Expression): BinaryExpression;
    static OrElse(left: Expression, right: Expression): BinaryExpression;
    static ExclusiveOr(left: Expression, right: Expression): BinaryExpression;
    static Equal(left: Expression, right: Expression): BinaryExpression;
    static NotEqual(left: Expression, right: Expression): BinaryExpression;
    static LessThan(left: Expression, right: Expression): BinaryExpression;
    static LessThanOrEqual(left: Expression, right: Expression): BinaryExpression;
    static GreaterThan(left: Expression, right: Expression): BinaryExpression;
    static GreaterThanOrEqual(left: Expression, right: Expression): BinaryExpression;
    static LeftShift(left: Expression, right: Expression): BinaryExpression;
    static RightShift(left: Expression, right: Expression): BinaryExpression;
    static Not(operand: Expression): UnaryExpression;
    static UnaryPlus(operand: Expression): UnaryExpression;
    static Negate(operand: Expression): UnaryExpression;
    static OnesComplement(operand: Expression): UnaryExpression;
    static Lambda<T extends Function>(body: Expression, ...parameters: ParameterExpression[]): LambdaExpression<T>;
    static Invoke(expression: Expression, ...args: Expression[]): InvocationExpression;
    static New(typeName: string, ...args: Expression[]): NewExpression;
    static Call(obj: Expression, methodName: string, ...args: Expression[]): CallExpression;
    static Member(obj: Expression, memberName: string): MemberExpression;
    static Index(obj: Expression, ...args: Expression[]): IndexExpression;
}
declare class ExpressionVisitor {
    Visit(node: Expression): Expression;
    VisitConstant(node: ConstantExpression): Expression;
    VisitParameter(node: ParameterExpression): Expression;
    VisitBinary(node: BinaryExpression): Expression;
    VisitUnary(node: UnaryExpression): Expression;
    VisitConditional(node: ConditionalExpression): Expression;
    VisitLambda<T extends Function>(node: LambdaExpression<T>): Expression;
    VisitInvoke(node: InvocationExpression): Expression;
    VisitCall(node: CallExpression): Expression;
    VisitNew(node: NewExpression): Expression;
    VisitMember(node: MemberExpression): Expression;
    VisitIndex(node: IndexExpression): Expression;
    VisitMany<T extends Expression>(nodes: T[]): T[];
}
declare class ConstantExpression extends Expression {
    _value: any;
    constructor(value: any);
    readonly value: any;
    Accept(visitor: ExpressionVisitor): Expression;
}
declare class ParameterExpression extends Expression {
    _name: string;
    constructor(name: string);
    readonly name: string;
    Accept(visitor: ExpressionVisitor): Expression;
}
declare class UnaryExpression extends Expression {
    _operand: Expression;
    constructor(nodeType: ExpressionType, operand: Expression);
    readonly operand: Expression;
    Accept(visitor: ExpressionVisitor): Expression;
    Update(operand: Expression): UnaryExpression;
}
declare class BinaryExpression extends Expression {
    _left: Expression;
    _right: Expression;
    constructor(nodeType: ExpressionType, left: Expression, right: Expression);
    readonly left: Expression;
    readonly right: Expression;
    Accept(visitor: ExpressionVisitor): Expression;
    Update(left: Expression, right: Expression): BinaryExpression;
}
declare class ConditionalExpression extends Expression {
    _test: Expression;
    _ifTrue: Expression;
    _ifFalse: Expression;
    constructor(test: Expression, ifTrue: Expression, ifFalse: Expression);
    readonly test: Expression;
    readonly ifTrue: Expression;
    readonly ifFalse: Expression;
    Accept(visitor: ExpressionVisitor): Expression;
    Update(test: Expression, ifTrue: Expression, ifFalse: Expression): ConditionalExpression;
}
declare class LambdaExpression<T extends Function> extends Expression {
    _body: Expression;
    _parameters: ParameterExpression[];
    constructor(body: Expression, parameters: ParameterExpression[]);
    readonly body: Expression;
    readonly parameters: ParameterExpression[];
    Accept(visitor: ExpressionVisitor): Expression;
    Update(body: Expression, parameters: ParameterExpression[]): LambdaExpression<T>;
    Compile(): T;
}
declare class InvocationExpression extends Expression {
    _expression: Expression;
    _args: Expression[];
    constructor(expression: Expression, args: Expression[]);
    readonly expression: Expression;
    readonly args: Expression[];
    Accept(visitor: ExpressionVisitor): Expression;
    Update(expression: Expression, args: Expression[]): InvocationExpression;
}
declare class CallExpression extends Expression {
    _expression: Expression;
    _method: string;
    _args: Expression[];
    constructor(expression: Expression, methodName: string, args: Expression[]);
    readonly obj: Expression;
    readonly method: string;
    readonly args: Expression[];
    Accept(visitor: ExpressionVisitor): Expression;
    Update(expression: Expression, args: Expression[]): CallExpression;
}
declare class IndexExpression extends Expression {
    _expression: Expression;
    _args: Expression[];
    constructor(expression: Expression, args: Expression[]);
    readonly obj: Expression;
    readonly args: Expression[];
    Accept(visitor: ExpressionVisitor): Expression;
    Update(expression: Expression, args: Expression[]): IndexExpression;
}
declare class NewExpression extends Expression {
    _type: string;
    _args: Expression[];
    constructor(typeName: string, args: Expression[]);
    readonly type: string;
    readonly args: Expression[];
    Accept(visitor: ExpressionVisitor): Expression;
    Update(args: Expression[]): NewExpression;
}
declare class MemberExpression extends Expression {
    _obj: Expression;
    _member: string;
    constructor(obj: Expression, memberName: string);
    readonly obj: Expression;
    readonly member: string;
    Accept(visitor: ExpressionVisitor): Expression;
    Update(obj: Expression): MemberExpression;
}
declare class LambdaCompiler extends ExpressionVisitor {
    _stack: string[];
    constructor();
    readonly code: string;
    VisitConstant(node: ConstantExpression): Expression;
    VisitUnary(node: UnaryExpression): Expression;
    VisitBinary(node: BinaryExpression): Expression;
    VisitConditional(node: ConditionalExpression): Expression;
    VisitParameter(node: ParameterExpression): Expression;
    VisitLambda<T extends Function>(node: LambdaExpression<T>): Expression;
    VisitInvoke(node: InvocationExpression): Expression;
    VisitCall(node: CallExpression): Expression;
    VisitNew(node: NewExpression): Expression;
    VisitMember(node: MemberExpression): Expression;
    VisitIndex(node: IndexExpression): Expression;
}
declare class FreeVariableScanner extends ExpressionVisitor {
    _stack: Expression[][];
    _result: Expression[];
    constructor();
    readonly result: Expression[];
    VisitParameter(node: ParameterExpression): Expression;
    VisitLambda<T extends Function>(node: LambdaExpression<T>): Expression;
}
declare enum ExpressionType {
    Constant = 0,
    Parameter = 1,
    Lambda = 2,
    Add = 3,
    Subtract = 4,
    Multiply = 5,
    Divide = 6,
    Modulo = 7,
    And = 8,
    Or = 9,
    AndAlso = 10,
    OrElse = 11,
    ExclusiveOr = 12,
    Equal = 13,
    NotEqual = 14,
    LessThan = 15,
    LessThanOrEqual = 16,
    GreaterThan = 17,
    GreaterThanOrEqual = 18,
    LeftShift = 19,
    RightShift = 20,
    Invoke = 21,
    Not = 22,
    Negate = 23,
    UnaryPlus = 24,
    OnesComplement = 25,
    Condition = 26,
    New = 27,
    Call = 28,
    Member = 29,
    Index = 30,
}
declare class Binder extends ExpressionVisitor {
    _stack: Expression[][];
    _resources: any;
    constructor(resources: any);
    VisitParameter(node: ParameterExpression): Expression;
    VisitLambda<T extends Function>(node: LambdaExpression<T>): Expression;
}
declare var resources: {
    "my://xs": number[];
    "my://ss": string[];
    "rx://operators/filter": (xs: any[], f: (any: any) => boolean) => any[];
    "rx://operators/map": (xs: any[], f: (any: any) => any) => any[];
};
declare var x: ParameterExpression;
declare var f1: InvocationExpression;
declare var f2: InvocationExpression;
declare var binder: Binder;
declare var b1: LambdaExpression<() => number[]>;
declare var c1: () => number[];
declare var r1: number[];
declare var b2: LambdaExpression<() => string[]>;
declare var c2: () => string[];
declare var r2: string[];
declare module Rx.Tests.Async {
}
declare function testPausable(): void;
declare function testControlled(): void;
