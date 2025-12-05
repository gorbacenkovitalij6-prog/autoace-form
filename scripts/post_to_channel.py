"""
Скрипт для постинга автомобилей в Telegram канал с кнопкой WebApp

Установка: pip install python-telegram-bot
Запуск: python post_to_channel.py
"""

from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
import asyncio

# ========== НАСТРОЙКИ ==========
BOT_TOKEN = "ВСТАВЬТЕ_ВАШ_ТОКЕН_БОТА"
CHANNEL_ID = "@ваш_канал"  # Или -100xxxxxxxxxx для приватного
WEBAPP_URL = "https://ваш-сайт.netlify.app"
# ===============================


async def post_car_to_channel(car_data=None):
    """
    Отправляет пост об автомобиле в канал с кнопкой WebApp

    Args:
        car_data: словарь с данными автомобиля (опционально)
    """
    bot = Bot(token=BOT_TOKEN)

    # Пример данных (замените на свои)
    if car_data is None:
        car_data = {
            "brand": "Toyota",
            "model": "Camry",
            "year": 2022,
            "transmission": "Автомат",
            "engine": "2.5L Бензин",
            "color": "Черный",
            "mileage": "25 000",
            "price": "2 500 000",
            "description": "✨ Состояние отличное, один владелец\n🔧 Полное ТО пройдено",
            "location": "Москва",
            "photo_url": "https://example.com/car-photo.jpg"  # Замените на реальное фото
        }

    # Форматируем текст поста
    message_text = f"""
🚗 <b>{car_data['brand']} {car_data['model']} {car_data['year']}</b>

📅 Год: {car_data['year']}
⚙️ Коробка: {car_data['transmission']}
⛽ Двигатель: {car_data['engine']}
🎨 Цвет: {car_data['color']}
📏 Пробег: {car_data['mileage']} км
💰 Цена: {car_data['price']} ₽

{car_data['description']}
📍 {car_data['location']}
    """.strip()

    # Создаем inline кнопку с WebApp
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton(
            text="📝 Оставить заявку на подбор",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )],
        # Можно добавить дополнительные кнопки:
        # [InlineKeyboardButton(
        #     text="💬 Написать нам",
        #     url="https://t.me/your_username"
        # )]
    ])

    # Отправляем пост с фото
    try:
        await bot.send_photo(
            chat_id=CHANNEL_ID,
            photo=car_data['photo_url'],
            caption=message_text,
            parse_mode="HTML",
            reply_markup=keyboard
        )
        print("✅ Пост успешно отправлен в канал!")
    except Exception as e:
        print(f"❌ Ошибка при отправке: {e}")


async def post_pinned_message():
    """
    Создает закрепленное сообщение с кнопкой подбора
    """
    bot = Bot(token=BOT_TOKEN)

    text = """
🚗 <b>Подберем автомобиль мечты!</b>

Заполните простую анкету, и мы подберем идеальный вариант под ваши требования и бюджет.

⚡ Быстрый подбор
💰 Лучшие цены
✅ Проверенные авто
🔧 Полная поддержка

👇 Нажмите кнопку ниже для заполнения анкеты
    """.strip()

    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton(
            text="📝 Подобрать автомобиль",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ])

    try:
        message = await bot.send_message(
            chat_id=CHANNEL_ID,
            text=text,
            parse_mode="HTML",
            reply_markup=keyboard
        )

        # Закрепляем сообщение
        await bot.pin_chat_message(
            chat_id=CHANNEL_ID,
            message_id=message.message_id,
            disable_notification=True  # Без уведомления
        )
        print("✅ Закрепленное сообщение создано!")
    except Exception as e:
        print(f"❌ Ошибка: {e}")


if __name__ == "__main__":
    # Выберите что запустить:

    # Вариант 1: Отправить пост об автомобиле
    asyncio.run(post_car_to_channel())

    # Вариант 2: Создать закрепленное сообщение (раскомментируйте)
    # asyncio.run(post_pinned_message())
