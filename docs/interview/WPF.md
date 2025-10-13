# WPF

::: tip 什么是WPF 与Winform区别 怎么选择

WPF（Windows Presentation Foundation）是微软推出的基于 .NET 的桌面 UI 框架，使用 XAML + C# 构建界面，基于 DirectX 渲染

与 Winform相比 DirectX（矢量 应用程序接口（API））,而Winform是GDI(像素图像接口)、XAML + 代码分离。

复杂项目需要MVVM的选WPF，简单项目选Winform。

- 桌面端的跨平台需求推荐使用 Avalonia UI（常简称 Ava）
- 移动端的跨平台需求推荐使用 MAUI(Xamarin 后续)

:::

## 🧱 一、基础知识（1～15）

1️⃣ WPF 是什么？

> 基于 .NET、使用 DirectX 渲染的桌面 UI 框架。

2️⃣ XAML 是什么？

> 用 XML 语法描述 UI 元素与布局的标记语言。

3️⃣ WPF 与 WinForms 区别？

> WPF 用 DirectX，支持样式、动画、数据绑定。

4️⃣ WPF 优势？

> 分辨率独立、矢量图形、样式模板、MVVM。

5️⃣ WPF 应用入口？

> `App.xaml` 与 `App.xaml.cs`。

6️⃣ WPF 窗口基类？

> `System.Windows.Window`

7️⃣ 主窗口默认启动方式？

> `StartupUri="MainWindow.xaml"`

8️⃣ 什么是 BAML？

> 编译后的 XAML（二进制 XAML）嵌入程序集。

9️⃣ WPF 支持哪些图形？

> 矢量图、几何图形、路径、3D 模型。

10️⃣ WPF 的渲染机制？

> 使用 DirectX + MILCore 渲染视觉树。

11️⃣ Logical Tree 是什么？

> 表示控件层级的逻辑结构（父子关系）。

12️⃣ Visual Tree 是什么？

> 表示实际渲染结构（包含模板与子元素）。

13️⃣ Logical 与 Visual Tree 区别？

> Logical 关心结构，Visual 关心显示。

14️⃣ 什么是 Dispatcher？

> 管理 UI 线程任务队列的调度器。

15️⃣ Dispatcher.Invoke 与 BeginInvoke 区别？

> Invoke 同步执行，BeginInvoke 异步执行。

---

## 🧩 二、布局与控件（16～30）

16️⃣ 常用布局控件？

> Grid、StackPanel、DockPanel、WrapPanel、Canvas、UniformGrid。

17️⃣ Grid 用法？

> 用行列定义布局，可设置比例。

18️⃣ StackPanel 用法？

> 顺序堆叠子元素（水平/垂直）。

19️⃣ DockPanel 用法？

> 子元素停靠到容器边（上左下右）。

20️⃣ WrapPanel 用法？

> 自动换行布局，常用于标签展示。

21️⃣ Canvas 用法？

> 绝对定位布局，用 `Canvas.Left/Top` 控制位置。

22️⃣ UniformGrid 用法？

> 平均分配单元格空间。

23️⃣ ContentControl 是什么？

> 可承载单个内容的控件基类（如 Button）。

24️⃣ ItemsControl 是什么？

> 可显示集合数据（如 ListBox、ComboBox）。

25️⃣ Template 与 Style 区别？

> Template 定义外观结构；Style 定义属性集。

26️⃣ ControlTemplate 是什么？

> 控件的外观模板。

27️⃣ DataTemplate 是什么？

> 数据展示模板（控制数据在 UI 中如何显示）。

28️⃣ UserControl 与 CustomControl 区别？

> UserControl 组合控件，CustomControl 可完全自定义外观。

29️⃣ 什么是附加属性？

> 可在非定义类上使用的依赖属性（如 Grid.Row）。

30️⃣ 什么是 Freezable？

> 可被冻结提高性能的对象（如 Brush、Transform）。

---

## 🔗 三、数据绑定与命令（31～45）

31️⃣ 什么是数据绑定？

> 将 UI 属性与数据源连接，实现同步。

32️⃣ 绑定的常见模式？

> OneTime、OneWay、TwoWay、OneWayToSource。

33️⃣ 什么是 DataContext？

> 控件绑定数据的上下文。

34️⃣ DataContext 的继承特性？

> 子控件自动继承父控件的 DataContext。

35️⃣ 什么是 BindingPath？

> 绑定到对象属性路径的表达式。封装组件要注意。

36️⃣ 如何实现值转换？

> 实现 IValueConverter 接口。

37️⃣ Converter 的用途？

> 格式转换、值映射、可视化状态转换。

38️⃣ 什么是 MultiBinding？

> 同时绑定多个源值。

39️⃣ MultiBinding 的转换器接口？

> IMultiValueConverter。

40️⃣ 绑定中的 FallbackValue 用途？

> 数据绑定失败时使用的默认值。

41️⃣ TargetNullValue 用途？

> 数据源为 null 时使用的值。

42️⃣ 验证绑定错误？

> 使用 ValidationRules 或 IDataErrorInfo。

43️⃣ 什么是 ICommand？

> 用于解耦 UI 事件与逻辑的命令接口。

44️⃣ ICommand 的关键方法？

> Execute() 和 CanExecute()。

45️⃣ 常见命令实现？

> RelayCommand、DelegateCommand（Prism）。

---

## 🎨 四、资源、样式与模板（46～60）

46️⃣ 什么是资源（Resource）？

