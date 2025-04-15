import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAe3UoeEZmy5xocSCnLwJC9mhV41jwvX1A",
  authDomain: "skybyme-photo-shop.firebaseapp.com",
  projectId: "skybyme-photo-shop",
  storageBucket: "skybyme-photo-shop.firebasestorage.app",
  messagingSenderId: "360596450309",
  appId: "1:360596450309:web:cc2afe98f031d2c32e406c",
  measurementId: "G-37MLGH255B"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
export { auth }