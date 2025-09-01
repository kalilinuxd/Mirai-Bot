module.exports = {
  config: {
    name: "antishit",
    eventType: ["message"],
    version: "1.0.0",
    credits: "You",
    description: "رد ساخر أو هجومي على السب في المجموعات"
  },

  run: async function () {},

  handleEvent: async function ({ event, api }) {
    if (!event.isGroup) return;
    if (!event.body) return;

    const text = event.body.toLowerCase();

    // 🔑 كلمات ممنوعة (زيد من عندك)
    const badWords = [
      "حمار", "كلب", "تفو", "لاينعل", "مكلخ", "fuck", "shit", "ختك"
    ];

    if (badWords.some(word => text.includes(word))) {
      // 📝 ردود هجومية/ساخرة (تقدر تزيد عليهم من عندك)
      const replies = [
        "وا آ خويا، بلا سبّ 🤣 راه ماشي معقول!",
        "شكون سبّك باش تسبني؟ هدي أعصابك 😏",
        "واخا تكون معصّب، ماشي هكا كيتحل المشكل 😉",
        "آ الزين، خلي العقل يغلب العاطفة 😂",
        "واش عاندك مشكل ولا غير بغيت تجبد النقاش؟ 😆",
        "راه عقلك دايز فـ mode airplane ✈️",
        "سير شرب أتاي وبرد أعصابك ☕",
        "آشيخي، كلامك بحال البطاطا بلا ملح 🍟",
        "سير قلب على الباك أب ديال عقلك يمكن ضاع منك 😂",
        "الهضرة ديالك بحال كاسكروط بلا خبز 🥖",
        "المهم... حنا فهمنا، انت باقي كتجرب تدوي 😜",
        "آ الراجل، كلامك بحال الواي فاي ديال الجيران: ضعيف ويتقطع 😆"
      ];

      const reply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage(reply, event.threadID, event.messageID);
    }
  }
};
    }
  },

  run: async function () {
    // هذا الموديول event-based، ما يحتاج run
  }
};
