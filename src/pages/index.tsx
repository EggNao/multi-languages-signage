import 'swiper/swiper.min.css'

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { filterCctld } from '@/data/api/firebase'
import { firestore } from '@/plugins/firebase'
import { LanguageType } from '@/types/firestore'
import { client, getMicroCMSContents } from '../plugins/microcms'
import { ContentsType } from '../types/microcms'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const [languageFlag, setLanguageFlag] = useState<LanguageType>('japanese')
  const [englishContents, setEnglishContents] = useState<ContentsType[]>([])
  const [japaneseContents, setJapaneseContents] = useState<ContentsType[]>([])
  const [contents, setContents] = useState<ContentsType[]>([])

  // useEffect(() => {
  //   const f = async() => {
  //     const a = await getMicroCMSContents()
  //     setContents(a)
  //   }
  //   f()
  //   contents?.forEach((content: ContentsType) => {
  //     console.log(content)
  //     if (content.language == ['japanese']) {
  //       const japaneseContents_cp = japaneseContents
  //       japaneseContents_cp.push(content)
  //       setJapaneseContents(japaneseContents_cp)
  //     } else {
  //       const englishContents_cp = englishContents
  //       englishContents_cp.push(content)
  //       setEnglishContents(englishContents_cp)
  //     }
  //   })
  // })

  // firestoreにデータが追加されたらスナップショット
  useEffect(() => {
    const q = query(
      collection(firestore, 'tldNumber', 'signage1', 'count'),
      orderBy('created_at', 'desc'),
      limit(1),
    )
    onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tldCount = doc.data().tld_count
          console.log(tldCount)
          const language = filterCctld(tldCount)
          setLanguageFlag(language)
        })
      },
      (e) => {
        console.log(e)
      },
    )
  }, [])

  //マウント前に表示するデータ取得
  useLayoutEffect(() => {
    const f = async () => {
      const contents_cp = await getMicroCMSContents(languageFlag)
      setContents(contents_cp)
    }
    f()
  })

  // 言語情報の切り替えフラグ
  useEffect(() => {
    const f = async () => {
      const contents_cp = await getMicroCMSContents(languageFlag)
      setContents(contents_cp)
    }
    f()
  }, [languageFlag])

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={'auto'}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {contents.map((doc: ContentsType, index: number) => {
        return (
          <SwiperSlide key={index}>
            <Image
              className={'h-screen w-screen'}
              src={doc.content.url}
              width={720}
              height={405}
              alt={''}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
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
