import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import RickMorty from '../assets/RickMorty.webp'
import Elon from '../assets/Elon.webp'
import Ironman from '../assets/Ironman.jpg'
import styles from './Home.module.css'


const Home = () => {
  return (
    <Carousel showArrows={true} showThumbs={false} showStatus={false}>
      <div className={styles.carouselImage}>
        <img src={RickMorty}/>
        <p className="legend">Patience</p>
      </div>
      <div className={styles.carouselImage}>
        <img src={Elon} />
        <p className="legend">is the key</p>
      </div>
      <div className={styles.carouselImage}>
        <img src={Ironman}/>
        <p className="legend">to life</p>
      </div>
    </Carousel>
  )
}

export default Home
