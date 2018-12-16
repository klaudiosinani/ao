<h1 align="center">
  <img src="media/logo.png" width="20%"><br/>Ao
</h1>

<h4 align="center">
  ✔️ Elegant Microsoft To-Do desktop app
</h4>

<div align="center">
  <a href="https://github.com/klaussinani/ao">
    <img src="media/list-navigation.gif" alt="Ao" width="93%">
  </a>
</div>

<p align="center">
  <a href="https://travis-ci.org/klaussinani/ao">
    <img alt="Build Status" src="https://travis-ci.org/klaussinani/ao.svg?branch=master">
  </a>
</p>

## Description

Ao is an unofficial, featureful, open source, community-driven, free Microsoft To-Do app, used by people in more than [120 countries](https://snapcraft.io/ao).

Come over to [Gitter](https://gitter.im/klaussinani/ao) or [Twitter](https://twitter.com/klaussinani) to share your thoughts on the project.

Visit the [contributing guidelines](https://github.com/klaussinani/ao/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.


You can find more desktop apps [here](#related-apps).

## Highlights

- Black, Dark & Sepia Themes
- Compact & Auto-Night Modes
- Local & Global Customizable Keyboard Shortcuts
- List Navigation
- Scalable Interface
- Update Notifications
- Cross Platform

## Contents

- [Description](#description)
- [Highlights](#highlights)
- [Install](#install)
- [Features](#features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Development](#development)
- [Related Apps](#related-apps)
- [Team](#team)
- [Disclaimer](#disclaimer)
- [License](#license)

## Install

#### Github Releases

Head to the [releases](https://github.com/klaussinani/ao/releases/latest) page and download the appropriate installer for your system.

#### Homebrew

Macos users can directly install through [`Homebrew Cask`](https://caskroom.github.io/) `brew cask install ao`

#### Snap

Ubuntu Linux users can directly install through [`Snap`](https://snapcraft.io/ao) `snap install ao`

#### AUR

Arch Linux users can directly install through [`AUR`](https://aur.archlinux.org/packages/ao/) `yaourt ao`

#### Note

The version available on `AUR` may not be the latest. If that is the case, please consider downloading directly from the [Github releases](https://github.com/klaussinani/ao/releases/latest) page.

## Features

Visit the project [homepage](https://klaussinani.github.io/ao) to view all features in detail.

- Auto Night Mode - Press <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd> to allow Tusk to adjust to your environment.
- Black Theme - Activate it by pressing <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd>
- Compact Mode - Downsize the window to enter the mode.
- Custom Shortcut Keys - Navigate to `~/.ao.json` or press <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd> to modify any shortcut key. To reset delete `~/.ao.json` & restart the app.
- Dark Theme -Activate it by pressing <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd>
- Global Shortcut Keys - Enable them by using the `File` > `Enable Global Shortcut Keys` option.
- List Navigation - Navigate your lists by pressing  <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd> / <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>Tab</kbd> or jump directly to one by using <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd>
- Scalable Interface - Adjust the zooming factor by pressing <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd> or <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd>.
- Sepia Theme - Activate it by pressing <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd>.
- Update Notifications - Customize the app's update checking frequency.

## Keyboard Shortcuts

### Local Shortcut Keys

40+ local keyboard shortcuts. Toggle anything in a flash.

<details>
<summary>View all the available local keyboard shortcuts.</summary>

<br/>

Description                | Keys
-------------------------- | --------------------------
Activate Auto Night Mode   | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd>
Add Due Date               | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>T</kbd>
Add Todo to My Day         | <kbd>Cmd/Ctrl</kbd> <kbd>K</kbd>
Complete Todo              | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>N</kbd>
Delete List                | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>D</kbd>
Delete Todo                | <kbd>Cmd/Ctrl</kbd> <kbd>D</kbd>
Edit Shortcut Keys         | <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd>
Hide Completed Todos       | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>H</kbd>
Jump to List               | <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd>
Make Text Larger           | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd>
Make Text Smaller          | <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd>
Navigate to Next List      | <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd>
New List                   | <kbd>Cmd/Ctrl</kbd> <kbd>L</kbd>
New Todo                   | <kbd>Cmd/Ctrl</kbd> <kbd>N</kbd>
Reload Ao                  | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>R</kbd>
Rename List                | <kbd>Cmd/Ctrl</kbd> <kbd>Y</kbd>
Rename Todo                | <kbd>Cmd/Ctrl</kbd> <kbd>T</kbd>
Reset Zoom Level           | <kbd>Cmd/Ctrl</kbd> <kbd>0</kbd>
Return to Todos            | <kbd>Esc</kbd>
Search Todos               | <kbd>Cmd/Ctrl</kbd> <kbd>F</kbd>
Set Always on Top          | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd>
Set Reminder               | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>E</kbd>
Sign out                   | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>Q</kbd>
Toggle Black Theme         | <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd>
Toggle Cortana             | <kbd>Cmd/Ctrl</kbd> <kbd>E</kbd>
Toggle Dark Theme          | <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd>
Toggle Dev Tools           | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd>
Toggle Full Screen         | <kbd>F11</kbd>
Toggle My Day              | <kbd>Cmd/Ctrl</kbd> <kbd>M</kbd>
Toggle Sepia Theme         | <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd>
Toggle Settings            | <kbd>Cmd/Ctrl</kbd> <kbd>,</kbd>
Toggle Sidebar             | <kbd>Cmd/Ctrl</kbd> <kbd>O</kbd>
Toggle Vibrant Dark Theme  | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>J</kbd>
Toggle Vibrant Light Theme | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>U</kbd>
Toggle Window Menu         | <kbd>Alt</kbd>

<br/>

</details>

### Global Shortcut Keys

Access Ao at any moment from anywhere within your operating system. All global shortcuts can be customized to match your own preference through the configuration file `~/.ao.json`.

<details>
<summary>View all the available global keyboard shortcuts.</summary>

<br>

Description                | Global Shortcut
-------------------------- | --------------------------
Create New Todo            | <kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>C</kbd>
Search Todos               | <kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>F</kbd>
Toggle Ao Window           | <kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>A</kbd>

<br/>

</details>

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/ao/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork `cd ao`
- Install the project dependencies `npm install` or `yarn install`
- Run Ao on dev mode `npm start` or `yarn start`
- Lint code for errors `npm test` or `yarn test`
- Build binaries and installers `npm run dist` or `yarn dist`

## Related Apps

- [Tusk](https://github.com/champloohq/tusk) - Refined Evernote desktop app.
- [Taskbook](https://github.com/klaussinani/taskbook) - Tasks, boards & notes for the command-line habitat.

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)
- Mario Sinani [(@mariocfhq)](https://github.com/mariocfhq)
- Thanasis Gkanos [(@ThanasisGkanos)](https://github.com/ThanasisGkanos)

## Disclaimer

Ao is an unofficial, open source, third-party, community-driven, free app and is not affiliated in any way with Microsoft.

## License

[MIT](https://github.com/klaussinani/ao/blob/master/license.md)
