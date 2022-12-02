import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore, initializeFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET ?? '',
}

const app = initializeApp(firebaseConfig)
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})

export const auth = getAuth()
export const firestore = getFirestore()
