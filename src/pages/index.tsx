import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { client } from '../plugins/microcms'
import styles from '../styles/Home.module.css'

const Home: NextPage = ( data ) => {
  console.log(data)
  return <div>sample</div>
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'contents' })
  console.log(data)

  return {
    props: {
      data: data.contents,
    },
  }
}

export default Home
