# 📜 Инструкция по настройке, подключению и использованию Telegram-бота

## 🚀 Подключение к серверу через SSH

### 1. Подключение через SSH:

Откройте **PhpStorm** и настройте SSH:

1. Перейдите:  
   `File → Settings → Deployment → Configuration`.

2. Настройте параметры соединения:
    - **Host:** `130.0.234.95`
    - **Username:** `root`
    - **Password:** `********`

3. Сохраните и подключитесь.

---

## 🔧 Управление ботом через PM2

### **Команды для управления PM2:**

- **Запуск бота:**

```bash
pm2 start bot.js
```

- **Остановка бота:**

```bash
pm2 stop bot
```

- **Перезапуск бота:**

```bash
pm2 restart bot
```

## 🛠️ Проверка и настройка окружения

- **1. Подключитесь к серверу:**

```bash
ssh root@130.0.234.95
cd /home/bot
```

- **2. Установите зависимости:**

```bash
npm install
```

## 🚀 Проверяем работу бота

- **1. Запустите бота:**

```bash
pm2 start bot.js
```

- **2. Проверьте логи PM2:**

```bash
pm2 logs telegram-bot
```


## 🖥️ PhpStorm - работа с проектом

### **Настройка SSH в PhpStorm:**

1. Перейдите в настройки:
   `File → Settings → Deployment → Configuration`.

2. Добавьте SSH соединение:
    - **Host:** `130.0.234.95`
    - **Username:** `root`
    - **Password:** `********`

3. Сохраните настройки и подключитесь.

## 🔧 Дополнительные команды PM2

| Команда            | Описание                           |
|--------------------|------------------------------------|
| `pm2 status`       | Проверить статус всех процессов.   |
| `pm2 restart bot`  | Перезапустить бота.               |
| `pm2 stop bot`     | Остановить бота.                  |
| `pm2 delete bot`   | Удалить процесс из PM2.           |

## ⚠️ Как отключить PM2 и бота

- **Если необходимо временно отключить бота:**

```bash
pm2 stop bot
```

## ⚠️ Как включить PM2 и бота

- **Чтобы снова запустить бота:**

```bash
pm2 start bot.js
```

## 📊 Проверка логов PM2

- **Если возникли ошибки, просмотрите логи:**

```bash
pm2 logs telegram-bot
```
