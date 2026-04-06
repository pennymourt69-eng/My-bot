const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
    });

    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('{"msg":"connected to WA"}');
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

connectToWhatsApp();
