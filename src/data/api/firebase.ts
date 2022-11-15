import { query, collection, getDocs } from 'firebase/firestore'
import { firestore } from '../../plugins/firebase'

const getTLDNumber = async () => {
  const q = query(collection(firestore, 'tld'))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
}
