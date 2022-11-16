import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { client } from '../plugins/microcms'
import styles from '../styles/Home.module.css'
import { ContentsType } from '../types/microcms'

type HomeProps = {
  data: ContentsType
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  console.log(data[0].content.url)
  const imgSrc = data[0].content.url
  return (
    <div>
        {/* {data.map((doc: ContentsType) => {
          console.log(doc)
          return <Image src={doc.content.url} width={720} height={405} alt={''} />
        })} */}
        <Image src={imgSrc} width={720} height={405} alt={''} />
        <Image src={imgSrc} width={720} height={405} alt={''} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: 'contents' })

  return {
    props: {
      data: data.contents,
    },
  }
}

export default Home
