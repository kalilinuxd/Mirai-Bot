let cmd = {
    config: {
        name: "welocome",
        Type: ["log:subscribe"]
    }, 

    Event: async function ({ api , sh , threadsData, usersData, event }) {
		const { threadID } = event;

		const { PREFIX, BOTNAME } = global.config;

        const added = event.logMessageData.addedParticipants;

        if (added.some(item => item.userFbId == config.shellyID)) {

			if (BOTNAME) api.changeNickname(BOTNAME, threadID, config.shellyID);

      api.sendMessage(`⚝ ${threadID} ⚝`, config.TID);


      sh.send(`تم تشغيل شيلي بنجاح ✅

↫ البادئة الخاصة بي هي [ ${PREFIX} ]  ↬
        `)

        } else if (added.some(item => item.userFbId == config.OWNERID)) return sh.send("❤️😭 مرحباً بك مولاي ")
            else {


                let msg;
                let threadData = (await threadsData.get(event.threadID)).data;

      (!threadData.customJoin) ? msg = "مرحبا بكم ، انا شيلي o(〃＾▽＾〃)o": msg = threadData.customJoin;

      sh.send(msg);

            }

    }
}



module.exports = cmd;
