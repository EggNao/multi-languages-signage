import { query, collection, getDocs } from 'firebase/firestore'
import { firestore } from '../../plugins/firebase'

export const getTLDNumber = async () => {
  const q = query(collection(firestore, 'tld'))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
}
