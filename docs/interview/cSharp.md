# C#

## 概述

::: tip 为什么选c#作为开发语言
1. 相对Java来说，由嵌入式、c语言等其他背景的更倾向选择C#，因为学习成本相对较低，开发环境可以用同一套。
2. C# 不仅可以作为后端语言，相对于Java写Windows桌面程序更加原生。比如我想写一个Windows版本的蓝牙调试程序，用Java、Electron都支持都没有WPF要好。
3. C# 相对Java有很多语法糖，最好用的就是Linq，虽然Java也有Stream操作，但没有C#多。比如SelectMany，GroupJoin.而且支持LINQ4DB和LINQ4集合。还有TPL、模式匹配、元祖、事件等很多特性。
4. 总的来说，语言的选择主要看技术栈。比如电商或者一个有Java技术栈的公司选Java会有相对丰富的生态。工厂，嵌入式环境的C#学习成本较低。
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
   4. 使用插值语法拼接（`$"Hello {name}"` 本质是string.format, 只会在创建一个新的结果字符串实例。不会在每次拼接都创建实例。）
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

::: tip 如何自定义类型转换

- implicit（隐式转换）
``` c#
public struct Meter
{
    public double Value;
    public Meter(double value) => Value = value;

    // 从 double 隐式转换为 Meter
    public static implicit operator Meter(double value) => new Meter(value);
}

Meter m = 10.5;   // 自动调用 implicit
Console.WriteLine(m.Value); // 10.5
```

- explicit（显式转换）
``` c#
public struct Meter
{
    public double Value;
    public Meter(double value) => Value = value;

    // 从 Meter 显式转换为 int
    public static explicit operator int(Meter m) => (int)m.Value;
}

Meter m = new Meter(12.7);
int n = (int)m;   // ✅ 必须写 (int)
Console.WriteLine(n); // 12

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

::: tip 什么是泛型

泛型允许你在类、接口、方法中定义占位符类型（type parameter），在使用时再指定具体类型。

避免拆箱装箱影响性能，而且类型安全。

:::

::: danger 协变（Covariance）和逆变（Contravariance）是什么
协变（Covariance）

- 意思：派生类可以赋值给基类的泛型类型。返回值用 → 子类可以当作父类
- 用关键词 out 如： `IEnumerable<out T>` `IReadOnlyList<out T>`。
- 只能用在 返回值位置（不能用作方法参数类型）。只读不写

``` c#
public interface IEnumerable<out T> : IEnumerable
{
    IEnumerator<T> GetEnumerator();
}

class Animal { }
class Cat : Animal { }

IEnumerable<Cat> cats = new List<Cat>
{
    new Cat(),
    new Cat()
};

IEnumerable<Animal> animals = cats; // 协变允许

```

逆变（Contravariance）

- 意思：基类可以赋值给派生类的泛型类型。 参数用 → 父类可以当作子类
- 用关键词 in `IComparer<in T>`， `Action<in T>`。
- 只能用在 方法参数位置（不能用作返回值类型）。只写不读

``` c#
public interface IComparer<in T>
{
    int Compare(T x, T y);
}

class Animal
{
    public string Name { get; set; }
}

class Cat : Animal
{
    public int Age { get; set; }
}

// 比较器写成 IComparer<Animal>，说明它能比较任何 Animal。
class AnimalNameComparer : IComparer<Animal>
{
    public int Compare(Animal x, Animal y)
    {
        return string.Compare(x?.Name, y?.Name, StringComparison.Ordinal);
    }
}

List<Cat> cats = new List<Cat>
{
    new Cat { Name = "Mimi", Age = 2 },
    new Cat { Name = "Tom", Age = 5 }
};

// IComparer<Animal> 可以赋给 IComparer<Cat>
IComparer<Cat> comparer = new AnimalNameComparer();

cats.Sort(comparer);

foreach (var cat in cats)
    Console.WriteLine($"{cat.Name}, {cat.Age}");


