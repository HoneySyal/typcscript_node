import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import admin from 'firebase-admin';

export const serviceAccount = require('../key.json');


initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const db = getFirestore();
//  const user = db.collection('user').doc();