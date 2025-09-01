const cmdN = "سب";

module.exports = {
  config: {
    name: cmdN,
    version: "1.0.0",
    hasPermission: 0,
    credits: "You",
    description: "تفعيل أو إيقاف رد السب والشتم في المجموعات",
    usePrefix: true,
    commandCategory: "system",
    usages: "/سب on | /سب off",
    cooldowns: 2
  },

  // 🟢 ملي تستعمل /سب on أو /سب off
  run: async function ({ event, api, args, Threads }) {
    if (!event.isGroup) {
      return api.sendMessage("❌ هاد الأمر كيخدم غير فالمجموعات.", event.threadID, event.messageID);
    }

    if (!args[0]) {
      return api.sendMessage("ℹ️ استعمل: /سب on أو /سب off", event.threadID, event.messageID);
    }

    const data = (await Threads.getData(event.threadID)).data || {};

    if (args[0].toLowerCase() === "on") {
      data.sibEnabled = true;
      await Threads.setData(event.threadID, { data });
      return api.sendMessage("✅ تم تفعيل وضع السب فهاد المجموعة.", event.threadID, event.messageID);
    }

    if (args[0].toLowerCase() === "off") {
      data.sibEnabled = false;
      await Threads.setData(event.threadID, { data });
      return api.sendMessage("⏹️ تم إيقاف وضع السب فهاد المجموعة.", event.threadID, event.messageID);
    }

    return api.sendMessage("❌ اختيار غير معروف. استعمل: /سب on | /سب off", event.threadID, event.messageID);
  },

  // 👂 مراقبة الرسائل والرد إذا مفعل
  handleEvent: async function ({ event, api, Threads }) {
    try {
      if (!event.isGroup) return;
      if (!event.body) return;

      const text = event.body.toLowerCase();

      // نجيب حالة المجموعة
      const { data } = await Threads.getData(event.threadID);
      if (!data || !data.sibEnabled) return;

      // لائحة الكلمات الممنوعة
      const badWords = [
        "حمار", "كلب", "مكلخ", "تفو", "لاينعل", "بوت مكلخ", "جداك", "ختك"
      ];

      if (badWords.some(word => text.includes(word))) {
        const replies = [
          "وا آ خويا، بلا سبّ 🤣 راه ماشي معقول!",
          "شكون سبّك باش تسبني؟ هدي أعصابك 😏",
          "آ الراجل، كلامك بحال الواي فاي ديال الجيران: ضعيف ويتقطع 😆",
          "راه عقلك دايز فـ mode airplane ✈️",
          "سير قلب على الباك أب ديال عقلك يمكن ضاع منك 😂",
          "الهضرة ديالك بحال كاسكروط بلا خبز 🥖",
          "المهم... حنا فهمنا، انت باقي كتجرب تدوي 😜"
        ];

        const reply = replies[Math.floor(Math.random() * replies.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      }
    } catch (e) {
      console.error("sib error:", e.message);
    }
  }
};
