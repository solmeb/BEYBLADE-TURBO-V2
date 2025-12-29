const config = require('../utils/config');

module.exports = {
  name: 'parrain',
  description: 'Envoie le code parrain (8 chiffres) au numéro cible ou répond avec le code actuel.',
  async execute(sock, msg, args) {
    try {
      // Cherche le code dans env d'abord, sinon dans config sauvegardée
      const code = process.env.PARAINE_CODE || config.get('PARAINE_CODE');
      if (!code) {
        return await sock.sendMessage(msg.key.remoteJid, { text: 'Aucun code parrain défini. Le propriétaire peut utiliser .setparrain <8chiffres>.' }, { quoted: msg });
      }

      // si un numéro est passé en argument, l'utiliser (format: 33612345678 ou jids.whatsapp.net)
      let target = args[0];
      if (!target) target = process.env.DEFAULT_TARGET_NUMBER || config.get('DEFAULT_TARGET_NUMBER');

      // Si un target est fourni, normaliser en JID WhatsApp si besoin (ajouter @s.whatsapp.net)
      if (target && !target.includes('@')) {
        target = target.replace(/^\+/, '');
        if (target.length === 9 && target.startsWith('0')) {
          // ex: 06xxxxxxx -> convert to international FR simple heuristic
          target = target.replace(/^0/, '33');
        }
        target = `${target}@s.whatsapp.net`;
      }

      const message = `parrainé-code=${code}`;

      if (target) {
        await sock.sendMessage(target, { text: message });
        await sock.sendMessage(msg.key.remoteJid, { text: `Code envoyé à ${target}` }, { quoted: msg });
      } else {
        // pas de target : répondre en privé dans le chat courant
        await sock.sendMessage(msg.key.remoteJid, { text: `Code actuel : ${message}` }, { quoted: msg });
      }
    } catch (err) {
      console.error('parrain error', err);
      await sock.sendMessage(msg.key.remoteJid, { text: 'Erreur lors de l\'envoi du code.' }, { quoted: msg });
    }
  }
};