export function notify(msg) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(msg);
  } else {
    Notification.requestPermission().then((p) => {
      if (p === "granted") new Notification(msg);
    });
  }
}
