async function sendAuthData() {
  if (!window.Telegram || !window.Telegram.WebApp) {
    console.error("Не запущено внутри Telegram WebApp");
    return;
  }

  const tg = window.Telegram.WebApp;
  tg.expand();
  tg.ready();

  console.log("User:", tg.initDataUnsafe.user);

  // Отправляем в n8n
  const res = await fetch("https://n8n.karpix.com/webhook/telegram-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      initData: tg.initData,
      user: tg.initDataUnsafe.user
    })
  });

  const data = await res.json().catch(() => ({}));
  console.log("Ответ от n8n:", data);
}

sendAuthData();
