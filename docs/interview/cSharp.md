# C#

## 概述

::: tip 为什么选c#作为开发语言
1. 上家公司用的是C#。
2. 相对Java来说，由嵌入式、c语言等其他背景的更倾向选择C#，因为学习成本相对较低，开发环境可以用同一套。
3. C# 不仅可以作为后端语言，相对于Java写Windows桌面程序更加原生。比如我想写一个Windows版本的蓝牙调试程序，用Java、Electron都支持都没有WPF要好。
4. C# 相对Java有很多语法糖，最好用的就是Linq，虽然Java也有Stream操作，但没有C#多。比如SelectMany，GroupJoin.而且支持LINQ4DB和LINQ4集合。还有TPL、模式匹配、元祖、事件等很多特性。
5. 总的来说，语言的选择主要看技术栈。比如电商或者一个有Java技术栈的公司选Java会有相对丰富的生态。工厂，嵌入式环境的C#学习成本较低。
:::

::: tip c# 和 .net 的关系
1. C# 是编程语言，.NET 是运行平台和框架
2. C# 离不开 .NET。 C# 程序需要编译成 IL，然后依赖 .NET 的 CLR 来运行。
3. .NET 不只支持 C#。只要能编译成 IL 的语言都能在 .NET 上运行，比如 VB.NET、F#。
:::

## 类型系统

::: tip C# 中值类型和引用类型的区别是什么？
1. 值类型（Value Type）是一种在栈（stack）中直接存储数据的类型，而不是存储对数据的引用。
   1. 内置值类型像bool(注意是1byte，**只有位运算才能完整使用一个字节的8位**)，byte(Java 中无符号)，sbyte(无符号)，char，short，ushort(无符号)，int，uint，long，ulong，float，double，decimal(存在浮点运算时尽量使用decimal避免精度丢失，与Java 的BigDecimal不同)。
   2. 除此之外还有结构体Struct、枚举Enum、元祖。也是值类型。
2. 引用类型（Reference types）是一种在在堆（heap）上存储数据的类型，变量存储的是对象的引用（指针）。
   1. 大部分引用类型都是由class实例化来的。也有一部分不可变的对象可以由Record封装。
   2. 还有一部分内置的引用类型模版，比如所有对象的祖先(object)，string，还有运行时解析的dynamic。
:::

::: tip bool与Boolean，byte与Byte 这些有什么区别
1. bool 是 语言关键字， Boolean 是 .NET 的结构体类型，编译器会把 bool 翻译成 System.Boolean，它们本质上是 同一个类型。
2. 这两个变量的类型其实完全一样，都是 值类型（struct）。在 bool 和 Boolean 之间赋值、传递，不涉及装箱/拆箱。
:::

::: tip C# 中的默认值（default value）是如何确定的？int、bool、string 的默认值分别是多少？
1. 值类型（struct、基本类型如 int、bool 等）默认值是 所有字段都为零或等价零的状态。
    1. 数字类型（int, float, double） → 0 或 0.0
    2. bool → false
    3. char → '\0'（Unicode 空字符）
2. 引用类型（class、string、数组、接口等）
    默认值是 null
:::

::: tip string 是值类型还是引用类型
1. string 实际上是 引用类型（System.String 类）
2. 但是 string是不可变类型（Immutable）， 一旦创建了内容就不能再修改。修改 a 并不会影响 b。
   ``` c#
    string a = "hello";
    string b = a; // a 的 引用
    a = "world"; // 生成了一个新的字符串对象，a 指向了新对象。

    Console.WriteLine(b); // "hello"

   ```
   正因为string是不可变类型，多个线程可以同时读取同一个字符串对象而不需要锁。
3. 重载了== 和 Equals
4. string相同字面量(代码中直接写出来的常量值)会共享同一个对象。
   ``` c#
    string s1 = "abc";
    string s2 = "abc";
    Console.WriteLine(object.ReferenceEquals(s1, s2)); // True
   ```
5. 为什么要设计成引用类型而不是值类型？
   1. 字符串可能非常大，如果是值类型，每次复制都要拷贝整个字符数组
   2. 作为引用类型，多个变量可以引用同一个字符串，减少内存开销。
   3. 作为 class，可以继承 Object 的方法（如 ToString、GetHashCode、Equals），更易扩展。
