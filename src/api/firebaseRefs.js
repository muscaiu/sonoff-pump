const admin = require('firebase-admin');

const serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });

const statusRef = db.collection('status');
const tempRef = db.collection('temp');
const modeRef = db.collection('mode');

module.exports = {
  statusRef,
  modeRef,
  tempRef,
}