```
:::

::: tip 如何初始化泛型变量

T value = default(T);

:::

## 运算符

::: tip == 和 Equals() 有什么区别
== 运算符

- 默认行为：
  - 对 引用类型（比如 object、class）：比较的是引用地址（即是否指向同一个对象）。
  - 对 值类型（比如 int、struct）：比较的是值本身。
- 可以通过 operator == 重载

Equals() 方法

- 来自 object.Equals() 方法，默认比较的是 引用类型的引用地址
- 可以通过 override 重写比较逻辑

:::

::: tip == 和 ReferenceEquals 有什么区别
== 运算符

- 默认行为：
  - 对 引用类型（比如 object、class）：比较的是引用地址（即是否指向同一个对象）。
  - 对 值类型（比如 int、struct）：比较的是值本身。
- 可以通过 operator == 重载

ReferenceEquals() 方法

- 永远比较引用地址
- 对 值类型（比如 int、struct）：会装箱 永远false

:::

::: tip ++i 和 i++ 的区别？在表达式中分别如何计算？
- ++i	先自增，再返回	自增后的值	i=5; ++i → 6
- i++	先返回，再自增	自增前的值	i=5; i++ → 5
:::

::: tip 什么是 空条件运算符 ?. / ?[]
- ?. 对象为空不抛空指针异常返回空，不为空返回属性
- ?[] 对象为空不抛空指针异常返回空，不为空返回数组索引项
:::

::: tip is 与 as 运算符的区别？as 转换失败时会发生什么？
- is 运算符 ： 判断对象是否是某种类型（或可转换为某种类型）。
- as 运算符 ： 尝试把对象转换为某种引用类型（或可空值类型）失败 → 返回 null。
:::


::: tip 使用过位运算吗，用来实现什么功能

位运算（& | ^ ~ << >>）在之前项目中常用作处理消息报文：

- 合并高低8位
``` c#
byte[] data = { 0x12, 0x34 }; // 两个字节

// 合并成一个 16 位整数
int value = (data[0] << 8) | data[1]; // 0x1234

```

- 提取某一位（bit flag）
``` c#
byte b = 0b_1010_1101;

// 判断第 3 位（从右往左 0-based）
bool bit3 = (b & (1 << 3)) != 0; // true (因为 b=10101101，第3位是1)

```

- 解析压缩字段

``` c#
byte msg = 0b_1101_0110;

// 高 4 位是类型
int type = (msg >> 4) & 0x0F; // 1101 -> 13

// 低 4 位是状态
int status = msg & 0x0F;      // 0110 -> 6

```

- 组装消息
``` c#
int type = 13;   // 1101
int status = 6;  // 0110

byte msg = (byte)((type << 4) | (status & 0x0F)); // 11010110

```
:::

::: tip checked / unchecked
- unchecked: 在运行时进行 不做溢出检查 `int b = checked(int.MaxValue + 1); // 溢出，不抛异常`
- checked：在运行时进行 强制溢出检查 `int b = checked(int.MaxValue + 1); // 溢出，抛 OverflowException`

- 默认是 unchecked 模式
:::

::: tip ^ 运算符在布尔和整数上下文中的不同含义是什么？
- 布尔（bool）上下文
  - 逻辑异或（XOR）
  - 两个布尔值不相同 → true；相同 → false（(a && !b) || (!a && b)）
- 整数（int、long 等）上下文
  - 逐位比较，相同 → 0，不同 → 1。
:::

::: tip nameof 运算符的作用是什么？有什么使用场景？
nameof 运算符 返回 变量、类型或成员的简单名称，结果是 字符串常量。

常用来获取属性名称，避免硬编码，如在WPF通知属性更改，打印日志一些场景里。

:::

## 表达式

::: tip 什么是表达式

表达式是由操作数和运算符组成的序列，计算结果为一个值。

:::

::: tip 什么是lamada表达式

Lambda 表达式是一种 匿名函数。是委托的一种表示方式、语法糖。

常用作：

- LINQ 查询
- 事件处理 / 回调（委托的一种常见使用）

:::

::: tip Lambda 表达式和匿名方法的区别？
Lambda 表达式是匿名方法的简洁升级版, 更简洁，编译器可自动推断参数类型, 单行时可省略 return, 并且支持表达式树。

``` c#
// 匿名方法
Func<int, int> f1 = delegate(int x) { return x + 1; };

// Lambda 表达式
Func<int, int> f2 = x => x + 1;

```
:::

::: tip 什么是表达式树

表达式树是一种树形数据结构，用于表示计算机程序中的算术或逻辑表达式。

本质上就是把 lambda 或算术逻辑表达式拆解成 节点树。

- 主要用于动态生成和执行代码、构建查询语言和实现表达式分析。
- 另外表达式树最广泛的应用场景是 LINQ（Language Integrated Query），尤其是 LINQ to SQL、Entity Framework 和其他 ORM 框架。这些框架会将 LINQ 查询转换为 SQL 查询。在这种情况下，表达式树被用来表示查询，框架会解析这些表达式树并将其转换为等效的 SQL 查询。
:::

::: tip 什么是模式匹配

模式匹配 就是 **判断对象类型、解构对象** 并处理。从 C# 7开始陆续支持。

常见的有：

