const cmdN = "antishit";

module.exports = {
  config: {
    name: cmdN,
    version: "1.0.0",
    hasPermission: 0,
    credits: "You",
    description: "يرد على السب بكلام ساخر بلهجة مغربية",
    usePrefix: false,
    commandCategory: "system",
    cooldowns: 0
  },

  handleEvent: async function ({ event, api }) {
    if (!event.body) return;
    const text = event.body.toLowerCase();

    // قائمة كلمات شتم (مغربية + عربية + عامة)
    const badWords = [
      "حمار", "كلب", "بزول", "زامل", "مكلخ", "تفو", "لاينعل", "fuck", "shit"
    ];

    // تحقق إذا الرسالة تتضمن كلمة سيئة
    if (badWords.some(word => text.includes(word))) {
      // ردود باللهجة المغربية
      const replies = [
        "وا آ صاحبي، بلا سبّ 🤣 راه ماشي معقول!",
        "شكون سبّك باش تسبني؟ هدي أعصابك 😏",
        "واخا تكون معصّب، ماشي هكا كيتحل المشكل 😉",
        "آ الزين، خلي العقل يغلب العاطفة 😂",
        "واش عاندك مشكل ولا غير بغيت تجبد النقاش؟ 😆"
      ];

      const reply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage(reply, event.threadID, event.messageID);
    }
  },

  run: async function () {
    // هذا الموديول event-based، ما يحتاج run
  }
};
