<h1 align="center">
  <img src="../media/logo.png" width="20%"><br/>Ao
</h1>

<h4 align="center">
  Elegant Microsoft To-Do desktop app
</h4>

<div align="center">
  <a href="https://github.com/klaussinani/ao">
    <img src="../media/list-navigation.gif" alt="Ao" width="93%">
  </a>
</div>

<p align="center">
  <a href="https://travis-ci.org/klaussinani/ao">
    <img alt="Build Status" src="https://travis-ci.org/klaussinani/ao.svg?branch=master">
  </a>
</p>

## Описание

Ao — это неофициальное и многофункциональное приложение для сервиса Microsoft To-Do, оно полностью бесплатное, имеет открытый исходный код и существует благодаря сообществу. Его используют люди из более, чем [120 стран мира](https://snapcraft.io/ao).

Оригинал документа — [английский](https://github.com/klaussinani/ao/blob/master/readme.md).

Другие доступные переводы: [немецкий](https://github.com/klaussinani/ao/blob/master/docs/i18n/readme.GER.md).

Вы можете поддержать процесс разработки с помощью доната на [Open Collective](https://opencollective.com/klaussinani).

Если вы хотите помочь с переводом, посетите страницу с [рекомендациями по поддержке](https://github.com/klaussinani/ao/blob/master/contributing.md#translating-documentation), чтобы узнать, как перевести этот документ на другие языки.

Если есть мысли по поводу проекта, дайте знать в [Gitter](https://gitter.im/klaussinani/ao) или [Twitter](https://twitter.com/klaussinani).

Больше приложений — [здесь](#похожие-приложения).

## Основные возможности

- 3 темы на выбор: Темная, Ночная и Сепия.
- Компактный режим.
- Возможность автоматической смены темы на ночную.
- Возможность кастомизации локальных и глобальных горячих клавиш.
- Навигация по спискам задач.
- Масштабируемый интерфейс.
- Уведомления об обновлениях.
- Поддержка кроссплатформенности.

## Оглавление

- [Описание](#описание)
- [Основные возможности](#основные-возможности)
- [Установить](#установить)
- [Возможности](#возможности)
- [Горячие клавиши](#горячие-клавиши)
- [Разработка](#разработка)
- [Похожие приложения](#похожие-приложения)
- [Команда](#команда)
- [Дисклеймер](#дисклеймер)
- [Лицензия](#лицензия)

## Установить

### Github Releases

Посетите [страницу с релизами](https://github.com/klaussinani/ao/releases/latest) и скачайте подходящую для вашей операционной системы версию программы.

### Snapcraft

Для пользователей Ubuntu есть возможность установки из [`Snapcraft`](https://snapcraft.io/ao) с помощью команды `snap install ao`.

### Homebrew

Пользователи macOS могут установить с помощью [`Homebrew Cask`](https://caskroom.github.io/) командой `brew install --cask ao`.

### Замечание

Версия, которая доступна на `Homebrew Cask`, может быть не самой последней, потому что она, в отличие от `Snapcraft`, имеет неофициальную поддержку. Если это для вас является проблемой, вам стоит воспользоваться версией со страницы [Github releases](https://github.com/klaussinani/ao/releases/latest).

## Возможности

Все возможности программы детально — на [главной странице](https://klaussinani.github.io/ao) проекта.

- Автоматическая смена на ночную тему: чтобы активировать функцию, нажмите сочетание клавиш <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd>.
- Темная тема: активируется по нажатию <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd>.
- Ночная тема: активируется по нажатию <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd>.
- Тема Сепия: активируется по нажатию <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd>.
- Компактный режим: активируется автоматически при уменьшении окна.
- Локальные горячие клавиши: откройте файл `~/.ao.json` или воспользуйтесь командой <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd>, чтобы изменить горячие клавиши. Если нужно вернуть настройки по-умолчанию, удалите файл `~/.ao.json` и перезагрузите приложение.
- Глобальные горячие клавиши: чтобы включить, используйте пункт `File` > `Enable Global Shortcut Keys`.
- Навигация по спискам задач: перемещайтесь по спискам, используя сочетания <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd> для перемещения по порядку или <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>Tab</kbd> — для перемещения в обратном порядке. Чтобы сразу перейти к нужному списку, используйте <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd>.
- Масштабируемый интерфейс: регулировка масштаба — команды <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd> или <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd> для увеличения или уменьшения масштаба соответственно.
- Уведомления об обновлениях: изменяйте частоту проверки обновлений.

## Горячие клавиши

### Локальные

Более 40 локальных горячих клавиш. Совершайте любые действия за доли секунды.

<details>
<summary>Посмотреть все доступные локальные горячие клавиши.</summary>

<br/>

Описание                                   | Сочетание клавиш
------------------------------------------ | --------------------------
Активировать автоматический ночной режим   | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd>
Добавить дату завершения                   | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>T</kbd>
Добавить задачу в Мой день                 | <kbd>Cmd/Ctrl</kbd> <kbd>K</kbd>
Завершить задачу                           | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>N</kbd>
Удалить список                             | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>D</kbd>
Удалить задачу                             | <kbd>Cmd/Ctrl</kbd> <kbd>D</kbd>
Изменить горячие клавиши                   | <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd>
Скрыть выполненные задачи                  | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>H</kbd>
Перейти к списку                           | <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd>
Увеличить текст                            | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd>
Уменьшить текст                            | <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd>
Перейти к следующему списку                | <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd>
Создать список                             | <kbd>Cmd/Ctrl</kbd> <kbd>L</kbd>
Создать задачу                             | <kbd>Cmd/Ctrl</kbd> <kbd>N</kbd>
Переименовать список                       | <kbd>Cmd/Ctrl</kbd> <kbd>Y</kbd>
Переименовать задачу                       | <kbd>Cmd/Ctrl</kbd> <kbd>T</kbd>
Установить масштаб по-умолчанию            | <kbd>Cmd/Ctrl</kbd> <kbd>0</kbd>
Вернуться к задачам                        | <kbd>Esc</kbd>
Искать задачу                              | <kbd>Cmd/Ctrl</kbd> <kbd>F</kbd>
Всегда сверху                              | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd>
Установить напоминание                     | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>E</kbd>
Выйти из аккаунта                          | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>Q</kbd>
Поставить Ночную тему                      | <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd>
Поставить Темную тему                      | <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd>
Сделать задачу важной                      | <kbd>Cmd/Ctrl</kbd> <kbd>I</kbd>
Перейти в Мой день                         | <kbd>Cmd/Ctrl</kbd> <kbd>M</kbd>
Перейти в Запланировано                    | <kbd>Cmd/Ctrl</kbd> <kbd>P</kbd>
Поставить тему Сепия                       | <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd>
Перейти в настройки                        | <kbd>Cmd/Ctrl</kbd> <kbd>,</kbd>
Скрыть/показать меню                       | <kbd>Cmd/Ctrl</kbd> <kbd>O</kbd>
Перейти в Задачи                           | <kbd>Cmd/Ctrl</kbd> <kbd>J</kbd>
Меню                                       | <kbd>Alt</kbd>

<br/>

</details>

### Глобальные горячие клавиши

Получите доступ к Ao в любой момент из любого места. Все глобальные горячие клавиши можно настроить по собственным предпочтениям в файле `~/.ao.json`.

<details>
<summary>Посмотреть все доступные глобальные горячие клавиши.</summary>

<br>

Описание                   | Сочетание клавиш
-------------------------- | --------------------------
Создать задачу             | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>C</kbd>
Искать задачу              | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>F</kbd>
Открыть Ao                 | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>A</kbd>

<br/>

</details>

## Разработка

Чтобы узнать больше о том, как помочь с разработкой, прочитайте [рекомендацию по поддержке](https://github.com/klaussinani/ao/blob/master/contributing.md).

- Форкните репозиторий и создайте клон.
- Перейдите в свою копию: `cd ao`.
- Установите зависимости: `npm install` или `yarn install`.
- Запустите Ao в режиме разработчика: `npm test` или `yarn test`.
- Прогоните код через линтер, чтобы найти ошибки: `npm test` or `yarn test`.
- Соберите бинарник и установщики: `npm run release` or `yarn release`.

## Похожие приложения

- [Tusk](https://github.com/klaussinani/tusk) — улучшенное десктопное приложения для Evernote.
- [Taskbook](https://github.com/klaussinani/taskbook) — задачи, доски и заметки для любителей командной строки.

## Команда

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)
- Mario Sinani [(@mariosinani)](https://github.com/mariosinani)
- Thanasis Gkanos [(@ThanasisGkanos)](https://github.com/ThanasisGkanos)

## Дисклеймер

Ao — это стороннее, неофициальное и полностью бесплатное приложение с открытым исходным кодом, которое поддерживается за счет сообщества и никаким образом не связано с Microsoft.

## Лицензия

[MIT](https://github.com/klaussinani/ao/blob/master/license.md)