- **is 运算符** / **switch**
  - **声明和类型模式** 判断表达式的运行时类型是否是某种类型，一般用来检查变量是不是某个类型（`if (greeting is string message)`）
  - **常量模式** 判断表达式结果是否是等于指定的常量，比如：（`if (input is null)`）
  - **关系模式** 表达式结果与常量进行比较, 比如：
  ``` c#
  static string Classify(double measurement) => measurement switch
  {
      < -4.0 => "Too low",
      > 10.0 => "Too high",
      double.NaN => "Unknown",
      _ => "Acceptable",
  };
  ```
  - **逻辑模式** 使用 `not`、`and` 和 `or` 连接两个关系模式
  - **属性/位置模式** 解构对象使用内部属性

- **弃元模式**
  - **用来占位但忽略值或类型**

:::

## 语句

::: tip C# 中有哪些分类的语句
- 声明语句
- 表达式语句
- 择语句
- 迭代语句
- 跳转语句
- 异常处理语句
- checked/unchecked
- lock
- using
- 局部函数
:::

::: tip for、foreach、while、do-while 的区别和使用场景？
都是 迭代语句

- for 循环
  - 已知循环次数 或基于索引的循环（遍历数组，remove要倒序）
- foreach 循环
  - 用于 遍历集合 不可直接新增删除遍历中的元素，会报错
- while 循环
  - 先判断条件，再执行循环体。
  - 适合 循环次数不确定 的情况，或者实现持续监听某事件或状态的线程
- do-while 循环
  - 先执行一次循环体，再判断条件。
  - 与 while 循环类似，需要至少执行一次逻辑的行为

:::

::: tip goto 跳转的作用

goto 可以直接跳转到任意位置。

``` c#
for (int i = 0; i < 5; i++)
{
    for (int j = 0; j < 5; j++)
    {
        if (i * j > 6)
            goto BreakAll;
    }
}
BreakAll:
Console.WriteLine("跳出了所有循环");


```

不推荐使用。增加维护难度和 Bug 风险

大多数 goto 能用更清晰的结构替代

:::

::: tip return 和 goto 与 break/continue 的区别
- break = 结束循环
- continue = 跳过一次，继续循环
- return = 结束方法
- goto = 跳到标签（不推荐）
:::

::: tip yield return 与 yield break 的作用是什么？
- yield return: 逐个返回元素而不是一次性返回整个集合。实现 延迟执行（Lazy Evaluation）。一般用来返回集合。
``` c#
IEnumerable<int> GetNumbers()
{
    for (int i = 1; i <= 5; i++)
    {
        yield return i; // 每次迭代返回一个元素
    }
}

```
- yield break： 立即 终止迭代器，后续元素不再产生。配合yield return使用，作为返回集合的终端条件。
``` c#
IEnumerable<int> GetNumbersUntilThree()
{
    for (int i = 1; i <= 5; i++)
    {
        if (i > 3)
            yield break; // 迭代终止
        yield return i;
    }
}

foreach (var n in GetNumbersUntilThree())
{
    Console.WriteLine(n);
}
// 输出 1 2 3

```
:::

::: tip using 语句和 using 指令有什么区别？
- using 指令: 文件顶部，命名空间之前,导入命名空间
- using 语句: 管理资源的生命周期，确保实现 IDisposable 的对象在使用完毕后 自动释放.
  - 常用在：文件操作，数据库连接，网络操作
:::

::: tip try-catch 异常在调用堆栈中是如何传播的？
异常在调用堆栈中“冒泡”，遇到匹配 catch 才停止，否则最终到达线程入口导致程序终止；finally 块在传播过程中总会执行。
:::

::: tip try-catch-finally 中 finally 一定会执行吗？哪些情况不会？
大多数情况下：finally 一定会执行。极端的 环境终止、线程被强制杀死、进程崩溃不会执行。
:::

::: tip 有什么异常在捕获后依然冒泡
ThreadAbortException 即使在 catch 块捕获，也会在 finally 或 catch 结束后自动再次抛出，除非显式调用 Thread.ResetAbort()。

所以不建议使用。
:::

## 委托、事件

::: tip 什么是委托？委托有什么作用？和函数指针有什么区别？你在项目中都什么时候使用委托。

**委托（Delegate）**可以理解为 一种类型安全的函数指针。

> 换句话说：委托就是一个 可以存储方法的变量，用来在运行时调用这些方法。

- 类型安全：只能指向匹配的函数签名的方法。
- 可以当作参数传递：可以将方法作为参数传入其他方法。
- 支持多播：一个委托可以同时引用多个方法（多播委托）。

函数指针和委托最主要的区别是：

> 函数指针 一次只能指向一个函数。而委托可以一次指向多个方法，称为多播委托。
> 多播委托 内部维护一个 方法列表，方法按 添加顺序 调用（FIFO）。当使用 += 添加方法时，会返回一个 新的委托实例，并将方法追加到调用列表里。

