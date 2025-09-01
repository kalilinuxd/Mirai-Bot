const axios = require("axios");
const cmdN = "ai";

module.exports = {
  config: {
    name: cmdN,
    version: "1.0.0",
    hasPermission: 0,
    credits: "You",
    description: "تفعيل/إيقاف الدردشة الذكية في المجموعة",
    usePrefix: true,
    commandCategory: "chat",
    usages: "ai on/off",
    cooldowns: 2
  },

  run: async function ({ event, api, args, Threads }) {
    // ✅ يتحقق أن الأمر في مجموعة فقط
    if (event.isGroup === false) {
      return api.sendMessage("❌ هذا الأمر يعمل فقط في المجموعات.", event.threadID, event.messageID);
    }

    if (!args[0]) {
      return api.sendMessage("ℹ️ استعمل: ai on لتشغيل أو ai off لإيقاف.", event.threadID, event.messageID);
    }

    const threadID = event.threadID;
    const data = (await Threads.getData(threadID)).data || {};

    if (args[0].toLowerCase() === "on") {
      data.aiEnabled = true;
      await Threads.setData(threadID, { data });
      return api.sendMessage("✅ تم تفعيل الدردشة الذكية في هذه المجموعة.", threadID, event.messageID);
    }

    if (args[0].toLowerCase() === "off") {
      data.aiEnabled = false;
      await Threads.setData(threadID, { data });
      return api.sendMessage("⏹️ تم إيقاف الدردشة الذكية في هذه المجموعة.", threadID, event.messageID);
    }

    return api.sendMessage("❌ خيار غير معروف. استعمل: ai on/off", threadID, event.messageID);
  },

  // 🧠 مستمع رسائل
  handleEvent: async function ({ event, api, Threads }) {
    try {
      if (event.isGroup === false) return;
      const text = (event.body || "").trim();
      if (!text) return;

      // تجاهل الأوامر
      const prefix = (global.config.PREFIX) ? global.config.PREFIX : "/";
      if (text.startsWith(prefix)) return;

      const { data } = await Threads.getData(event.threadID);
      if (!data || !data.aiEnabled) return;

      // ✅ إذا الدردشة مفعّلة → رد باستخدام ذكاء اصطناعي أو ردود بسيطة
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY || global.config.OPENAI_API_KEY;
      if (OPENAI_API_KEY) {
        const resp = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "أنت بوت يتحدث مثل الإنسان ويفهم جميع اللغات. أجب بنفس لغة المستخدم." },
              { role: "user", content: text }
            ]
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            timeout: 20000
          }
        );

        const reply = resp.data.choices?.[0]?.message?.content?.trim() || "🙂";
        return api.sendMessage(reply, event.threadID, event.messageID);
      }

      // لو ما فيه API Key
      const fallbackReplies = ["👍", "تمام، احكي أكثر 👀", "😂😂", "أها فهمت!", "🤔 مثير!"];
      return api.sendMessage(fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)], event.threadID, event.messageID);

    } catch (e) {
      console.error("ai handleEvent error:", e.message);
    }
  }
};
