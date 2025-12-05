import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Получаем данные из переменных окружения
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Форматируем сообщение для Telegram
    const telegramContact = data.telegram.startsWith('@')
      ? data.telegram
      : `+${data.telegram.replace(/\D/g, '')}`;

    const message = `
🚗 <b>Новая заявка на подбор автомобиля</b>

👤 <b>Контактная информация:</b>
Имя: ${data.name}
Telegram: ${telegramContact}
${data.phone ? `Телефон: ${data.phone}` : ''}

🔍 <b>Интересующий автомобиль:</b>
Марка: ${data.brand}
Модель: ${data.model}
Год: ${data.year}
${data.color ? `Цвет: ${data.color}` : ''}
${data.mileage ? `Пробег: ${data.mileage}` : ''}

⚙️ <b>Технические характеристики:</b>
Коробка передач: ${getTransmissionLabel(data.transmission)}
Тип топлива: ${getFuelTypeLabel(data.fuelType)}
Привод: ${getDriveTypeLabel(data.driveType)}
Бюджет: ${data.budget}

${data.additionalInfo ? `💬 <b>Дополнительно:</b>\n${data.additionalInfo}` : ''}

${data.telegram.startsWith('@') ? `\n📲 <b>Написать:</b> ${data.telegram}` : ''}
    `.trim();

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send message to Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Вспомогательные функции для перевода значений
function getTransmissionLabel(value: string): string {
  const labels: Record<string, string> = {
    automatic: 'Автоматическая',
    manual: 'Механическая',
    robot: 'Робот',
    cvt: 'Вариатор',
    any: 'Любая',
  };
  return labels[value] || value;
}

function getFuelTypeLabel(value: string): string {
  const labels: Record<string, string> = {
    gasoline: 'Бензин',
    diesel: 'Дизель',
    hybrid: 'Гибрид',
    electric: 'Электро',
    gas: 'Газ',
    any: 'Любой',
  };
  return labels[value] || value;
}

function getDriveTypeLabel(value: string): string {
  const labels: Record<string, string> = {
    fwd: 'Передний',
    rwd: 'Задний',
    awd: 'Полный',
    any: 'Любой',
  };
  return labels[value] || value;
}
