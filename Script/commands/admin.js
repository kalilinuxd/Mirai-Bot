module.exports.config = {
  name: "admin",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "aminulsordar",
  description: "Bot operator information",
  commandCategory: "info",
  cooldowns: 1
};

module.exports.languages = {
  en: {
    message: `    THE BOT OPERATOR
             
╔══❀══◄░❀░►══❀══╗
 -NAME ➪ محمد 

 -Gender ➪ Male 🍂💜

 -Age ➪ 17+ 🥀✨

 -Relationship ➪ Single

 -Work ➪ Student

 -Game free fire

 -Facebook ➪ 100068553998815

 -LC ➪ "Hey, I say I love you  THE 900 " 🥱

 -Page ➪ https://www.facebook.com/share/g/100068553998815

 

 

╚══❀══◄░❀░►══❀══╝`
  },

  vi: {
    message: `    NGƯỜI ĐIỀU HÀNH BOT
             🇧🇩🇦🇷🇦🇷🇦🇷➕️➕️➕🇦🇷🇦🇷🇦🇷
╔══❀══◄░❀░►══❀══╗
 -Tên ➪ ༒ 𝐂𝐄𝐎-⸙ ABIR-❯⸙๏

 -Giới tính ➪ Nam 🍂💜

 -Tuổi ➪ 18+ 🥀✨

 -Tình trạng ➪ Độc thân

 -Công việc ➪ Học sinh

 -Game yêu thích ➪ Fire Lover

 -Facebook ➪ https://www.facebook.com/100071880593545

 -LC ➪ "Nói yêu là vì thực sự yêu" 🥱

 -Trang ➪ https://www.facebook.com/share/g/1EHHK6Rb7H/

 -FIRE ➪ ️༒ 𝐂𝐄𝐎℅ABIR-❯⸙๏🥺🔫̷

 -WhatsApp + Imo ➪ Không có người yêu nên không cho 🥱01704407109

 -Telegram ➪ +8801704407109 🥺🔥🥰

 -Mail ➪ Inbox nếu cần

╚══❀══◄░❀░►══❀══╝`
  }
};

module.exports.run = async function ({ api, event, getText }) {
  return api.sendMessage(getText("message"), event.threadID, event.messageID);
};
