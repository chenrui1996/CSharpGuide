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
