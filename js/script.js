const config = {
  serverInfo: {
    serverLogoImageFileName: 'logo.png',
    serverName: '늠름서버',
    serverIp: 'boreum1.k-r.pw',
    serverIp2: 'gotiger.ipdisk.co.kr:12270',
    discordServerID: '1119157550466740254',
  },
};

/*Config navbar*/
const serverName = document.querySelector('.server-name');
const serverLogo = document.querySelector('.logo-img');
/*Config header*/
const serverIp = document.querySelector('.minecraft-server-ip');
const serverLogoHeader = document.querySelector('.logo-img-header');
const discordOnlineUsers = document.querySelector('.discord-online-users');
const minecraftOnlinePlayers = document.querySelector(
  '.minecraft-online-players'
);
/*Config contact*/
const contactForm = document.querySelector('.contact-form');
const inputWithLocationAfterSubmit = document.querySelector(
  '.location-after-submit'
);

const getDiscordOnlineUsers = async () => {
  try {
    const discordServerId = config.serverInfo.discordServerID;

    const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
    let response = await fetch(apiWidgetUrl);
    let data = await response.json();
    console.log(
      '🚀  file: script.js:40  data.presence_count:',
      data.presence_count
    );

    if (!data.presence_count) return 'None';
    else return await data.presence_count;
  } catch (e) {
    return 'None';
  }
};

const getMinecraftOnlinePlayer = async () => {
  try {
    const serverIp2 = config.serverInfo.serverIp2;

    const apiUrl = `https://api.mcsrvstat.us/2/${serverIp2}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    return data.players.online;
  } catch (e) {
    console.log(e);
    return 'None';
  }
};

const copyIp = () => {
  const copyIpButton = document.querySelector('.copy-ip');
  const copyIpAlert = document.querySelector('.ip-copied');

  copyIpButton.addEventListener('click', () => {
    try {
      navigator.clipboard.writeText(config.serverInfo.serverIp);

      copyIpAlert.classList.add('active');

      setTimeout(() => {
        copyIpAlert.classList.remove('active');
      }, 5000);
    } catch (e) {
      console.log(e);
      copyIpAlert.innerHTML = 'An error has occurred!';
      copyIpAlert.classList.add('active');
      copyIpAlert.classList.add('error');

      setTimeout(() => {
        copyIpAlert.classList.remove('active');
        copyIpAlert.classList.remove('error');
      }, 5000);
    }
  });
};

const setDataFromConfigToHtml = async () => {
  /*Set config data to navbar*/
  serverName.innerHTML = config.serverInfo.serverName;
  serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

  serverIp.innerHTML = config.serverInfo.serverIp;

  copyIp();
  discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
  minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
};

setDataFromConfigToHtml();
