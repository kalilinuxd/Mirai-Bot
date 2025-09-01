const axios = require("axios");

// نخزن حالة التفعيل لكل مستخدم
let activeUsers = {};

module.exports = {
  config: {
    name: "chatAI",
    version: "2.1",
    author: "YourName",
    role: 0,
    shortDescription: "بوت ذكي يتحدث فقط عند التفعيل",
    longDescription: "يرد البوت مثل الإنسان ويفهم جميع اللغات لكن فقط عند كتابة /on للتشغيل و /off للإيقاف",
    category: "chat"
  },

  onStart: async function ({ event, message }) {
    const userId = event.senderID;
    const text = event.body?.trim();

    if (!text) return;

    // ✅ أوامر التفعيل والإيقاف
    if (text.toLowerCase() === "/on") {
      activeUsers[userId] = true;
      return message.reply("✅ تم تفعيل وضع المحادثة! اكتب أي شيء وسأرد عليك 🤖");
    }

    if (text.toLowerCase() === "/off") {
      activeUsers[userId] = false;
      return message.reply("⏹️ تم إيقاف وضع المحادثة. لن أرد حتى تكتب /on مرة أخرى.");
    }

    // ❌ إذا المستخدم ما فعل الوضع → تجاهل
    if (!activeUsers[userId]) return;

    // 🚀 الذكاء الاصطناعي (OpenAI)
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini", 
          messages: [
            { role: "system", content: "أنت بوت دردشة ذكي يتحدث مثل الإنسان ويفهم جميع اللغات." },
            { role: "user", content: text }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );

      const botReply = response.data.choices[0].message.content;
      message.reply(botReply);

    } catch (error) {
      console.error("❌ خطأ:", error.message);
      message.reply("عذرًا، حصل خطأ أثناء محاولة الرد 🤖");
    }
  }
};