项目中使用最多的一个是匿名委托的LINQ，另一个是事件类型，事件本质上一种限制的委托。

除此之外可以在策略模式中替换算法。
:::

::: tip 有哪些内置委托
- Action 系列。没有返回值（void）
  - `Action<T1, T2,...>` 参数最多支持 16 个
- Func 系列。有返回值，
  - `Func<string,int,bool>` 参数最多支持 16 个，最后一个是返回值，返回值支持一个。多返回值可以用元祖或对象实现
- Predicate 系列。有一个参数，返回 bool。
  - `Predicate<int> pred = x => x > 0;` 常用于集合的查找、筛选，如 `List<T>.Find`。
- EventHandler 系列, 用于事件处理，参数固定为 (object sender, EventArgs e)
  - `public event EventHandler MyEvent;`              // 无自定义事件数据
  - `public event EventHandler<MyEventArgs> MyEventWithArgs`; // 自定义事件数据

:::

::: tip 什么是事件？事件和委托的关系是什么？

**事件（Event）**是一种特殊的委托封装，用于 对象间的通知机制。一个对象发布事件，其他对象订阅事件。

事件控制访问权限，外部只能订阅或取消订阅。事件是“安全版的委托”，保证外部只能订阅，不能直接触发。


``` c#
   // 自定义事件参数类
public class NotifyEventArgs : EventArgs
{
    public string Message { get; set; }
    public NotifyEventArgs(string message)
    {
        Message = message;
    }
}

public class Publisher
{
    // 使用自定义的事件参数类型
    public event EventHandler<NotifyEventArgs> NotifyEvent;

    public void Notify(string message)
    {
        // 触发事件，并传递自定义的事件参数
        NotifyEvent?.Invoke(this, new NotifyEventArgs(message));
    }
}

public class Subscriber
{
    public void OnNotifyReceived(object sender, NotifyEventArgs e)
    {
        Console.WriteLine("Event received with message: " + e.Message);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Publisher publisher = new Publisher();
        Subscriber subscriber = new Subscriber();

        // 订阅事件
        publisher.NotifyEvent += subscriber.OnNotifyReceived;

        // 触发事件
        publisher.Notify("Hello, Custom EventArgs!");
    }
}

```

为什么事件要基于委托封装？
- 委托支持多播：一个事件可以同时通知多个订阅者。
- 委托可作为参数传递：事件内部可以统一调用所有订阅者方法。
- 委托提供方法签名匹配：事件需要知道订阅者方法的参数和返回类型。
:::

::: tip 事件的使用有什么限制？
- 外部只能 订阅 (+=) 或取消订阅 (-=)
- 只能在声明它的类内部触发
:::

::: tip 委托是值类型还是引用类型？事件是值类型还是引用类型？
- 委托实例 存储的是 方法引用和目标对象引用,是引用类型，每次组合（+=、-=）都会产生新实例。
- 事件本质是封装了一个委托字段 所以也是引用类型
:::

::: tip 委托是线程安全的吗？为什么？如何保证线程安全？

委托本身不是线程安全的,

如何保证线程安全？

使用本地副本或使用锁

:::

::: tip 多播委托返回值如何处理？
多播委托可以绑定多个方法, 如果有返回值，只返回最后一个方法的返回值。

``` c#
Func<int,int> multiFunc = x => { Console.WriteLine("Method1"); return x + 1; };
multiFunc += x => { Console.WriteLine("Method2"); return x + 2; };

int result = multiFunc(5);
// 输出:
// Method1
// Method2

Console.WriteLine(result); // 7，只有最后一个方法的返回值有效

```

所以 多播委托最好用于 void 方法。
:::

## 类、接口

::: tip 类和对象的区别是什么？
- 类是对象的 抽象模板 或蓝图。定义了对象的结构和行为。
- 对象是类的 具体实例。在内存中有实际空间，可以操作其属性和调用方法。
:::

::: tip 类的成员有哪些类型？
- 字段
- 属性
- 方法
- 事件
- 索引器
- 构造函数
- 静态构造函数
- 析构函数
- 运算符重载
- 嵌套类
:::

::: tip 对象的生命周期是怎样的？垃圾回收（GC）如何处理对象？
对象是引用类型，如果不是静态对象，则 GC 自动回收， 整个过程为创建 → 活跃 → 不可达 → 回收。

静态对象生命周期跟随应用程序，通常程序结束时才回收。

如果实现了IDisposable，可以手动调用 Dispose() 释放非托管资源，不依赖 GC。

GC清理主要分两部分：

1. 分代管理 GC 优先回收短生命周期对象，提高效率。
   1. 0代（Gen 0）：新创建的对象，回收频率高。
   2. 1代（Gen 1）：经历过一次 GC 后仍存活的对象。
   3. 2代（Gen 2）：长生命周期对象，如全局缓存。