> 可重用对象，如颜色、样式、模板。

47️⃣ 资源作用域？

> 局部（Window/UserControl）或全局（App.xaml）。

48️⃣ 静态资源与动态资源区别？

> StaticResource 编译时加载；DynamicResource 运行时更新。

49️⃣ 资源查找顺序？

> 局部 → 父级 → 应用级 → 系统级。

50️⃣ Style 是什么？

> 属性集合，用于统一控件外观。

51️⃣ Style 可继承吗？

> 可以，通过 BasedOn 属性。

52️⃣ Trigger 是什么？

> 条件满足时更改样式属性。

53️⃣ Trigger 类型？

> PropertyTrigger、DataTrigger、EventTrigger、MultiTrigger。

54️⃣ ControlTemplate 作用？

> 定义控件结构与视觉树。

55️⃣ TemplateBinding 是什么？

> 模板中绑定到控件自身属性的方式。

56️⃣ DataTemplate 与 ItemTemplate 区别？

> ItemTemplate 是控件的 DataTemplate。

57️⃣ HierarchicalDataTemplate 用途？

> 在树形控件（TreeView）中递归显示数据。

58️⃣ VisualStateManager 用于？

> 管理控件状态（如 Button 按下、悬停）。

59️⃣ DynamicResource 典型应用？

> 主题切换、运行时换肤。

60️⃣ ResourceDictionary 用途？

> 存放可复用的样式、模板等资源。

---

## ⚙️ 五、依赖属性与事件（61～75）

61️⃣ 什么是依赖属性？

> 支持绑定、动画、样式的特殊属性。

62️⃣ 定义依赖属性语法？

> DependencyProperty.Register()。

63️⃣ 依赖属性存储机制？

> 存储在 DependencyObject 的属性字典中。

64️⃣ DependencyObject 是什么？

> 所有支持依赖属性的基类。

65️⃣ DependencyProperty 优点？

> 节省内存，支持绑定、动画、样式。

66️⃣ 普通属性与依赖属性区别？

> 普通属性静态存储；依赖属性由属性系统管理。

67️⃣ DependencyProperty 的值优先级？

> 动画 → 本地值 → 样式 → 默认值。

68️⃣ 路由事件是什么？

> 可在视觉树上传递的事件。

69️⃣ 路由事件类型？

> 冒泡（Bubble）、隧道（Tunnel）、直接（Direct）。

70️⃣ 冒泡事件示例？

> MouseDown。

71️⃣ 隧道事件示例？

> PreviewMouseDown。

72️⃣ 如何定义自定义路由事件？

> 使用 EventManager.RegisterRoutedEvent()。

73️⃣ 命令与路由事件区别？

> 命令可跨控件绑定逻辑；事件仅在当前层级传播。

74️⃣ 什么是附加事件？

> 可在非声明类上触发的路由事件。

75️⃣ InputBinding 用途？

> 将键盘/鼠标输入与命令绑定。

---

## 🧠 六、MVVM 与架构（76～90）

76️⃣ MVVM 是什么？

> Model-View-ViewModel，UI 与逻辑解耦模式。

77️⃣ Model 层职责？

> 定义业务数据和逻辑。

78️⃣ View 层职责？

> 负责界面展示与交互。

79️⃣ ViewModel 层职责？

> 暴露属性与命令供绑定。

80️⃣ MVVM 核心机制？

> DataBinding + ICommand + INotifyPropertyChanged。

81️⃣ INotifyPropertyChanged 用途？

> 通知 UI 属性值变化。

82️⃣ RaisePropertyChanged 实现？

> 调用 PropertyChanged 事件。

83️⃣ ObservableCollection 用途？

> 集合变化通知 UI 更新。

84️⃣ RelayCommand 是什么？

> 通用 ICommand 实现类。

85️⃣ Prism 是什么？

> 微软 MVVM 框架，支持模块化、命令、导航。

86️⃣ Prism 的核心功能？

> EventAggregator、DelegateCommand、RegionManager。

87️⃣ View 与 ViewModel 绑定方式？

> View 的 DataContext 指向 ViewModel。

88️⃣ 如何在 MVVM 中打开窗口？

> 使用事件聚合器或服务类解耦。

89️⃣ ViewModel 之间通信？

> 使用 Messenger/EventAggregator。

90️⃣ MVVM 的优点？

> 解耦、可测试、可维护、可扩展。

---

## 🚀 七、性能与优化（91～100）

91️⃣ 性能优化常见方法？

> 启用虚拟化、减少视觉树、冻结资源。

92️⃣ 什么是 UI 虚拟化？

> 仅渲染可见元素，节省内存。

93️⃣ 虚拟化控件示例？

> ListBox、ListView、DataGrid。

94️⃣ 启用虚拟化属性？

> VirtualizingStackPanel.IsVirtualizing="True"。

95️⃣ 使用 Freezable 优化？

> 冻结不可变对象减少内存消耗。

96️⃣ 延迟加载资源？

> 使用 DynamicResource 或惰性初始化。

97️⃣ 使用 BitmapCache 的作用？

> 缓存复杂视觉元素加速重绘。

98️⃣ 避免频繁更新 UI 的方式？

> 使用 Dispatcher.BeginInvoke 批量更新。

99️⃣ 优化数据绑定性能？

> 避免多层嵌套绑定、禁用不必要的通知。

100️⃣ 减少内存泄漏方法？

> 解除事件订阅、避免静态引用、用弱事件模式。

---
