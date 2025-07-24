# WPF

## 介绍

WPF（Windows Presentation Foundation）是微软推出的下一代桌面应用程序开发技术，用于构建在 Windows 上运行的富客户端应用（Rich Client Applications）。

它首次随 .NET Framework 3.0 于 2006 年发布，并在后续版本中不断完善。

WPF Demo 地址：https://github.com/chenrui1996/WpfDemo

::: tip WPF与Electron

| 对比            | **WPF**                        | **Electron**                               |
| --------------- | ------------------------------ | ------------------------------------------ |
| **开发语言**    | C#, XAML (.NET)                | HTML, CSS, JavaScript (Node.js + Chromium) |
| **UI 描述方式** | XAML                           | HTML + CSS                                 |
| **技术栈**      | .NET Framework / .NET Core     | Chromium + Node.js                         |
| **平台支持**    | Windows（原生）                | Windows / macOS / Linux（跨平台）          |
| **性能**        | 高性能（原生，DirectX 渲染）   | 较低（嵌套浏览器，内存消耗大）             |
| **启动速度**    | 快                             | 慢（需要加载整个 Chromium 引擎）           |
| **内存占用**    | 较低                           | 高（100MB 起步）                           |
| **UI 自定义**   | 强（基于样式、模板、矢量图形） | 也强（HTML/CSS 灵活）                      |
| **生态**        | .NET 生态，NuGet 包丰富        | Web 生态，NPM 包丰富                       |
| **调试工具**    | Visual Studio 调试器           | Chrome DevTools、VS Code                   |
| **部署体积**    | 小（几十 MB）                  | 大（通常 >100MB）                          |
| **开发门槛**    | 需熟悉 C#/XAML                 | 需熟悉 Web 技术栈                          |

:::

::: tip 推荐

开源控件库推荐 [MaterialDesignInXamlToolkit](https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit)， 相对于DevExpress开源，免费，好看

