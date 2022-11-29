import { GetTLDType } from '@/types/firestore'
import { query, collection, getDocs } from 'firebase/firestore'
import { firestore } from '../../plugins/firebase'

export const getTLDNumber = async () => {
  const q = query(collection(firestore, 'tld'))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
}

export const filterCctld = (tldData: GetTLDType) => {
  let japaneseTld = 0
  let englishTld = 0
  Object.keys(tldData).forEach((tld) => {
    if (tld == 'jp') {
      japaneseTld = tldData[tld]
    } else if (
      tld == 'kr' ||
      tld == 'au' ||
      tld == 'cn' ||
      tld == 'id' ||
      tld == 'in' ||
      tld == 'th' ||
      tld == 'tw' ||
      tld == 'uk'
    )
      englishTld += tldData[tld]
  })
  console.log('englishTld', englishTld)
  console.log('japaneseTld', japaneseTld)
  if (8 * englishTld <= japaneseTld){
    return 'japanese'
  }
  else{
    return 'english'
  }

}
