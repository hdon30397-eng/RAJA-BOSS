const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    credits: "SARDAR RDX",
    name: 'owner',
    aliases: ['dev', 'creator', 'ownerinfo', 'developer'],
    description: 'Show bot owner information',
    usage: 'owner',
    category: 'Info',
    prefix: false
  },

  async run({ api, event, send, config }) {
    const { threadID } = event;

    const ownerPics = [
      'https://i.ibb.co/C52spN1Z/dd62af344243.jpg'
    ];

    const randomPic = ownerPics[Math.floor(Math.random() * ownerPics.length)];

    const ownerInfo = `
✨ ━━━━━━━━━━━━━━━━━━━ ✨
       👑 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 👑
✨ ━━━━━━━━━━━━━━━━━━━ ✨

┌──────────────────────┐
│  👤 ɴᴀᴍᴇ            │
│  ➤ RAJA G        │
└──────────────────────┘

┌──────────────────────┐
│  📱 ᴄᴏɴᴛᴀᴄᴛ ɪɴꜰᴏ     │
└──────────────────────┘

  🔗 ꜰᴀᴄᴇʙᴏᴏᴋ:
  https://www.facebook.com/profile.php?id=61589639552429

  💬 ᴡʜᴀᴛꜱᴀᴘᴘ:
  wa.me/923709690437

  📧 ᴇᴍᴀɪʟ:
  sardarrdx@gmail.com

┌──────────────────────┐
│  🤖 ʙᴏᴛ ᴅᴇᴛᴀɪʟꜱ     │
└──────────────────────┘

  📛 ɴᴀᴍᴇ: ${config.BOTNAME || 'RAJA GBOT'}
  ⌨️ ᴘʀᴇꜰɪx: ${config.PREFIX || '.'}
  📦 ᴠᴇʀꜱɪᴏɴ: 2.0.0
  🛠️ ꜰʀᴀᴍᴇᴡᴏʀᴋ: RDX-FCA v2

┌──────────────────────┐
│  🏆 ᴅᴇᴠᴇʟᴏᴘᴇʀ       │
└──────────────────────┘

  💻 ɴᴀᴍᴇ: RAJA G
  🌟 ꜱᴛᴀᴛᴜꜱ: Active
  🎯 ʀᴏʟᴇ: Bot Developer

✨ ━━━━━━━━━━━━━━━━━━━ ✨
   💝 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐔𝐬𝐢𝐧𝐠 💝
✨ ━━━━━━━━━━━━━━━━━━━ ✨`.trim();

    try {
      const cacheDir = path.join(__dirname, 'cache');
      fs.ensureDirSync(cacheDir);
      const imgPath = path.join(cacheDir, `owner_${Date.now()}.jpg`);

      const response = await axios.get(randomPic, { responseType: 'arraybuffer', timeout: 15000 });
      fs.writeFileSync(imgPath, Buffer.from(response.data));

      await api.sendMessage({ body: ownerInfo, attachment: fs.createReadStream(imgPath) }, threadID);
      try { fs.unlinkSync(imgPath); } catch {}

      const adminID = config.ADMINBOT && config.ADMINBOT[0] ? config.ADMINBOT[0] : null;
      if (adminID) {
        const contactMsg = "╭──────◇──────╮\n   👑 OWNER 👑\n╰──────◇──────╯\n\nOwner Profile:";
        return api.shareContact(contactMsg, adminID, threadID);
      }
    } catch {
      return send.reply(ownerInfo);
    }
  }
};