开源国产控件库推荐 [HandyOrg](https://handyorg.github.io/) 

:::

## 基本用法

### 创建 WPF 应用

参考 [使用 .NET 创建新的 WPF 应用](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/get-started/create-app-visual-studio)

#### 代码分析

一个 **WPF 空应用** 由以下几个部分组成：

``` text
MyApp/
├── App.xaml            --> 应用入口，资源字典、启动窗口等配置
├── App.xaml.cs         --> App.xaml 的后台代码
├── MainWindow.xaml     --> 主窗口 UI 定义
├── MainWindow.xaml.cs  --> 主窗口逻辑
```

- **`App.xaml`**

``` xml
<Application x:Class="MyWpfApp.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
        <!-- 应用级资源，如样式、模板 -->
    </Application.Resources>
</Application>

```

::: tip 解析
- `<Application>` : `App.xaml` 文件的根元素，它定义了 整个 `WPF` 应用程序的全局资源、启动配置和事件绑定。
- `x:Class="MyWpfApp.App"`: 指定当前 XAML 文件对应的后台代码（.xaml.cs）类名与命名空间。
- `xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"` : 指定默认命名空间，WPF 控件的 XML 命名空间地址。
  
  - 命名空间：

    XAML 使用 XML 命名空间（xmlns）来引用 CLR 类型。
    
    这个地址虽是一个 URL，但它并不会请求网络，而是被映射为 .NET 类型库。其他页面的命名空间类似。

  - 常见命名空间：

    | 前缀       | 命名空间地址                                                | 说明                                 |
    | ---------- | ----------------------------------------------------------- | ------------------------------------ |
    | (无前缀)   | `http://schemas.microsoft.com/winfx/2006/xaml/presentation` | WPF控件默认命名空间                  |
    | `x:`       | `http://schemas.microsoft.com/winfx/2006/xaml`              | XAML语言关键字（如x\:Class、x\:Key） |
    | 自定义前缀 | `clr-namespace:MyWpfApp.ViewModels`                         | 引用自定义 .NET 命名空间             |


- `StartupUri="MainWindow.xaml"`: 设置 StartupUri 启动页面。(也可以在`App.xaml.cs`创建MainWindow实例启动，甚至可以使用依赖注入启动。)
- `<Application.Resources> </Application.Resources>`: 注册全局资源字典（`ResourceDictionary`）如样式、模板。
:::

::: danger 提示
除命名空间声明， XAML 和后台代码绑定之外，Application 大多数功能都可以在代码中实现或替代。

实践中推荐:

- 使用 `MVVM / DI` 容器管理页面时， 可以完全移除 StartupUri，转为在 `App.xaml.cs` 中 `OnStartup()` 里手动加载窗口。
- 推荐使用资源字典等 `UI` 样式， 保留 `Application.Resources` 在 `XAML` 中配置。
:::


- **`App.xaml.cs`** ： App 类是继承自 System.Windows.Application 的，表示应用程序的入口点。可以通过重写 Application 类提供的一些方法或事件来控制应用的生命周期、异常处理、启动逻辑等。

::: tip 常见可重写的方法（virtual）
| 方法名                                                                    | 说明                                                                     |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `OnStartup(StartupEventArgs e)`                                           | 应用启动时触发，在 MainWindow 显示前调用。可设置主窗口、自定义启动流程。 |
| `OnExit(ExitEventArgs e)`                                                 | 应用退出时触发，用于释放资源、保存设置等。                               |
| `OnStartupNextInstance(StartupNextInstanceEventArgs e)`                   | 单实例应用再次启动时触发（需额外设置）。                                 |
| `OnActivated(EventArgs e)`                                                | 应用程序激活时调用（如被 Alt+Tab 激活）。                                |
| `OnDeactivated(EventArgs e)`                                              | 应用失去焦点时调用。                                                     |
| `OnSessionEnding(SessionEndingCancelEventArgs e)`                         | 系统注销或关机前调用，可取消关机。                                       |
| `OnDispatcherUnhandledException(DispatcherUnhandledExceptionEventArgs e)` | UI线程未捕获异常处理（推荐捕获崩溃日志）。                               |
:::

- **`MainWindow.xaml`** : 默认的主窗口 UI 定义（界面）
  - 常见标签与属性：
  
  | 区域               | 说明                                                  |
  | ------------------ | ----------------------------------------------------- |
  | `<Window>`         | 主窗口的根标签（继承自 `System.Windows.Window`）      |
  | `x:Class`          | 指定该窗口绑定的后台类（`MainWindow.xaml.cs`）        |
  | `xmlns`            | XAML 命名空间（标准 WPF 控件库）                      |
  | `xmlns:x`          | XAML 标准命名空间，用于指令（如 `x:Class`, `x:Name`） |
  | `xmlns:local`      | 自定义命名空间（项目内部类引用）                      |
  | `Title`            | 窗口标题                                              |
  | `Height` / `Width` | 窗口大小                                              |

- **`MainWindow.xaml.cs`** : 主窗口逻辑代码

  - 常见可重写方法汇总(主要来自其基类 System.Windows.Window 和其上级 ContentControl, FrameworkElement, UIElement 等):

  | 方法名                                    | 作用                   | 何时调用                          |
  | ----------------------------------------- | ---------------------- | --------------------------------- |
  | `OnInitialized(EventArgs e)`              | 窗口初始化时调用       | 调用 `InitializeComponent()` 之后 |
  | `OnContentRendered(EventArgs e)`          | 内容完全呈现后调用     | 窗口第一次可见时                  |
  | `OnActivated(EventArgs e)`                | 窗口获得焦点时调用     | 每次获得焦点                      |
  | `OnDeactivated(EventArgs e)`              | 窗口失去焦点时调用     | 每次失去焦点                      |
  | `OnClosing(CancelEventArgs e)`            | 窗口关闭前调用         | 可拦截并取消关闭                  |
  | `OnClosed(EventArgs e)`                   | 窗口关闭后调用         | 无法拦截，窗口已关闭              |
  | `OnKeyDown(KeyEventArgs e)`               | 用户按下键盘按键时调用 | UIElement 提供                    |
  | `OnMouseDown(MouseButtonEventArgs e)`     | 鼠标点击窗口时         |                                   |
  | `OnRender(DrawingContext drawingContext)` | 控件渲染时调用         | 通常用于自定义控件                |
  | `OnLoaded(RoutedEventArgs e)`             | 元素加载完成           | 推荐使用事件而非重写              |

#### 完整结构解析

<div class="SummaryGraph" style="border: solid 0px; position: relative;">

![](pictures/SummaryGraph.svg)

</div>

<style>
.SummaryGraph{
  width: 100%;
  overflow: auto;
}

.SummaryGraph p img{
  max-width: none;
}
</style>

#### 常见三方包集成

1. **依赖注入**

   - **Autofac**

     * **用途**：功能强大的 IoC 容器，支持模块注册、生命周期控制等。
     * **官网/文档**：[https://autofac.org/](https://autofac.org/)
     * **GitHub**：[https://github.com/autofac/Autofac](https://github.com/autofac/Autofac)

   - **Autofac.Extensions.DependencyInjection**

     * **用途**：用于将 Autofac 集成到 `Microsoft.Extensions.DependencyInjection` 系统中，支持 ASP.NET Core / WPF HostBuilder。
     * **GitHub**：[https://github.com/autofac/Autofac.Extensions.DependencyInjection](https://github.com/autofac/Autofac.Extensions.DependencyInjection)

2. **MVVM 框架**

   - **CommunityToolkit.Mvvm**

     * **用途**：微软官方推出的现代 MVVM 框架，支持属性自动通知、命令、导航等。
     * **文档**：[https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/](https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/)
     * **GitHub**：[https://github.com/CommunityToolkit/dotnet](https://github.com/CommunityToolkit/dotnet)

3. **图形/图表**

   - **LiveCharts.Core**

     * **用途**：用于 WPF 的高性能图表控件，支持折线图、柱状图、饼图等。
     * **文档**：[https://lvcharts.com/docs/](https://lvcharts.com/docs/)
     * **GitHub**：[https://github.com/beto-rodriguez/LiveCharts2](https://github.com/beto-rodriguez/LiveCharts2)

4. **UI 控件库**

   - **MaterialDesignThemes**

     * **用途**：为 WPF 提供 Material Design 风格的控件和样式库，包含 Snackbar、Dialog、颜色主题等。
     * **官网**：[https://materialdesigninxaml.net/](https://materialdesigninxaml.net/)
     * **GitHub**：[https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit](https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit)


   - **VirtualizingWrapPanel**

     * **用途**：用于替代 WPF 的 WrapPanel，实现 UI 虚拟化，提升滚动性能。
     * **GitHub**：[https://github.com/DenisBiondic/WpfVirtualizingWrapPanel](https://github.com/DenisBiondic/WpfVirtualizingWrapPanel)


### 视图(View)

#### XAML(UI)

WPF 的核心之一就是 XAML（eXtensible Application Markup Language），它是一种声明式的 XML 语言，用于定义用户界面。通过 XAML，可以直观、结构化地构建 UI 元素，而不必完全依赖 C# 代码。

##### 控件使用

- **布局控件（用于安排子元素位置）**

| 控件          | 说明                             | 填充父容器                                                            |
| ------------- | -------------------------------- | --------------------------------------------------------------------- |
| `Grid`        | 网格布局，可以创建多行多列       | 是                                                                    |
| `StackPanel`  | 垂直或水平堆叠子控件             | 否（需要设置HorizontalAlignment 和 VerticalAlignment 必须是 Stretch） |
| `WrapPanel`   | 自动换行排列控件                 | 否                                                                    |
| `DockPanel`   | 将子控件“停靠”在容器边缘         | 是（HorizontalAlignment 和 VerticalAlignment 默认 Stretch）           |
| `Canvas`      | 绝对定位布局（不推荐用于复杂UI） | 是                                                                    |
| `UniformGrid` | 所有单元格大小相同的网格         | 是                                                                    |

::: danger 注意
1. 如果需要填充父元素的同时子元素居中，可以在StackPanel/DockPanel外包裹一层容器（如Borde）撑满父元素，再设置 HorizontalAlignment 和 VerticalAlignment 为 center
2. StackPanel适合**简单线性列表**， DockPanel适合 **典型边框式布局（如顶部菜单、左侧导航、内容区）**， 子元素靠边“停靠”排列（上、下、左、右）， WrapPanel适合**自动换行排列控件**
:::

::: tip 使用方法

``` xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto" />
        <RowDefinition Height="*" />
        <RowDefinition Height="Auto" />
    </Grid.RowDefinitions>
    <Border Grid.Row="0" Background="LightGreen">
        <StackPanel
            HorizontalAlignment="Center"
            VerticalAlignment="Center"
            Orientation="Horizontal">
            <TextBlock
                Grid.Row="0"
                FontSize="24"
                Text="标题" />
        </StackPanel>
    </Border>
    <DockPanel Grid.Row="1">
        <TextBlock
            Background="LightSeaGreen"
            DockPanel.Dock="Left"
            FontSize="20"
            Text="左侧内容"
            TextAlignment="Center" />
        <TextBlock
            Background="LightGoldenrodYellow"
            DockPanel.Dock="Top"
            Text="上方" />
        <TextBlock
            Background="LightSteelBlue"
            DockPanel.Dock="Bottom"
            Text="下方内容" />
        <TextBlock Background="AliceBlue" Text="主内容" />
    </DockPanel>
    <Border Grid.Row="2" Background="LightPink">
        <WrapPanel
            Grid.Row="2"
            HorizontalAlignment="Right"
            Orientation="Horizontal">
            <Button
                Width="100"
                Margin="5"
                Content="提交"
                Style="{StaticResource MaterialDesignRaisedSecondaryDarkButton}" />
            <Button
                Width="100"
                Margin="5"
                Background="DarkGray"
                Content="取消"
                Style="{StaticResource MaterialDesignRaisedSecondaryDarkButton}" />
        </WrapPanel>
    </Border>
</Grid>
```

效果图：

![](pictures\WPFLayout.png)

:::

- **内容控件（通常有一个子元素）**

| 控件                       | 说明               |
| -------------------------- | ------------------ |
| `Button`                   | 按钮               |
| `Label`                    | 标签，不能选择文本 |
| `TextBlock`                | 显示文本（轻量）   |
| `TextBox`                  | 输入文本（可编辑） |
| `CheckBox` / `RadioButton` | 选择项             |
| `Image`                    | 显示图像           |
| `Border`                   | 添加边框或圆角修饰 |


::: tip 使用方法

``` xml
<StackPanel
    Margin="10"
    HorizontalAlignment="Center"
    VerticalAlignment="Center">
    <!--  Button 按钮  -->
    <Button
        Width="100"
        Margin="5"
        Content="点击我" />

    <!--  Label 标签（不能选中文本）  -->
    <Label Margin="5" Content="我是标签" />

    <!--  TextBlock 文本显示（轻量）  -->
    <TextBlock
        Margin="5"
        Text="这是一个 TextBlock，用于显示文本"
        TextWrapping="Wrap" />

    <!--  TextBox 输入框  -->
    <TextBox
        Width="200"
        Margin="5"
        Text="请输入内容" />

    <!--  CheckBox & RadioButton  -->
    <CheckBox Margin="5" Content="我同意协议" />
    <StackPanel Margin="5" Orientation="Horizontal">
        <RadioButton
            Margin="0,0,10,0"
            Content="选项 A"
            GroupName="Options" />
        <RadioButton Content="选项 B" GroupName="Options" />
    </StackPanel>

    <!--  Image 显示图像  -->
    <!--  注意Source以根目录开始时需要使用pack://application:,,,  -->
    <Image
        Width="100"
        Height="100"
        Margin="5"
        Source="pack://application:,,,/Asset/logo.png" />

    <!--  Border 包裹元素并添加边框或圆角  -->
    <Border
        Margin="5"
        Padding="10"
        BorderBrush="Gray"
        BorderThickness="1"
        CornerRadius="5">
        <TextBlock Text="带圆角的边框内容" />
    </Border>
</StackPanel>
```

:::

- **Items控件（可以绑定多个数据项）**

| 控件                             | 说明                     |
| -------------------------------- | ------------------------ |
| `ListBox`                        | 列表                     |
| `ComboBox`                       | 下拉选择                 |
| `ListView`                       | 支持详细视图，列展示     |
| `TreeView`                       | 树形结构                 |
| `Menu`, `ContextMenu`, `ToolBar` | 菜单相关                 |
| `DataGrid`                       | 类似表格，可编辑展示数据 |


::: tip 使用方法

``` xml
<!--  顶部菜单  -->
<Menu BorderBrush="Black" BorderThickness="1">
    <MenuItem Header="文件">
        <MenuItem Header="新建" />
        <MenuItem Header="打开" />
        <MenuItem Header="退出" />
    </MenuItem>
    <MenuItem Header="编辑">
        <MenuItem Header="复制" />
        <MenuItem Header="粘贴" />
    </MenuItem>
</Menu>

<!--  主体内容  -->
<ScrollViewer Grid.Row="1">
    <StackPanel
        Width="800"
        Margin="10"
        Orientation="Vertical">

        <!--  ListBox  -->
        <GroupBox Margin="0,5" Header="ListBox">
            <ListBox Width="200">
                <ListBoxItem>苹果</ListBoxItem>
                <ListBoxItem>香蕉</ListBoxItem>
                <ListBoxItem>橙子</ListBoxItem>
            </ListBox>
        </GroupBox>

        <!--  ComboBox  -->
        <GroupBox Margin="0,5" Header="ComboBox">
            <ComboBox Width="200">
                <ComboBoxItem>男</ComboBoxItem>
                <ComboBoxItem>女</ComboBoxItem>
                <ComboBoxItem>其他</ComboBoxItem>
            </ComboBox>
        </GroupBox>

        <!--  ListView  -->
        <GroupBox Margin="0,5" Header="ListView (需要绑定)">
            <ListView
                Width="400"
                Height="100"
                ItemsSource="{Binding People}">
                <ListView.View>
                    <GridView>
                        <GridViewColumn
                            Width="150"
                            DisplayMemberBinding="{Binding Name}"
                            Header="姓名" />
                        <GridViewColumn
                            Width="80"
                            DisplayMemberBinding="{Binding Age}"
                            Header="年龄" />
                    </GridView>
                </ListView.View>
            </ListView>
        </GroupBox>

        <!--  TreeView  -->
        <GroupBox Margin="0,5" Header="TreeView">
            <TreeView Width="200">
                <TreeViewItem Header="水果">
                    <TreeViewItem Header="苹果" />
                    <TreeViewItem Header="香蕉" />
                </TreeViewItem>
                <TreeViewItem Header="蔬菜">
                    <TreeViewItem Header="番茄" />
                    <TreeViewItem Header="黄瓜" />
                </TreeViewItem>
            </TreeView>
        </GroupBox>

        <!--  ToolBar  -->
        <GroupBox Margin="0,5" Header="ToolBar">
            <ToolBarTray>
                <ToolBar>
                    <Button Content="保存" />
                    <Button Content="打开" />
                    <Separator />
                    <Button Content="打印" />
                </ToolBar>
            </ToolBarTray>
        </GroupBox>

        <!--  DataGrid  -->
        <GroupBox Margin="0,5" Header="DataGrid (需要绑定)">
            <DataGrid
                Width="400"
                Height="150"
                AutoGenerateColumns="True"
                ItemsSource="{Binding People}" />
        </GroupBox>

        <!--  带右键菜单的按钮  -->
        <GroupBox Margin="0,5" Header="带右键菜单的按钮">
            <Button Content="右键点击我">
                <Button.ContextMenu>
                    <ContextMenu>
                        <MenuItem Header="剪切" />
                        <MenuItem Header="复制" />
                        <MenuItem Header="粘贴" />
                    </ContextMenu>
                </Button.ContextMenu>
            </Button>
        </GroupBox>

    </StackPanel>
</ScrollViewer>

```

:::

##### 模版

在 WPF（Windows Presentation Foundation）中，模板（Template） 是一种非常强大的机制，用于控制控件的外观，而不影响它的行为。模板允许你根据自己的需要完全自定义控件的 UI 结构，实现高可重用性和高可定制性。

- **模板的分类**

| 模板类型            | 说明                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **ControlTemplate** | 控制控件的整体结构和外观，替换控件的默认可视树。适用于 `Button`、`TextBox`、`ListBox` 等控件。        |
| **DataTemplate**    | 定义如何显示数据对象。通常用于列表控件（如 `ListBox`, `ComboBox`, `ItemsControl`）的 `ItemTemplate`。 |



##### 资源和样式

#### XAML.cs(交互)

1. 控件操作
2. 事件处理
3. 生命周期事件
4. ViewModel绑定


### ViewModel

#### 响应式属性(Dependency properties)

1. 响应式值类型属性
2. 响应式对象
3. 响应式集合

#### 指令(Command)

1. ICommand
2. RoutedCommand
3. RoutedUICommand

### Converts(数据转换)


## 控件封装

### Page

### UserControl

### CustomControl

## 数据处理(data)

## 应用规模化实践 

### 菜单加载

### 页面生成

## 其他实践 

### 对话框重写

### 主题切换
