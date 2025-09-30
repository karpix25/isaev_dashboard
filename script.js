async function sendAuthData() {
  const tg = window.Telegram.WebApp;

  // Берём initData целиком (оно содержит user + подпись hash)
  const initData = tg.initData;

  // Шлём в n8n
  const res = await fetch("https://n8n.karpix.com/webhook/telegram-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData })
  });

  const data = await res.json();
  console.log("Ответ от n8n:", data);
}

sendAuthData();
