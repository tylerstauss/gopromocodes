
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Store
 * 
 */
export type Store = $Result.DefaultSelection<Prisma.$StorePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model PromoCode
 * 
 */
export type PromoCode = $Result.DefaultSelection<Prisma.$PromoCodePayload>
/**
 * Model CategoryPromoCode
 * 
 */
export type CategoryPromoCode = $Result.DefaultSelection<Prisma.$CategoryPromoCodePayload>
/**
 * Model StoreBlog
 * 
 */
export type StoreBlog = $Result.DefaultSelection<Prisma.$StoreBlogPayload>
/**
 * Model Subscriber
 * 
 */
export type Subscriber = $Result.DefaultSelection<Prisma.$SubscriberPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.store`: Exposes CRUD operations for the **Store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.StoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promoCode`: Exposes CRUD operations for the **PromoCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PromoCodes
    * const promoCodes = await prisma.promoCode.findMany()
    * ```
    */
  get promoCode(): Prisma.PromoCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoryPromoCode`: Exposes CRUD operations for the **CategoryPromoCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoryPromoCodes
    * const categoryPromoCodes = await prisma.categoryPromoCode.findMany()
    * ```
    */
  get categoryPromoCode(): Prisma.CategoryPromoCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storeBlog`: Exposes CRUD operations for the **StoreBlog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoreBlogs
    * const storeBlogs = await prisma.storeBlog.findMany()
    * ```
    */
  get storeBlog(): Prisma.StoreBlogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriber`: Exposes CRUD operations for the **Subscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscribers
    * const subscribers = await prisma.subscriber.findMany()
    * ```
    */
  get subscriber(): Prisma.SubscriberDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Store: 'Store',
    Category: 'Category',
    PromoCode: 'PromoCode',
    CategoryPromoCode: 'CategoryPromoCode',
    StoreBlog: 'StoreBlog',
    Subscriber: 'Subscriber'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "store" | "category" | "promoCode" | "categoryPromoCode" | "storeBlog" | "subscriber"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Store: {
        payload: Prisma.$StorePayload<ExtArgs>
        fields: Prisma.StoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findFirst: {
            args: Prisma.StoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findMany: {
            args: Prisma.StoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          create: {
            args: Prisma.StoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          createMany: {
            args: Prisma.StoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          delete: {
            args: Prisma.StoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          update: {
            args: Prisma.StoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          deleteMany: {
            args: Prisma.StoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          upsert: {
            args: Prisma.StoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          aggregate: {
            args: Prisma.StoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore>
          }
          groupBy: {
            args: Prisma.StoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreCountArgs<ExtArgs>
            result: $Utils.Optional<StoreCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      PromoCode: {
        payload: Prisma.$PromoCodePayload<ExtArgs>
        fields: Prisma.PromoCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          findFirst: {
            args: Prisma.PromoCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          findMany: {
            args: Prisma.PromoCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          create: {
            args: Prisma.PromoCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          createMany: {
            args: Prisma.PromoCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromoCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          delete: {
            args: Prisma.PromoCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          update: {
            args: Prisma.PromoCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          deleteMany: {
            args: Prisma.PromoCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromoCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          upsert: {
            args: Prisma.PromoCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          aggregate: {
            args: Prisma.PromoCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromoCode>
          }
          groupBy: {
            args: Prisma.PromoCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoCodeCountArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeCountAggregateOutputType> | number
          }
        }
      }
      CategoryPromoCode: {
        payload: Prisma.$CategoryPromoCodePayload<ExtArgs>
        fields: Prisma.CategoryPromoCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryPromoCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryPromoCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>
          }
          findFirst: {
            args: Prisma.CategoryPromoCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryPromoCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>
          }
          findMany: {
            args: Prisma.CategoryPromoCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>[]
          }
          create: {
            args: Prisma.CategoryPromoCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>
          }
          createMany: {
            args: Prisma.CategoryPromoCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryPromoCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>[]
          }
          delete: {
            args: Prisma.CategoryPromoCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>
          }
          update: {
            args: Prisma.CategoryPromoCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>
          }
          deleteMany: {
            args: Prisma.CategoryPromoCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryPromoCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryPromoCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>[]
          }
          upsert: {
            args: Prisma.CategoryPromoCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPromoCodePayload>
          }
          aggregate: {
            args: Prisma.CategoryPromoCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoryPromoCode>
          }
          groupBy: {
            args: Prisma.CategoryPromoCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryPromoCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryPromoCodeCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryPromoCodeCountAggregateOutputType> | number
          }
        }
      }
      StoreBlog: {
        payload: Prisma.$StoreBlogPayload<ExtArgs>
        fields: Prisma.StoreBlogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreBlogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreBlogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>
          }
          findFirst: {
            args: Prisma.StoreBlogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreBlogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>
          }
          findMany: {
            args: Prisma.StoreBlogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>[]
          }
          create: {
            args: Prisma.StoreBlogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>
          }
          createMany: {
            args: Prisma.StoreBlogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreBlogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>[]
          }
          delete: {
            args: Prisma.StoreBlogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>
          }
          update: {
            args: Prisma.StoreBlogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>
          }
          deleteMany: {
            args: Prisma.StoreBlogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreBlogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreBlogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>[]
          }
          upsert: {
            args: Prisma.StoreBlogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreBlogPayload>
          }
          aggregate: {
            args: Prisma.StoreBlogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStoreBlog>
          }
          groupBy: {
            args: Prisma.StoreBlogGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreBlogGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreBlogCountArgs<ExtArgs>
            result: $Utils.Optional<StoreBlogCountAggregateOutputType> | number
          }
        }
      }
      Subscriber: {
        payload: Prisma.$SubscriberPayload<ExtArgs>
        fields: Prisma.SubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          findFirst: {
            args: Prisma.SubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          findMany: {
            args: Prisma.SubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>[]
          }
          create: {
            args: Prisma.SubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          createMany: {
            args: Prisma.SubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>[]
          }
          delete: {
            args: Prisma.SubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          update: {
            args: Prisma.SubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          deleteMany: {
            args: Prisma.SubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>[]
          }
          upsert: {
            args: Prisma.SubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriberPayload>
          }
          aggregate: {
            args: Prisma.SubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriber>
          }
          groupBy: {
            args: Prisma.SubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriberCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    store?: StoreOmit
    category?: CategoryOmit
    promoCode?: PromoCodeOmit
    categoryPromoCode?: CategoryPromoCodeOmit
    storeBlog?: StoreBlogOmit
    subscriber?: SubscriberOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StoreCountOutputType
   */

  export type StoreCountOutputType = {
    promoCodes: number
    blogs: number
    categoryPromoCodes: number
  }

  export type StoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCodes?: boolean | StoreCountOutputTypeCountPromoCodesArgs
    blogs?: boolean | StoreCountOutputTypeCountBlogsArgs
    categoryPromoCodes?: boolean | StoreCountOutputTypeCountCategoryPromoCodesArgs
  }

  // Custom InputTypes
  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     */
    select?: StoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountPromoCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountBlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreBlogWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountCategoryPromoCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryPromoCodeWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    stores: number
    promoCodes: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stores?: boolean | CategoryCountOutputTypeCountStoresArgs
    promoCodes?: boolean | CategoryCountOutputTypeCountPromoCodesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountStoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountPromoCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryPromoCodeWhereInput
  }


  /**
   * Count Type PromoCodeCountOutputType
   */

  export type PromoCodeCountOutputType = {
    categories: number
  }

  export type PromoCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | PromoCodeCountOutputTypeCountCategoriesArgs
  }

  // Custom InputTypes
  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeCountOutputType
     */
    select?: PromoCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryPromoCodeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    googleId: string | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    googleId: string | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    googleId: number
    isAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    googleId?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    googleId?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    googleId?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    googleId: string | null
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "googleId" | "isAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      googleId: string | null
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Store
   */

  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    viglinkId: number | null
    viglinkGroupId: number | null
  }

  export type StoreSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    viglinkId: number | null
    viglinkGroupId: number | null
  }

  export type StoreMinAggregateOutputType = {
    id: number | null
    name: string | null
    url: string | null
    description: string | null
    active: boolean | null
    userSubmit: boolean | null
    metaKeywords: string | null
    metaTitle: string | null
    metaDescription: string | null
    categoryId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
    topStore: boolean | null
    oldSlug: string | null
    searchTerms: string | null
    networkId: string | null
    network: string | null
    domain: string | null
    viglinkId: number | null
    viglinkGroupId: number | null
    viglinkName: string | null
    paths: string | null
  }

  export type StoreMaxAggregateOutputType = {
    id: number | null
    name: string | null
    url: string | null
    description: string | null
    active: boolean | null
    userSubmit: boolean | null
    metaKeywords: string | null
    metaTitle: string | null
    metaDescription: string | null
    categoryId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
    topStore: boolean | null
    oldSlug: string | null
    searchTerms: string | null
    networkId: string | null
    network: string | null
    domain: string | null
    viglinkId: number | null
    viglinkGroupId: number | null
    viglinkName: string | null
    paths: string | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    name: number
    url: number
    description: number
    active: number
    userSubmit: number
    metaKeywords: number
    metaTitle: number
    metaDescription: number
    categoryId: number
    createdAt: number
    updatedAt: number
    slug: number
    topStore: number
    oldSlug: number
    searchTerms: number
    networkId: number
    network: number
    domain: number
    viglinkId: number
    viglinkGroupId: number
    viglinkName: number
    paths: number
    _all: number
  }


  export type StoreAvgAggregateInputType = {
    id?: true
    categoryId?: true
    viglinkId?: true
    viglinkGroupId?: true
  }

  export type StoreSumAggregateInputType = {
    id?: true
    categoryId?: true
    viglinkId?: true
    viglinkGroupId?: true
  }

  export type StoreMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    description?: true
    active?: true
    userSubmit?: true
    metaKeywords?: true
    metaTitle?: true
    metaDescription?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    topStore?: true
    oldSlug?: true
    searchTerms?: true
    networkId?: true
    network?: true
    domain?: true
    viglinkId?: true
    viglinkGroupId?: true
    viglinkName?: true
    paths?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    description?: true
    active?: true
    userSubmit?: true
    metaKeywords?: true
    metaTitle?: true
    metaDescription?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    topStore?: true
    oldSlug?: true
    searchTerms?: true
    networkId?: true
    network?: true
    domain?: true
    viglinkId?: true
    viglinkGroupId?: true
    viglinkName?: true
    paths?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    description?: true
    active?: true
    userSubmit?: true
    metaKeywords?: true
    metaTitle?: true
    metaDescription?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    topStore?: true
    oldSlug?: true
    searchTerms?: true
    networkId?: true
    network?: true
    domain?: true
    viglinkId?: true
    viglinkGroupId?: true
    viglinkName?: true
    paths?: true
    _all?: true
  }

  export type StoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Store to aggregate.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type StoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithAggregationInput | StoreOrderByWithAggregationInput[]
    by: StoreScalarFieldEnum[] | StoreScalarFieldEnum
    having?: StoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _avg?: StoreAvgAggregateInputType
    _sum?: StoreSumAggregateInputType
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }

  export type StoreGroupByOutputType = {
    id: number
    name: string
    url: string
    description: string | null
    active: boolean
    userSubmit: boolean
    metaKeywords: string | null
    metaTitle: string | null
    metaDescription: string | null
    categoryId: number | null
    createdAt: Date
    updatedAt: Date
    slug: string
    topStore: boolean
    oldSlug: string | null
    searchTerms: string | null
    networkId: string | null
    network: string | null
    domain: string | null
    viglinkId: number | null
    viglinkGroupId: number | null
    viglinkName: string | null
    paths: string | null
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends StoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type StoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    topStore?: boolean
    oldSlug?: boolean
    searchTerms?: boolean
    networkId?: boolean
    network?: boolean
    domain?: boolean
    viglinkId?: boolean
    viglinkGroupId?: boolean
    viglinkName?: boolean
    paths?: boolean
    category?: boolean | Store$categoryArgs<ExtArgs>
    promoCodes?: boolean | Store$promoCodesArgs<ExtArgs>
    blogs?: boolean | Store$blogsArgs<ExtArgs>
    categoryPromoCodes?: boolean | Store$categoryPromoCodesArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    topStore?: boolean
    oldSlug?: boolean
    searchTerms?: boolean
    networkId?: boolean
    network?: boolean
    domain?: boolean
    viglinkId?: boolean
    viglinkGroupId?: boolean
    viglinkName?: boolean
    paths?: boolean
    category?: boolean | Store$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    topStore?: boolean
    oldSlug?: boolean
    searchTerms?: boolean
    networkId?: boolean
    network?: boolean
    domain?: boolean
    viglinkId?: boolean
    viglinkGroupId?: boolean
    viglinkName?: boolean
    paths?: boolean
    category?: boolean | Store$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    topStore?: boolean
    oldSlug?: boolean
    searchTerms?: boolean
    networkId?: boolean
    network?: boolean
    domain?: boolean
    viglinkId?: boolean
    viglinkGroupId?: boolean
    viglinkName?: boolean
    paths?: boolean
  }

  export type StoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "description" | "active" | "userSubmit" | "metaKeywords" | "metaTitle" | "metaDescription" | "categoryId" | "createdAt" | "updatedAt" | "slug" | "topStore" | "oldSlug" | "searchTerms" | "networkId" | "network" | "domain" | "viglinkId" | "viglinkGroupId" | "viglinkName" | "paths", ExtArgs["result"]["store"]>
  export type StoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Store$categoryArgs<ExtArgs>
    promoCodes?: boolean | Store$promoCodesArgs<ExtArgs>
    blogs?: boolean | Store$blogsArgs<ExtArgs>
    categoryPromoCodes?: boolean | Store$categoryPromoCodesArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Store$categoryArgs<ExtArgs>
  }
  export type StoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Store$categoryArgs<ExtArgs>
  }

  export type $StorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Store"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      promoCodes: Prisma.$PromoCodePayload<ExtArgs>[]
      blogs: Prisma.$StoreBlogPayload<ExtArgs>[]
      categoryPromoCodes: Prisma.$CategoryPromoCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      url: string
      description: string | null
      active: boolean
      userSubmit: boolean
      metaKeywords: string | null
      metaTitle: string | null
      metaDescription: string | null
      categoryId: number | null
      createdAt: Date
      updatedAt: Date
      slug: string
      topStore: boolean
      oldSlug: string | null
      searchTerms: string | null
      networkId: string | null
      network: string | null
      domain: string | null
      viglinkId: number | null
      viglinkGroupId: number | null
      viglinkName: string | null
      paths: string | null
    }, ExtArgs["result"]["store"]>
    composites: {}
  }

  type StoreGetPayload<S extends boolean | null | undefined | StoreDefaultArgs> = $Result.GetResult<Prisma.$StorePayload, S>

  type StoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreCountAggregateInputType | true
    }

  export interface StoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Store'], meta: { name: 'Store' } }
    /**
     * Find zero or one Store that matches the filter.
     * @param {StoreFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreFindUniqueArgs>(args: SelectSubset<T, StoreFindUniqueArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreFindFirstArgs>(args?: SelectSubset<T, StoreFindFirstArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreFindManyArgs>(args?: SelectSubset<T, StoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store.
     * @param {StoreCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
     */
    create<T extends StoreCreateArgs>(args: SelectSubset<T, StoreCreateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stores.
     * @param {StoreCreateManyArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreCreateManyArgs>(args?: SelectSubset<T, StoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stores and returns the data saved in the database.
     * @param {StoreCreateManyAndReturnArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Store.
     * @param {StoreDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
     */
    delete<T extends StoreDeleteArgs>(args: SelectSubset<T, StoreDeleteArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store.
     * @param {StoreUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreUpdateArgs>(args: SelectSubset<T, StoreUpdateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stores.
     * @param {StoreDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreDeleteManyArgs>(args?: SelectSubset<T, StoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreUpdateManyArgs>(args: SelectSubset<T, StoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores and returns the data updated in the database.
     * @param {StoreUpdateManyAndReturnArgs} args - Arguments to update many Stores.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Store.
     * @param {StoreUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
     */
    upsert<T extends StoreUpsertArgs>(args: SelectSubset<T, StoreUpsertArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends StoreCountArgs>(
      args?: Subset<T, StoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreGroupByArgs['orderBy'] }
        : { orderBy?: StoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Store model
   */
  readonly fields: StoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Store$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Store$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    promoCodes<T extends Store$promoCodesArgs<ExtArgs> = {}>(args?: Subset<T, Store$promoCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blogs<T extends Store$blogsArgs<ExtArgs> = {}>(args?: Subset<T, Store$blogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categoryPromoCodes<T extends Store$categoryPromoCodesArgs<ExtArgs> = {}>(args?: Subset<T, Store$categoryPromoCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Store model
   */ 
  interface StoreFieldRefs {
    readonly id: FieldRef<"Store", 'Int'>
    readonly name: FieldRef<"Store", 'String'>
    readonly url: FieldRef<"Store", 'String'>
    readonly description: FieldRef<"Store", 'String'>
    readonly active: FieldRef<"Store", 'Boolean'>
    readonly userSubmit: FieldRef<"Store", 'Boolean'>
    readonly metaKeywords: FieldRef<"Store", 'String'>
    readonly metaTitle: FieldRef<"Store", 'String'>
    readonly metaDescription: FieldRef<"Store", 'String'>
    readonly categoryId: FieldRef<"Store", 'Int'>
    readonly createdAt: FieldRef<"Store", 'DateTime'>
    readonly updatedAt: FieldRef<"Store", 'DateTime'>
    readonly slug: FieldRef<"Store", 'String'>
    readonly topStore: FieldRef<"Store", 'Boolean'>
    readonly oldSlug: FieldRef<"Store", 'String'>
    readonly searchTerms: FieldRef<"Store", 'String'>
    readonly networkId: FieldRef<"Store", 'String'>
    readonly network: FieldRef<"Store", 'String'>
    readonly domain: FieldRef<"Store", 'String'>
    readonly viglinkId: FieldRef<"Store", 'Int'>
    readonly viglinkGroupId: FieldRef<"Store", 'Int'>
    readonly viglinkName: FieldRef<"Store", 'String'>
    readonly paths: FieldRef<"Store", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Store findUnique
   */
  export type StoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findUniqueOrThrow
   */
  export type StoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findFirst
   */
  export type StoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findFirstOrThrow
   */
  export type StoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findMany
   */
  export type StoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Stores to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store create
   */
  export type StoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to create a Store.
     */
    data: XOR<StoreCreateInput, StoreUncheckedCreateInput>
  }

  /**
   * Store createMany
   */
  export type StoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Store createManyAndReturn
   */
  export type StoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Store update
   */
  export type StoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to update a Store.
     */
    data: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
    /**
     * Choose, which Store to update.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store updateMany
   */
  export type StoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store updateManyAndReturn
   */
  export type StoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Store upsert
   */
  export type StoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The filter to search for the Store to update in case it exists.
     */
    where: StoreWhereUniqueInput
    /**
     * In case the Store found by the `where` argument doesn't exist, create a new Store with this data.
     */
    create: XOR<StoreCreateInput, StoreUncheckedCreateInput>
    /**
     * In case the Store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
  }

  /**
   * Store delete
   */
  export type StoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter which Store to delete.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store deleteMany
   */
  export type StoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stores to delete
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to delete.
     */
    limit?: number
  }

  /**
   * Store.category
   */
  export type Store$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Store.promoCodes
   */
  export type Store$promoCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    where?: PromoCodeWhereInput
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    cursor?: PromoCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * Store.blogs
   */
  export type Store$blogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    where?: StoreBlogWhereInput
    orderBy?: StoreBlogOrderByWithRelationInput | StoreBlogOrderByWithRelationInput[]
    cursor?: StoreBlogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreBlogScalarFieldEnum | StoreBlogScalarFieldEnum[]
  }

  /**
   * Store.categoryPromoCodes
   */
  export type Store$categoryPromoCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    where?: CategoryPromoCodeWhereInput
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    cursor?: CategoryPromoCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryPromoCodeScalarFieldEnum | CategoryPromoCodeScalarFieldEnum[]
  }

  /**
   * Store without action
   */
  export type StoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    metaKeywords: string | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    metaKeywords: string | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    metaKeywords: number
    metaTitle: number
    metaDescription: number
    createdAt: number
    updatedAt: number
    slug: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    metaKeywords?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    metaKeywords?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    metaKeywords?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    description: string | null
    metaKeywords: string | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date
    updatedAt: Date
    slug: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    stores?: boolean | Category$storesArgs<ExtArgs>
    promoCodes?: boolean | Category$promoCodesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    metaKeywords?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "metaKeywords" | "metaTitle" | "metaDescription" | "createdAt" | "updatedAt" | "slug", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stores?: boolean | Category$storesArgs<ExtArgs>
    promoCodes?: boolean | Category$promoCodesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      stores: Prisma.$StorePayload<ExtArgs>[]
      promoCodes: Prisma.$CategoryPromoCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      metaKeywords: string | null
      metaTitle: string | null
      metaDescription: string | null
      createdAt: Date
      updatedAt: Date
      slug: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stores<T extends Category$storesArgs<ExtArgs> = {}>(args?: Subset<T, Category$storesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    promoCodes<T extends Category$promoCodesArgs<ExtArgs> = {}>(args?: Subset<T, Category$promoCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly metaKeywords: FieldRef<"Category", 'String'>
    readonly metaTitle: FieldRef<"Category", 'String'>
    readonly metaDescription: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
    readonly slug: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.stores
   */
  export type Category$storesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    cursor?: StoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Category.promoCodes
   */
  export type Category$promoCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    where?: CategoryPromoCodeWhereInput
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    cursor?: CategoryPromoCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryPromoCodeScalarFieldEnum | CategoryPromoCodeScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model PromoCode
   */

  export type AggregatePromoCode = {
    _count: PromoCodeCountAggregateOutputType | null
    _avg: PromoCodeAvgAggregateOutputType | null
    _sum: PromoCodeSumAggregateOutputType | null
    _min: PromoCodeMinAggregateOutputType | null
    _max: PromoCodeMaxAggregateOutputType | null
  }

  export type PromoCodeAvgAggregateOutputType = {
    id: number | null
    storeId: number | null
    orderId: number | null
  }

  export type PromoCodeSumAggregateOutputType = {
    id: number | null
    storeId: number | null
    orderId: number | null
  }

  export type PromoCodeMinAggregateOutputType = {
    id: number | null
    storeId: number | null
    title: string | null
    description: string | null
    starts: Date | null
    code: string | null
    link: string | null
    homepage: boolean | null
    freeShipping: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    expires: Date | null
    userSubmit: boolean | null
    approved: boolean | null
    orderId: number | null
  }

  export type PromoCodeMaxAggregateOutputType = {
    id: number | null
    storeId: number | null
    title: string | null
    description: string | null
    starts: Date | null
    code: string | null
    link: string | null
    homepage: boolean | null
    freeShipping: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    expires: Date | null
    userSubmit: boolean | null
    approved: boolean | null
    orderId: number | null
  }

  export type PromoCodeCountAggregateOutputType = {
    id: number
    storeId: number
    title: number
    description: number
    starts: number
    code: number
    link: number
    homepage: number
    freeShipping: number
    createdAt: number
    updatedAt: number
    expires: number
    userSubmit: number
    approved: number
    orderId: number
    _all: number
  }


  export type PromoCodeAvgAggregateInputType = {
    id?: true
    storeId?: true
    orderId?: true
  }

  export type PromoCodeSumAggregateInputType = {
    id?: true
    storeId?: true
    orderId?: true
  }

  export type PromoCodeMinAggregateInputType = {
    id?: true
    storeId?: true
    title?: true
    description?: true
    starts?: true
    code?: true
    link?: true
    homepage?: true
    freeShipping?: true
    createdAt?: true
    updatedAt?: true
    expires?: true
    userSubmit?: true
    approved?: true
    orderId?: true
  }

  export type PromoCodeMaxAggregateInputType = {
    id?: true
    storeId?: true
    title?: true
    description?: true
    starts?: true
    code?: true
    link?: true
    homepage?: true
    freeShipping?: true
    createdAt?: true
    updatedAt?: true
    expires?: true
    userSubmit?: true
    approved?: true
    orderId?: true
  }

  export type PromoCodeCountAggregateInputType = {
    id?: true
    storeId?: true
    title?: true
    description?: true
    starts?: true
    code?: true
    link?: true
    homepage?: true
    freeShipping?: true
    createdAt?: true
    updatedAt?: true
    expires?: true
    userSubmit?: true
    approved?: true
    orderId?: true
    _all?: true
  }

  export type PromoCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCode to aggregate.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PromoCodes
    **/
    _count?: true | PromoCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromoCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromoCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoCodeMaxAggregateInputType
  }

  export type GetPromoCodeAggregateType<T extends PromoCodeAggregateArgs> = {
        [P in keyof T & keyof AggregatePromoCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromoCode[P]>
      : GetScalarType<T[P], AggregatePromoCode[P]>
  }




  export type PromoCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeWhereInput
    orderBy?: PromoCodeOrderByWithAggregationInput | PromoCodeOrderByWithAggregationInput[]
    by: PromoCodeScalarFieldEnum[] | PromoCodeScalarFieldEnum
    having?: PromoCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoCodeCountAggregateInputType | true
    _avg?: PromoCodeAvgAggregateInputType
    _sum?: PromoCodeSumAggregateInputType
    _min?: PromoCodeMinAggregateInputType
    _max?: PromoCodeMaxAggregateInputType
  }

  export type PromoCodeGroupByOutputType = {
    id: number
    storeId: number
    title: string
    description: string | null
    starts: Date
    code: string
    link: string
    homepage: boolean
    freeShipping: boolean
    createdAt: Date
    updatedAt: Date
    expires: Date | null
    userSubmit: boolean
    approved: boolean
    orderId: number | null
    _count: PromoCodeCountAggregateOutputType | null
    _avg: PromoCodeAvgAggregateOutputType | null
    _sum: PromoCodeSumAggregateOutputType | null
    _min: PromoCodeMinAggregateOutputType | null
    _max: PromoCodeMaxAggregateOutputType | null
  }

  type GetPromoCodeGroupByPayload<T extends PromoCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoCodeGroupByOutputType[P]>
            : GetScalarType<T[P], PromoCodeGroupByOutputType[P]>
        }
      >
    >


  export type PromoCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    title?: boolean
    description?: boolean
    starts?: boolean
    code?: boolean
    link?: boolean
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expires?: boolean
    userSubmit?: boolean
    approved?: boolean
    orderId?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    categories?: boolean | PromoCode$categoriesArgs<ExtArgs>
    _count?: boolean | PromoCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCode"]>

  export type PromoCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    title?: boolean
    description?: boolean
    starts?: boolean
    code?: boolean
    link?: boolean
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expires?: boolean
    userSubmit?: boolean
    approved?: boolean
    orderId?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCode"]>

  export type PromoCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    title?: boolean
    description?: boolean
    starts?: boolean
    code?: boolean
    link?: boolean
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expires?: boolean
    userSubmit?: boolean
    approved?: boolean
    orderId?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCode"]>

  export type PromoCodeSelectScalar = {
    id?: boolean
    storeId?: boolean
    title?: boolean
    description?: boolean
    starts?: boolean
    code?: boolean
    link?: boolean
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expires?: boolean
    userSubmit?: boolean
    approved?: boolean
    orderId?: boolean
  }

  export type PromoCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "title" | "description" | "starts" | "code" | "link" | "homepage" | "freeShipping" | "createdAt" | "updatedAt" | "expires" | "userSubmit" | "approved" | "orderId", ExtArgs["result"]["promoCode"]>
  export type PromoCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    categories?: boolean | PromoCode$categoriesArgs<ExtArgs>
    _count?: boolean | PromoCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PromoCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type PromoCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $PromoCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PromoCode"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
      categories: Prisma.$CategoryPromoCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      storeId: number
      title: string
      description: string | null
      starts: Date
      code: string
      link: string
      homepage: boolean
      freeShipping: boolean
      createdAt: Date
      updatedAt: Date
      expires: Date | null
      userSubmit: boolean
      approved: boolean
      orderId: number | null
    }, ExtArgs["result"]["promoCode"]>
    composites: {}
  }

  type PromoCodeGetPayload<S extends boolean | null | undefined | PromoCodeDefaultArgs> = $Result.GetResult<Prisma.$PromoCodePayload, S>

  type PromoCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoCodeCountAggregateInputType | true
    }

  export interface PromoCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PromoCode'], meta: { name: 'PromoCode' } }
    /**
     * Find zero or one PromoCode that matches the filter.
     * @param {PromoCodeFindUniqueArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoCodeFindUniqueArgs>(args: SelectSubset<T, PromoCodeFindUniqueArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PromoCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoCodeFindUniqueOrThrowArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindFirstArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoCodeFindFirstArgs>(args?: SelectSubset<T, PromoCodeFindFirstArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindFirstOrThrowArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PromoCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromoCodes
     * const promoCodes = await prisma.promoCode.findMany()
     * 
     * // Get first 10 PromoCodes
     * const promoCodes = await prisma.promoCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoCodeFindManyArgs>(args?: SelectSubset<T, PromoCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PromoCode.
     * @param {PromoCodeCreateArgs} args - Arguments to create a PromoCode.
     * @example
     * // Create one PromoCode
     * const PromoCode = await prisma.promoCode.create({
     *   data: {
     *     // ... data to create a PromoCode
     *   }
     * })
     * 
     */
    create<T extends PromoCodeCreateArgs>(args: SelectSubset<T, PromoCodeCreateArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PromoCodes.
     * @param {PromoCodeCreateManyArgs} args - Arguments to create many PromoCodes.
     * @example
     * // Create many PromoCodes
     * const promoCode = await prisma.promoCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoCodeCreateManyArgs>(args?: SelectSubset<T, PromoCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PromoCodes and returns the data saved in the database.
     * @param {PromoCodeCreateManyAndReturnArgs} args - Arguments to create many PromoCodes.
     * @example
     * // Create many PromoCodes
     * const promoCode = await prisma.promoCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PromoCodes and only return the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromoCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, PromoCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PromoCode.
     * @param {PromoCodeDeleteArgs} args - Arguments to delete one PromoCode.
     * @example
     * // Delete one PromoCode
     * const PromoCode = await prisma.promoCode.delete({
     *   where: {
     *     // ... filter to delete one PromoCode
     *   }
     * })
     * 
     */
    delete<T extends PromoCodeDeleteArgs>(args: SelectSubset<T, PromoCodeDeleteArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PromoCode.
     * @param {PromoCodeUpdateArgs} args - Arguments to update one PromoCode.
     * @example
     * // Update one PromoCode
     * const promoCode = await prisma.promoCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoCodeUpdateArgs>(args: SelectSubset<T, PromoCodeUpdateArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PromoCodes.
     * @param {PromoCodeDeleteManyArgs} args - Arguments to filter PromoCodes to delete.
     * @example
     * // Delete a few PromoCodes
     * const { count } = await prisma.promoCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoCodeDeleteManyArgs>(args?: SelectSubset<T, PromoCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromoCodes
     * const promoCode = await prisma.promoCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoCodeUpdateManyArgs>(args: SelectSubset<T, PromoCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodes and returns the data updated in the database.
     * @param {PromoCodeUpdateManyAndReturnArgs} args - Arguments to update many PromoCodes.
     * @example
     * // Update many PromoCodes
     * const promoCode = await prisma.promoCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PromoCodes and only return the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PromoCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, PromoCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PromoCode.
     * @param {PromoCodeUpsertArgs} args - Arguments to update or create a PromoCode.
     * @example
     * // Update or create a PromoCode
     * const promoCode = await prisma.promoCode.upsert({
     *   create: {
     *     // ... data to create a PromoCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromoCode we want to update
     *   }
     * })
     */
    upsert<T extends PromoCodeUpsertArgs>(args: SelectSubset<T, PromoCodeUpsertArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeCountArgs} args - Arguments to filter PromoCodes to count.
     * @example
     * // Count the number of PromoCodes
     * const count = await prisma.promoCode.count({
     *   where: {
     *     // ... the filter for the PromoCodes we want to count
     *   }
     * })
    **/
    count<T extends PromoCodeCountArgs>(
      args?: Subset<T, PromoCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoCodeAggregateArgs>(args: Subset<T, PromoCodeAggregateArgs>): Prisma.PrismaPromise<GetPromoCodeAggregateType<T>>

    /**
     * Group by PromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoCodeGroupByArgs['orderBy'] }
        : { orderBy?: PromoCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PromoCode model
   */
  readonly fields: PromoCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromoCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    categories<T extends PromoCode$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, PromoCode$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PromoCode model
   */ 
  interface PromoCodeFieldRefs {
    readonly id: FieldRef<"PromoCode", 'Int'>
    readonly storeId: FieldRef<"PromoCode", 'Int'>
    readonly title: FieldRef<"PromoCode", 'String'>
    readonly description: FieldRef<"PromoCode", 'String'>
    readonly starts: FieldRef<"PromoCode", 'DateTime'>
    readonly code: FieldRef<"PromoCode", 'String'>
    readonly link: FieldRef<"PromoCode", 'String'>
    readonly homepage: FieldRef<"PromoCode", 'Boolean'>
    readonly freeShipping: FieldRef<"PromoCode", 'Boolean'>
    readonly createdAt: FieldRef<"PromoCode", 'DateTime'>
    readonly updatedAt: FieldRef<"PromoCode", 'DateTime'>
    readonly expires: FieldRef<"PromoCode", 'DateTime'>
    readonly userSubmit: FieldRef<"PromoCode", 'Boolean'>
    readonly approved: FieldRef<"PromoCode", 'Boolean'>
    readonly orderId: FieldRef<"PromoCode", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PromoCode findUnique
   */
  export type PromoCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode findUniqueOrThrow
   */
  export type PromoCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode findFirst
   */
  export type PromoCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode findFirstOrThrow
   */
  export type PromoCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode findMany
   */
  export type PromoCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodes to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode create
   */
  export type PromoCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a PromoCode.
     */
    data: XOR<PromoCodeCreateInput, PromoCodeUncheckedCreateInput>
  }

  /**
   * PromoCode createMany
   */
  export type PromoCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromoCodes.
     */
    data: PromoCodeCreateManyInput | PromoCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromoCode createManyAndReturn
   */
  export type PromoCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * The data used to create many PromoCodes.
     */
    data: PromoCodeCreateManyInput | PromoCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PromoCode update
   */
  export type PromoCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a PromoCode.
     */
    data: XOR<PromoCodeUpdateInput, PromoCodeUncheckedUpdateInput>
    /**
     * Choose, which PromoCode to update.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode updateMany
   */
  export type PromoCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PromoCodes.
     */
    data: XOR<PromoCodeUpdateManyMutationInput, PromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodes to update
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to update.
     */
    limit?: number
  }

  /**
   * PromoCode updateManyAndReturn
   */
  export type PromoCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * The data used to update PromoCodes.
     */
    data: XOR<PromoCodeUpdateManyMutationInput, PromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodes to update
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PromoCode upsert
   */
  export type PromoCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the PromoCode to update in case it exists.
     */
    where: PromoCodeWhereUniqueInput
    /**
     * In case the PromoCode found by the `where` argument doesn't exist, create a new PromoCode with this data.
     */
    create: XOR<PromoCodeCreateInput, PromoCodeUncheckedCreateInput>
    /**
     * In case the PromoCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoCodeUpdateInput, PromoCodeUncheckedUpdateInput>
  }

  /**
   * PromoCode delete
   */
  export type PromoCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter which PromoCode to delete.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode deleteMany
   */
  export type PromoCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodes to delete
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to delete.
     */
    limit?: number
  }

  /**
   * PromoCode.categories
   */
  export type PromoCode$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    where?: CategoryPromoCodeWhereInput
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    cursor?: CategoryPromoCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryPromoCodeScalarFieldEnum | CategoryPromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode without action
   */
  export type PromoCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
  }


  /**
   * Model CategoryPromoCode
   */

  export type AggregateCategoryPromoCode = {
    _count: CategoryPromoCodeCountAggregateOutputType | null
    _avg: CategoryPromoCodeAvgAggregateOutputType | null
    _sum: CategoryPromoCodeSumAggregateOutputType | null
    _min: CategoryPromoCodeMinAggregateOutputType | null
    _max: CategoryPromoCodeMaxAggregateOutputType | null
  }

  export type CategoryPromoCodeAvgAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    categoryId: number | null
    storeId: number | null
  }

  export type CategoryPromoCodeSumAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    categoryId: number | null
    storeId: number | null
  }

  export type CategoryPromoCodeMinAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    categoryId: number | null
    storeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryPromoCodeMaxAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    categoryId: number | null
    storeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryPromoCodeCountAggregateOutputType = {
    id: number
    promoCodeId: number
    categoryId: number
    storeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryPromoCodeAvgAggregateInputType = {
    id?: true
    promoCodeId?: true
    categoryId?: true
    storeId?: true
  }

  export type CategoryPromoCodeSumAggregateInputType = {
    id?: true
    promoCodeId?: true
    categoryId?: true
    storeId?: true
  }

  export type CategoryPromoCodeMinAggregateInputType = {
    id?: true
    promoCodeId?: true
    categoryId?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryPromoCodeMaxAggregateInputType = {
    id?: true
    promoCodeId?: true
    categoryId?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryPromoCodeCountAggregateInputType = {
    id?: true
    promoCodeId?: true
    categoryId?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryPromoCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryPromoCode to aggregate.
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryPromoCodes to fetch.
     */
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryPromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryPromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryPromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoryPromoCodes
    **/
    _count?: true | CategoryPromoCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryPromoCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoryPromoCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryPromoCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryPromoCodeMaxAggregateInputType
  }

  export type GetCategoryPromoCodeAggregateType<T extends CategoryPromoCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoryPromoCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoryPromoCode[P]>
      : GetScalarType<T[P], AggregateCategoryPromoCode[P]>
  }




  export type CategoryPromoCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryPromoCodeWhereInput
    orderBy?: CategoryPromoCodeOrderByWithAggregationInput | CategoryPromoCodeOrderByWithAggregationInput[]
    by: CategoryPromoCodeScalarFieldEnum[] | CategoryPromoCodeScalarFieldEnum
    having?: CategoryPromoCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryPromoCodeCountAggregateInputType | true
    _avg?: CategoryPromoCodeAvgAggregateInputType
    _sum?: CategoryPromoCodeSumAggregateInputType
    _min?: CategoryPromoCodeMinAggregateInputType
    _max?: CategoryPromoCodeMaxAggregateInputType
  }

  export type CategoryPromoCodeGroupByOutputType = {
    id: number
    promoCodeId: number
    categoryId: number
    storeId: number
    createdAt: Date
    updatedAt: Date
    _count: CategoryPromoCodeCountAggregateOutputType | null
    _avg: CategoryPromoCodeAvgAggregateOutputType | null
    _sum: CategoryPromoCodeSumAggregateOutputType | null
    _min: CategoryPromoCodeMinAggregateOutputType | null
    _max: CategoryPromoCodeMaxAggregateOutputType | null
  }

  type GetCategoryPromoCodeGroupByPayload<T extends CategoryPromoCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryPromoCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryPromoCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryPromoCodeGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryPromoCodeGroupByOutputType[P]>
        }
      >
    >


  export type CategoryPromoCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    categoryId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryPromoCode"]>

  export type CategoryPromoCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    categoryId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryPromoCode"]>

  export type CategoryPromoCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    categoryId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryPromoCode"]>

  export type CategoryPromoCodeSelectScalar = {
    id?: boolean
    promoCodeId?: boolean
    categoryId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryPromoCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "promoCodeId" | "categoryId" | "storeId" | "createdAt" | "updatedAt", ExtArgs["result"]["categoryPromoCode"]>
  export type CategoryPromoCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type CategoryPromoCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type CategoryPromoCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $CategoryPromoCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoryPromoCode"
    objects: {
      promoCode: Prisma.$PromoCodePayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      promoCodeId: number
      categoryId: number
      storeId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["categoryPromoCode"]>
    composites: {}
  }

  type CategoryPromoCodeGetPayload<S extends boolean | null | undefined | CategoryPromoCodeDefaultArgs> = $Result.GetResult<Prisma.$CategoryPromoCodePayload, S>

  type CategoryPromoCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryPromoCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryPromoCodeCountAggregateInputType | true
    }

  export interface CategoryPromoCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoryPromoCode'], meta: { name: 'CategoryPromoCode' } }
    /**
     * Find zero or one CategoryPromoCode that matches the filter.
     * @param {CategoryPromoCodeFindUniqueArgs} args - Arguments to find a CategoryPromoCode
     * @example
     * // Get one CategoryPromoCode
     * const categoryPromoCode = await prisma.categoryPromoCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryPromoCodeFindUniqueArgs>(args: SelectSubset<T, CategoryPromoCodeFindUniqueArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CategoryPromoCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryPromoCodeFindUniqueOrThrowArgs} args - Arguments to find a CategoryPromoCode
     * @example
     * // Get one CategoryPromoCode
     * const categoryPromoCode = await prisma.categoryPromoCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryPromoCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryPromoCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryPromoCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeFindFirstArgs} args - Arguments to find a CategoryPromoCode
     * @example
     * // Get one CategoryPromoCode
     * const categoryPromoCode = await prisma.categoryPromoCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryPromoCodeFindFirstArgs>(args?: SelectSubset<T, CategoryPromoCodeFindFirstArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryPromoCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeFindFirstOrThrowArgs} args - Arguments to find a CategoryPromoCode
     * @example
     * // Get one CategoryPromoCode
     * const categoryPromoCode = await prisma.categoryPromoCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryPromoCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryPromoCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CategoryPromoCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryPromoCodes
     * const categoryPromoCodes = await prisma.categoryPromoCode.findMany()
     * 
     * // Get first 10 CategoryPromoCodes
     * const categoryPromoCodes = await prisma.categoryPromoCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryPromoCodeWithIdOnly = await prisma.categoryPromoCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryPromoCodeFindManyArgs>(args?: SelectSubset<T, CategoryPromoCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CategoryPromoCode.
     * @param {CategoryPromoCodeCreateArgs} args - Arguments to create a CategoryPromoCode.
     * @example
     * // Create one CategoryPromoCode
     * const CategoryPromoCode = await prisma.categoryPromoCode.create({
     *   data: {
     *     // ... data to create a CategoryPromoCode
     *   }
     * })
     * 
     */
    create<T extends CategoryPromoCodeCreateArgs>(args: SelectSubset<T, CategoryPromoCodeCreateArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CategoryPromoCodes.
     * @param {CategoryPromoCodeCreateManyArgs} args - Arguments to create many CategoryPromoCodes.
     * @example
     * // Create many CategoryPromoCodes
     * const categoryPromoCode = await prisma.categoryPromoCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryPromoCodeCreateManyArgs>(args?: SelectSubset<T, CategoryPromoCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CategoryPromoCodes and returns the data saved in the database.
     * @param {CategoryPromoCodeCreateManyAndReturnArgs} args - Arguments to create many CategoryPromoCodes.
     * @example
     * // Create many CategoryPromoCodes
     * const categoryPromoCode = await prisma.categoryPromoCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CategoryPromoCodes and only return the `id`
     * const categoryPromoCodeWithIdOnly = await prisma.categoryPromoCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryPromoCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryPromoCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CategoryPromoCode.
     * @param {CategoryPromoCodeDeleteArgs} args - Arguments to delete one CategoryPromoCode.
     * @example
     * // Delete one CategoryPromoCode
     * const CategoryPromoCode = await prisma.categoryPromoCode.delete({
     *   where: {
     *     // ... filter to delete one CategoryPromoCode
     *   }
     * })
     * 
     */
    delete<T extends CategoryPromoCodeDeleteArgs>(args: SelectSubset<T, CategoryPromoCodeDeleteArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CategoryPromoCode.
     * @param {CategoryPromoCodeUpdateArgs} args - Arguments to update one CategoryPromoCode.
     * @example
     * // Update one CategoryPromoCode
     * const categoryPromoCode = await prisma.categoryPromoCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryPromoCodeUpdateArgs>(args: SelectSubset<T, CategoryPromoCodeUpdateArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CategoryPromoCodes.
     * @param {CategoryPromoCodeDeleteManyArgs} args - Arguments to filter CategoryPromoCodes to delete.
     * @example
     * // Delete a few CategoryPromoCodes
     * const { count } = await prisma.categoryPromoCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryPromoCodeDeleteManyArgs>(args?: SelectSubset<T, CategoryPromoCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryPromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryPromoCodes
     * const categoryPromoCode = await prisma.categoryPromoCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryPromoCodeUpdateManyArgs>(args: SelectSubset<T, CategoryPromoCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryPromoCodes and returns the data updated in the database.
     * @param {CategoryPromoCodeUpdateManyAndReturnArgs} args - Arguments to update many CategoryPromoCodes.
     * @example
     * // Update many CategoryPromoCodes
     * const categoryPromoCode = await prisma.categoryPromoCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CategoryPromoCodes and only return the `id`
     * const categoryPromoCodeWithIdOnly = await prisma.categoryPromoCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryPromoCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryPromoCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CategoryPromoCode.
     * @param {CategoryPromoCodeUpsertArgs} args - Arguments to update or create a CategoryPromoCode.
     * @example
     * // Update or create a CategoryPromoCode
     * const categoryPromoCode = await prisma.categoryPromoCode.upsert({
     *   create: {
     *     // ... data to create a CategoryPromoCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryPromoCode we want to update
     *   }
     * })
     */
    upsert<T extends CategoryPromoCodeUpsertArgs>(args: SelectSubset<T, CategoryPromoCodeUpsertArgs<ExtArgs>>): Prisma__CategoryPromoCodeClient<$Result.GetResult<Prisma.$CategoryPromoCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CategoryPromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeCountArgs} args - Arguments to filter CategoryPromoCodes to count.
     * @example
     * // Count the number of CategoryPromoCodes
     * const count = await prisma.categoryPromoCode.count({
     *   where: {
     *     // ... the filter for the CategoryPromoCodes we want to count
     *   }
     * })
    **/
    count<T extends CategoryPromoCodeCountArgs>(
      args?: Subset<T, CategoryPromoCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryPromoCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoryPromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryPromoCodeAggregateArgs>(args: Subset<T, CategoryPromoCodeAggregateArgs>): Prisma.PrismaPromise<GetCategoryPromoCodeAggregateType<T>>

    /**
     * Group by CategoryPromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryPromoCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryPromoCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryPromoCodeGroupByArgs['orderBy'] }
        : { orderBy?: CategoryPromoCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryPromoCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryPromoCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoryPromoCode model
   */
  readonly fields: CategoryPromoCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoryPromoCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryPromoCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promoCode<T extends PromoCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PromoCodeDefaultArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategoryPromoCode model
   */ 
  interface CategoryPromoCodeFieldRefs {
    readonly id: FieldRef<"CategoryPromoCode", 'Int'>
    readonly promoCodeId: FieldRef<"CategoryPromoCode", 'Int'>
    readonly categoryId: FieldRef<"CategoryPromoCode", 'Int'>
    readonly storeId: FieldRef<"CategoryPromoCode", 'Int'>
    readonly createdAt: FieldRef<"CategoryPromoCode", 'DateTime'>
    readonly updatedAt: FieldRef<"CategoryPromoCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CategoryPromoCode findUnique
   */
  export type CategoryPromoCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryPromoCode to fetch.
     */
    where: CategoryPromoCodeWhereUniqueInput
  }

  /**
   * CategoryPromoCode findUniqueOrThrow
   */
  export type CategoryPromoCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryPromoCode to fetch.
     */
    where: CategoryPromoCodeWhereUniqueInput
  }

  /**
   * CategoryPromoCode findFirst
   */
  export type CategoryPromoCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryPromoCode to fetch.
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryPromoCodes to fetch.
     */
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryPromoCodes.
     */
    cursor?: CategoryPromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryPromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryPromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryPromoCodes.
     */
    distinct?: CategoryPromoCodeScalarFieldEnum | CategoryPromoCodeScalarFieldEnum[]
  }

  /**
   * CategoryPromoCode findFirstOrThrow
   */
  export type CategoryPromoCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryPromoCode to fetch.
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryPromoCodes to fetch.
     */
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryPromoCodes.
     */
    cursor?: CategoryPromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryPromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryPromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryPromoCodes.
     */
    distinct?: CategoryPromoCodeScalarFieldEnum | CategoryPromoCodeScalarFieldEnum[]
  }

  /**
   * CategoryPromoCode findMany
   */
  export type CategoryPromoCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which CategoryPromoCodes to fetch.
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryPromoCodes to fetch.
     */
    orderBy?: CategoryPromoCodeOrderByWithRelationInput | CategoryPromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoryPromoCodes.
     */
    cursor?: CategoryPromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryPromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryPromoCodes.
     */
    skip?: number
    distinct?: CategoryPromoCodeScalarFieldEnum | CategoryPromoCodeScalarFieldEnum[]
  }

  /**
   * CategoryPromoCode create
   */
  export type CategoryPromoCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoryPromoCode.
     */
    data: XOR<CategoryPromoCodeCreateInput, CategoryPromoCodeUncheckedCreateInput>
  }

  /**
   * CategoryPromoCode createMany
   */
  export type CategoryPromoCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryPromoCodes.
     */
    data: CategoryPromoCodeCreateManyInput | CategoryPromoCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategoryPromoCode createManyAndReturn
   */
  export type CategoryPromoCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * The data used to create many CategoryPromoCodes.
     */
    data: CategoryPromoCodeCreateManyInput | CategoryPromoCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryPromoCode update
   */
  export type CategoryPromoCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoryPromoCode.
     */
    data: XOR<CategoryPromoCodeUpdateInput, CategoryPromoCodeUncheckedUpdateInput>
    /**
     * Choose, which CategoryPromoCode to update.
     */
    where: CategoryPromoCodeWhereUniqueInput
  }

  /**
   * CategoryPromoCode updateMany
   */
  export type CategoryPromoCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryPromoCodes.
     */
    data: XOR<CategoryPromoCodeUpdateManyMutationInput, CategoryPromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which CategoryPromoCodes to update
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * Limit how many CategoryPromoCodes to update.
     */
    limit?: number
  }

  /**
   * CategoryPromoCode updateManyAndReturn
   */
  export type CategoryPromoCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * The data used to update CategoryPromoCodes.
     */
    data: XOR<CategoryPromoCodeUpdateManyMutationInput, CategoryPromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which CategoryPromoCodes to update
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * Limit how many CategoryPromoCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryPromoCode upsert
   */
  export type CategoryPromoCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoryPromoCode to update in case it exists.
     */
    where: CategoryPromoCodeWhereUniqueInput
    /**
     * In case the CategoryPromoCode found by the `where` argument doesn't exist, create a new CategoryPromoCode with this data.
     */
    create: XOR<CategoryPromoCodeCreateInput, CategoryPromoCodeUncheckedCreateInput>
    /**
     * In case the CategoryPromoCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryPromoCodeUpdateInput, CategoryPromoCodeUncheckedUpdateInput>
  }

  /**
   * CategoryPromoCode delete
   */
  export type CategoryPromoCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
    /**
     * Filter which CategoryPromoCode to delete.
     */
    where: CategoryPromoCodeWhereUniqueInput
  }

  /**
   * CategoryPromoCode deleteMany
   */
  export type CategoryPromoCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryPromoCodes to delete
     */
    where?: CategoryPromoCodeWhereInput
    /**
     * Limit how many CategoryPromoCodes to delete.
     */
    limit?: number
  }

  /**
   * CategoryPromoCode without action
   */
  export type CategoryPromoCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryPromoCode
     */
    select?: CategoryPromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryPromoCode
     */
    omit?: CategoryPromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryPromoCodeInclude<ExtArgs> | null
  }


  /**
   * Model StoreBlog
   */

  export type AggregateStoreBlog = {
    _count: StoreBlogCountAggregateOutputType | null
    _avg: StoreBlogAvgAggregateOutputType | null
    _sum: StoreBlogSumAggregateOutputType | null
    _min: StoreBlogMinAggregateOutputType | null
    _max: StoreBlogMaxAggregateOutputType | null
  }

  export type StoreBlogAvgAggregateOutputType = {
    id: number | null
    storeId: number | null
  }

  export type StoreBlogSumAggregateOutputType = {
    id: number | null
    storeId: number | null
  }

  export type StoreBlogMinAggregateOutputType = {
    id: number | null
    storeId: number | null
    publishDate: string | null
    post: string | null
    author: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pubDate: Date | null
  }

  export type StoreBlogMaxAggregateOutputType = {
    id: number | null
    storeId: number | null
    publishDate: string | null
    post: string | null
    author: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pubDate: Date | null
  }

  export type StoreBlogCountAggregateOutputType = {
    id: number
    storeId: number
    publishDate: number
    post: number
    author: number
    createdAt: number
    updatedAt: number
    pubDate: number
    _all: number
  }


  export type StoreBlogAvgAggregateInputType = {
    id?: true
    storeId?: true
  }

  export type StoreBlogSumAggregateInputType = {
    id?: true
    storeId?: true
  }

  export type StoreBlogMinAggregateInputType = {
    id?: true
    storeId?: true
    publishDate?: true
    post?: true
    author?: true
    createdAt?: true
    updatedAt?: true
    pubDate?: true
  }

  export type StoreBlogMaxAggregateInputType = {
    id?: true
    storeId?: true
    publishDate?: true
    post?: true
    author?: true
    createdAt?: true
    updatedAt?: true
    pubDate?: true
  }

  export type StoreBlogCountAggregateInputType = {
    id?: true
    storeId?: true
    publishDate?: true
    post?: true
    author?: true
    createdAt?: true
    updatedAt?: true
    pubDate?: true
    _all?: true
  }

  export type StoreBlogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreBlog to aggregate.
     */
    where?: StoreBlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreBlogs to fetch.
     */
    orderBy?: StoreBlogOrderByWithRelationInput | StoreBlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreBlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreBlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoreBlogs
    **/
    _count?: true | StoreBlogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoreBlogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoreBlogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreBlogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreBlogMaxAggregateInputType
  }

  export type GetStoreBlogAggregateType<T extends StoreBlogAggregateArgs> = {
        [P in keyof T & keyof AggregateStoreBlog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoreBlog[P]>
      : GetScalarType<T[P], AggregateStoreBlog[P]>
  }




  export type StoreBlogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreBlogWhereInput
    orderBy?: StoreBlogOrderByWithAggregationInput | StoreBlogOrderByWithAggregationInput[]
    by: StoreBlogScalarFieldEnum[] | StoreBlogScalarFieldEnum
    having?: StoreBlogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreBlogCountAggregateInputType | true
    _avg?: StoreBlogAvgAggregateInputType
    _sum?: StoreBlogSumAggregateInputType
    _min?: StoreBlogMinAggregateInputType
    _max?: StoreBlogMaxAggregateInputType
  }

  export type StoreBlogGroupByOutputType = {
    id: number
    storeId: number
    publishDate: string
    post: string
    author: string
    createdAt: Date
    updatedAt: Date
    pubDate: Date
    _count: StoreBlogCountAggregateOutputType | null
    _avg: StoreBlogAvgAggregateOutputType | null
    _sum: StoreBlogSumAggregateOutputType | null
    _min: StoreBlogMinAggregateOutputType | null
    _max: StoreBlogMaxAggregateOutputType | null
  }

  type GetStoreBlogGroupByPayload<T extends StoreBlogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreBlogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreBlogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreBlogGroupByOutputType[P]>
            : GetScalarType<T[P], StoreBlogGroupByOutputType[P]>
        }
      >
    >


  export type StoreBlogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    publishDate?: boolean
    post?: boolean
    author?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pubDate?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storeBlog"]>

  export type StoreBlogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    publishDate?: boolean
    post?: boolean
    author?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pubDate?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storeBlog"]>

  export type StoreBlogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    publishDate?: boolean
    post?: boolean
    author?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pubDate?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storeBlog"]>

  export type StoreBlogSelectScalar = {
    id?: boolean
    storeId?: boolean
    publishDate?: boolean
    post?: boolean
    author?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pubDate?: boolean
  }

  export type StoreBlogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "publishDate" | "post" | "author" | "createdAt" | "updatedAt" | "pubDate", ExtArgs["result"]["storeBlog"]>
  export type StoreBlogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StoreBlogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StoreBlogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $StoreBlogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StoreBlog"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      storeId: number
      publishDate: string
      post: string
      author: string
      createdAt: Date
      updatedAt: Date
      pubDate: Date
    }, ExtArgs["result"]["storeBlog"]>
    composites: {}
  }

  type StoreBlogGetPayload<S extends boolean | null | undefined | StoreBlogDefaultArgs> = $Result.GetResult<Prisma.$StoreBlogPayload, S>

  type StoreBlogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreBlogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreBlogCountAggregateInputType | true
    }

  export interface StoreBlogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoreBlog'], meta: { name: 'StoreBlog' } }
    /**
     * Find zero or one StoreBlog that matches the filter.
     * @param {StoreBlogFindUniqueArgs} args - Arguments to find a StoreBlog
     * @example
     * // Get one StoreBlog
     * const storeBlog = await prisma.storeBlog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreBlogFindUniqueArgs>(args: SelectSubset<T, StoreBlogFindUniqueArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StoreBlog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreBlogFindUniqueOrThrowArgs} args - Arguments to find a StoreBlog
     * @example
     * // Get one StoreBlog
     * const storeBlog = await prisma.storeBlog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreBlogFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreBlogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreBlog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogFindFirstArgs} args - Arguments to find a StoreBlog
     * @example
     * // Get one StoreBlog
     * const storeBlog = await prisma.storeBlog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreBlogFindFirstArgs>(args?: SelectSubset<T, StoreBlogFindFirstArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreBlog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogFindFirstOrThrowArgs} args - Arguments to find a StoreBlog
     * @example
     * // Get one StoreBlog
     * const storeBlog = await prisma.storeBlog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreBlogFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreBlogFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StoreBlogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoreBlogs
     * const storeBlogs = await prisma.storeBlog.findMany()
     * 
     * // Get first 10 StoreBlogs
     * const storeBlogs = await prisma.storeBlog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeBlogWithIdOnly = await prisma.storeBlog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreBlogFindManyArgs>(args?: SelectSubset<T, StoreBlogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StoreBlog.
     * @param {StoreBlogCreateArgs} args - Arguments to create a StoreBlog.
     * @example
     * // Create one StoreBlog
     * const StoreBlog = await prisma.storeBlog.create({
     *   data: {
     *     // ... data to create a StoreBlog
     *   }
     * })
     * 
     */
    create<T extends StoreBlogCreateArgs>(args: SelectSubset<T, StoreBlogCreateArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StoreBlogs.
     * @param {StoreBlogCreateManyArgs} args - Arguments to create many StoreBlogs.
     * @example
     * // Create many StoreBlogs
     * const storeBlog = await prisma.storeBlog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreBlogCreateManyArgs>(args?: SelectSubset<T, StoreBlogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoreBlogs and returns the data saved in the database.
     * @param {StoreBlogCreateManyAndReturnArgs} args - Arguments to create many StoreBlogs.
     * @example
     * // Create many StoreBlogs
     * const storeBlog = await prisma.storeBlog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoreBlogs and only return the `id`
     * const storeBlogWithIdOnly = await prisma.storeBlog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreBlogCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreBlogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StoreBlog.
     * @param {StoreBlogDeleteArgs} args - Arguments to delete one StoreBlog.
     * @example
     * // Delete one StoreBlog
     * const StoreBlog = await prisma.storeBlog.delete({
     *   where: {
     *     // ... filter to delete one StoreBlog
     *   }
     * })
     * 
     */
    delete<T extends StoreBlogDeleteArgs>(args: SelectSubset<T, StoreBlogDeleteArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StoreBlog.
     * @param {StoreBlogUpdateArgs} args - Arguments to update one StoreBlog.
     * @example
     * // Update one StoreBlog
     * const storeBlog = await prisma.storeBlog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreBlogUpdateArgs>(args: SelectSubset<T, StoreBlogUpdateArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StoreBlogs.
     * @param {StoreBlogDeleteManyArgs} args - Arguments to filter StoreBlogs to delete.
     * @example
     * // Delete a few StoreBlogs
     * const { count } = await prisma.storeBlog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreBlogDeleteManyArgs>(args?: SelectSubset<T, StoreBlogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreBlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoreBlogs
     * const storeBlog = await prisma.storeBlog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreBlogUpdateManyArgs>(args: SelectSubset<T, StoreBlogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreBlogs and returns the data updated in the database.
     * @param {StoreBlogUpdateManyAndReturnArgs} args - Arguments to update many StoreBlogs.
     * @example
     * // Update many StoreBlogs
     * const storeBlog = await prisma.storeBlog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StoreBlogs and only return the `id`
     * const storeBlogWithIdOnly = await prisma.storeBlog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreBlogUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreBlogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StoreBlog.
     * @param {StoreBlogUpsertArgs} args - Arguments to update or create a StoreBlog.
     * @example
     * // Update or create a StoreBlog
     * const storeBlog = await prisma.storeBlog.upsert({
     *   create: {
     *     // ... data to create a StoreBlog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoreBlog we want to update
     *   }
     * })
     */
    upsert<T extends StoreBlogUpsertArgs>(args: SelectSubset<T, StoreBlogUpsertArgs<ExtArgs>>): Prisma__StoreBlogClient<$Result.GetResult<Prisma.$StoreBlogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StoreBlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogCountArgs} args - Arguments to filter StoreBlogs to count.
     * @example
     * // Count the number of StoreBlogs
     * const count = await prisma.storeBlog.count({
     *   where: {
     *     // ... the filter for the StoreBlogs we want to count
     *   }
     * })
    **/
    count<T extends StoreBlogCountArgs>(
      args?: Subset<T, StoreBlogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreBlogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoreBlog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreBlogAggregateArgs>(args: Subset<T, StoreBlogAggregateArgs>): Prisma.PrismaPromise<GetStoreBlogAggregateType<T>>

    /**
     * Group by StoreBlog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreBlogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreBlogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreBlogGroupByArgs['orderBy'] }
        : { orderBy?: StoreBlogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreBlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreBlogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoreBlog model
   */
  readonly fields: StoreBlogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoreBlog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreBlogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StoreBlog model
   */ 
  interface StoreBlogFieldRefs {
    readonly id: FieldRef<"StoreBlog", 'Int'>
    readonly storeId: FieldRef<"StoreBlog", 'Int'>
    readonly publishDate: FieldRef<"StoreBlog", 'String'>
    readonly post: FieldRef<"StoreBlog", 'String'>
    readonly author: FieldRef<"StoreBlog", 'String'>
    readonly createdAt: FieldRef<"StoreBlog", 'DateTime'>
    readonly updatedAt: FieldRef<"StoreBlog", 'DateTime'>
    readonly pubDate: FieldRef<"StoreBlog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StoreBlog findUnique
   */
  export type StoreBlogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * Filter, which StoreBlog to fetch.
     */
    where: StoreBlogWhereUniqueInput
  }

  /**
   * StoreBlog findUniqueOrThrow
   */
  export type StoreBlogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * Filter, which StoreBlog to fetch.
     */
    where: StoreBlogWhereUniqueInput
  }

  /**
   * StoreBlog findFirst
   */
  export type StoreBlogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * Filter, which StoreBlog to fetch.
     */
    where?: StoreBlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreBlogs to fetch.
     */
    orderBy?: StoreBlogOrderByWithRelationInput | StoreBlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreBlogs.
     */
    cursor?: StoreBlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreBlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreBlogs.
     */
    distinct?: StoreBlogScalarFieldEnum | StoreBlogScalarFieldEnum[]
  }

  /**
   * StoreBlog findFirstOrThrow
   */
  export type StoreBlogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * Filter, which StoreBlog to fetch.
     */
    where?: StoreBlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreBlogs to fetch.
     */
    orderBy?: StoreBlogOrderByWithRelationInput | StoreBlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreBlogs.
     */
    cursor?: StoreBlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreBlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreBlogs.
     */
    distinct?: StoreBlogScalarFieldEnum | StoreBlogScalarFieldEnum[]
  }

  /**
   * StoreBlog findMany
   */
  export type StoreBlogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * Filter, which StoreBlogs to fetch.
     */
    where?: StoreBlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreBlogs to fetch.
     */
    orderBy?: StoreBlogOrderByWithRelationInput | StoreBlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoreBlogs.
     */
    cursor?: StoreBlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreBlogs.
     */
    skip?: number
    distinct?: StoreBlogScalarFieldEnum | StoreBlogScalarFieldEnum[]
  }

  /**
   * StoreBlog create
   */
  export type StoreBlogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * The data needed to create a StoreBlog.
     */
    data: XOR<StoreBlogCreateInput, StoreBlogUncheckedCreateInput>
  }

  /**
   * StoreBlog createMany
   */
  export type StoreBlogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoreBlogs.
     */
    data: StoreBlogCreateManyInput | StoreBlogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreBlog createManyAndReturn
   */
  export type StoreBlogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * The data used to create many StoreBlogs.
     */
    data: StoreBlogCreateManyInput | StoreBlogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoreBlog update
   */
  export type StoreBlogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * The data needed to update a StoreBlog.
     */
    data: XOR<StoreBlogUpdateInput, StoreBlogUncheckedUpdateInput>
    /**
     * Choose, which StoreBlog to update.
     */
    where: StoreBlogWhereUniqueInput
  }

  /**
   * StoreBlog updateMany
   */
  export type StoreBlogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StoreBlogs.
     */
    data: XOR<StoreBlogUpdateManyMutationInput, StoreBlogUncheckedUpdateManyInput>
    /**
     * Filter which StoreBlogs to update
     */
    where?: StoreBlogWhereInput
    /**
     * Limit how many StoreBlogs to update.
     */
    limit?: number
  }

  /**
   * StoreBlog updateManyAndReturn
   */
  export type StoreBlogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * The data used to update StoreBlogs.
     */
    data: XOR<StoreBlogUpdateManyMutationInput, StoreBlogUncheckedUpdateManyInput>
    /**
     * Filter which StoreBlogs to update
     */
    where?: StoreBlogWhereInput
    /**
     * Limit how many StoreBlogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoreBlog upsert
   */
  export type StoreBlogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * The filter to search for the StoreBlog to update in case it exists.
     */
    where: StoreBlogWhereUniqueInput
    /**
     * In case the StoreBlog found by the `where` argument doesn't exist, create a new StoreBlog with this data.
     */
    create: XOR<StoreBlogCreateInput, StoreBlogUncheckedCreateInput>
    /**
     * In case the StoreBlog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreBlogUpdateInput, StoreBlogUncheckedUpdateInput>
  }

  /**
   * StoreBlog delete
   */
  export type StoreBlogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
    /**
     * Filter which StoreBlog to delete.
     */
    where: StoreBlogWhereUniqueInput
  }

  /**
   * StoreBlog deleteMany
   */
  export type StoreBlogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreBlogs to delete
     */
    where?: StoreBlogWhereInput
    /**
     * Limit how many StoreBlogs to delete.
     */
    limit?: number
  }

  /**
   * StoreBlog without action
   */
  export type StoreBlogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreBlog
     */
    select?: StoreBlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreBlog
     */
    omit?: StoreBlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreBlogInclude<ExtArgs> | null
  }


  /**
   * Model Subscriber
   */

  export type AggregateSubscriber = {
    _count: SubscriberCountAggregateOutputType | null
    _avg: SubscriberAvgAggregateOutputType | null
    _sum: SubscriberSumAggregateOutputType | null
    _min: SubscriberMinAggregateOutputType | null
    _max: SubscriberMaxAggregateOutputType | null
  }

  export type SubscriberAvgAggregateOutputType = {
    id: number | null
  }

  export type SubscriberSumAggregateOutputType = {
    id: number | null
  }

  export type SubscriberMinAggregateOutputType = {
    id: number | null
    email: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriberMaxAggregateOutputType = {
    id: number | null
    email: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriberCountAggregateOutputType = {
    id: number
    email: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriberAvgAggregateInputType = {
    id?: true
  }

  export type SubscriberSumAggregateInputType = {
    id?: true
  }

  export type SubscriberMinAggregateInputType = {
    id?: true
    email?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriberMaxAggregateInputType = {
    id?: true
    email?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriberCountAggregateInputType = {
    id?: true
    email?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriber to aggregate.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscribers
    **/
    _count?: true | SubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriberMaxAggregateInputType
  }

  export type GetSubscriberAggregateType<T extends SubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriber[P]>
      : GetScalarType<T[P], AggregateSubscriber[P]>
  }




  export type SubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriberWhereInput
    orderBy?: SubscriberOrderByWithAggregationInput | SubscriberOrderByWithAggregationInput[]
    by: SubscriberScalarFieldEnum[] | SubscriberScalarFieldEnum
    having?: SubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriberCountAggregateInputType | true
    _avg?: SubscriberAvgAggregateInputType
    _sum?: SubscriberSumAggregateInputType
    _min?: SubscriberMinAggregateInputType
    _max?: SubscriberMaxAggregateInputType
  }

  export type SubscriberGroupByOutputType = {
    id: number
    email: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: SubscriberCountAggregateOutputType | null
    _avg: SubscriberAvgAggregateOutputType | null
    _sum: SubscriberSumAggregateOutputType | null
    _min: SubscriberMinAggregateOutputType | null
    _max: SubscriberMaxAggregateOutputType | null
  }

  type GetSubscriberGroupByPayload<T extends SubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriberGroupByOutputType[P]>
        }
      >
    >


  export type SubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subscriber"]>

  export type SubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subscriber"]>

  export type SubscriberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subscriber"]>

  export type SubscriberSelectScalar = {
    id?: boolean
    email?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["subscriber"]>

  export type $SubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscriber"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscriber"]>
    composites: {}
  }

  type SubscriberGetPayload<S extends boolean | null | undefined | SubscriberDefaultArgs> = $Result.GetResult<Prisma.$SubscriberPayload, S>

  type SubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriberCountAggregateInputType | true
    }

  export interface SubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscriber'], meta: { name: 'Subscriber' } }
    /**
     * Find zero or one Subscriber that matches the filter.
     * @param {SubscriberFindUniqueArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriberFindUniqueArgs>(args: SelectSubset<T, SubscriberFindUniqueArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriberFindUniqueOrThrowArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberFindFirstArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriberFindFirstArgs>(args?: SelectSubset<T, SubscriberFindFirstArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberFindFirstOrThrowArgs} args - Arguments to find a Subscriber
     * @example
     * // Get one Subscriber
     * const subscriber = await prisma.subscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscribers
     * const subscribers = await prisma.subscriber.findMany()
     * 
     * // Get first 10 Subscribers
     * const subscribers = await prisma.subscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriberWithIdOnly = await prisma.subscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriberFindManyArgs>(args?: SelectSubset<T, SubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriber.
     * @param {SubscriberCreateArgs} args - Arguments to create a Subscriber.
     * @example
     * // Create one Subscriber
     * const Subscriber = await prisma.subscriber.create({
     *   data: {
     *     // ... data to create a Subscriber
     *   }
     * })
     * 
     */
    create<T extends SubscriberCreateArgs>(args: SelectSubset<T, SubscriberCreateArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscribers.
     * @param {SubscriberCreateManyArgs} args - Arguments to create many Subscribers.
     * @example
     * // Create many Subscribers
     * const subscriber = await prisma.subscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriberCreateManyArgs>(args?: SelectSubset<T, SubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscribers and returns the data saved in the database.
     * @param {SubscriberCreateManyAndReturnArgs} args - Arguments to create many Subscribers.
     * @example
     * // Create many Subscribers
     * const subscriber = await prisma.subscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscribers and only return the `id`
     * const subscriberWithIdOnly = await prisma.subscriber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriber.
     * @param {SubscriberDeleteArgs} args - Arguments to delete one Subscriber.
     * @example
     * // Delete one Subscriber
     * const Subscriber = await prisma.subscriber.delete({
     *   where: {
     *     // ... filter to delete one Subscriber
     *   }
     * })
     * 
     */
    delete<T extends SubscriberDeleteArgs>(args: SelectSubset<T, SubscriberDeleteArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriber.
     * @param {SubscriberUpdateArgs} args - Arguments to update one Subscriber.
     * @example
     * // Update one Subscriber
     * const subscriber = await prisma.subscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriberUpdateArgs>(args: SelectSubset<T, SubscriberUpdateArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscribers.
     * @param {SubscriberDeleteManyArgs} args - Arguments to filter Subscribers to delete.
     * @example
     * // Delete a few Subscribers
     * const { count } = await prisma.subscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriberDeleteManyArgs>(args?: SelectSubset<T, SubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscribers
     * const subscriber = await prisma.subscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriberUpdateManyArgs>(args: SelectSubset<T, SubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers and returns the data updated in the database.
     * @param {SubscriberUpdateManyAndReturnArgs} args - Arguments to update many Subscribers.
     * @example
     * // Update many Subscribers
     * const subscriber = await prisma.subscriber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscribers and only return the `id`
     * const subscriberWithIdOnly = await prisma.subscriber.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriberUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriber.
     * @param {SubscriberUpsertArgs} args - Arguments to update or create a Subscriber.
     * @example
     * // Update or create a Subscriber
     * const subscriber = await prisma.subscriber.upsert({
     *   create: {
     *     // ... data to create a Subscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriber we want to update
     *   }
     * })
     */
    upsert<T extends SubscriberUpsertArgs>(args: SelectSubset<T, SubscriberUpsertArgs<ExtArgs>>): Prisma__SubscriberClient<$Result.GetResult<Prisma.$SubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberCountArgs} args - Arguments to filter Subscribers to count.
     * @example
     * // Count the number of Subscribers
     * const count = await prisma.subscriber.count({
     *   where: {
     *     // ... the filter for the Subscribers we want to count
     *   }
     * })
    **/
    count<T extends SubscriberCountArgs>(
      args?: Subset<T, SubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriberAggregateArgs>(args: Subset<T, SubscriberAggregateArgs>): Prisma.PrismaPromise<GetSubscriberAggregateType<T>>

    /**
     * Group by Subscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriberGroupByArgs['orderBy'] }
        : { orderBy?: SubscriberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscriber model
   */
  readonly fields: SubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscriber model
   */ 
  interface SubscriberFieldRefs {
    readonly id: FieldRef<"Subscriber", 'Int'>
    readonly email: FieldRef<"Subscriber", 'String'>
    readonly active: FieldRef<"Subscriber", 'Boolean'>
    readonly createdAt: FieldRef<"Subscriber", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscriber findUnique
   */
  export type SubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber findUniqueOrThrow
   */
  export type SubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber findFirst
   */
  export type SubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscribers.
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscribers.
     */
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Subscriber findFirstOrThrow
   */
  export type SubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Filter, which Subscriber to fetch.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscribers.
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscribers.
     */
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Subscriber findMany
   */
  export type SubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where?: SubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscriberOrderByWithRelationInput | SubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscribers.
     */
    cursor?: SubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    distinct?: SubscriberScalarFieldEnum | SubscriberScalarFieldEnum[]
  }

  /**
   * Subscriber create
   */
  export type SubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The data needed to create a Subscriber.
     */
    data: XOR<SubscriberCreateInput, SubscriberUncheckedCreateInput>
  }

  /**
   * Subscriber createMany
   */
  export type SubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscribers.
     */
    data: SubscriberCreateManyInput | SubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscriber createManyAndReturn
   */
  export type SubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The data used to create many Subscribers.
     */
    data: SubscriberCreateManyInput | SubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscriber update
   */
  export type SubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The data needed to update a Subscriber.
     */
    data: XOR<SubscriberUpdateInput, SubscriberUncheckedUpdateInput>
    /**
     * Choose, which Subscriber to update.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber updateMany
   */
  export type SubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscribers.
     */
    data: XOR<SubscriberUpdateManyMutationInput, SubscriberUncheckedUpdateManyInput>
    /**
     * Filter which Subscribers to update
     */
    where?: SubscriberWhereInput
    /**
     * Limit how many Subscribers to update.
     */
    limit?: number
  }

  /**
   * Subscriber updateManyAndReturn
   */
  export type SubscriberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The data used to update Subscribers.
     */
    data: XOR<SubscriberUpdateManyMutationInput, SubscriberUncheckedUpdateManyInput>
    /**
     * Filter which Subscribers to update
     */
    where?: SubscriberWhereInput
    /**
     * Limit how many Subscribers to update.
     */
    limit?: number
  }

  /**
   * Subscriber upsert
   */
  export type SubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * The filter to search for the Subscriber to update in case it exists.
     */
    where: SubscriberWhereUniqueInput
    /**
     * In case the Subscriber found by the `where` argument doesn't exist, create a new Subscriber with this data.
     */
    create: XOR<SubscriberCreateInput, SubscriberUncheckedCreateInput>
    /**
     * In case the Subscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriberUpdateInput, SubscriberUncheckedUpdateInput>
  }

  /**
   * Subscriber delete
   */
  export type SubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
    /**
     * Filter which Subscriber to delete.
     */
    where: SubscriberWhereUniqueInput
  }

  /**
   * Subscriber deleteMany
   */
  export type SubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscribers to delete
     */
    where?: SubscriberWhereInput
    /**
     * Limit how many Subscribers to delete.
     */
    limit?: number
  }

  /**
   * Subscriber without action
   */
  export type SubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber
     */
    select?: SubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscriber
     */
    omit?: SubscriberOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    googleId: 'googleId',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StoreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    description: 'description',
    active: 'active',
    userSubmit: 'userSubmit',
    metaKeywords: 'metaKeywords',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    slug: 'slug',
    topStore: 'topStore',
    oldSlug: 'oldSlug',
    searchTerms: 'searchTerms',
    networkId: 'networkId',
    network: 'network',
    domain: 'domain',
    viglinkId: 'viglinkId',
    viglinkGroupId: 'viglinkGroupId',
    viglinkName: 'viglinkName',
    paths: 'paths'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    metaKeywords: 'metaKeywords',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    slug: 'slug'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const PromoCodeScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    title: 'title',
    description: 'description',
    starts: 'starts',
    code: 'code',
    link: 'link',
    homepage: 'homepage',
    freeShipping: 'freeShipping',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expires: 'expires',
    userSubmit: 'userSubmit',
    approved: 'approved',
    orderId: 'orderId'
  };

  export type PromoCodeScalarFieldEnum = (typeof PromoCodeScalarFieldEnum)[keyof typeof PromoCodeScalarFieldEnum]


  export const CategoryPromoCodeScalarFieldEnum: {
    id: 'id',
    promoCodeId: 'promoCodeId',
    categoryId: 'categoryId',
    storeId: 'storeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryPromoCodeScalarFieldEnum = (typeof CategoryPromoCodeScalarFieldEnum)[keyof typeof CategoryPromoCodeScalarFieldEnum]


  export const StoreBlogScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    publishDate: 'publishDate',
    post: 'post',
    author: 'author',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pubDate: 'pubDate'
  };

  export type StoreBlogScalarFieldEnum = (typeof StoreBlogScalarFieldEnum)[keyof typeof StoreBlogScalarFieldEnum]


  export const SubscriberScalarFieldEnum: {
    id: 'id',
    email: 'email',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriberScalarFieldEnum = (typeof SubscriberScalarFieldEnum)[keyof typeof SubscriberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    googleId?: StringNullableFilter<"User"> | string | null
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StoreWhereInput = {
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    id?: IntFilter<"Store"> | number
    name?: StringFilter<"Store"> | string
    url?: StringFilter<"Store"> | string
    description?: StringNullableFilter<"Store"> | string | null
    active?: BoolFilter<"Store"> | boolean
    userSubmit?: BoolFilter<"Store"> | boolean
    metaKeywords?: StringNullableFilter<"Store"> | string | null
    metaTitle?: StringNullableFilter<"Store"> | string | null
    metaDescription?: StringNullableFilter<"Store"> | string | null
    categoryId?: IntNullableFilter<"Store"> | number | null
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    slug?: StringFilter<"Store"> | string
    topStore?: BoolFilter<"Store"> | boolean
    oldSlug?: StringNullableFilter<"Store"> | string | null
    searchTerms?: StringNullableFilter<"Store"> | string | null
    networkId?: StringNullableFilter<"Store"> | string | null
    network?: StringNullableFilter<"Store"> | string | null
    domain?: StringNullableFilter<"Store"> | string | null
    viglinkId?: IntNullableFilter<"Store"> | number | null
    viglinkGroupId?: IntNullableFilter<"Store"> | number | null
    viglinkName?: StringNullableFilter<"Store"> | string | null
    paths?: StringNullableFilter<"Store"> | string | null
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    promoCodes?: PromoCodeListRelationFilter
    blogs?: StoreBlogListRelationFilter
    categoryPromoCodes?: CategoryPromoCodeListRelationFilter
  }

  export type StoreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    active?: SortOrder
    userSubmit?: SortOrder
    metaKeywords?: SortOrderInput | SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    topStore?: SortOrder
    oldSlug?: SortOrderInput | SortOrder
    searchTerms?: SortOrderInput | SortOrder
    networkId?: SortOrderInput | SortOrder
    network?: SortOrderInput | SortOrder
    domain?: SortOrderInput | SortOrder
    viglinkId?: SortOrderInput | SortOrder
    viglinkGroupId?: SortOrderInput | SortOrder
    viglinkName?: SortOrderInput | SortOrder
    paths?: SortOrderInput | SortOrder
    category?: CategoryOrderByWithRelationInput
    promoCodes?: PromoCodeOrderByRelationAggregateInput
    blogs?: StoreBlogOrderByRelationAggregateInput
    categoryPromoCodes?: CategoryPromoCodeOrderByRelationAggregateInput
  }

  export type StoreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    name?: StringFilter<"Store"> | string
    url?: StringFilter<"Store"> | string
    description?: StringNullableFilter<"Store"> | string | null
    active?: BoolFilter<"Store"> | boolean
    userSubmit?: BoolFilter<"Store"> | boolean
    metaKeywords?: StringNullableFilter<"Store"> | string | null
    metaTitle?: StringNullableFilter<"Store"> | string | null
    metaDescription?: StringNullableFilter<"Store"> | string | null
    categoryId?: IntNullableFilter<"Store"> | number | null
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    topStore?: BoolFilter<"Store"> | boolean
    oldSlug?: StringNullableFilter<"Store"> | string | null
    searchTerms?: StringNullableFilter<"Store"> | string | null
    networkId?: StringNullableFilter<"Store"> | string | null
    network?: StringNullableFilter<"Store"> | string | null
    domain?: StringNullableFilter<"Store"> | string | null
    viglinkId?: IntNullableFilter<"Store"> | number | null
    viglinkGroupId?: IntNullableFilter<"Store"> | number | null
    viglinkName?: StringNullableFilter<"Store"> | string | null
    paths?: StringNullableFilter<"Store"> | string | null
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    promoCodes?: PromoCodeListRelationFilter
    blogs?: StoreBlogListRelationFilter
    categoryPromoCodes?: CategoryPromoCodeListRelationFilter
  }, "id" | "slug">

  export type StoreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    active?: SortOrder
    userSubmit?: SortOrder
    metaKeywords?: SortOrderInput | SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    topStore?: SortOrder
    oldSlug?: SortOrderInput | SortOrder
    searchTerms?: SortOrderInput | SortOrder
    networkId?: SortOrderInput | SortOrder
    network?: SortOrderInput | SortOrder
    domain?: SortOrderInput | SortOrder
    viglinkId?: SortOrderInput | SortOrder
    viglinkGroupId?: SortOrderInput | SortOrder
    viglinkName?: SortOrderInput | SortOrder
    paths?: SortOrderInput | SortOrder
    _count?: StoreCountOrderByAggregateInput
    _avg?: StoreAvgOrderByAggregateInput
    _max?: StoreMaxOrderByAggregateInput
    _min?: StoreMinOrderByAggregateInput
    _sum?: StoreSumOrderByAggregateInput
  }

  export type StoreScalarWhereWithAggregatesInput = {
    AND?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    OR?: StoreScalarWhereWithAggregatesInput[]
    NOT?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Store"> | number
    name?: StringWithAggregatesFilter<"Store"> | string
    url?: StringWithAggregatesFilter<"Store"> | string
    description?: StringNullableWithAggregatesFilter<"Store"> | string | null
    active?: BoolWithAggregatesFilter<"Store"> | boolean
    userSubmit?: BoolWithAggregatesFilter<"Store"> | boolean
    metaKeywords?: StringNullableWithAggregatesFilter<"Store"> | string | null
    metaTitle?: StringNullableWithAggregatesFilter<"Store"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"Store"> | string | null
    categoryId?: IntNullableWithAggregatesFilter<"Store"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    slug?: StringWithAggregatesFilter<"Store"> | string
    topStore?: BoolWithAggregatesFilter<"Store"> | boolean
    oldSlug?: StringNullableWithAggregatesFilter<"Store"> | string | null
    searchTerms?: StringNullableWithAggregatesFilter<"Store"> | string | null
    networkId?: StringNullableWithAggregatesFilter<"Store"> | string | null
    network?: StringNullableWithAggregatesFilter<"Store"> | string | null
    domain?: StringNullableWithAggregatesFilter<"Store"> | string | null
    viglinkId?: IntNullableWithAggregatesFilter<"Store"> | number | null
    viglinkGroupId?: IntNullableWithAggregatesFilter<"Store"> | number | null
    viglinkName?: StringNullableWithAggregatesFilter<"Store"> | string | null
    paths?: StringNullableWithAggregatesFilter<"Store"> | string | null
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    metaKeywords?: StringNullableFilter<"Category"> | string | null
    metaTitle?: StringNullableFilter<"Category"> | string | null
    metaDescription?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    slug?: StringFilter<"Category"> | string
    stores?: StoreListRelationFilter
    promoCodes?: CategoryPromoCodeListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    metaKeywords?: SortOrderInput | SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    stores?: StoreOrderByRelationAggregateInput
    promoCodes?: CategoryPromoCodeOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    metaKeywords?: StringNullableFilter<"Category"> | string | null
    metaTitle?: StringNullableFilter<"Category"> | string | null
    metaDescription?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    stores?: StoreListRelationFilter
    promoCodes?: CategoryPromoCodeListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    metaKeywords?: SortOrderInput | SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    metaKeywords?: StringNullableWithAggregatesFilter<"Category"> | string | null
    metaTitle?: StringNullableWithAggregatesFilter<"Category"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    slug?: StringWithAggregatesFilter<"Category"> | string
  }

  export type PromoCodeWhereInput = {
    AND?: PromoCodeWhereInput | PromoCodeWhereInput[]
    OR?: PromoCodeWhereInput[]
    NOT?: PromoCodeWhereInput | PromoCodeWhereInput[]
    id?: IntFilter<"PromoCode"> | number
    storeId?: IntFilter<"PromoCode"> | number
    title?: StringFilter<"PromoCode"> | string
    description?: StringNullableFilter<"PromoCode"> | string | null
    starts?: DateTimeFilter<"PromoCode"> | Date | string
    code?: StringFilter<"PromoCode"> | string
    link?: StringFilter<"PromoCode"> | string
    homepage?: BoolFilter<"PromoCode"> | boolean
    freeShipping?: BoolFilter<"PromoCode"> | boolean
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"PromoCode"> | Date | string
    expires?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    userSubmit?: BoolFilter<"PromoCode"> | boolean
    approved?: BoolFilter<"PromoCode"> | boolean
    orderId?: IntNullableFilter<"PromoCode"> | number | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    categories?: CategoryPromoCodeListRelationFilter
  }

  export type PromoCodeOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    starts?: SortOrder
    code?: SortOrder
    link?: SortOrder
    homepage?: SortOrder
    freeShipping?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expires?: SortOrderInput | SortOrder
    userSubmit?: SortOrder
    approved?: SortOrder
    orderId?: SortOrderInput | SortOrder
    store?: StoreOrderByWithRelationInput
    categories?: CategoryPromoCodeOrderByRelationAggregateInput
  }

  export type PromoCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PromoCodeWhereInput | PromoCodeWhereInput[]
    OR?: PromoCodeWhereInput[]
    NOT?: PromoCodeWhereInput | PromoCodeWhereInput[]
    storeId?: IntFilter<"PromoCode"> | number
    title?: StringFilter<"PromoCode"> | string
    description?: StringNullableFilter<"PromoCode"> | string | null
    starts?: DateTimeFilter<"PromoCode"> | Date | string
    code?: StringFilter<"PromoCode"> | string
    link?: StringFilter<"PromoCode"> | string
    homepage?: BoolFilter<"PromoCode"> | boolean
    freeShipping?: BoolFilter<"PromoCode"> | boolean
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"PromoCode"> | Date | string
    expires?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    userSubmit?: BoolFilter<"PromoCode"> | boolean
    approved?: BoolFilter<"PromoCode"> | boolean
    orderId?: IntNullableFilter<"PromoCode"> | number | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    categories?: CategoryPromoCodeListRelationFilter
  }, "id">

  export type PromoCodeOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    starts?: SortOrder
    code?: SortOrder
    link?: SortOrder
    homepage?: SortOrder
    freeShipping?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expires?: SortOrderInput | SortOrder
    userSubmit?: SortOrder
    approved?: SortOrder
    orderId?: SortOrderInput | SortOrder
    _count?: PromoCodeCountOrderByAggregateInput
    _avg?: PromoCodeAvgOrderByAggregateInput
    _max?: PromoCodeMaxOrderByAggregateInput
    _min?: PromoCodeMinOrderByAggregateInput
    _sum?: PromoCodeSumOrderByAggregateInput
  }

  export type PromoCodeScalarWhereWithAggregatesInput = {
    AND?: PromoCodeScalarWhereWithAggregatesInput | PromoCodeScalarWhereWithAggregatesInput[]
    OR?: PromoCodeScalarWhereWithAggregatesInput[]
    NOT?: PromoCodeScalarWhereWithAggregatesInput | PromoCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PromoCode"> | number
    storeId?: IntWithAggregatesFilter<"PromoCode"> | number
    title?: StringWithAggregatesFilter<"PromoCode"> | string
    description?: StringNullableWithAggregatesFilter<"PromoCode"> | string | null
    starts?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
    code?: StringWithAggregatesFilter<"PromoCode"> | string
    link?: StringWithAggregatesFilter<"PromoCode"> | string
    homepage?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    freeShipping?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
    expires?: DateTimeNullableWithAggregatesFilter<"PromoCode"> | Date | string | null
    userSubmit?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    approved?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    orderId?: IntNullableWithAggregatesFilter<"PromoCode"> | number | null
  }

  export type CategoryPromoCodeWhereInput = {
    AND?: CategoryPromoCodeWhereInput | CategoryPromoCodeWhereInput[]
    OR?: CategoryPromoCodeWhereInput[]
    NOT?: CategoryPromoCodeWhereInput | CategoryPromoCodeWhereInput[]
    id?: IntFilter<"CategoryPromoCode"> | number
    promoCodeId?: IntFilter<"CategoryPromoCode"> | number
    categoryId?: IntFilter<"CategoryPromoCode"> | number
    storeId?: IntFilter<"CategoryPromoCode"> | number
    createdAt?: DateTimeFilter<"CategoryPromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryPromoCode"> | Date | string
    promoCode?: XOR<PromoCodeScalarRelationFilter, PromoCodeWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type CategoryPromoCodeOrderByWithRelationInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoCode?: PromoCodeOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type CategoryPromoCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    promoCodeId_categoryId?: CategoryPromoCodePromoCodeIdCategoryIdCompoundUniqueInput
    AND?: CategoryPromoCodeWhereInput | CategoryPromoCodeWhereInput[]
    OR?: CategoryPromoCodeWhereInput[]
    NOT?: CategoryPromoCodeWhereInput | CategoryPromoCodeWhereInput[]
    promoCodeId?: IntFilter<"CategoryPromoCode"> | number
    categoryId?: IntFilter<"CategoryPromoCode"> | number
    storeId?: IntFilter<"CategoryPromoCode"> | number
    createdAt?: DateTimeFilter<"CategoryPromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryPromoCode"> | Date | string
    promoCode?: XOR<PromoCodeScalarRelationFilter, PromoCodeWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id" | "promoCodeId_categoryId">

  export type CategoryPromoCodeOrderByWithAggregationInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryPromoCodeCountOrderByAggregateInput
    _avg?: CategoryPromoCodeAvgOrderByAggregateInput
    _max?: CategoryPromoCodeMaxOrderByAggregateInput
    _min?: CategoryPromoCodeMinOrderByAggregateInput
    _sum?: CategoryPromoCodeSumOrderByAggregateInput
  }

  export type CategoryPromoCodeScalarWhereWithAggregatesInput = {
    AND?: CategoryPromoCodeScalarWhereWithAggregatesInput | CategoryPromoCodeScalarWhereWithAggregatesInput[]
    OR?: CategoryPromoCodeScalarWhereWithAggregatesInput[]
    NOT?: CategoryPromoCodeScalarWhereWithAggregatesInput | CategoryPromoCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CategoryPromoCode"> | number
    promoCodeId?: IntWithAggregatesFilter<"CategoryPromoCode"> | number
    categoryId?: IntWithAggregatesFilter<"CategoryPromoCode"> | number
    storeId?: IntWithAggregatesFilter<"CategoryPromoCode"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CategoryPromoCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CategoryPromoCode"> | Date | string
  }

  export type StoreBlogWhereInput = {
    AND?: StoreBlogWhereInput | StoreBlogWhereInput[]
    OR?: StoreBlogWhereInput[]
    NOT?: StoreBlogWhereInput | StoreBlogWhereInput[]
    id?: IntFilter<"StoreBlog"> | number
    storeId?: IntFilter<"StoreBlog"> | number
    publishDate?: StringFilter<"StoreBlog"> | string
    post?: StringFilter<"StoreBlog"> | string
    author?: StringFilter<"StoreBlog"> | string
    createdAt?: DateTimeFilter<"StoreBlog"> | Date | string
    updatedAt?: DateTimeFilter<"StoreBlog"> | Date | string
    pubDate?: DateTimeFilter<"StoreBlog"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type StoreBlogOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    publishDate?: SortOrder
    post?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pubDate?: SortOrder
    store?: StoreOrderByWithRelationInput
  }

  export type StoreBlogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StoreBlogWhereInput | StoreBlogWhereInput[]
    OR?: StoreBlogWhereInput[]
    NOT?: StoreBlogWhereInput | StoreBlogWhereInput[]
    storeId?: IntFilter<"StoreBlog"> | number
    publishDate?: StringFilter<"StoreBlog"> | string
    post?: StringFilter<"StoreBlog"> | string
    author?: StringFilter<"StoreBlog"> | string
    createdAt?: DateTimeFilter<"StoreBlog"> | Date | string
    updatedAt?: DateTimeFilter<"StoreBlog"> | Date | string
    pubDate?: DateTimeFilter<"StoreBlog"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id">

  export type StoreBlogOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    publishDate?: SortOrder
    post?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pubDate?: SortOrder
    _count?: StoreBlogCountOrderByAggregateInput
    _avg?: StoreBlogAvgOrderByAggregateInput
    _max?: StoreBlogMaxOrderByAggregateInput
    _min?: StoreBlogMinOrderByAggregateInput
    _sum?: StoreBlogSumOrderByAggregateInput
  }

  export type StoreBlogScalarWhereWithAggregatesInput = {
    AND?: StoreBlogScalarWhereWithAggregatesInput | StoreBlogScalarWhereWithAggregatesInput[]
    OR?: StoreBlogScalarWhereWithAggregatesInput[]
    NOT?: StoreBlogScalarWhereWithAggregatesInput | StoreBlogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StoreBlog"> | number
    storeId?: IntWithAggregatesFilter<"StoreBlog"> | number
    publishDate?: StringWithAggregatesFilter<"StoreBlog"> | string
    post?: StringWithAggregatesFilter<"StoreBlog"> | string
    author?: StringWithAggregatesFilter<"StoreBlog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StoreBlog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StoreBlog"> | Date | string
    pubDate?: DateTimeWithAggregatesFilter<"StoreBlog"> | Date | string
  }

  export type SubscriberWhereInput = {
    AND?: SubscriberWhereInput | SubscriberWhereInput[]
    OR?: SubscriberWhereInput[]
    NOT?: SubscriberWhereInput | SubscriberWhereInput[]
    id?: IntFilter<"Subscriber"> | number
    email?: StringFilter<"Subscriber"> | string
    active?: BoolFilter<"Subscriber"> | boolean
    createdAt?: DateTimeFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeFilter<"Subscriber"> | Date | string
  }

  export type SubscriberOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: SubscriberWhereInput | SubscriberWhereInput[]
    OR?: SubscriberWhereInput[]
    NOT?: SubscriberWhereInput | SubscriberWhereInput[]
    active?: BoolFilter<"Subscriber"> | boolean
    createdAt?: DateTimeFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeFilter<"Subscriber"> | Date | string
  }, "id" | "email">

  export type SubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriberCountOrderByAggregateInput
    _avg?: SubscriberAvgOrderByAggregateInput
    _max?: SubscriberMaxOrderByAggregateInput
    _min?: SubscriberMinOrderByAggregateInput
    _sum?: SubscriberSumOrderByAggregateInput
  }

  export type SubscriberScalarWhereWithAggregatesInput = {
    AND?: SubscriberScalarWhereWithAggregatesInput | SubscriberScalarWhereWithAggregatesInput[]
    OR?: SubscriberScalarWhereWithAggregatesInput[]
    NOT?: SubscriberScalarWhereWithAggregatesInput | SubscriberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subscriber"> | number
    email?: StringWithAggregatesFilter<"Subscriber"> | string
    active?: BoolWithAggregatesFilter<"Subscriber"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Subscriber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscriber"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    email: string
    password: string
    googleId?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    googleId?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    googleId?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreCreateInput = {
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    category?: CategoryCreateNestedOneWithoutStoresInput
    promoCodes?: PromoCodeCreateNestedManyWithoutStoreInput
    blogs?: StoreBlogCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    promoCodes?: PromoCodeUncheckedCreateNestedManyWithoutStoreInput
    blogs?: StoreBlogUncheckedCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutStoresNestedInput
    promoCodes?: PromoCodeUpdateManyWithoutStoreNestedInput
    blogs?: StoreBlogUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    promoCodes?: PromoCodeUncheckedUpdateManyWithoutStoreNestedInput
    blogs?: StoreBlogUncheckedUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
  }

  export type StoreUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StoreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryCreateInput = {
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    stores?: StoreCreateNestedManyWithoutCategoryInput
    promoCodes?: CategoryPromoCodeCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    stores?: StoreUncheckedCreateNestedManyWithoutCategoryInput
    promoCodes?: CategoryPromoCodeUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    stores?: StoreUpdateManyWithoutCategoryNestedInput
    promoCodes?: CategoryPromoCodeUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    stores?: StoreUncheckedUpdateManyWithoutCategoryNestedInput
    promoCodes?: CategoryPromoCodeUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type PromoCodeCreateInput = {
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
    store: StoreCreateNestedOneWithoutPromoCodesInput
    categories?: CategoryPromoCodeCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateInput = {
    id?: number
    storeId: number
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
    categories?: CategoryPromoCodeUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    store?: StoreUpdateOneRequiredWithoutPromoCodesNestedInput
    categories?: CategoryPromoCodeUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    categories?: CategoryPromoCodeUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeCreateManyInput = {
    id?: number
    storeId: number
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
  }

  export type PromoCodeUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PromoCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CategoryPromoCodeCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutPromoCodesInput
    store: StoreCreateNestedOneWithoutCategoryPromoCodesInput
  }

  export type CategoryPromoCodeUncheckedCreateInput = {
    id?: number
    promoCodeId: number
    categoryId: number
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryPromoCodeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutPromoCodesNestedInput
    store?: StoreUpdateOneRequiredWithoutCategoryPromoCodesNestedInput
  }

  export type CategoryPromoCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeCreateManyInput = {
    id?: number
    promoCodeId: number
    categoryId: number
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryPromoCodeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreBlogCreateInput = {
    publishDate: string
    post: string
    author?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pubDate: Date | string
    store: StoreCreateNestedOneWithoutBlogsInput
  }

  export type StoreBlogUncheckedCreateInput = {
    id?: number
    storeId: number
    publishDate: string
    post: string
    author?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pubDate: Date | string
  }

  export type StoreBlogUpdateInput = {
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutBlogsNestedInput
  }

  export type StoreBlogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreBlogCreateManyInput = {
    id?: number
    storeId: number
    publishDate: string
    post: string
    author?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pubDate: Date | string
  }

  export type StoreBlogUpdateManyMutationInput = {
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreBlogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberCreateInput = {
    email: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriberUncheckedCreateInput = {
    id?: number
    email: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriberUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberCreateManyInput = {
    id?: number
    email: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriberUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type PromoCodeListRelationFilter = {
    every?: PromoCodeWhereInput
    some?: PromoCodeWhereInput
    none?: PromoCodeWhereInput
  }

  export type StoreBlogListRelationFilter = {
    every?: StoreBlogWhereInput
    some?: StoreBlogWhereInput
    none?: StoreBlogWhereInput
  }

  export type CategoryPromoCodeListRelationFilter = {
    every?: CategoryPromoCodeWhereInput
    some?: CategoryPromoCodeWhereInput
    none?: CategoryPromoCodeWhereInput
  }

  export type PromoCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreBlogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryPromoCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrder
    active?: SortOrder
    userSubmit?: SortOrder
    metaKeywords?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    topStore?: SortOrder
    oldSlug?: SortOrder
    searchTerms?: SortOrder
    networkId?: SortOrder
    network?: SortOrder
    domain?: SortOrder
    viglinkId?: SortOrder
    viglinkGroupId?: SortOrder
    viglinkName?: SortOrder
    paths?: SortOrder
  }

  export type StoreAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    viglinkId?: SortOrder
    viglinkGroupId?: SortOrder
  }

  export type StoreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrder
    active?: SortOrder
    userSubmit?: SortOrder
    metaKeywords?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    topStore?: SortOrder
    oldSlug?: SortOrder
    searchTerms?: SortOrder
    networkId?: SortOrder
    network?: SortOrder
    domain?: SortOrder
    viglinkId?: SortOrder
    viglinkGroupId?: SortOrder
    viglinkName?: SortOrder
    paths?: SortOrder
  }

  export type StoreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrder
    active?: SortOrder
    userSubmit?: SortOrder
    metaKeywords?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    topStore?: SortOrder
    oldSlug?: SortOrder
    searchTerms?: SortOrder
    networkId?: SortOrder
    network?: SortOrder
    domain?: SortOrder
    viglinkId?: SortOrder
    viglinkGroupId?: SortOrder
    viglinkName?: SortOrder
    paths?: SortOrder
  }

  export type StoreSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    viglinkId?: SortOrder
    viglinkGroupId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StoreListRelationFilter = {
    every?: StoreWhereInput
    some?: StoreWhereInput
    none?: StoreWhereInput
  }

  export type StoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    metaKeywords?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    metaKeywords?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    metaKeywords?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StoreScalarRelationFilter = {
    is?: StoreWhereInput
    isNot?: StoreWhereInput
  }

  export type PromoCodeCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    starts?: SortOrder
    code?: SortOrder
    link?: SortOrder
    homepage?: SortOrder
    freeShipping?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expires?: SortOrder
    userSubmit?: SortOrder
    approved?: SortOrder
    orderId?: SortOrder
  }

  export type PromoCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    orderId?: SortOrder
  }

  export type PromoCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    starts?: SortOrder
    code?: SortOrder
    link?: SortOrder
    homepage?: SortOrder
    freeShipping?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expires?: SortOrder
    userSubmit?: SortOrder
    approved?: SortOrder
    orderId?: SortOrder
  }

  export type PromoCodeMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    starts?: SortOrder
    code?: SortOrder
    link?: SortOrder
    homepage?: SortOrder
    freeShipping?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expires?: SortOrder
    userSubmit?: SortOrder
    approved?: SortOrder
    orderId?: SortOrder
  }

  export type PromoCodeSumOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    orderId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PromoCodeScalarRelationFilter = {
    is?: PromoCodeWhereInput
    isNot?: PromoCodeWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CategoryPromoCodePromoCodeIdCategoryIdCompoundUniqueInput = {
    promoCodeId: number
    categoryId: number
  }

  export type CategoryPromoCodeCountOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryPromoCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
  }

  export type CategoryPromoCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryPromoCodeMinOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryPromoCodeSumOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    categoryId?: SortOrder
    storeId?: SortOrder
  }

  export type StoreBlogCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    publishDate?: SortOrder
    post?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pubDate?: SortOrder
  }

  export type StoreBlogAvgOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
  }

  export type StoreBlogMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    publishDate?: SortOrder
    post?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pubDate?: SortOrder
  }

  export type StoreBlogMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    publishDate?: SortOrder
    post?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pubDate?: SortOrder
  }

  export type StoreBlogSumOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
  }

  export type SubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriberAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriberSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryCreateNestedOneWithoutStoresInput = {
    create?: XOR<CategoryCreateWithoutStoresInput, CategoryUncheckedCreateWithoutStoresInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutStoresInput
    connect?: CategoryWhereUniqueInput
  }

  export type PromoCodeCreateNestedManyWithoutStoreInput = {
    create?: XOR<PromoCodeCreateWithoutStoreInput, PromoCodeUncheckedCreateWithoutStoreInput> | PromoCodeCreateWithoutStoreInput[] | PromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: PromoCodeCreateOrConnectWithoutStoreInput | PromoCodeCreateOrConnectWithoutStoreInput[]
    createMany?: PromoCodeCreateManyStoreInputEnvelope
    connect?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
  }

  export type StoreBlogCreateNestedManyWithoutStoreInput = {
    create?: XOR<StoreBlogCreateWithoutStoreInput, StoreBlogUncheckedCreateWithoutStoreInput> | StoreBlogCreateWithoutStoreInput[] | StoreBlogUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreBlogCreateOrConnectWithoutStoreInput | StoreBlogCreateOrConnectWithoutStoreInput[]
    createMany?: StoreBlogCreateManyStoreInputEnvelope
    connect?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
  }

  export type CategoryPromoCodeCreateNestedManyWithoutStoreInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutStoreInput, CategoryPromoCodeUncheckedCreateWithoutStoreInput> | CategoryPromoCodeCreateWithoutStoreInput[] | CategoryPromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutStoreInput | CategoryPromoCodeCreateOrConnectWithoutStoreInput[]
    createMany?: CategoryPromoCodeCreateManyStoreInputEnvelope
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
  }

  export type PromoCodeUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<PromoCodeCreateWithoutStoreInput, PromoCodeUncheckedCreateWithoutStoreInput> | PromoCodeCreateWithoutStoreInput[] | PromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: PromoCodeCreateOrConnectWithoutStoreInput | PromoCodeCreateOrConnectWithoutStoreInput[]
    createMany?: PromoCodeCreateManyStoreInputEnvelope
    connect?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
  }

  export type StoreBlogUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<StoreBlogCreateWithoutStoreInput, StoreBlogUncheckedCreateWithoutStoreInput> | StoreBlogCreateWithoutStoreInput[] | StoreBlogUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreBlogCreateOrConnectWithoutStoreInput | StoreBlogCreateOrConnectWithoutStoreInput[]
    createMany?: StoreBlogCreateManyStoreInputEnvelope
    connect?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
  }

  export type CategoryPromoCodeUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutStoreInput, CategoryPromoCodeUncheckedCreateWithoutStoreInput> | CategoryPromoCodeCreateWithoutStoreInput[] | CategoryPromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutStoreInput | CategoryPromoCodeCreateOrConnectWithoutStoreInput[]
    createMany?: CategoryPromoCodeCreateManyStoreInputEnvelope
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneWithoutStoresNestedInput = {
    create?: XOR<CategoryCreateWithoutStoresInput, CategoryUncheckedCreateWithoutStoresInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutStoresInput
    upsert?: CategoryUpsertWithoutStoresInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutStoresInput, CategoryUpdateWithoutStoresInput>, CategoryUncheckedUpdateWithoutStoresInput>
  }

  export type PromoCodeUpdateManyWithoutStoreNestedInput = {
    create?: XOR<PromoCodeCreateWithoutStoreInput, PromoCodeUncheckedCreateWithoutStoreInput> | PromoCodeCreateWithoutStoreInput[] | PromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: PromoCodeCreateOrConnectWithoutStoreInput | PromoCodeCreateOrConnectWithoutStoreInput[]
    upsert?: PromoCodeUpsertWithWhereUniqueWithoutStoreInput | PromoCodeUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: PromoCodeCreateManyStoreInputEnvelope
    set?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    disconnect?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    delete?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    connect?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    update?: PromoCodeUpdateWithWhereUniqueWithoutStoreInput | PromoCodeUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: PromoCodeUpdateManyWithWhereWithoutStoreInput | PromoCodeUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: PromoCodeScalarWhereInput | PromoCodeScalarWhereInput[]
  }

  export type StoreBlogUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StoreBlogCreateWithoutStoreInput, StoreBlogUncheckedCreateWithoutStoreInput> | StoreBlogCreateWithoutStoreInput[] | StoreBlogUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreBlogCreateOrConnectWithoutStoreInput | StoreBlogCreateOrConnectWithoutStoreInput[]
    upsert?: StoreBlogUpsertWithWhereUniqueWithoutStoreInput | StoreBlogUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StoreBlogCreateManyStoreInputEnvelope
    set?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    disconnect?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    delete?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    connect?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    update?: StoreBlogUpdateWithWhereUniqueWithoutStoreInput | StoreBlogUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StoreBlogUpdateManyWithWhereWithoutStoreInput | StoreBlogUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StoreBlogScalarWhereInput | StoreBlogScalarWhereInput[]
  }

  export type CategoryPromoCodeUpdateManyWithoutStoreNestedInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutStoreInput, CategoryPromoCodeUncheckedCreateWithoutStoreInput> | CategoryPromoCodeCreateWithoutStoreInput[] | CategoryPromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutStoreInput | CategoryPromoCodeCreateOrConnectWithoutStoreInput[]
    upsert?: CategoryPromoCodeUpsertWithWhereUniqueWithoutStoreInput | CategoryPromoCodeUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: CategoryPromoCodeCreateManyStoreInputEnvelope
    set?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    disconnect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    delete?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    update?: CategoryPromoCodeUpdateWithWhereUniqueWithoutStoreInput | CategoryPromoCodeUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: CategoryPromoCodeUpdateManyWithWhereWithoutStoreInput | CategoryPromoCodeUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
  }

  export type PromoCodeUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<PromoCodeCreateWithoutStoreInput, PromoCodeUncheckedCreateWithoutStoreInput> | PromoCodeCreateWithoutStoreInput[] | PromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: PromoCodeCreateOrConnectWithoutStoreInput | PromoCodeCreateOrConnectWithoutStoreInput[]
    upsert?: PromoCodeUpsertWithWhereUniqueWithoutStoreInput | PromoCodeUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: PromoCodeCreateManyStoreInputEnvelope
    set?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    disconnect?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    delete?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    connect?: PromoCodeWhereUniqueInput | PromoCodeWhereUniqueInput[]
    update?: PromoCodeUpdateWithWhereUniqueWithoutStoreInput | PromoCodeUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: PromoCodeUpdateManyWithWhereWithoutStoreInput | PromoCodeUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: PromoCodeScalarWhereInput | PromoCodeScalarWhereInput[]
  }

  export type StoreBlogUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StoreBlogCreateWithoutStoreInput, StoreBlogUncheckedCreateWithoutStoreInput> | StoreBlogCreateWithoutStoreInput[] | StoreBlogUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreBlogCreateOrConnectWithoutStoreInput | StoreBlogCreateOrConnectWithoutStoreInput[]
    upsert?: StoreBlogUpsertWithWhereUniqueWithoutStoreInput | StoreBlogUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StoreBlogCreateManyStoreInputEnvelope
    set?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    disconnect?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    delete?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    connect?: StoreBlogWhereUniqueInput | StoreBlogWhereUniqueInput[]
    update?: StoreBlogUpdateWithWhereUniqueWithoutStoreInput | StoreBlogUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StoreBlogUpdateManyWithWhereWithoutStoreInput | StoreBlogUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StoreBlogScalarWhereInput | StoreBlogScalarWhereInput[]
  }

  export type CategoryPromoCodeUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutStoreInput, CategoryPromoCodeUncheckedCreateWithoutStoreInput> | CategoryPromoCodeCreateWithoutStoreInput[] | CategoryPromoCodeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutStoreInput | CategoryPromoCodeCreateOrConnectWithoutStoreInput[]
    upsert?: CategoryPromoCodeUpsertWithWhereUniqueWithoutStoreInput | CategoryPromoCodeUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: CategoryPromoCodeCreateManyStoreInputEnvelope
    set?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    disconnect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    delete?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    update?: CategoryPromoCodeUpdateWithWhereUniqueWithoutStoreInput | CategoryPromoCodeUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: CategoryPromoCodeUpdateManyWithWhereWithoutStoreInput | CategoryPromoCodeUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
  }

  export type StoreCreateNestedManyWithoutCategoryInput = {
    create?: XOR<StoreCreateWithoutCategoryInput, StoreUncheckedCreateWithoutCategoryInput> | StoreCreateWithoutCategoryInput[] | StoreUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCategoryInput | StoreCreateOrConnectWithoutCategoryInput[]
    createMany?: StoreCreateManyCategoryInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type CategoryPromoCodeCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutCategoryInput, CategoryPromoCodeUncheckedCreateWithoutCategoryInput> | CategoryPromoCodeCreateWithoutCategoryInput[] | CategoryPromoCodeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutCategoryInput | CategoryPromoCodeCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryPromoCodeCreateManyCategoryInputEnvelope
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
  }

  export type StoreUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<StoreCreateWithoutCategoryInput, StoreUncheckedCreateWithoutCategoryInput> | StoreCreateWithoutCategoryInput[] | StoreUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCategoryInput | StoreCreateOrConnectWithoutCategoryInput[]
    createMany?: StoreCreateManyCategoryInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type CategoryPromoCodeUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutCategoryInput, CategoryPromoCodeUncheckedCreateWithoutCategoryInput> | CategoryPromoCodeCreateWithoutCategoryInput[] | CategoryPromoCodeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutCategoryInput | CategoryPromoCodeCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryPromoCodeCreateManyCategoryInputEnvelope
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
  }

  export type StoreUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<StoreCreateWithoutCategoryInput, StoreUncheckedCreateWithoutCategoryInput> | StoreCreateWithoutCategoryInput[] | StoreUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCategoryInput | StoreCreateOrConnectWithoutCategoryInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutCategoryInput | StoreUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: StoreCreateManyCategoryInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutCategoryInput | StoreUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutCategoryInput | StoreUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type CategoryPromoCodeUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutCategoryInput, CategoryPromoCodeUncheckedCreateWithoutCategoryInput> | CategoryPromoCodeCreateWithoutCategoryInput[] | CategoryPromoCodeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutCategoryInput | CategoryPromoCodeCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryPromoCodeUpsertWithWhereUniqueWithoutCategoryInput | CategoryPromoCodeUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryPromoCodeCreateManyCategoryInputEnvelope
    set?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    disconnect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    delete?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    update?: CategoryPromoCodeUpdateWithWhereUniqueWithoutCategoryInput | CategoryPromoCodeUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryPromoCodeUpdateManyWithWhereWithoutCategoryInput | CategoryPromoCodeUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
  }

  export type StoreUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<StoreCreateWithoutCategoryInput, StoreUncheckedCreateWithoutCategoryInput> | StoreCreateWithoutCategoryInput[] | StoreUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCategoryInput | StoreCreateOrConnectWithoutCategoryInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutCategoryInput | StoreUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: StoreCreateManyCategoryInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutCategoryInput | StoreUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutCategoryInput | StoreUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type CategoryPromoCodeUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutCategoryInput, CategoryPromoCodeUncheckedCreateWithoutCategoryInput> | CategoryPromoCodeCreateWithoutCategoryInput[] | CategoryPromoCodeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutCategoryInput | CategoryPromoCodeCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryPromoCodeUpsertWithWhereUniqueWithoutCategoryInput | CategoryPromoCodeUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryPromoCodeCreateManyCategoryInputEnvelope
    set?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    disconnect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    delete?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    update?: CategoryPromoCodeUpdateWithWhereUniqueWithoutCategoryInput | CategoryPromoCodeUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryPromoCodeUpdateManyWithWhereWithoutCategoryInput | CategoryPromoCodeUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
  }

  export type StoreCreateNestedOneWithoutPromoCodesInput = {
    create?: XOR<StoreCreateWithoutPromoCodesInput, StoreUncheckedCreateWithoutPromoCodesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutPromoCodesInput
    connect?: StoreWhereUniqueInput
  }

  export type CategoryPromoCodeCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutPromoCodeInput, CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput> | CategoryPromoCodeCreateWithoutPromoCodeInput[] | CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput | CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput[]
    createMany?: CategoryPromoCodeCreateManyPromoCodeInputEnvelope
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
  }

  export type CategoryPromoCodeUncheckedCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutPromoCodeInput, CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput> | CategoryPromoCodeCreateWithoutPromoCodeInput[] | CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput | CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput[]
    createMany?: CategoryPromoCodeCreateManyPromoCodeInputEnvelope
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StoreUpdateOneRequiredWithoutPromoCodesNestedInput = {
    create?: XOR<StoreCreateWithoutPromoCodesInput, StoreUncheckedCreateWithoutPromoCodesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutPromoCodesInput
    upsert?: StoreUpsertWithoutPromoCodesInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutPromoCodesInput, StoreUpdateWithoutPromoCodesInput>, StoreUncheckedUpdateWithoutPromoCodesInput>
  }

  export type CategoryPromoCodeUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutPromoCodeInput, CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput> | CategoryPromoCodeCreateWithoutPromoCodeInput[] | CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput | CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput[]
    upsert?: CategoryPromoCodeUpsertWithWhereUniqueWithoutPromoCodeInput | CategoryPromoCodeUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: CategoryPromoCodeCreateManyPromoCodeInputEnvelope
    set?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    disconnect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    delete?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    update?: CategoryPromoCodeUpdateWithWhereUniqueWithoutPromoCodeInput | CategoryPromoCodeUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: CategoryPromoCodeUpdateManyWithWhereWithoutPromoCodeInput | CategoryPromoCodeUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
  }

  export type CategoryPromoCodeUncheckedUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<CategoryPromoCodeCreateWithoutPromoCodeInput, CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput> | CategoryPromoCodeCreateWithoutPromoCodeInput[] | CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput | CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput[]
    upsert?: CategoryPromoCodeUpsertWithWhereUniqueWithoutPromoCodeInput | CategoryPromoCodeUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: CategoryPromoCodeCreateManyPromoCodeInputEnvelope
    set?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    disconnect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    delete?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    connect?: CategoryPromoCodeWhereUniqueInput | CategoryPromoCodeWhereUniqueInput[]
    update?: CategoryPromoCodeUpdateWithWhereUniqueWithoutPromoCodeInput | CategoryPromoCodeUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: CategoryPromoCodeUpdateManyWithWhereWithoutPromoCodeInput | CategoryPromoCodeUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
  }

  export type PromoCodeCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<PromoCodeCreateWithoutCategoriesInput, PromoCodeUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutCategoriesInput
    connect?: PromoCodeWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutPromoCodesInput = {
    create?: XOR<CategoryCreateWithoutPromoCodesInput, CategoryUncheckedCreateWithoutPromoCodesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPromoCodesInput
    connect?: CategoryWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutCategoryPromoCodesInput = {
    create?: XOR<StoreCreateWithoutCategoryPromoCodesInput, StoreUncheckedCreateWithoutCategoryPromoCodesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutCategoryPromoCodesInput
    connect?: StoreWhereUniqueInput
  }

  export type PromoCodeUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<PromoCodeCreateWithoutCategoriesInput, PromoCodeUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutCategoriesInput
    upsert?: PromoCodeUpsertWithoutCategoriesInput
    connect?: PromoCodeWhereUniqueInput
    update?: XOR<XOR<PromoCodeUpdateToOneWithWhereWithoutCategoriesInput, PromoCodeUpdateWithoutCategoriesInput>, PromoCodeUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutPromoCodesNestedInput = {
    create?: XOR<CategoryCreateWithoutPromoCodesInput, CategoryUncheckedCreateWithoutPromoCodesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPromoCodesInput
    upsert?: CategoryUpsertWithoutPromoCodesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutPromoCodesInput, CategoryUpdateWithoutPromoCodesInput>, CategoryUncheckedUpdateWithoutPromoCodesInput>
  }

  export type StoreUpdateOneRequiredWithoutCategoryPromoCodesNestedInput = {
    create?: XOR<StoreCreateWithoutCategoryPromoCodesInput, StoreUncheckedCreateWithoutCategoryPromoCodesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutCategoryPromoCodesInput
    upsert?: StoreUpsertWithoutCategoryPromoCodesInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutCategoryPromoCodesInput, StoreUpdateWithoutCategoryPromoCodesInput>, StoreUncheckedUpdateWithoutCategoryPromoCodesInput>
  }

  export type StoreCreateNestedOneWithoutBlogsInput = {
    create?: XOR<StoreCreateWithoutBlogsInput, StoreUncheckedCreateWithoutBlogsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutBlogsInput
    connect?: StoreWhereUniqueInput
  }

  export type StoreUpdateOneRequiredWithoutBlogsNestedInput = {
    create?: XOR<StoreCreateWithoutBlogsInput, StoreUncheckedCreateWithoutBlogsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutBlogsInput
    upsert?: StoreUpsertWithoutBlogsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutBlogsInput, StoreUpdateWithoutBlogsInput>, StoreUncheckedUpdateWithoutBlogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CategoryCreateWithoutStoresInput = {
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    promoCodes?: CategoryPromoCodeCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutStoresInput = {
    id?: number
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    promoCodes?: CategoryPromoCodeUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutStoresInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutStoresInput, CategoryUncheckedCreateWithoutStoresInput>
  }

  export type PromoCodeCreateWithoutStoreInput = {
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
    categories?: CategoryPromoCodeCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateWithoutStoreInput = {
    id?: number
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
    categories?: CategoryPromoCodeUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeCreateOrConnectWithoutStoreInput = {
    where: PromoCodeWhereUniqueInput
    create: XOR<PromoCodeCreateWithoutStoreInput, PromoCodeUncheckedCreateWithoutStoreInput>
  }

  export type PromoCodeCreateManyStoreInputEnvelope = {
    data: PromoCodeCreateManyStoreInput | PromoCodeCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type StoreBlogCreateWithoutStoreInput = {
    publishDate: string
    post: string
    author?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pubDate: Date | string
  }

  export type StoreBlogUncheckedCreateWithoutStoreInput = {
    id?: number
    publishDate: string
    post: string
    author?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pubDate: Date | string
  }

  export type StoreBlogCreateOrConnectWithoutStoreInput = {
    where: StoreBlogWhereUniqueInput
    create: XOR<StoreBlogCreateWithoutStoreInput, StoreBlogUncheckedCreateWithoutStoreInput>
  }

  export type StoreBlogCreateManyStoreInputEnvelope = {
    data: StoreBlogCreateManyStoreInput | StoreBlogCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type CategoryPromoCodeCreateWithoutStoreInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutPromoCodesInput
  }

  export type CategoryPromoCodeUncheckedCreateWithoutStoreInput = {
    id?: number
    promoCodeId: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryPromoCodeCreateOrConnectWithoutStoreInput = {
    where: CategoryPromoCodeWhereUniqueInput
    create: XOR<CategoryPromoCodeCreateWithoutStoreInput, CategoryPromoCodeUncheckedCreateWithoutStoreInput>
  }

  export type CategoryPromoCodeCreateManyStoreInputEnvelope = {
    data: CategoryPromoCodeCreateManyStoreInput | CategoryPromoCodeCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutStoresInput = {
    update: XOR<CategoryUpdateWithoutStoresInput, CategoryUncheckedUpdateWithoutStoresInput>
    create: XOR<CategoryCreateWithoutStoresInput, CategoryUncheckedCreateWithoutStoresInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutStoresInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutStoresInput, CategoryUncheckedUpdateWithoutStoresInput>
  }

  export type CategoryUpdateWithoutStoresInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    promoCodes?: CategoryPromoCodeUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutStoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    promoCodes?: CategoryPromoCodeUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type PromoCodeUpsertWithWhereUniqueWithoutStoreInput = {
    where: PromoCodeWhereUniqueInput
    update: XOR<PromoCodeUpdateWithoutStoreInput, PromoCodeUncheckedUpdateWithoutStoreInput>
    create: XOR<PromoCodeCreateWithoutStoreInput, PromoCodeUncheckedCreateWithoutStoreInput>
  }

  export type PromoCodeUpdateWithWhereUniqueWithoutStoreInput = {
    where: PromoCodeWhereUniqueInput
    data: XOR<PromoCodeUpdateWithoutStoreInput, PromoCodeUncheckedUpdateWithoutStoreInput>
  }

  export type PromoCodeUpdateManyWithWhereWithoutStoreInput = {
    where: PromoCodeScalarWhereInput
    data: XOR<PromoCodeUpdateManyMutationInput, PromoCodeUncheckedUpdateManyWithoutStoreInput>
  }

  export type PromoCodeScalarWhereInput = {
    AND?: PromoCodeScalarWhereInput | PromoCodeScalarWhereInput[]
    OR?: PromoCodeScalarWhereInput[]
    NOT?: PromoCodeScalarWhereInput | PromoCodeScalarWhereInput[]
    id?: IntFilter<"PromoCode"> | number
    storeId?: IntFilter<"PromoCode"> | number
    title?: StringFilter<"PromoCode"> | string
    description?: StringNullableFilter<"PromoCode"> | string | null
    starts?: DateTimeFilter<"PromoCode"> | Date | string
    code?: StringFilter<"PromoCode"> | string
    link?: StringFilter<"PromoCode"> | string
    homepage?: BoolFilter<"PromoCode"> | boolean
    freeShipping?: BoolFilter<"PromoCode"> | boolean
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"PromoCode"> | Date | string
    expires?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    userSubmit?: BoolFilter<"PromoCode"> | boolean
    approved?: BoolFilter<"PromoCode"> | boolean
    orderId?: IntNullableFilter<"PromoCode"> | number | null
  }

  export type StoreBlogUpsertWithWhereUniqueWithoutStoreInput = {
    where: StoreBlogWhereUniqueInput
    update: XOR<StoreBlogUpdateWithoutStoreInput, StoreBlogUncheckedUpdateWithoutStoreInput>
    create: XOR<StoreBlogCreateWithoutStoreInput, StoreBlogUncheckedCreateWithoutStoreInput>
  }

  export type StoreBlogUpdateWithWhereUniqueWithoutStoreInput = {
    where: StoreBlogWhereUniqueInput
    data: XOR<StoreBlogUpdateWithoutStoreInput, StoreBlogUncheckedUpdateWithoutStoreInput>
  }

  export type StoreBlogUpdateManyWithWhereWithoutStoreInput = {
    where: StoreBlogScalarWhereInput
    data: XOR<StoreBlogUpdateManyMutationInput, StoreBlogUncheckedUpdateManyWithoutStoreInput>
  }

  export type StoreBlogScalarWhereInput = {
    AND?: StoreBlogScalarWhereInput | StoreBlogScalarWhereInput[]
    OR?: StoreBlogScalarWhereInput[]
    NOT?: StoreBlogScalarWhereInput | StoreBlogScalarWhereInput[]
    id?: IntFilter<"StoreBlog"> | number
    storeId?: IntFilter<"StoreBlog"> | number
    publishDate?: StringFilter<"StoreBlog"> | string
    post?: StringFilter<"StoreBlog"> | string
    author?: StringFilter<"StoreBlog"> | string
    createdAt?: DateTimeFilter<"StoreBlog"> | Date | string
    updatedAt?: DateTimeFilter<"StoreBlog"> | Date | string
    pubDate?: DateTimeFilter<"StoreBlog"> | Date | string
  }

  export type CategoryPromoCodeUpsertWithWhereUniqueWithoutStoreInput = {
    where: CategoryPromoCodeWhereUniqueInput
    update: XOR<CategoryPromoCodeUpdateWithoutStoreInput, CategoryPromoCodeUncheckedUpdateWithoutStoreInput>
    create: XOR<CategoryPromoCodeCreateWithoutStoreInput, CategoryPromoCodeUncheckedCreateWithoutStoreInput>
  }

  export type CategoryPromoCodeUpdateWithWhereUniqueWithoutStoreInput = {
    where: CategoryPromoCodeWhereUniqueInput
    data: XOR<CategoryPromoCodeUpdateWithoutStoreInput, CategoryPromoCodeUncheckedUpdateWithoutStoreInput>
  }

  export type CategoryPromoCodeUpdateManyWithWhereWithoutStoreInput = {
    where: CategoryPromoCodeScalarWhereInput
    data: XOR<CategoryPromoCodeUpdateManyMutationInput, CategoryPromoCodeUncheckedUpdateManyWithoutStoreInput>
  }

  export type CategoryPromoCodeScalarWhereInput = {
    AND?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
    OR?: CategoryPromoCodeScalarWhereInput[]
    NOT?: CategoryPromoCodeScalarWhereInput | CategoryPromoCodeScalarWhereInput[]
    id?: IntFilter<"CategoryPromoCode"> | number
    promoCodeId?: IntFilter<"CategoryPromoCode"> | number
    categoryId?: IntFilter<"CategoryPromoCode"> | number
    storeId?: IntFilter<"CategoryPromoCode"> | number
    createdAt?: DateTimeFilter<"CategoryPromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryPromoCode"> | Date | string
  }

  export type StoreCreateWithoutCategoryInput = {
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    promoCodes?: PromoCodeCreateNestedManyWithoutStoreInput
    blogs?: StoreBlogCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    promoCodes?: PromoCodeUncheckedCreateNestedManyWithoutStoreInput
    blogs?: StoreBlogUncheckedCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutCategoryInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutCategoryInput, StoreUncheckedCreateWithoutCategoryInput>
  }

  export type StoreCreateManyCategoryInputEnvelope = {
    data: StoreCreateManyCategoryInput | StoreCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryPromoCodeCreateWithoutCategoryInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutCategoriesInput
    store: StoreCreateNestedOneWithoutCategoryPromoCodesInput
  }

  export type CategoryPromoCodeUncheckedCreateWithoutCategoryInput = {
    id?: number
    promoCodeId: number
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryPromoCodeCreateOrConnectWithoutCategoryInput = {
    where: CategoryPromoCodeWhereUniqueInput
    create: XOR<CategoryPromoCodeCreateWithoutCategoryInput, CategoryPromoCodeUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryPromoCodeCreateManyCategoryInputEnvelope = {
    data: CategoryPromoCodeCreateManyCategoryInput | CategoryPromoCodeCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithWhereUniqueWithoutCategoryInput = {
    where: StoreWhereUniqueInput
    update: XOR<StoreUpdateWithoutCategoryInput, StoreUncheckedUpdateWithoutCategoryInput>
    create: XOR<StoreCreateWithoutCategoryInput, StoreUncheckedCreateWithoutCategoryInput>
  }

  export type StoreUpdateWithWhereUniqueWithoutCategoryInput = {
    where: StoreWhereUniqueInput
    data: XOR<StoreUpdateWithoutCategoryInput, StoreUncheckedUpdateWithoutCategoryInput>
  }

  export type StoreUpdateManyWithWhereWithoutCategoryInput = {
    where: StoreScalarWhereInput
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyWithoutCategoryInput>
  }

  export type StoreScalarWhereInput = {
    AND?: StoreScalarWhereInput | StoreScalarWhereInput[]
    OR?: StoreScalarWhereInput[]
    NOT?: StoreScalarWhereInput | StoreScalarWhereInput[]
    id?: IntFilter<"Store"> | number
    name?: StringFilter<"Store"> | string
    url?: StringFilter<"Store"> | string
    description?: StringNullableFilter<"Store"> | string | null
    active?: BoolFilter<"Store"> | boolean
    userSubmit?: BoolFilter<"Store"> | boolean
    metaKeywords?: StringNullableFilter<"Store"> | string | null
    metaTitle?: StringNullableFilter<"Store"> | string | null
    metaDescription?: StringNullableFilter<"Store"> | string | null
    categoryId?: IntNullableFilter<"Store"> | number | null
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    slug?: StringFilter<"Store"> | string
    topStore?: BoolFilter<"Store"> | boolean
    oldSlug?: StringNullableFilter<"Store"> | string | null
    searchTerms?: StringNullableFilter<"Store"> | string | null
    networkId?: StringNullableFilter<"Store"> | string | null
    network?: StringNullableFilter<"Store"> | string | null
    domain?: StringNullableFilter<"Store"> | string | null
    viglinkId?: IntNullableFilter<"Store"> | number | null
    viglinkGroupId?: IntNullableFilter<"Store"> | number | null
    viglinkName?: StringNullableFilter<"Store"> | string | null
    paths?: StringNullableFilter<"Store"> | string | null
  }

  export type CategoryPromoCodeUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoryPromoCodeWhereUniqueInput
    update: XOR<CategoryPromoCodeUpdateWithoutCategoryInput, CategoryPromoCodeUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoryPromoCodeCreateWithoutCategoryInput, CategoryPromoCodeUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryPromoCodeUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoryPromoCodeWhereUniqueInput
    data: XOR<CategoryPromoCodeUpdateWithoutCategoryInput, CategoryPromoCodeUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoryPromoCodeUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoryPromoCodeScalarWhereInput
    data: XOR<CategoryPromoCodeUpdateManyMutationInput, CategoryPromoCodeUncheckedUpdateManyWithoutCategoryInput>
  }

  export type StoreCreateWithoutPromoCodesInput = {
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    category?: CategoryCreateNestedOneWithoutStoresInput
    blogs?: StoreBlogCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutPromoCodesInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    blogs?: StoreBlogUncheckedCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutPromoCodesInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutPromoCodesInput, StoreUncheckedCreateWithoutPromoCodesInput>
  }

  export type CategoryPromoCodeCreateWithoutPromoCodeInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutPromoCodesInput
    store: StoreCreateNestedOneWithoutCategoryPromoCodesInput
  }

  export type CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput = {
    id?: number
    categoryId: number
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryPromoCodeCreateOrConnectWithoutPromoCodeInput = {
    where: CategoryPromoCodeWhereUniqueInput
    create: XOR<CategoryPromoCodeCreateWithoutPromoCodeInput, CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput>
  }

  export type CategoryPromoCodeCreateManyPromoCodeInputEnvelope = {
    data: CategoryPromoCodeCreateManyPromoCodeInput | CategoryPromoCodeCreateManyPromoCodeInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithoutPromoCodesInput = {
    update: XOR<StoreUpdateWithoutPromoCodesInput, StoreUncheckedUpdateWithoutPromoCodesInput>
    create: XOR<StoreCreateWithoutPromoCodesInput, StoreUncheckedCreateWithoutPromoCodesInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutPromoCodesInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutPromoCodesInput, StoreUncheckedUpdateWithoutPromoCodesInput>
  }

  export type StoreUpdateWithoutPromoCodesInput = {
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutStoresNestedInput
    blogs?: StoreBlogUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutPromoCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    blogs?: StoreBlogUncheckedUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type CategoryPromoCodeUpsertWithWhereUniqueWithoutPromoCodeInput = {
    where: CategoryPromoCodeWhereUniqueInput
    update: XOR<CategoryPromoCodeUpdateWithoutPromoCodeInput, CategoryPromoCodeUncheckedUpdateWithoutPromoCodeInput>
    create: XOR<CategoryPromoCodeCreateWithoutPromoCodeInput, CategoryPromoCodeUncheckedCreateWithoutPromoCodeInput>
  }

  export type CategoryPromoCodeUpdateWithWhereUniqueWithoutPromoCodeInput = {
    where: CategoryPromoCodeWhereUniqueInput
    data: XOR<CategoryPromoCodeUpdateWithoutPromoCodeInput, CategoryPromoCodeUncheckedUpdateWithoutPromoCodeInput>
  }

  export type CategoryPromoCodeUpdateManyWithWhereWithoutPromoCodeInput = {
    where: CategoryPromoCodeScalarWhereInput
    data: XOR<CategoryPromoCodeUpdateManyMutationInput, CategoryPromoCodeUncheckedUpdateManyWithoutPromoCodeInput>
  }

  export type PromoCodeCreateWithoutCategoriesInput = {
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
    store: StoreCreateNestedOneWithoutPromoCodesInput
  }

  export type PromoCodeUncheckedCreateWithoutCategoriesInput = {
    id?: number
    storeId: number
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
  }

  export type PromoCodeCreateOrConnectWithoutCategoriesInput = {
    where: PromoCodeWhereUniqueInput
    create: XOR<PromoCodeCreateWithoutCategoriesInput, PromoCodeUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutPromoCodesInput = {
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    stores?: StoreCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutPromoCodesInput = {
    id?: number
    name: string
    description?: string | null
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    stores?: StoreUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutPromoCodesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutPromoCodesInput, CategoryUncheckedCreateWithoutPromoCodesInput>
  }

  export type StoreCreateWithoutCategoryPromoCodesInput = {
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    category?: CategoryCreateNestedOneWithoutStoresInput
    promoCodes?: PromoCodeCreateNestedManyWithoutStoreInput
    blogs?: StoreBlogCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutCategoryPromoCodesInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    promoCodes?: PromoCodeUncheckedCreateNestedManyWithoutStoreInput
    blogs?: StoreBlogUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutCategoryPromoCodesInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutCategoryPromoCodesInput, StoreUncheckedCreateWithoutCategoryPromoCodesInput>
  }

  export type PromoCodeUpsertWithoutCategoriesInput = {
    update: XOR<PromoCodeUpdateWithoutCategoriesInput, PromoCodeUncheckedUpdateWithoutCategoriesInput>
    create: XOR<PromoCodeCreateWithoutCategoriesInput, PromoCodeUncheckedCreateWithoutCategoriesInput>
    where?: PromoCodeWhereInput
  }

  export type PromoCodeUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: PromoCodeWhereInput
    data: XOR<PromoCodeUpdateWithoutCategoriesInput, PromoCodeUncheckedUpdateWithoutCategoriesInput>
  }

  export type PromoCodeUpdateWithoutCategoriesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    store?: StoreUpdateOneRequiredWithoutPromoCodesNestedInput
  }

  export type PromoCodeUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CategoryUpsertWithoutPromoCodesInput = {
    update: XOR<CategoryUpdateWithoutPromoCodesInput, CategoryUncheckedUpdateWithoutPromoCodesInput>
    create: XOR<CategoryCreateWithoutPromoCodesInput, CategoryUncheckedCreateWithoutPromoCodesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutPromoCodesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutPromoCodesInput, CategoryUncheckedUpdateWithoutPromoCodesInput>
  }

  export type CategoryUpdateWithoutPromoCodesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    stores?: StoreUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutPromoCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    stores?: StoreUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type StoreUpsertWithoutCategoryPromoCodesInput = {
    update: XOR<StoreUpdateWithoutCategoryPromoCodesInput, StoreUncheckedUpdateWithoutCategoryPromoCodesInput>
    create: XOR<StoreCreateWithoutCategoryPromoCodesInput, StoreUncheckedCreateWithoutCategoryPromoCodesInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutCategoryPromoCodesInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutCategoryPromoCodesInput, StoreUncheckedUpdateWithoutCategoryPromoCodesInput>
  }

  export type StoreUpdateWithoutCategoryPromoCodesInput = {
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutStoresNestedInput
    promoCodes?: PromoCodeUpdateManyWithoutStoreNestedInput
    blogs?: StoreBlogUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutCategoryPromoCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    promoCodes?: PromoCodeUncheckedUpdateManyWithoutStoreNestedInput
    blogs?: StoreBlogUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateWithoutBlogsInput = {
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    category?: CategoryCreateNestedOneWithoutStoresInput
    promoCodes?: PromoCodeCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutBlogsInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    categoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
    promoCodes?: PromoCodeUncheckedCreateNestedManyWithoutStoreInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutBlogsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutBlogsInput, StoreUncheckedCreateWithoutBlogsInput>
  }

  export type StoreUpsertWithoutBlogsInput = {
    update: XOR<StoreUpdateWithoutBlogsInput, StoreUncheckedUpdateWithoutBlogsInput>
    create: XOR<StoreCreateWithoutBlogsInput, StoreUncheckedCreateWithoutBlogsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutBlogsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutBlogsInput, StoreUncheckedUpdateWithoutBlogsInput>
  }

  export type StoreUpdateWithoutBlogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutStoresNestedInput
    promoCodes?: PromoCodeUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutBlogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    promoCodes?: PromoCodeUncheckedUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type PromoCodeCreateManyStoreInput = {
    id?: number
    title: string
    description?: string | null
    starts: Date | string
    code: string
    link: string
    homepage?: boolean
    freeShipping?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    expires?: Date | string | null
    userSubmit?: boolean
    approved?: boolean
    orderId?: number | null
  }

  export type StoreBlogCreateManyStoreInput = {
    id?: number
    publishDate: string
    post: string
    author?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pubDate: Date | string
  }

  export type CategoryPromoCodeCreateManyStoreInput = {
    id?: number
    promoCodeId: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromoCodeUpdateWithoutStoreInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    categories?: CategoryPromoCodeUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    categories?: CategoryPromoCodeUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateManyWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    starts?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    homepage?: BoolFieldUpdateOperationsInput | boolean
    freeShipping?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StoreBlogUpdateWithoutStoreInput = {
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreBlogUncheckedUpdateWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreBlogUncheckedUpdateManyWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    publishDate?: StringFieldUpdateOperationsInput | string
    post?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pubDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeUpdateWithoutStoreInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutPromoCodesNestedInput
  }

  export type CategoryPromoCodeUncheckedUpdateWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeUncheckedUpdateManyWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreCreateManyCategoryInput = {
    id?: number
    name: string
    url: string
    description?: string | null
    active?: boolean
    userSubmit?: boolean
    metaKeywords?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    topStore?: boolean
    oldSlug?: string | null
    searchTerms?: string | null
    networkId?: string | null
    network?: string | null
    domain?: string | null
    viglinkId?: number | null
    viglinkGroupId?: number | null
    viglinkName?: string | null
    paths?: string | null
  }

  export type CategoryPromoCodeCreateManyCategoryInput = {
    id?: number
    promoCodeId: number
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    promoCodes?: PromoCodeUpdateManyWithoutStoreNestedInput
    blogs?: StoreBlogUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
    promoCodes?: PromoCodeUncheckedUpdateManyWithoutStoreNestedInput
    blogs?: StoreBlogUncheckedUpdateManyWithoutStoreNestedInput
    categoryPromoCodes?: CategoryPromoCodeUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    userSubmit?: BoolFieldUpdateOperationsInput | boolean
    metaKeywords?: NullableStringFieldUpdateOperationsInput | string | null
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    topStore?: BoolFieldUpdateOperationsInput | boolean
    oldSlug?: NullableStringFieldUpdateOperationsInput | string | null
    searchTerms?: NullableStringFieldUpdateOperationsInput | string | null
    networkId?: NullableStringFieldUpdateOperationsInput | string | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    viglinkId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    viglinkName?: NullableStringFieldUpdateOperationsInput | string | null
    paths?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryPromoCodeUpdateWithoutCategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutCategoriesNestedInput
    store?: StoreUpdateOneRequiredWithoutCategoryPromoCodesNestedInput
  }

  export type CategoryPromoCodeUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeCreateManyPromoCodeInput = {
    id?: number
    categoryId: number
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryPromoCodeUpdateWithoutPromoCodeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutPromoCodesNestedInput
    store?: StoreUpdateOneRequiredWithoutCategoryPromoCodesNestedInput
  }

  export type CategoryPromoCodeUncheckedUpdateWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryPromoCodeUncheckedUpdateManyWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}