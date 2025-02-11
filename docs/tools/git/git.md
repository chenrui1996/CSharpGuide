# Git

## 基本原理

## 常用操作

### 将已追踪文件添加到ignore

1. 添加或修改 .gitignore 文件
确保你的项目根目录中有一个 .gitignore 文件。如果没有，可以新建一个。在 .gitignore 文件中，添加需要忽略的文件或目录的路径。
```bash
# 忽略某个文件
secret.txt

# 忽略某个文件夹
logs/

# 忽略所有 `.log` 文件
*.log

# ……
```

2. 停止跟踪已经被跟踪的文件

```bash
git rm --cached <文件路径>
```

3. 提交修改并推送到远程仓库

```bash
git add .gitignore
git commit -m "Update .gitignore and stop tracking certain files"
# git push
git push origin <分支名> 
```

## 生成SSH密钥

- [Github 教程](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Gitee 教程](https://gitee.com/help/articles/4181#article-header0)
