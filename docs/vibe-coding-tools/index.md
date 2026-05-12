# 跑通 Vibe Coding 工具链

<section class="tool-hero">
  <p>Level 1</p>
  <h2>先把环境装好，让 AI 真正能帮你做事。</h2>
  <span>VS Code / Git / Anaconda / Codex / GitHub</span>
</section>

## 为什么编写代码需要环境和工具

Vibe Coding 的目标不是让你从第一天开始背语法，而是让你用自然语言指挥 AI，把想法变成可以运行、可以演示、可以继续迭代的项目。

但 AI 生成代码之后，还需要一个地方来编辑、运行、保存、管理版本和发布成果。这个“地方”就是你的开发环境。

你可以把开发环境理解成一间工作室：

- **VS Code** 是你的工作台，用来打开项目、编辑文件、安装插件、运行命令。
- **Git** 是你的版本记录本，用来保存每次修改，并把项目上传到 GitHub。
- **Anaconda / Python** 是你的运行环境，用来执行 Python 程序和管理依赖。
- **Codex** 是你的 AI 编程搭档，帮你生成代码、解释错误、修改文件、执行任务。
- **GitHub** 是你的作品仓库，用来保存、展示和分享你的项目。

## 什么是集成开发环境（IDE）

IDE，全称是 Integrated Development Environment，中文通常叫“集成开发环境”。它把写代码、看文件、运行程序、调试错误、管理 Git、安装插件等能力放在同一个界面里。

对初学者来说，IDE 的价值不是“显得专业”，而是减少混乱：你不用在一堆窗口之间来回切换，也不用记住太多命令。打开 VS Code，一个项目的文件、终端、插件和 AI 助手都能在同一个地方协作。

## 你需要安装什么

<table class="tool-table">
  <thead>
    <tr>
      <th>工具</th>
      <th>用途</th>
      <th>官方下载</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>VS Code</td>
      <td>代码编辑器，也是本课程的主要操作界面。</td>
      <td><a href="https://code.visualstudio.com/download" target="_blank" rel="noreferrer">下载 VS Code</a></td>
    </tr>
    <tr>
      <td>Git</td>
      <td>版本管理工具，用来提交代码并上传到 GitHub。</td>
      <td><a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer">下载 Git</a></td>
    </tr>
    <tr>
      <td>Anaconda</td>
      <td>Python 环境管理工具，适合初学者安装 Python 和常用数据科学包。</td>
      <td><a href="https://www.anaconda.com/download/" target="_blank" rel="noreferrer">下载 Anaconda</a></td>
    </tr>
    <tr>
      <td>Codex</td>
      <td>OpenAI 的 AI 编程助手，可在终端或 IDE 中协助读写代码。</td>
      <td><a href="https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started" target="_blank" rel="noreferrer">Codex CLI 指南</a></td>
    </tr>
    <tr>
      <td>GitHub</td>
      <td>代码托管平台，用来保存和展示你的项目。</td>
      <td><a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noreferrer">创建 GitHub 仓库</a></td>
    </tr>
  </tbody>
</table>

## Windows 安装步骤

<section class="tool-steps">
  <article>
    <strong>01</strong>
    <h3>安装 VS Code</h3>
    <p>打开 VS Code 官方下载页，选择 Windows 版本。安装时建议勾选“Add to PATH”和“Open with Code”，方便后续从文件夹或终端打开项目。</p>
  </article>
  <article>
    <strong>02</strong>
    <h3>安装 Git</h3>
    <p>从 Git 官网下载 Windows 安装包。大部分选项保持默认即可。安装完成后打开 PowerShell 或 Git Bash，输入 <code>git --version</code> 检查是否安装成功。</p>
  </article>
  <article>
    <strong>03</strong>
    <h3>安装 Anaconda</h3>
    <p>下载 Windows 版 Anaconda。安装完成后打开 Anaconda Prompt，输入 <code>python --version</code> 和 <code>conda --version</code> 检查环境。</p>
  </article>
  <article>
    <strong>04</strong>
    <h3>安装 Codex</h3>
    <p>如果你使用 Codex CLI，需要先安装 Node.js，然后在终端执行 <code>npm install -g @openai/codex</code>。安装后输入 <code>codex --version</code> 检查。</p>
  </article>
</section>

## macOS 安装步骤

