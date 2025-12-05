/**
 * Скрипт для постинга автомобилей в Telegram канал с кнопкой WebApp
 *
 * Установка: npm install node-telegram-bot-api
 * Запуск: node post_to_channel.js
 */

const TelegramBot = require('node-telegram-bot-api');

// ========== НАСТРОЙКИ ==========
const BOT_TOKEN = 'ВСТАВЬТЕ_ВАШ_ТОКЕН_БОТА';
const CHANNEL_ID = '@ваш_канал'; // Или -100xxxxxxxxxx для приватного
const WEBAPP_URL = 'https://ваш-сайт.netlify.app';
// ===============================

const bot = new TelegramBot(BOT_TOKEN);

/**
 * Отправляет пост об автомобиле в канал
 */
async function postCarToChannel(carData = null) {
  // Пример данных (замените на свои)
  if (!carData) {
    carData = {
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      transmission: 'Автомат',
      engine: '2.5L Бензин',
      color: 'Черный',
      mileage: '25 000',
      price: '2 500 000',
      description: '✨ Состояние отличное, один владелец\n🔧 Полное ТО пройдено',
      location: 'Москва',
      photoUrl: 'https://example.com/car-photo.jpg' // Замените на реальное фото
    };
  }

  // Форматируем текст поста
  const messageText = `
🚗 <b>${carData.brand} ${carData.model} ${carData.year}</b>

📅 Год: ${carData.year}
⚙️ Коробка: ${carData.transmission}
⛽ Двигатель: ${carData.engine}
🎨 Цвет: ${carData.color}
📏 Пробег: ${carData.mileage} км
💰 Цена: ${carData.price} ₽

${carData.description}
📍 ${carData.location}
  `.trim();

  // Создаем inline кнопку с WebApp
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '📝 Оставить заявку на подбор',
          web_app: { url: WEBAPP_URL }
        }
      ]
      // Можно добавить дополнительные кнопки:
      // [
      //   {
      //     text: '💬 Написать нам',
      //     url: 'https://t.me/your_username'
      //   }
      // ]
    ]
  };

  try {
    await bot.sendPhoto(CHANNEL_ID, carData.photoUrl, {
      caption: messageText,
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
    console.log('✅ Пост успешно отправлен в канал!');
  } catch (error) {
    console.error('❌ Ошибка при отправке:', error.message);
  }
}

/**
 * Создает закрепленное сообщение с кнопкой подбора
 */
async function postPinnedMessage() {
  const text = `
🚗 <b>Подберем автомобиль мечты!</b>

Заполните простую анкету, и мы подберем идеальный вариант под ваши требования и бюджет.

⚡ Быстрый подбор
💰 Лучшие цены
✅ Проверенные авто
🔧 Полная поддержка

👇 Нажмите кнопку ниже для заполнения анкеты
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '📝 Подобрать автомобиль',
          web_app: { url: WEBAPP_URL }
        }
      ]
    ]
  };

  try {
    const message = await bot.sendMessage(CHANNEL_ID, text, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    });

    // Закрепляем сообщение
    await bot.pinChatMessage(CHANNEL_ID, message.message_id, {
      disable_notification: true // Без уведомления
    });

    console.log('✅ Закрепленное сообщение создано!');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

/**
 * Пример массового постинга
 */
async function postMultipleCars() {
  const cars = [
    {
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      transmission: 'Автомат',
      engine: '2.5L Бензин',
      color: 'Черный',
      mileage: '25 000',
      price: '2 500 000',
      description: '✨ Состояние отличное',
      location: 'Москва',
      photoUrl: 'https://example.com/camry.jpg'
    },
    {
      brand: 'BMW',
      model: 'X5',
      year: 2021,
      transmission: 'Автомат',
      engine: '3.0L Бензин',
      color: 'Белый',
      mileage: '30 000',
      price: '5 500 000',
      description: '🔥 Топовая комплектация',
      location: 'Санкт-Петербург',
      photoUrl: 'https://example.com/x5.jpg'
    }
  ];

  for (const car of cars) {
    await postCarToChannel(car);
    // Задержка между постами (опционально)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// ========== ЗАПУСК ==========

// Вариант 1: Отправить один пост
postCarToChannel();

// Вариант 2: Создать закрепленное сообщение (раскомментируйте)
// postPinnedMessage();

// Вариант 3: Отправить несколько постов (раскомментируйте)
// postMultipleCars();
