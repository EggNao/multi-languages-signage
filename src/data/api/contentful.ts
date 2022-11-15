import client from '../../plugins/contentful'

const getEnglishContents = async () => {
  await client
    .getEntries({
      content_type: 'english',
    })
    .then((entries) => {
      console.log(entries.items) // blogPostのエントリー配列
    })
}

const getJapaneseContents = async () => {
  await client
    .getEntries({
      content_type: 'japanese',
    })
    .then((entries) => {
      console.log(entries.items) // blogPostのエントリー配列
    })
}
