const config = require('../utils/config');

module.exports = {
  name: 'setparrain',
  description: 'Propriétaire seulement : définit le code parrain à 8 chiffres et le sauvegarde.',
  ownerOnly: true,
  async execute(sock, msg, args) {
    try {
      const code = (args[0] || '').trim();
      if (!/^\d{8}$/.test(code)) {
        return await sock.sendMessage(msg.key.remoteJid, { text: 'Code invalide — le code doit contenir exactement 8 chiffres (ex: 12345678).' }, { quoted: msg });
      }

      config.set('PARAINE_CODE', code);
      await sock.sendMessage(msg.key.remoteJid, { text: `✅ Code parrain défini et sauvegardé : ${code}` }, { quoted: msg });
    } catch (err) {
      console.error('setparrain error', err);
      await sock.sendMessage(msg.key.remoteJid, { text: 'Erreur lors de la sauvegarde du code.' }, { quoted: msg });
    }
  }
};