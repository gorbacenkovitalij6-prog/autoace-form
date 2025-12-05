exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID_1 = process.env.TELEGRAM_CHAT_ID_1;
    const TELEGRAM_CHAT_ID_2 = process.env.TELEGRAM_CHAT_ID_2;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID_1 || !TELEGRAM_CHAT_ID_2) {
      console.error("Missing Telegram credentials");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    const telegramContact = data.telegram.startsWith("@")
      ? data.telegram
      : `+${data.telegram.replace(/\D/g, "")}`;

    const labels = {
      transmission: {
        automatic: "Автоматическая",
        manual: "Механическая",
        robot: "Робот",
        cvt: "Вариатор",
        any: "Любая",
      },
      fuelType: {
        gasoline: "Бензин",
        diesel: "Дизель",
        hybrid: "Гибрид",
        electric: "Электро",
        gas: "Газ",
        any: "Любой",
      },
      driveType: {
        fwd: "Передний",
        rwd: "Задний",
        awd: "Полный",
        any: "Любой",
      },
    };

    const message = `🚗 <b>Новая заявка на подбор автомобиля</b>

👤 <b>Контактная информация:</b>
Имя: ${data.name}
Telegram: ${telegramContact}
${data.phone ? `Телефон: ${data.phone}` : ""}

🔍 <b>Интересующий автомобиль:</b>
Марка: ${data.brand}
Модель: ${data.model}
Год: ${data.year}
${data.color ? `Цвет: ${data.color}` : ""}
${data.mileage ? `Пробег: ${data.mileage}` : ""}

⚙️ <b>Технические характеристики:</b>
Коробка передач: ${labels.transmission[data.transmission] || data.transmission}
Тип топлива: ${labels.fuelType[data.fuelType] || data.fuelType}
Привод: ${labels.driveType[data.driveType] || data.driveType}
Бюджет: ${data.budget}

${data.additionalInfo ? `💬 <b>Дополнительно:</b>\n${data.additionalInfo}` : ""}`;

    // Отправка сообщения первому пользователю
    const telegramResponse1 = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID_1,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramResponse1.ok) {
      const errorData = await telegramResponse1.json();
      console.error("Telegram API error (user 1):", errorData);
      throw new Error("Failed to send message to Telegram user 1");
    }

    // Отправка сообщения второму пользователю
    const telegramResponse2 = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID_2,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramResponse2.ok) {
      const errorData = await telegramResponse2.json();
      console.error("Telegram API error (user 2):", errorData);
      throw new Error("Failed to send message to Telegram user 2");
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