6. string 的使用注意
   1. 字符串常量池可能导致相同内容的字符串复用同一引用
   2. 频繁拼接使用Stringbulider，+会创建新对象
   3. StringBuilder不是线程安全
   4. 使用插值语法拼接
   5. 不要直接用 ToLower() / ToUpper() 后比较，会有性能损耗，还可能受文化区（Culture）影响，使用`Console.WriteLine(s1.Equals(s2, StringComparison.OrdinalIgnoreCase))`;
   6. 推荐用 string.IsNullOrEmpty 或 string.IsNullOrWhiteSpace 判断
:::

::: tip c# 有StringBuffer和Stringbulider吗
1. StringBuffer 类是 Java 里线程安全、可变字符串。C#/.NET 没有 StringBuffer 类。
   1. 虽然多个线程可以同时读取同一个字符串对象而不需要锁，但是修改引用变量时需要锁。所以如果要实现类似StringBuffer线程安全的类需要StringBuilder + lock实现。
2. StringBuilder是可变字符串类，所以不是线程安全的。如果需要频繁操作字符串可以使用StringBuilder。
   1. StringBuilder 会根据需要自动扩展容量，但如果你能预估最终字符串长度，指定容量可以减少内存重新分配，提高性能。
:::

::: tip 经常用到哪些string的方法
- Concat
- Join 连接，常用在字节数组转字符串
- Split 分割，字符串转数组
- Trim 
- Contains 
- IndexOf
- StartsWith
- EndsWith
- $() 插值
- string.Format()
:::

::: tip 数字的format
``` c#
int number = 255;
Console.WriteLine(number.ToString("X")); // 输出: FF
Console.WriteLine(number.ToString("x")); // 输出: ff

int number = 255;
string binary = Convert.ToString(number, 2);  // 转为2进制字符串
Console.WriteLine(binary);  // 输出: 11111111

int number = 255;
string octal = Convert.ToString(number, 8);  // 转为8进制字符串
Console.WriteLine(octal);  // 输出: 377

int number = 5;
string binary = Convert.ToString(number, 2).PadLeft(8, '0');
Console.WriteLine(binary);  // 输出: 00000101

int number = 5;
string binary = Convert.ToString(number, 2).PadRight(8, '0');
Console.WriteLine(binary);  // 输出: 10100000

```
:::

::: tip 介绍一下struct
1. struct通常用于表示轻量级的值类型，需要定义一个简单的数据结构来存储一组相关的数据时，考虑使用struct。
2. struct赋值时会进行值拷贝，避免装箱和拆箱。
:::

::: tip struct和class的区别是什么
1. struct是值类型，在栈（stack）中直接存储数据（注意：如果在对象里定义struct或者装箱，还是会在堆中，想要强制在栈中使用 ref struct）。
2. class是引用类型，在堆（heap）上存储数据，变量存储的是对象的引用（指针）。当一个对象被赋值给另一个变量时，两个变量都指向同一个对象。
:::

::: tip ref struct 的限制 (了解)
因为它只能存在于栈上，所以编译器会强制很多限制：
- 不能装箱（也就是不能隐式转换为 object 或 ValueType）。
- 不能作为类的字段（因为类实例在堆上）。
- 不能用在 async 方法、迭代器（yield return）里，因为这些会导致对象逃逸。
- 不能作为泛型参数（除非泛型有特殊限制，比如 C# 11 的 scoped 支持）。
- 不能实现接口（因为接口调用可能会导致装箱）。
- 不能用作数组元素类型。
:::

::: tip 介绍一下拆箱和装箱
1. 什么时候会发生拆箱和装箱：
   1. 装箱 = 把值类型转换为引用类型。
   2. 拆箱 = 从引用类型中取出值类型。
   3. 如果类型不匹配。InvalidCastException
2. 什么时候会发生装箱和取消装箱？举个例子？如何避免？
   1. 最常见的：需要将值类型存储在非泛型集合（如ArrayList或Hashtable）中时，由于这些集合只能处理object类型的元素，值类型必须进行装箱。
   2. 频繁的装箱和取消装箱操作会导致性能下降，尽量使用泛型集合。
:::

::: tip object、dynamic 和 var 的区别是什么
- object是C# 所有类型的基类（包括值类型和引用类型），编译时只能访问 object 的成员，如果想访问实际类型的成员，需要显式类型转换（cast）。
- dynamic是动态类型，编译阶段不检查类型，运行时可能出错。用来处理动态数据，如 JSON、COM 对象、反射返回值。
- var是编译器在编译时推断类型，必须在声明时初始化，否则无法推断类型，编译时类型确定，运行时安全。
:::

