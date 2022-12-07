import 'swiper/swiper.min.css'

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { filterCctld } from '@/data/api/firebase'
import { firestore } from '@/plugins/firebase'
import { LanguageType } from '@/types/firestore'
import wifiImg from 'public/wifi.png'
import { client, getMicroCMSContents } from '../plugins/microcms'

import { ContentsType } from '../types/microcms'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const [languageFlag, setLanguageFlag] = useState<LanguageType>('japanese')
  const [contents, setContents] = useState<ContentsType[]>([])

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
  useEffect(() => {
    const f = async () => {
      const contents_cp = await getMicroCMSContents(languageFlag)
      setContents(contents_cp)
      console.log(contents_cp)
    }
    f()
  }, [])

  // 言語情報の切り替えフラグ
  useEffect(() => {
    const f = async () => {
      const contents_cp = await getMicroCMSContents(languageFlag)
      setContents(contents_cp)
      console.log(contents_cp)
    }
    f()
  }, [languageFlag])

  return (
    <div className={'h-screen w-screen bg-slate-50 pt-8 pl-8'}>
      <div className={'text-4xl'}>
        {languageFlag === 'english' ? 'Event Information' : '学内イベント情報'}
      </div>
      <div className={'pt-6'}>
        <Swiper
          className={'relative'}
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
                  className={'w-10/12'}
                  src={doc.content.url}
                  width={720}
                  height={405}
                  alt={''}
                />
              </SwiperSlide>
            )
          })}
          <div className={'absolute bottom-12 right-6 text-center text-2xl font-medium'}>
            Free Wi-Fi
            <Image src={wifiImg} alt='' height={200} width={200}></Image>
          </div>
        </Swiper>
      </div>
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
