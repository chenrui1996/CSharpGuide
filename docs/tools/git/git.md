# Git

## 基本原理

## 常用操作

### 创建 GitHub 仓库

1. **在 GitHub 官网（https://github.com）创建一个新仓库。**

2. **本地初始化 Git 仓库并推送到 GitHub：**
``` cmd
git init  # 初始化 Git 仓库
git remote add origin git@github.com:your-username/your-repo.git  # 绑定远程仓库
git add .  # 添加所有文件
git commit -m "Initial commit"  # 提交更改
git push -u origin main  # 推送到 GitHub
```

### 克隆 GitHub 仓库
``` cmd
git clone git@github.com:your-username/your-repo.git 
```

### 添加 & 提交代码
``` cmd
git add .               # 添加所有修改的文件
git commit -m "更新了功能"  # 提交更改
git push origin main    # 推送到 GitHub
```

### 创建 & 切换分支
``` cmd
git branch feature-branch   # 创建新分支
git checkout feature-branch # 切换到新分支
```

或直接

``` cmd
git checkout -b feature-branch  # 创建并切换分支
```

### 推送分支到 GitHub
``` cmd
git push origin feature-branch  # 推送分支到 GitHub
```

### 删除本地 & 远程分支
``` cmd
git branch -d feature-branch  # 删除本地分支
git push origin --delete feature-branch  # 删除远程分支
```

### 拉取 GitHub 最新代码
``` cmd
git pull origin main  # 拉取远程 main 分支最新代码
```

### 处理冲突
1. **触发冲突的场景:**
- `git pull` 时 本地和远程代码不一致
- `git merge` 时 试图合并不同分支
- `git rebase` 时 重新整理提交记录

2. **解决冲突:**
当冲突发生时，Git 会提示类似：

``` cmd
CONFLICT (content): Merge conflict in example.txt
Automatic merge failed; fix conflicts and then commit the result.
```

运行 git status 查看冲突文件：

``` cmd
git status
```

输出：

``` cmd
both modified:   example.txt
```

打开冲突文件 example.txt，会看到 Git 标记的冲突部分：

``` text
<<<<<<< HEAD
这是主分支的更改
=======
这是 feature-branch 的更改
>>>>>>> feature-branch
```

- `<<<<<<< HEAD`：当前分支的内容（main）
- `=======`：分割线
- `>>>>>>>` feature-branch：要合并的分支的内容

手动修改文件, 然后保存.

执行以下步骤：
``` cmd
git add example.txt   # 标记文件为已解决
git commit -m "解决 example.txt 冲突"
git push origin main
```

3. **放弃合并**
如果冲突太复杂，想撤销合并：
``` cmd
git merge --abort  # 取消 merge
git rebase --abort # 取消 rebase
```

如果 git pull 造成冲突，可以回滚：
``` cmd
git reset --hard HEAD
```

4. **使用工具解决冲突**
- 可以使用图形化工具（如 GitKraken、SourceTree）来解决冲突。这些工具提供了更直观的界面来查看和解决冲突。
- VS Code: 打开冲突文件，会显示**"Accept Current"** 和 "Accept Incoming" 按钮

5. **预防 Git 冲突的技巧**
- 在提交前拉取最新代码
- 拆分任务，减少多人修改相同文件
- 定期合并远程代码，避免积累过多变更

### Rebase 用法

1. **`git rebase` 的作用**
- 让分支历史更清晰
- 避免 git merge 产生的多余合并提交
- 整理多个 commit，保持提交历史整洁
- 同步远程主分支，避免冲突

2. **基本用法**
- 在当前分支上变基到 `main` 分支

``` cmd
git checkout feature-branch  # 切换到 feature 分支
git rebase main              # 变基到 main 分支
```

执行后：

- 先切换到目标分支（`main`）的最新状态（类似 `git pull`）
- 将 `feature-branch` 的提交一个个重新应用 到 `main `之上
- 历史记录变成线性，不会产生 `merge commit`

变基后，分支历史会改变，因此需要强制推送：

``` cmd
git push origin feature-branch --force
```

3. **`git merge` 与 `git rebase` 对比**

- 使用 `git merge`

``` c#
git checkout main
git merge feature-branch
```

会创建一个 新的合并提交：

``` txt
A - B - C - D - E - M (main)
      \         /
       D - E (feature-branch)
```

**合并后，feature-branch 的提交 不会被重新排列，并且会产生 合并提交 M**

- 使用 `git rebase`

会让 `feature-branch` 的提交 重新排列：

``` txt
A - B - C - D' - E' (feature-branch)
```

**不会产生额外的 merge commit。**

::: danger `git rebase` 使用建议
- 适用于私有分支（`feature-branch`），保持提交历史干净
- 不推荐在公共分支（如 `main` 或 `develop`）上使用，避免 `git push --force` 覆盖他人提交
- 如果历史已经共享，建议使用 `git merge` 而不是 `git rebase`
:::

### 将已追踪文件添加到ignore

