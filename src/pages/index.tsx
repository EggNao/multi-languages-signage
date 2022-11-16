import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { client } from '../plugins/microcms'
import { ContentsType } from '../types/microcms'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'

type HomeProps = {
  data: ContentsType
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
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
            <img className={'h-screen w-screen'} src={doc.content.url} width={720} height={405} alt={''} />
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
