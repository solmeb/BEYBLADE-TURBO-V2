const config = require('../utils/config');

module.exports = {
  name: 'getparrain',
  description: 'Propriétaire seulement : affiche le code parrain sauvegardé.',
  ownerOnly: true,
  async execute(sock, msg, args) {
    try {
      const codeEnv = process.env.PARAINE_CODE;
      const codeCfg = config.get('PARAINE_CODE');
      const code = codeEnv || codeCfg;
      if (!code) {
        return await sock.sendMessage(msg.key.remoteJid, { text: 'Aucun code parrain défini.' }, { quoted: msg });
      }
      await sock.sendMessage(msg.key.remoteJid, { text: `Code parrain actuel : ${code}` }, { quoted: msg });
    } catch (err) {
      console.error('getparrain error', err);
      await sock.sendMessage(msg.key.remoteJid, { text: 'Erreur lors de la lecture du code.' }, { quoted: msg });
    }
  }
};