2. 标记-清理过程
   1. GC 扫描托管堆，找到所有 可达对象。不可达对象被标记为垃圾。
   2. GC 回收不可达对象的内存。如果对象有 终结器（Finalizer / Destructor）：对象被放入终结队列，稍后由 Finalizer 线程调用析构函数。
   3. 将存活对象搬移到堆的连续区域，减少内存碎片。

另外：

值类型（Value Type）：存储在栈上，离开作用域立即释放，不经过 GC。

:::

::: tip 什么是静态类？静态类和普通类有什么区别？

静态类是使用static 修饰的类
- 不能实例化：无法使用 new 创建对象。
- 只能包含静态成员：字段、方法、属性、事件等都必须是 static。
- 静态类不能被继承。
- 只能有静态构造函数（没有访问修饰符、无参数）。第一次访问静态成员前执行。

普通类可以有静态方法，但静态类不能有普通方法。
:::

::: tip this 关键字有什么作用？
this 表示当前实例对象
:::

::: tip 析构函数（Finalizer）和 IDisposable 接口有什么区别？
1. 析构函数（Finalizer）由 **垃圾回收器（GC）**在对象被回收时调用，程序不能手动调用。对象有析构函数，会进入 终结队列，GC 回收变慢。GC 何时回收对象无法预测。
2. IDisposable 提供一个 Dispose() 方法，用于手动释放资源。

使用 IDisposable，可以明确释放资源，适合所有需要释放的资源。

除析构函数中存在业务需求外不建议使用析构函数。
:::

::: tip 字段和属性的区别

private 的仅在类中使用的叫字段，其他访问限定符修饰的可被外部访问的叫属性

一般来说属性是 带有 get 和 set 方法的语法糖，提供对 字段的访问（读/写）。

``` c#
public class Person
{
    private string name;  // 私有字段

    public string Name    // 属性
    {
        get { return name; }            // 读取字段
        set { name = value; }           // 设置字段
    }
}

```

而 省略声明字段的属性被称为自动属性

``` c#
public class Person
{
    public string Name { get; set; }  // 自动属性
}

```

:::

::: tip 什么是索引器（Indexer）

索引器（Indexer）可以让类的对象像数组一样通过索引访问内部数据。

``` c#
public class Sample
{
    private string[] data = new string[10]; // 内部数组

    // 定义索引器
    public string this[int index]
    {
        get { return data[index]; }    // 读取
        set { data[index] = value; }   // 写入
    }
}

Sample s = new Sample();
s[0] = "Hello";         // 调用 set
Console.WriteLine(s[0]); // 调用 get


```

:::

::: tip 什么是对象的浅拷贝和深拷贝？如何实现深拷贝？
- 浅拷贝是复制对象的 值类型字段 和 引用类型字段的引用, 拷贝对象与原对象共享同一个引用对象。
- 深拷贝是复制对象及其所有引用类型字段的 独立副本。新对象与原对象完全独立，修改不会影响原对象。

- 浅拷贝可以使用MemberwiseClone实现
- 深拷贝可以使用序列化实现深拷贝，但是大对象开销较大，建议大对象手动拷贝。
:::

::: tip C# 中类是否支持多重继承？为什么？如何实现多继承的效果？
不支持。

会出现钻石继承问题

A
||
B C
||
D

B C 可能有重复字段

想要实现多重继承效果可以实现多接口

:::

::: tip 什么是抽象类？抽象类和接口有什么区别？
- 抽象类 : 使用 abstract 修饰的类。不能被实例化，只能被继承。抽象成员（没有方法体，子类必须实现）。普通成员（有实现，子类可直接使用或重写）。表对象。强调继承关系，不能多继承。
  - **抽象类可以包含 抽象方法（没有实现，必须由派生类实现）和 虚方法（有默认实现，可以被派生类重写）**
- 接口： 使用 interface 关键字声明。一组方法、属性、事件、索引器的约定，不包含实现（C# 8 之后可以有默认实现）。表能力。强调行为规范，可以多继承。
:::

::: tip 什么是密封类（sealed class）？使用场景有哪些？
使用 sealed 关键字修饰的类。 不能被继承，但可以实例化。

常用于工具类。比如Math。

sealed 还可以修饰方法，修饰方法表示不能被重写。
:::

::: tip 如何防止类被实例化
1. 工具类可以使用静态类
2. 单例模式使用private构造方法
3. 基类使用抽象类防止被实例化
:::

::: tip 如何设计一个不可变（Immutable）的类？
参考string、不可变集合

1. 字段全部设为 readonly
2. 属性只能 get
3. 引用类型字段 也要做只读包装
4. 类本身要 sealed
5. 如果需要修改 → 返回新对象

