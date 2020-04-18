<h1 align="center">
  <img src="docs/media/logo.png" width="20%"><br/>Ao
</h1>

<h4 align="center">
  Elegant Microsoft To-Do desktop app
</h4>

<div align="center">
  <a href="https://github.com/klaussinani/ao">
    <img src="docs/media/list-navigation.gif" alt="Ao" width="93%">
  </a>
</div>

<p align="center">
  <a href="https://travis-ci.org/klaussinani/ao">
    <img alt="Build Status" src="https://travis-ci.org/klaussinani/ao.svg?branch=master">
  </a>
</p>

## 简介

Ao 是一个非官方的，功能强大的，开源的，由社区驱动的，免费的 Microsoft TO-DO 应用，有 [120 多个国家](https://snapcraft.io/ao)的人使用。

阅读这个文档的[德语](https://github.com/klaussinani/ao/blob/master/docs/i18n/readme.GER.md)版本。

您现在可以通过 [GitHub Sponsors](https://github.com/sponsors/klaussinani) 赞助开发。

访问 [贡献指南](https://github.com/klaussinani/ao/blob/master/contributing.md#translating-documentation)，以了解更多有关如何将本文档翻译成更多语言的信息。

快来 [Gitter](https://gitter.im/klaussinani/ao) 或者 [Twitter](https://twitter.com/klaussinani) 分享您对这个项目的想法。

您可以在[这](#related-apps)找到更多应用。

## 亮点

- 黑色，深色和棕褐色的主题
- 紧凑和自动夜间模式
- 本地和全局自定义快捷键
- 列表导航
- 可缩放界面
- 更新通知
- 跨平台

## 目录

- [简介](#简介)
- [亮点](#亮点)
- [安装](#安装)
- [特点](#特点)
- [快捷键](#快捷键)
- [开发](#开发)
- [相关应用](#相关应用)
- [团队](#团队)
- [免责生明](#免责声明)
- [许可](#许可)

## 安装

#### Github 发布

转到[发布](https://github.com/klaussinani/ao/releases/latest)页面并下载适合您系统的安装程序。

#### Snapcraft

Ubuntu Linux 的用户可以直接通过 [`Snapcraft`](https://snapcraft.io/ao) `snap install ao` 安装

#### Homebrew

Macos 的用户可以直接通过  [`Homebrew Cask`](https://caskroom.github.io/) `brew cask install ao` 安装

#### 注意

`Homebrew Cask` 上的版本可能不是最新的，因为与 `Snapcraft` 不同，它不是官方维护的。如果是这种情况，请考虑直接从 [Github 发布](https://github.com/klaussinani/ao/releases/latest) 页面下载。

## 特点

访问项目 [主页](https://klaussinani.github.io/ao) 以详细查看所有特点。

- 自动夜间模式 - 按 <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd> 可使 Ao 适应您的环境
- 黑色主题 - 按 <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd> 激活它
- 紧凑模式 - 缩小窗口以进入这个模式
- 自定义快捷键 - 导航到 `~/.ao.json` 或者按 <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd> 去修改任意快捷键。可以通过删除 `~/.ao.json` 之后重启应用重置。
- 深色模式 - 按 <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd> 激活它
- 全局快捷键 - 通过使用 `File` > `Enable Global Shortcut Keys` 选项启用它们
- 列表导航 - 通过按  <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd> / <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>Tab</kbd> 或者可以直接跳到某一个 <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd> 去导航您的列表
- 可缩放界面 - 通过按 <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd> or <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd> 调整缩放系数
- 棕褐色主题 - 按 <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd> 激活它
- 升级通知 - 自定义应用程序的更新检查频率

## 快捷键

### 本地快捷键

超过 40 个本地快捷键。瞬间切换任何内容。

<details>
<summary>查看所有可用的本地快捷键。</summary>

<br/>

简介                | 快捷键
-------------------------- | --------------------------
激活自动夜间模式   | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd>
添加截止日期               | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>T</kbd>
添加待办事项到我的一天         | <kbd>Cmd/Ctrl</kbd> <kbd>K</kbd>
完成待办事项              | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>N</kbd>
删除列表                | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>D</kbd>
删除待办事项                | <kbd>Cmd/Ctrl</kbd> <kbd>D</kbd>
修改快捷键         | <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd>
隐藏已完成待办事项       | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>H</kbd>
转到列表               | <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd>
使字体更大           | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd>
使字体更小          | <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd>
导航到下一个列表      | <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd>
新的列表                   | <kbd>Cmd/Ctrl</kbd> <kbd>L</kbd>
新的待办事项                   | <kbd>Cmd/Ctrl</kbd> <kbd>N</kbd>
重命名列表                | <kbd>Cmd/Ctrl</kbd> <kbd>Y</kbd>
重命名待办事项                | <kbd>Cmd/Ctrl</kbd> <kbd>T</kbd>
重置缩放级别           | <kbd>Cmd/Ctrl</kbd> <kbd>0</kbd>
回到待办事项            | <kbd>Esc</kbd>
搜索待办事项               | <kbd>Cmd/Ctrl</kbd> <kbd>F</kbd>
置顶          | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd>
设置提醒               | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>E</kbd>
注销                   | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>Q</kbd>
切换黑色主题         | <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd>
切换深色主题          | <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd>
切换到重要           | <kbd>Cmd/Ctrl</kbd> <kbd>I</kbd>
切换到我的一天              | <kbd>Cmd/Ctrl</kbd> <kbd>M</kbd>
切换到已计划             | <kbd>Cmd/Ctrl</kbd> <kbd>P</kbd>
切换棕褐色主题         | <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd>
切换到设置            | <kbd>Cmd/Ctrl</kbd> <kbd>,</kbd>
切换到边栏             | <kbd>Cmd/Ctrl</kbd> <kbd>O</kbd>
切换任务               | <kbd>Cmd/Ctrl</kbd> <kbd>J</kbd>
切换到窗口菜单         | <kbd>Alt</kbd>

<br/>

</details>

### 全局快捷键

随时可以从操作系统中的任何位置访问 Ao。可以通过修改配置文件 `~/.ao.json` 来定制所有全局快捷方式，以匹配您的偏好。

<details>
<summary>查看所有可用的全局快捷键。</summary>

<br>

简介                | 全局快捷键
-------------------------- | --------------------------
创建新的待办事项            | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>C</kbd>
搜索待办事项               | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>F</kbd>
切换到 Ao 窗口           | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>A</kbd>

<br/>

</details>

## 开发

有关如何为项目做出贡献的更多的信息，请阅读 [贡献指南](https://github.com/klaussinani/ao/blob/master/contributing.md)。

- Fork 这个仓库并且 clone 到你的机器上
- 导航到您本地的 fork `cd ao`
- 安装项目依赖 `npm install` 或者 `yarn install`
- 以开发模式运行 Ao `npm start` 或者 `yarn start`
- 测试代码的错误 `npm test` 或者 `yarn test`
- 构建二进制和安装程序 `npm run release` 或者 `yarn release`

## 相关应用

- [Tusk](https://github.com/klaussinani/tusk) - 精致的 Evernote 桌面应用程序。
- [Taskbook](https://github.com/klaussinani/taskbook) - 命令行中的任务，公告板和笔记。

## 团队

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)
- Mario Sinani [(@mariosinani)](https://github.com/mariosinani)
- Thanasis Gkanos [(@ThanasisGkanos)](https://github.com/ThanasisGkanos)

## 免责生明

Ao 是一个非官方的，开源的，第三方的，由社区驱动的，免费应用，它与 Microsoft 无关。

## 许可

[MIT](https://github.com/klaussinani/ao/blob/master/license.md)
