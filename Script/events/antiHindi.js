module.exports = {
  config: {
    name: "antiHindi",
    version: "1.0",
    hasPermission: 0,
    credits: "You",
    description: "منع الرسائل المكتوبة بالهندية",
    commandCategory: "moderation",
    cooldowns: 0
  },

  onStart: async function ({ event, api }) {
    const text = event.body || "";
    if (!text) return;

    // 🔍 تحقق واش النص فيه أحرف هندية (Devanagari Unicode range)
    const hindiRegex = /[\u0900-\u097F]/;

    if (hindiRegex.test(text)) {
      try {
        // حذف رسالة المرسل
        await api.deleteMessage(event.messageID);

        // رد تحذيري
        return api.sendMessage(
          `🚫 الكتابة بالهندية ممنوعة هنا!`,
          event.threadID
        );
      } catch (e) {
        console.error("AntiHindi error:", e);
      }
    }
  }
};
