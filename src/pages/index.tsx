import 'swiper/swiper.min.css'

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { client } from '../plugins/microcms'
import { ContentsType } from '../types/microcms'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  console.log(data)
  console.log(data[0].content.url)
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
      {data.map((doc: ContentsType, index: number) => {
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
