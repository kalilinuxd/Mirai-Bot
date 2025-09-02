const cmdN = "جدولة";
let intervals = {};

module.exports = {
  config: {
    name: cmdN,
    version: "2.0.0",
    hasPermission: 0,
    credits: "You",
    description: "إرسال رسائل مجدولة أوتوماتيكيا بتوقيت المغرب",
    usePrefix: true,
    commandCategory: "system",
    usages: "/جدولة on | /جدولة off | /جدولة add [HH:MM] [النص] | /جدولة remove [index] | /جدولة list",
    cooldowns: 5
  },

  run: async function ({ event, api, args, Threads }) {
    if (!event.isGroup) {
      return api.sendMessage("❌ هاد الميزة كتخدم غير فالمجموعات.", event.threadID, event.messageID);
    }

    const threadID = event.threadID;
    const data = (await Threads.getData(threadID)).data || {};
    if (!data.schedules) data.schedules = [];

    // ✅ تفعيل
    if (args[0] && args[0].toLowerCase() === "on") {
      if (intervals[threadID]) clearInterval(intervals[threadID]);

      intervals[threadID] = setInterval(async () => {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const moroccoTime = new Date(utc + (3600000 * 1)); // GMT+1
        const hours = moroccoTime.getHours();
        const minutes = moroccoTime.getMinutes();
        const current = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        // شيك على جميع الرسائل المجدولة
        for (const sch of data.schedules) {
          if (sch.time === current) {
            api.sendMessage(sch.text, threadID);
          }
        }
      }, 60 * 1000);

      return api.sendMessage("✅ تم تشغيل الرسائل المجدولة.", threadID);
    }

    // ⛔ إيقاف
    if (args[0] && args[0].toLowerCase() === "off") {
      if (intervals[threadID]) {
        clearInterval(intervals[threadID]);
        delete intervals[threadID];
        return api.sendMessage("⏹️ تم إيقاف الرسائل المجدولة.", threadID);
      } else {
        return api.sendMessage("ℹ️ راه ماشي مفعل أصلا.", threadID);
      }
    }

    // ➕ إضافة
    if (args[0] && args[0].toLowerCase() === "add") {
      if (!args[1] || !args[2]) {
        return api.sendMessage("ℹ️ استعمل: /جدولة add HH:MM النص", threadID, event.messageID);
      }

      const time = args[1];
      const text = args.slice(2).join(" ");
      data.schedules.push({ time, text });
      await Threads.setData(threadID, { data });

      return api.sendMessage(`✅ تمت إضافة رسالة مجدولة عند ${time}: ${text}`, threadID);
    }

    // ❌ حذف
    if (args[0] && args[0].toLowerCase() === "remove") {
      const index = parseInt(args[1]) - 1;
      if (isNaN(index) || index < 0 || index >= data.schedules.length) {
        return api.sendMessage("❌ الرقم غير صحيح.", threadID);
      }

      const removed = data.schedules.splice(index, 1);
      await Threads.setData(threadID, { data });

      return api.sendMessage(`🗑️ تم حذف: ${removed[0].time} → ${removed[0].text}`, threadID);
    }

    // 📋 عرض اللائحة
    if (args[0] && args[0].toLowerCase() === "list") {
      if (data.schedules.length === 0) {
        return api.sendMessage("ℹ️ ما كايناش أي رسائل مجدولة.", threadID);
      }

      const list = data.schedules
        .map((s, i) => `${i + 1}. [${s.time}] ${s.text}`)
        .join("\n");

      return api.sendMessage(`📅 الرسائل المجدولة:\n\n${list}`, threadID);
    }

    return api.sendMessage("ℹ️ الأوامر: /جدولة on | off | add [HH:MM] [النص] | remove [index] | list", threadID);
  }
};
