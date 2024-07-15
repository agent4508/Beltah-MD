const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtSdTArMnV2bzJsbk94ekFxd3hvMVZva1laM1hUb2dIWFk1cXIxVFNuMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkl1YTMrWlJnSTBmclJJMzFKT2hqZjI2T3BlY2h3djgra3l5Wit4L3VsND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTUtsRktuZnA3UWg2STFndXcrcFFDeWFiK1ZXM0tYVnVtNWJZRUwrRkUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkMjBFSmdPVWRCbHBObkFadS9zNk9Zdks1bGN4WHQrQXhJVWZwMEFPQUNVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLZElPOTJhWW1CWjArbFdkMWlOQVlwWll0YnVncTZBS2NCWVBpQm9pMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik4yNzVNOXRtUWJYd0VrY1dBZ3JDVG5mb0Y2cUxENWhGU2hSUTQ0cjhRVnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicURiQW1RVjZDa1RwT1c4ZnBEYWFjbDJhbTI5NmcvMXdqYW5pUEhZT2Mxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVrVkNualBDY0c1V0ZSZ29CSlhoaVFPZXpkNG55Y0gzaVI2a3IwZE95az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ind1T3RsdlJXaTJkOVd5L3UvK2g5NUdTaldob3NQNkRRbDJrS3lPdEVCKzdxR1l5eTIwZm5iL0tUTlhMWnpaZWhUbnE1ZWFSVE5qNUZKYW9nLzJWREJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjcsImFkdlNlY3JldEtleSI6IlhoMDF2OXNCN2FqNit6dVZTTXZNM2UyVThSUUErd3FkdVdXNE9nMVBTWDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ijl6ZDlacEVSUllHZVk1dXI5VVBZQnciLCJwaG9uZUlkIjoiYjYzYzA0MzAtNjJhNS00YjQ2LTgzMDgtOGU3OTJkOTdmYWY0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilg2Y3NUa2FKTlIvd0tNS0lCNzBaZ3FPY1RhVT0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidHcxbEllaUpGVkVNOWdFdEFUWDRtSjhpZFVvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0hXK1lrRkVObjN6clFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTVRyYnJObk5UMlVGRHlrTGNTbWRaanVLLzN0cWhJNEJ3dGxZQXVtb3ZrOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUFMzWkNWb1NoclVoTmlJRFVBZXp3WGpRZkxNU3QrMTVTR1hqbk5GeUc2Z1d1TVQ3Z0ZZTUloalliWFphcVV3SGxwRnIzUnE0bzZDa1dVYVJVeDRQQWc9PSIsImRldmljZVNpZ25hdHVyZSI6InI2a1NLbjZZL2RzWXlQWDRNYmZiMHFEbHVMV0t1MHdJdlNoaDhuOWV2NTB3ZzF2K1p6T2liZzkxU09lZ3RpeVNiTHZZQ0orTFl6MFoyYnFvdXZBRkRnPT0ifSwibWUiOnsiaWQiOiIyNjM3MTU5MDc0Njg6NDNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTWlsdG9uIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNTkwNzQ2ODo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJURTYyNnpaelU5bEJROHBDM0VwbldZN2l2OTdhb1NPQWNMWldBTHBxTDVQIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwOTU3OTI2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Miton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "MILTON ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
