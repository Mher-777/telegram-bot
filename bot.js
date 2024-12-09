const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const sqlite3 = require('sqlite3').verbose();

// Настройки бота
const token = '7755856953:AAFP3bPXTNLIX4c7fZSP8JW4c9Px46lPcEQ';
const bot = new TelegramBot(token, { polling: true });

// Настройка сервера
const app = express();
const port = 3000;

// Подключение базы данных SQLite
const db = new sqlite3.Database('./bot_data.db');

// Создаем или обновляем структуру таблицы
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`); // Удалите эту строку, если не хотите каждый раз пересоздавать таблицу
  db.run(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chat_id TEXT NOT NULL UNIQUE,
          subid TEXT,
          startid TEXT
      )
  `);
});

// Функция для добавления или обновления данных пользователя
function saveUserData(chatId, subid, startid) {
    db.run(
        `
        INSERT INTO users (chat_id, subid, startid) 
        VALUES (?, ?, ?)
        ON CONFLICT(chat_id) DO UPDATE SET subid = ?, startid = ?
        `,
        [chatId, subid, startid, subid, startid]
    );
}

// Функция для получения данных пользователя
function getUserData(chatId, callback) {
    db.get(`SELECT * FROM users WHERE chat_id = ?`, [chatId], (err, row) => {
        if (err) {
            console.error('Ошибка при получении данных пользователя:', err);
            return callback(null);
        }
        callback(row);
    });
}

// Сервер для обработки subid из ссылки
app.get('/t.me', (req, res) => {
    const subid = req.query.subid;

    if (subid) {
        res.send(`
            <h1>Вы перешли по ссылке с параметром subid: ${subid}</h1>
            <a href="tg://resolve?domain=yourbotusername&start=subid${subid}">Нажмите, чтобы начать</a>
        `);
    } else {
        res.send('Нет параметра subid!');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

// Обработчик команды /start
bot.onText(/\/start(.*)/, (msg, match) => {
    const chatId = msg.chat.id;

    // Извлекаем subid из параметра start
    const subid = match[1].replace('subid', '').trim() || 'не указан';

    // Генерация уникального startid
    const startid = Math.random().toString(36).substring(2, 15);

    // Сохраняем данные в базе
    saveUserData(chatId, subid, startid);

    db.get('SELECT subid FROM users WHERE chat_id = ?', [chatId], (err, row) => {
      if (err) {
          console.error('Ошибка при получении subid:', err.message);
          bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
      } else if (row) {
          const subid = row.subid;

          // Формируем ссылку
          const url = `https://google.com?subid=${subid}`;

          // Отправляем сообщение с кнопкой, которая сразу открывает ссылку
          bot.sendMessage(chatId, `Привет! Ваш subid: ${subid}, startid: ${startid}`, {
            reply_markup: {
                inline_keyboard: [
                  [{ text: 'Играть', url: url }],
                ],
            },
        });
      } else {
          bot.sendMessage(chatId, 'Пожалуйста, нажмите /start, чтобы начать.');
      }
  });    
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'play') {
    
  }
});