<section class="tool-steps">
  <article>
    <strong>01</strong>
    <h3>安装 VS Code</h3>
    <p>打开 VS Code 官方下载页，选择 macOS 版本。Apple 芯片选择 Apple silicon，Intel 芯片选择 Intel，也可以使用 Universal 版本。</p>
  </article>
  <article>
    <strong>02</strong>
    <h3>安装 Git</h3>
    <p>打开 Terminal，先输入 <code>git --version</code>。如果系统提示安装 Command Line Tools，按提示安装即可；也可以从 Git 官网下载安装包。</p>
  </article>
  <article>
    <strong>03</strong>
    <h3>安装 Anaconda</h3>
    <p>从 Anaconda 官网下载 macOS 版本。安装完成后打开 Terminal，输入 <code>python --version</code> 和 <code>conda --version</code> 检查。</p>
  </article>
  <article>
    <strong>04</strong>
    <h3>安装 Codex</h3>
    <p>安装 Node.js 后，在 Terminal 中执行 <code>npm install -g @openai/codex</code>。如果你使用 Codex IDE 扩展，也可以在 VS Code 扩展市场搜索 Codex 并登录。</p>
  </article>
</section>

## VS Code 中安装 Codex 插件

OpenAI 的官方资料说明，Codex 可以在本地工具中作为编码助手使用，支持 CLI 和 IDE 扩展；Codex 可在 VS Code、Cursor、Windsurf 等编辑器中配合使用。实际安装时，以你当前账号和地区可见的官方入口为准。

推荐操作：

1. 打开 VS Code。
2. 点击左侧 Extensions 图标。
3. 搜索 `Codex` 或 `OpenAI Codex`。
4. 选择 OpenAI 发布的 Codex 扩展并安装。
5. 按提示登录你的 OpenAI / ChatGPT 账号。
6. 打开一个项目文件夹，让 Codex 可以读取当前工作区。

如果你暂时找不到 Codex IDE 扩展，可以先使用 Codex CLI 在 VS Code 内置终端中完成本页实操。

## 第一次实操：让 Codex 写一段 Python

目标：在 VS Code 中让 Codex 生成一个 Python 文件，运行后输出一句话。

### 第 1 步：创建项目文件夹

在电脑上新建一个文件夹，例如：

```text
vibe-star-hello
```

然后用 VS Code 打开这个文件夹。

### 第 2 步：创建 Python 文件

新建文件：

```text
hello_vibe.py
```

### 第 3 步：让 Codex 生成代码

在 Codex 对话框或 VS Code 终端中的 Codex CLI 输入：

```text
请帮我在 hello_vibe.py 中写一段 Python 代码，运行后打印：
Hello, Vibe Star! I am running my first AI-generated Python program.
```

期望生成的代码类似：

```python
print("Hello, Vibe Star! I am running my first AI-generated Python program.")
```

### 第 4 步：运行代码

在 VS Code 终端中执行：

```bash
python hello_vibe.py
```

如果看到输出：

```text
Hello, Vibe Star! I am running my first AI-generated Python program.
```

说明你的 Python 环境、VS Code 和 AI 编程流程已经初步跑通。

## 第二次实操：上传到自己的 GitHub

目标：把刚才的项目提交到 Git，并上传到你的 GitHub 仓库。

### 第 1 步：在 GitHub 创建仓库

1. 登录 GitHub。
2. 点击右上角 `+`。
3. 选择 `New repository`。
4. 仓库名填写 `vibe-star-hello`。
5. 选择 Public 或 Private。
6. 点击 `Create repository`。

### 第 2 步：初始化 Git

在 VS Code 终端中执行：

```bash
git init
git add hello_vibe.py
git commit -m "Add first vibe coding Python script"
```

如果是第一次使用 Git，可能需要先配置用户名和邮箱：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 第 3 步：连接 GitHub 仓库

把下面的地址替换成你自己的 GitHub 仓库地址：

```bash
git branch -M main
git remote add origin https://github.com/你的用户名/vibe-star-hello.git
git push -u origin main
```

### 第 4 步：让 Codex 帮你检查

在 Codex 对话中输入：

```text
请检查当前项目是否已经可以运行，并帮我确认 Git 提交和 GitHub 上传步骤是否完整。
```

到这里，你已经完成了 Vibe Coding 的第一个闭环：用 AI 生成代码，在本地运行，用 Git 管理版本，并上传到 GitHub。

## 常见问题

### 运行 python 命令无效

Windows 可以尝试 `py hello_vibe.py`。macOS 可以尝试 `python3 hello_vibe.py`。如果仍然无效，说明 Python 或 Anaconda 的环境变量还没有配置好。

### git push 失败

先确认仓库地址是否正确，再确认你是否已经登录 GitHub。新手也可以先使用 GitHub Desktop，但课程会逐步带你理解 Git 命令。

### Codex 无法读取项目

确认你已经在 VS Code 中打开的是整个项目文件夹，而不是单个文件。AI 编程助手需要项目上下文，才能更准确地修改和运行代码。