:::

## 面向对象

::: tip 面向对象特性
封装、继承、抽象、多态

1. 封装
   1. 把数据和方法打包到类里，控制访问权限，只暴露必要接口
2. 继承
   1. 子类可以继承父类的成员（字段、方法、属性），从而实现代码复用。
3. 多态
   1. 同一个方法调用在不同对象上表现出不同的行为。可以通过继承和实现接口实现多态
   2. 重写 (Override) ——运行时多态。重载 (Overload) ——编译时多态。
4. 抽象
   1. 通过抽象类或接口，只定义规范，而不关心具体实现。
   2. 提高灵活性和扩展性。

这四个特性的最终目的是：

**保证安全的前提下**，实现**使用较少代码**且尽量**不破坏原有结构的情况下拓展代码**

这同样也是设计模式的核心原则。
:::

::: tip 组合和继承的区别是什么？什么时候用组合代替继承？

- 组合是一个类通过包含另一个类的对象，来复用其功能。
- 继承是子类自动拥有父类的属性和方法。

组合可以在运行时动态决定，扩展性更强。继承是一种静态关系，编译期确定；遵循“组合优于继承”原则。

在没有明确父子关系时尽量使用组合。

:::

## 设计模式

::: tip 什么是设计模式？有什么作用？核心原则是什么？

设计模式（Design Pattern）是在软件开发过程中反复出现的问题的解决方案与经验。

原则：
1. 单一职责原则，一个类只做一件事
2. 开闭原则，对扩展开放，对修改关闭。
3. 里氏替换原则，类必须可以替换父类出现的地方，不破坏功能
4. 依赖倒置原则，高层模块不依赖低层模块，二者都依赖抽象；抽象不依赖细节，细节依赖抽象。
5. 接口隔离原则，尽量拆分接口

目的是：开发时提高复用性，维护时提高稳定性，扩展时能在尽量不破坏原有功能的情况下扩展。以此形成一套完整的开发维护扩展的解决方案。

但是：

在实战项目中只要能有一套完整的稳定的解决方案，没有必要过度设计。比如过度抽象接口，过度考虑未来需求。

满足当前需求，保证稳定和可维护，按需优化。
:::

::: tip 设计模式有哪些类型，你在实践中使用过哪些
三大类

- 创建型，解决对象的创建问题
  - 单例：确保一个类只有一个实例
  - 工厂：定义接口创建对象，由子类决定实例化哪一个类
  - 抽象工厂：提供接口创建相关或依赖对象族
  - 建造者：将复杂对象的构建和表示分离
  - 原型：通过复制已有实例创建新对象
- 结构型，解决对象的组合问题
  - 适配器：将接口不兼容的类连接起来
  - 桥接：将抽象与实现分离，使两者可以独立变化
  - 装饰：动态地给对象添加职责
  - 代理：为对象提供替身或占位符
  - 组合：将对象组合成树形结构，统一对待单个对象和组合对象
  - 外观：提供统一接口，简化子系统调用
  - 享元：共享对象以减少内存开销
- 行为型，解决对象的职责分配与通讯
  - 策略：定义一系列算法并可互换
  - 模板方法：定义算法骨架，子类实现具体步骤
  - 观察者：定义对象间一对多依赖
  - 命令：将请求封装为对象
  - 状态：对象状态变化时改变行为，状态机实现
  - 职责链：责任对象形成链，按顺序处理请求，任务链处理
  - 访问者：在不改变对象结构的前提下增加操作
  - 迭代器：提供顺序访问集合元素的方法
  - 中介者：封装对象间复杂交互
  - 备忘录：保存和恢复对象状态
  - 解释器：定义语言的文法和解释器

其中使用到的（着重介绍）：

- **单例（除设备虚手动维护，其他推荐依赖注入管理容器）** 
- 工厂（数据库驱动，较少使用）
- 抽象工厂（数据库驱动，较少使用）
- **原型（深拷贝和浅拷贝）**
---
- 适配器（设备种类多时要统一接口再用，种类少不推荐）
- **装饰（本质是组合对象，如果没有明确的继承关系，推荐使用装饰模式对原有对象增加功能）**
- **代理（开发时很少自己写代理，但调用的第三方包很多都是基于代理实现的）**
- **组合（对象的树形结构，大多数UI控件组件都是采用这结构）**
- **外观（大多数对其他系统开放的webapi就属于外观模式的一种）**
- 享元（享元模式把可共享的部分提取出来，多个对象共用同一份数据。如string 的 字符串常量池）
---
- **策略（不直接写具体算法逻辑，而是通过 策略接口 调用不同的策略对象，应用很多）**
- **模板方法（在父类中定义一个操作的骨架（模板方法），将部分步骤延迟到子类实现）**
- **命令（将请求封装为对象，常用于与设备通信）**
- **状态（通过 状态切换 来改变对象的行为，而不是写一堆 if/else 或 switch。）**
- **职责链（处理请求的对象用链式结构连接起来）**