::: tip 为什么需要可空类型
- 在 C# 中，值类型（int、bool、struct 等） 默认是 不可为 null 的。但是在数据库字段、业务模型中，经常会遇到 “可能没有值”的场景，这时就需要 可空值类型。
- 装箱时，如果 HasValue = false，会装箱成 null；如果 HasValue = true，装箱成 T。
- value! 空值抑制运算符（null-forgiving operator）可以保证这里一定不会是 null，你不要再给我警告了
:::

::: tip 类型转换有哪些方式
1. 隐式转换（Implicit Conversion）
   1. 小范围数值类型 → 大范围数值类型（int → long，float → double）
   2. 派生类 → 基类（Student → Person）
2. 显式转换（Explicit Conversion / Casting）可能丢失精度。
   1. Convert 类
3. is 检查类型 / as 尝试转换 失败时返回 null
4. 模式匹配
  ``` C#
  object obj = "hello";
  if (obj is string str)  // 同时判断并转换
  {
      Console.WriteLine(str.ToUpper());
  }
  ```
:::

::: tip 用过元祖吗
在临时需要组合多个数据项，但不需要创建完整的类或结构体的情况下可以用元祖。

常见的使用：
``` c#
public (int Sum, int Product) Calculate(int a, int b)
{
    int sum = a + b;
    int product = a * b;
    return (sum, product);
}
// 调用方法
var result = Calculate(3, 4);
Console.WriteLine($"Sum: {result.Sum}, Product: {result.Product}");
```

还有 LINQ：

``` C#
var results = people.Select(p => (p.Name, IsAdult: p.Age >= 18)).ToList();
```
:::

::: tip 用过Record吗
record 是 用来表示 不可变对象 和 值相等对象的语法糖扩展

  - 不可变，
  - 自动重写 Equals / GetHashCode / == 比较时基于所有属性/字段 。
  - 非破坏性复制用with
  - 自动生成 ToString
  - record class vs record struct
    - record class（默认） → 引用类型
    - record struct（C# 10 引入） → 值类型
    - 两者其他特性一致

常用在：
   - 不可变数据模型
   - 模式匹配（switch + record）
  
  ``` c#
      public record Point(int X, int Y);

      Point pt = new(0, 5);

      string pos = pt switch
      {
          Point(0, 0) => "原点",
          Point(0, _) => "在 Y 轴上",
          Point(_, 0) => "在 X 轴上",
          Point(var x, var y) => $"({x},{y})"
      };

      Console.WriteLine(pos); // 在 Y 轴上


      public record Order(string Id, decimal Amount);

      Order order = new("A001", 99.9m);

      string info = order switch
      {
          { Amount: >= 1000 } => "大额订单",
          { Amount: < 100 } => "小额订单",
          { Id: "A001" } => "特别订单 A001",
          _ => "普通订单"
      };

      Console.WriteLine(info); // 小额订单
  ```

:::


::: tip 相等性比较
相等性比较主要分为以下几种：

- 值类型比较
  - 其操作数相等内置值类型的值相等
  - struct 类型默认情况下不支持 == 运算符，需要重载
- 引用类型比较（除了string）
  - 默认情况下比较引用地址。
  - 重写Equals
  - 使用Object.ReferenceEquals(a, b)：始终比较引用地址是否相等。
- 记录类型比较
  - 重写了 Equals 和 ==，比较“值”
- 字符串比较
  - 重写了 Equals 和 ==，比较“值”
:::

::: tip 大小比较
常用在集合排序等操作中

- 值类型比较
  - 其操作数相等内置值类型的值相等
  - struct（CompareTo） 实现IComparable
- 引用类型比较（CompareTo、除了string）
  - 实现 IComparable
- 字符串（CompareTo）
  - 比较的是 字典序
:::

## 集合与泛型

::: tip 常见的有哪些集合
1. 非泛型集合：如：ArrayList、Hashtable、Queue、Stack、SortedList
2. 泛型集合：也是最常用的`List<T>`、`Dictionary<TKey,TValue>`、`Queue<T>`、`Stack<T>`、`SortedList<TKey,TValue>`(排序)、`HashSet<T>`、`ObservableCollection<T>`(MVVM)
3. 并发集合：需要保证线程安全的时候用。ConcurrentDictionary、ConcurrentQueue、ConcurrentStack、BlockingCollection（生产者-消费者模式支持） 等。
4. 不可变集合：ImmutableList、ImmutableDictionary 等。不咋用。

