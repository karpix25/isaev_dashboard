const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

console.log("User:", tg.initDataUnsafe.user);

document.getElementById("user").textContent =
  JSON.stringify(tg.initDataUnsafe.user, null, 2);