:::


::: tip 介绍一下单例及应用

单例模式是在程序运行时始终只有一个实例。

可以有以下实现方式：

- 饿汉式：静态声明实例化
- 懒汉式：第一次获取实例是实例化，构造方法私有化
- 懒汉式加锁保证线程安全，先判空提高效率再加锁再判空再实例化。保证多线程访问时不会出现多个实例。
- 使用`Lazy<Singleton>`关键字。
- 使用依赖注入。对象本身需要线程安全。

实践中，使用最多的是日志、设备任务与通信管理、其他工具类及服务。

其中日志和服务类更推荐依赖注入管理容器，

而设备需要项目启动时从数据库或配置文件加载配置，通常需要手动实现。

:::


::: tip 工厂模式
- 工厂模式: 定义一个创建对象的接口，让子类决定实例化哪一个类。依赖接口，不依赖实现。
``` text
Product（产品接口）
  │
ConcreteProduct（具体产品）
  
Creator（工厂接口）
  │
ConcreteCreator（具体工厂）
```

- 抽象工厂模式: 创建多族对象。因为有多个不用族对象的工厂，为保证依赖接口所以要给工厂创建一个抽象工厂接口，用来约束工厂对象模版。
``` text
AbstractFactory（抽象工厂）
    ├─ CreateProductA()
    └─ CreateProductB()

ConcreteFactory1（具体工厂1）
ConcreteFactory2（具体工厂2）

ProductA / ProductB（抽象产品）
ConcreteProductA1 / ConcreteProductB1
ConcreteProductA2 / ConcreteProductB2

```

但是通常情况下，智能制造业务里由数据库驱动表单，配置或数据库驱动设备。创建它们时很难用到工厂模式。所以使用较少。

:::

::: tip 建造者模式
将一个复杂对象的构建过程与表示分离，使得同样的构建过程可以创建不同的表示。

``` text
Product（产品）
Builder（抽象建造者）
    + BuildPartA()
    + BuildPartB()
ConcreteBuilder（具体建造者）
    - 实现构建方法
Director（指挥者，可选）
    - 定义构建顺序
Client（客户端）
    - 通过Director构建最终产品

```

典型的链式建造者：

``` c#
public class Robot
{
    public string Head { get; set; }
    public string Body { get; set; }
    public string Legs { get; set; }
}

public class RobotBuilder
{
    private Robot robot = new Robot();
    public RobotBuilder SetHead(string head) { robot.Head = head; return this; }
    public RobotBuilder SetBody(string body) { robot.Body = body; return this; }
    public RobotBuilder SetLegs(string legs) { robot.Legs = legs; return this; }
    public Robot Build() => robot;
}

// 使用
var robot = new RobotBuilder()
    .SetHead("Custom Head")
    .SetBody("Custom Body")
    .SetLegs("Custom Legs")
    .Build();


```

和工厂模式一样，使用较少，但是链式调用经常使用。

:::


::: tip 原型模式
通过复制已有对象来创建新对象，而不是通过 new 操作构造对象。

- 浅拷贝：使用`MemberwiseClone`
- 深拷贝：小对象序列化，大对象手动考

:::


::: tip 适配器模式
把多个不同类型的接口转换成同一类型的调用。统一调用方式。

比如，

我们既使用了海康的AGV，又使用了快仓的AGV。

此时我可以封装一个AGV 适配器，通过类型统一调度。

**如果设备种类较少，不推荐适配器模式，推荐通过种类判断再调用方法。**

``` c#
using System;

// 1️⃣ 统一接口（Target）
public interface IDeviceController
{
    void Move(double x, double y);
}

// 2️⃣ 不同设备已有接口（Adaptee）
public class HaiKangAGV
{
    public void DriveTo(double x, double y)
    {
        Console.WriteLine($"AGV 移动到 ({x}, {y})");
    }
}

public class KuaiCangRGV
{
    public void SetPosition(double posX, double posY)
    {
        Console.WriteLine($"RGV 定位到 ({posX}, {posY})");
    }
}

// 3️⃣ 适配器（Adapter）
public class AGVAdapter : IDeviceController
{
    private readonly HaiKangAGV _agv;
    public AGVAdapter(HaiKangAGV agv) { _agv = agv; }

    public void Move(double x, double y)
    {
        _agv.DriveTo(x, y);  // 调用具体方法
    }
}

public class RGVAdapter : IDeviceController
{
    private readonly KuaiCangRGV _rgv;
    public RGVAdapter(KuaiCangRGV rgv) { _rgv = rgv; }

    public void Move(double x, double y)
    {
        _rgv.SetPosition(x, y); // 调用具体方法
    }
}

// 4️⃣ 客户端使用
class Client
{
    static void Main()
    {
        //这里可以使用工厂模式传入类型新建
        IDeviceController agvController = new AGVAdapter(new HaiKangAGV());
        IDeviceController rgvController = new RGVAdapter(new KuaiCangRGV());

        agvController.Move(10, 20);  // 输出：AGV 移动到 (10, 20)
        rgvController.Move(5, 15);   // 输出：RGV 定位到 (5, 15)
    }
}

```