- 推荐一般情况下使用泛型集合，避免拆箱装箱影响性能。
- 需要多线程操作时使用并发集合。
- 集合操作尽量使用LINQ，可以很大程度上提高性能。
:::

::: tip 为什么要用泛型集合
1. 非泛型集合 中，值类型（int、struct 等）会频繁发生 装箱/拆箱。泛型集合 不需要装箱/拆箱，性能更好
2. 非泛型集合取出时需要强制转换（unboxing），如果类型不匹配，就会抛异常。不安全。
:::

::: tip `List<T>` ArrayList 和 Array 有什么区别
- Array：固定长度，创建后不可动态扩容，访问速度快。而且是强类型`int[] arr = new int[5];`速度很快。
- `List<T>`：基于数组实现，可动态扩容（默认容量 4，满时翻倍）。访问 O(1)，插入/删除在尾部 O(1)，中间插入/删除 O(n)。
- ArrayList：非泛型，存储 object，需要装箱/拆箱，类型不安全。
:::

::: tip Dictionary 的底层实现

1. 算HashCode
2. index = HashCode % bucketCount(数组大小)
3. 哈希不冲突放数组索引位置(index)
4. 哈希冲突放对应索引位置的链表/红黑树
5. 当某个索引的元素数量过大时（例如 >= 8），链表会转换为红黑树。

其中 
- 链表：没有冲突最快o(1) 全是冲突最慢o(n)。
- 红黑树（自平衡二叉搜索树）：没有冲突最快o(1) 全是冲突最慢 o(log n)

所以微软在 Dictionary 的冲突项里做了优化，当某个索引的元素数量过大时（例如 >= 8），链表会转换为红黑树。

- **Dictionary使用 Key 查找、插入、删除复合上述流程，时间复杂度接近 O(1)。**
- **Dictionary使用 Value 查找、插入、删除 由于没有索引需要遍历，尽量避免。**

**另外.NET将冲突概率降到很低，使平均查找/插入仍接近 O(1)。**

这部分和Java的HashMap实现方式是一样的。
:::

::: tip 时间复杂度怎么算

- 顺序结构：O(n);
- 循环结构：
``` c#
for (i=0; i<n; i++)   // 循环 n 次
    O(1) 操作
→ O(n)
```

- 嵌套循环：乘法计算
``` c#
for (i=0; i<n; i++)
    for (j=0; j<n; j++)
        O(1)
→ O(n²)
```

- 递归

``` C#

T(n) = 2T(n/2) + O(n) → O(n log n)

```

- 二分查找、树操作

``` C#

规模 n → n/2 → n/4 → … → 1
n / 2^k = 1  →  2^k = n  →  k = log₂(n)
所以复杂度是 O(log n)。

```

:::




::: tip HashSet 底层存储结构

1. 算HashCode
2. index = HashCode % bucketCount(数组大小)
3. 哈希不冲突放数组索引位置(index)
4. 哈希冲突放对应索引位置的链表/红黑树
5. 当某个索引的元素数量过大时（例如 >= 8），链表会转换为红黑树。

HashSet 与 Dictionary的存储结构和查找、插入方式完全相同，但是只存Key。

查找、插入、删除平均时间复杂度 O(1)，最坏 O(log n)。

容量超过负载因子时会扩容并重新散列。
:::

::: tip `Stack<T> `和 `Queue<T>` 的区别？
`Stack<T>`：栈，后进先出（LIFO），常用方法 Push()、Pop()。历史记录使用。
`Queue<T>`：队列，先进先出（FIFO），常用方法 Enqueue()、Dequeue()。执行任务队列、消息队列中使用，
:::

::: tip HashSet 与 Dictionary的key可以是对象吗，如果是对象 hashcode怎么算

**可以是对象**

默认使用 Object.GetHashCode() 获取 HashCode（struct class 都可以）
  - Object.GetHashCode() 返回对象的内存地址的哈希值（CLR 内部生成的唯一标识）**如果不重写 GetHashCode() → 两个内容相同的对象，默认 hashCode 不同**
  - 重写 GetHashCode() 和 Equals() 才能正确判定相等。才能避免Key 重复。

::: 

::: tip `HashSet<T>` 和 `List<T>` 的区别
- `HashSet<T>`：基于哈希表实现，保证元素唯一性，查找/插入 O(1)，无序。更快。**可以用来去重。**
- `List<T>`：可重复，有序，查找 O(n)，插入末尾 O(1)。
:::

