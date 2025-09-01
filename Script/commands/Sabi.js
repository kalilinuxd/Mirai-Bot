const axios = require("axios");
const cmdN = "سخرية";
let intervals = {};

module.exports = {
  config: {
    name: cmdN,
    version: "2.0.0",
    hasPermission: 0,
    credits: "You",
    description: "سخرية برسائل + ميمز عشوائية من الويب",
    usePrefix: true,
    commandCategory: "fun",
    usages: "/سخرية on [دقايق] | /سخرية off",
    cooldowns: 3
  },

  run: async function ({ event, api, args }) {
    if (!event.isGroup) {
      return api.sendMessage("❌ هاد الميزة كتخدم غير فالمجموعات.", event.threadID, event.messageID);
    }

    const threadID = event.threadID;

    if (args[0] && args[0].toLowerCase() === "on") {
      let minutes = parseInt(args[1]) || 10;
      if (minutes < 1) minutes = 1;

      if (intervals[threadID]) {
        clearInterval(intervals[threadID]);
      }

      intervals[threadID] = setInterval(async () => {
        try {
          // 📝 قفشات نصية
          const replies = [
            "آ ولدي، كلامك بحال الشبكة ديال أورانج فالشتا 😆",
            "واش نتي كتدوي ولا الراديو مشوش؟ 📻",
            "راه عقلك دايز فـ mode airplane ✈️",
            "آ صاحبي، كلامك ما يسوى حتى نص ريال 😂",
            "آ سيدي، سير شرب أتاي وبرد عروقك ☕",
            "الهضرة ديالك بحال كاسكروط بلا خبز 🥖",
            "الله يرحم ليك الوالدين، سكت حسن 😜",
            "آ الزين، خلي العقل يغلب العاطفة 😂"
          ];

          const reply = replies[Math.floor(Math.random() * replies.length)];

          // 📥 جلب ميم من API
          const res = await axios.get("https://meme-api.com/gimme");
          const memeUrl = res.data.url;

          api.sendMessage(
            { body: reply, attachment: { url: memeUrl } },
            threadID
          );
        } catch (e) {
          console.error("Meme fetch error:", e.message);
        }
      }, minutes * 60 * 1000);

      return api.sendMessage(`✅ وضع السخرية شغال. كل ${minutes} دقيقة قفشة + ميم من الويب 😂`, threadID);

    } else if (args[0] && args[0].toLowerCase() === "off") {
      if (intervals[threadID]) {
        clearInterval(intervals[threadID]);
        delete intervals[threadID];
        return api.sendMessage("⏹️ تم إيقاف وضع السخرية.", threadID);
      } else {
        return api.sendMessage("ℹ️ راه ماشي مفعل أصلا.", threadID);
      }
    } else {
      return api.sendMessage("ℹ️ استعمل: /سخرية on [دقايق] | /سخرية off", threadID);
    }
  }
};
