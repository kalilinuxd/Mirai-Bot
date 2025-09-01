module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "MIRAI-BOT",
  description: "Notification of bots or people entering groups without media"
};

module.exports.onLoad = () => {}; // GIF/Video cache আর দরকার নাই

module.exports.run = async function({ api, event }) {
  const { threadID } = event;

  // যদি বটকে কেউ গ্রুপে অ্যাড করে
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    await api.changeNickname(`[ ${global.config.PREFIX} ] • ${global.config.BOTNAME || "MIRAI-BOT-LOVER"}`, threadID, api.getCurrentUserID());
    return api.sendMessage(
      `╭╭•┄┅═══❁🌺❁═══┅┄•╮\n🖤 واش اجمي 🖤\n╰•┄┅═══❁🌺❁═══┅┄•╯\n\n┏━━━━━━━━━━━━━━━━━┓\n┃  مرحبا بك فشات ديال كلان 🤭🍭┃\n┃ اعضم كلان 🧛‍♀️ ┃\n┃ 🫶 THE 900 𝐟𝐚𝐦𝐢𝐥𝐲!     ┃\n┗━━━━━━━━━━━━━━━━━┛\n\n*\n🌸 *\n\n╭─🎯 𝐔𝐒𝐄𝐅𝐔𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ─╮\n│ ℹ️ ${global.config.PREFIX}info – \n│ 💬 ${global.config.PREFIX}jan –  \n│ ⏱️ ${global.config.PREFIX}uptime –\n╰────────────────────────╯\n\n🔧 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : THE 900 BOT \n🧑‍💻 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐃 𝐁𝐘 : *محمد 'ۓ*\n\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`, 
      threadID
    );
  } else {
    try {
      const { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const nameArray = [];
      const mentions = [];
      let i = 0;

      for (const p of event.logMessageData.addedParticipants) {
        nameArray.push(p.fullName);
        mentions.push({ tag: p.fullName, id: p.userFbId });
        i++;
      }

      const memberCount = participantIDs.length;
      let msg = threadData.customJoin || 
`╭•┄┅═══❁🌺❁═══┅┄•╮\n   আসসালামু আলাইকুম-!!🖤\n╰•┄┅═══❁🌺❁═══┅┄•╯ \n\n✨🆆🅴🅻🅻 🅲🅾🅼🅴 ✨\n\n❥ 𝐍𝐄𝐖~ 𝐌𝐄𝐌𝐁𝐄𝐑 : {name}\n\n🌸 আপনাকে আমাদের গ্রুপ –\n{threadName} – এ স্বাগতম!\n\nআপনি এখন আমাদের {soThanhVien} নং সদস্য 🥰\n\n╭•┄┅═══❁🌺❁═══┅┄•╮\n     🌸  MIRAI-BOT  🌸\n╰•┄┅═══❁🌺❁═══┅┄•╯`;

      msg = msg
        .replace(/\{name}/g, nameArray.join(', '))
        .replace(/\{soThanhVien}/g, memberCount)
        .replace(/\{threadName}/g, threadName);

      return api.sendMessage({ body: msg, mentions }, threadID);
    } catch (e) {
      console.error("JoinNoti Error:", e);
    }
  }
};