:::


::: tip 桥接模式
将抽象部分与实现部分分离，使它们可以独立变化。

``` text
Abstraction ——> Implementor
     ↑                ↑
     │                │
RefinedAbstraction   ConcreteImplementor

```

- 抽象（功能）和实现（设备型号）都可能独立扩展。
- 如果使用集成就会组合爆炸

:::


::: tip 装饰模式

装饰模式是一种 结构型设计模式，它允许在不改变原有对象结构的情况下，动态地为对象添加额外的功能。

和继承不同，装饰模式用 组合（对象嵌套） 来扩展功能，更加灵活。

**需要对原有对象增加功能，如果没有明确的继承关系，推荐使用装饰模式，也就是组合对象。**
:::

::: tip 代理模式
不改变原有对象（RealSubject） 的前提下，提供一个 代理对象（Proxy） 来控制对它的访问。

开发时很少自己写代理，但调用的第三方包很多都是基于代理实现的。

比如：

- WCF / gRPC 客户端：隐藏了底层的网络通信细节，本地调用看起来就像调用本地方法。
- ORM 框架里的缓存：拦截对数据库的查询，优先从缓存取。
- AuthorizationFilter：拦截授权
……
:::

::: tip 组合模式
组合模式 是“树形层级管理”

``` text
Component 
 ├── Leaf 
 └── Composite 

```

常见的有：

- 控件体系：UIElement → Panel（组合容器）→ Button、TextBox（叶子控件）
- 表达式树：比如 Where().OrderBy().Select() 会构造成一个树形结构。
- Vue
- Json 解析
- XML 解析

:::

::: tip 外观模式
为子系统中的一组复杂接口提供一个统一的高层接口，使得子系统更容易使用。

大多数对其他系统开放的webapi就属于外观模式的一种。

:::

::: tip 享元模式
享元模式把可共享的部分提取出来，多个对象共用同一份数据。

string 的 字符串常量池（intern pool） 本质上就是 享元模式的典型应用。

但我没用过，存在数据安全的风险。

:::

::: tip 策略模式
客户端不直接写具体算法逻辑，而是通过 策略接口 调用不同的策略对象。

可以在运行时 动态切换策略。

实践中常通过页面、配置文件、数据库确定算法。如：

- 充电策略
  - 定时
  - 低电量
  - 空闲
- 出库策略
  - 先入先出
  - 先入后出
- 抽检策略
  - 随机
  - 分段
  - 分时
  ……

:::

::: tip 模版方法
在父类中定义一个操作的骨架（模板方法），将部分步骤延迟到子类实现。

- 父类控制整体流程（算法骨架）。
- 子类负责实现可变的部分。
- 保证算法结构不被破坏，同时允许灵活扩展

通常在框架中（如 ASP.NET Core、Vue、Angular、WPF 控件、Unity 等），框架把 流程固定 + 钩子留给用户扩展，本质就是模板方法模式。

其他业务场景下，除非有明确的父子关系，其他情况更推荐 组合对象实现功能。

:::

::: tip 命令模式
请求（操作）封装成对象，客户端只知道调用命令，不需要知道具体执行细节。

命令模式在项目实践中应用十分广泛

几乎所有设备，包括堆垛机，AGV，机器手，输送线等，都会有独立的消息格式及通讯协议。

通常会做消息封装，封装为可读性高的对象。

:::

::: tip 状态模式

通过 状态切换 来改变对象的行为，而不是写一堆 if/else 或 switch。

可以使用[stateless](https://github.com/dotnet-state-machine/stateless?tab=readme-ov-file)实现

:::

::: tip 职责链
将多个处理请求的对象用链式结构连接起来，请求沿着链传递，直到有对象能够处理它为止。

实践中除了审批流以外，我链式任务处理中也经常用到：

比如：

扫描完成 => 分配巷道 生成输送到巷道口的任务 => 任务完成 分配位置 生成搬运到位置的任务。

等。

:::

## LINQ

::: tip 什么是 LINQ？它的优势是什么？


:::

## 异步、多线程与并发