::: tip `SorteSet<T>` `SortedList<TKey,TValue>` 和 `SortedDictionary<TKey,TValue>` 区别

都是元素 自动排序（按 comparer，比如默认升序）的集合，但

- SortedSet 
  - 只存 Key 且 不允许重复，
  - 查找基于 红黑树 → O(log n)
  - 适用于：元素 不允许重复
- SortedList 
  - Key 自动排序（按 comparer），
  - 查找（dict[key]）用 二分查找 → O(log n)
  - 插入、删除需要移动数组元素 → O(n)（性能劣势）
  - 适用于：读操作远多于写操作，并且数据量不是特别大时
- SortedDictionary
  - Key 自动排序（和 SortedList 一样）
  - 基于 红黑树，插入、删除、查找均为 O(log n)
  - 应用场景：数据量大，频繁插入/删除，且需要保持有序时。

:::

::: tip SorteSet SortedDictionary 为什么不沿用HashSet和Dictionary，而使用红黑树
1. 要保证元素 有序,如果用数组存储 + 每次插入排序，插入/删除操作会很慢（O(n)）
2. 红黑树存储的数据有序，所以可以高效支持一些 范围查询（这是哈希表做不到的）
:::

::: tip 介绍红黑树

红黑树（Red-Black Tree, RBT）是一种 **自平衡二叉搜索树**（BST），通过在节点上加“颜色标记”（红/黑）和一系列规则来保证树的近似平衡。

**根黑、叶黑、不能连续红、黑高一致**

- 插入

  - 根节点是黑色。
  - 新节点初始为 红色（避免增加黑高）。
  - 如果违反规则（例如“两个红色相连”），通过以下方法修复：
    - 叔父节点是红色 → 父节点和叔父节点变黑，祖父变红（颜色翻转）。
    - 叔父节点是黑色 → 通过 旋转 + 变色 修复。

- 删除比插入复杂：
  - 若删除红节点，直接删即可（不影响黑高）。
  - 若删除黑节点，需要通过“兄弟节点”变色 + 旋转来恢复黑高一致。
:::

::: tip IComparable 与 IComparer 区别
它们都是用于定义对象之间的相等性比较规则。常用在集合排序、比较。

但：

- IComparable 
  - 用作对象本身与其他对象比较
  - `List<T>.Sort()`、`Array.Sort()` 如果不传比较器，就用 `IComparable<T>`对象本身实现的接口

- IComparer 
  - 独立的比较器类 实现，定义多种排序规则（比如一个按 Age，一个按 Name）
  - 由`List<T>.Sort()`、`Array.Sort()` 传入

:::

::: tip IEquatable 与 IEqualityComparer 区别
它们都是用于定义对象之间的相等性比较规则。常用在集合查找、去重。

但：

- IEquatable  
  - 用作对象本身与其他对象比较是否相等
  - `List<T>.Distinct()`、`HashSet 构造方法` 如果不传比较器，就用 `IComparable<T>`对象本身实现的接口

- IEqualityComparer 
  - 独立的比较器类 实现，定义多种相等性比较规则（比如一个按 Age，一个按 Name）
  - 由`List<T>.Distinct()`、`HashSet 构造方法` 传入

:::

::: tip 操作集合时常见问题

1. foreach、for 遍历增加/删除元素
- foreach 遍历可以修改对象属性，但不能增加/删除元素，会抛 InvalidOperationException。
- 增加/删除元素集合的方法：
  - for 循环删除元素。注意一定要倒序！正序删除增加都会导致索引改变影响结果】
  - 收集要删除的元素一起删除

2. `List<T>.Sort` 会修改原集合
   1. 使用 orderBy 排序

3. Remove 只删除第一个匹配项

:::

::: tip 怎么去重一个List

1. 遍历放入HashSet，元素如果是对象需要重写Equal和HashCode
2. 使用 Distinct()，元素如果是对象需要重写Equal和HashCode
3. 循环比较，性能很差，一般不用
4. GroupBy后Select，可以不用重写Equal和HashCode

:::

::: tip 怎么排序一个List
1. `List<T>.Sort() ` 会改变原集合
2. OrderBy / OrderByDescending
3. 放入SortedList

:::

::: tip 怎么筛选一个List
1. LINQ Where
2. 使用循环 + 条件

:::

## 运算符、表达式、语句

## 类、接口、面向对象

## 委托、事件

## LINQ

## 异步、多线程与并发
