<body>
  <div id="no-access" style="display:none; text-align:center; padding:30px;">
    <h2>🚫 Нет доступа</h2>
    <p>Вы не администратор</p>
  </div>

  <div id="settings" style="display:none;">
    <h1>⚙️ Настройки</h1>
    <!-- Твоя форма -->
    <form id="settings-form">
      <label>System Prompt:</label>
      <textarea name="system_prompt"></textarea><br>

      <label>Модель:</label>
      <select name="model">
        <option value="gpt-4o-mini">gpt-4o-mini</option>
        <option value="gpt-4.1-mini">gpt-4.1-mini</option>
      </select><br>

      <label>Buffer (секунды):</label>
      <input type="number" name="buffer_seconds"><br>

      <label>Context Limit:</label>
      <input type="number" name="context_limit"><br>

      <label>Followup Delay (мин):</label>
      <input type="number" name="followup_delay_minutes"><br>

      <label>Followup Message:</label>
      <input type="text" name="followup_message"><br>

      <button type="submit">💾 Сохранить</button>
    </form>
  </div>

  <script>
    async function sendAuthData() {
      if (!window.Telegram || !window.Telegram.WebApp) {
        console.error("❌ Не запущено внутри Telegram WebApp");
        return;
      }

      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.ready();

      // Отправляем initData и user в n8n
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

      if (!data.ok) {
        // если доступ запрещен
        document.getElementById("no-access").style.display = "block";
        return;
      }

      // если админ → показать форму настроек
      document.getElementById("settings").style.display = "block";
    }

    sendAuthData();
  </script>
</body>