1. 添加或修改 .gitignore 文件
确保你的项目根目录中有一个 .gitignore 文件。如果没有，可以新建一个。在 .gitignore 文件中，添加需要忽略的文件或目录的路径。
```cmd
# 忽略某个文件
secret.txt

# 忽略某个文件夹
logs/

# 忽略所有 `.log` 文件
*.log

# ……
```

2. 停止跟踪已经被跟踪的文件

```cmd
git rm --cached <文件路径>
```

3. 提交修改并推送到远程仓库

```cmd
git add .gitignore
git commit -m "Update .gitignore and stop tracking certain files"
# git push
git push origin <分支名> 
```

### 生成SSH密钥

- [Github 教程](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Gitee 教程](https://gitee.com/help/articles/4181#article-header0)

### 自动打包winform/WPF程序

1. 创建 GitHub Actions Workflow 文件

``` yaml
name: Publish Windows Installer

on:
  push:
    tags:
      - 'v*'   # 只在 tag push 时触发，如 v1.0.0

permissions:
  contents: write  # ✅ 关键：给 GITHUB_TOKEN 写权限以创建 Release

jobs:
  build:
    runs-on: windows-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.0.x'  # 根据你的项目选择版本

    - name: Restore dependencies
      run: dotnet restore

    - name: Build and publish
      run: dotnet publish -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true

    - name: Zip published files
      run: Compress-Archive -Path ./Cutdown/bin/Release/net8.0-windows/win-x64/publish/* -DestinationPath ./output.zip

    - name: Upload to GitHub Release
      uses: softprops/action-gh-release@v1
      with:
        files: output.zip
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

2. 创建并推送一个 tag

``` bash
git tag v1.0.0
git push origin v1.0.0

//如果需要删除
//删除本地tag
git tag -d  v1.0.0
//删除远程tag
git push origin :refs/tags/v1.0.0



```

3. 其他可打包工具

| 工具                 | 功能                                     |
| -------------------- | ---------------------------------------- |
| **Squirrel.Windows** | 自动更新、创建安装程序、桌面快捷方式     |
| **Inno Setup**       | 脚本式安装包生成，生成 `.exe` 安装器     |
| **WiX Toolset**      | 生成 `.msi` 安装包，适用于企业级安装程序 |
| `nsis`               | 创建轻量级 `.exe` 安装包                 |


## GitHub Pages部署Vue项目

你可以通过 **GitHub Pages** 将 Vue 项目打包后的静态页面部署到 GitHub 上。以下是完整步骤（以 Vue 3 + Vite 项目为例，也适用于 Vue CLI 项目，稍有不同我会指出）：

---

### ✅ 步骤一：项目打包配置

#### 如果你使用的是 **Vite**

1. 修改 `vite.config.js` 添加 `base` 路径（假设你的仓库名是 `my-vue-app`）：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/my-vue-app/', // 这里要换成你的 GitHub 仓库名
  plugins: [vue()],
})
```

2. 执行打包命令：

```bash
npm run build
```

会生成一个 `dist` 文件夹。

---

#### 如果你使用的是 **Vue CLI**

1. 修改 `vue.config.js` 文件：

```js
// vue.config.js
module.exports = {
  publicPath: '/my-vue-app/', // 替换为你的 GitHub 仓库名
}
```

2. 然后执行：

```bash
npm run build
```

---

### ✅ 步骤二：部署到 GitHub Pages

你可以通过几种方式部署，这里介绍最常见的两种：

---

#### 方法一：手动部署（最简单）

1. 把打包后的 `dist/` 文件夹中的内容复制到一个新的分支，比如 `gh-pages`。
2. 创建并切换分支：

```bash
git checkout --orphan gh-pages
```

3. 清空所有文件，只保留 `dist` 中的内容：

```bash
git rm -rf .
cp -r dist/* ./
```

4. 添加、提交、推送：

```bash
git add .
git commit -m "deploy"
git push origin gh-pages --force
```

5. 然后去 GitHub 项目的 **Settings → Pages**：

* Source 选择 `gh-pages` 分支。
* 路径选择 `/(root)` 或 `/docs`（按你的结构）。

访问地址通常是：

```
https://用户名.github.io/仓库名/
```

---

#### 方法二：使用 `gh-pages` 脚本自动部署（推荐）

1. 安装 `gh-pages`：

```bash
npm install gh-pages --save-dev
```

2. 在 `package.json` 添加部署脚本：

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  }
}
```

如果你是用 Vue CLI：

```json
{
  "scripts": {
    "build": "vue-cli-service build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. 部署：

```bash
npm run build
npm run deploy
```

4. 同样前往 GitHub 设置 `Pages`，选择 `gh-pages` 分支。

---

### ✅ 注意事项

* `base` 路径必须写对，否则资源引用路径会错误。
* 项目必须是 **公开仓库** 才能免费使用 GitHub Pages。
* 若使用自定义域名，可在根目录放一个 `CNAME` 文件。
* 若部署失败，可查看 Actions 或 Pages 的日志信息。

## 常见问题

### git clone时出现443， Couldn‘t connect to server问题解决

``` cmd
# 修改成自己的代理端口号（设置 --> 网络与Internet --> 查找代理）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```
