import { useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GiphyFetch } from '@giphy/js-fetch-api'
import shuffleArray from 'lodash.shuffle'

import AnimalShape from './components/AnimalShape'
import AnimalContour from './components/AnimalContour'
import AnimalGifs from './components/AnimalGifs'

import CatShapeImg from '../shapes/cat_shape.png'
import CatContourImg from '../shapes/cat_contour.png'

import DogShapeImg from '../shapes/dog_shape.png'
import DogContourImg from '../shapes/dog_contour.png'

import ElephantShapeImg from '../shapes/elephant_shape.png'
import ElephantContourImg from '../shapes/elephant_contour.png'

import LionShapeImg from '../shapes/lion_shape.png'
import LionContourImg from '../shapes/lion_contour.png'

import MonkeyShapeImg from '../shapes/monkey_shape.png'
import MonkeyContourImg from '../shapes/monkey_contour.png'

import styles from './styles.module.css'

const gf = new GiphyFetch(import.meta.env.VITE_GHIPY_SDK_API_KEY)

function App() {
  const [gifs, setGifs] = useState([])

  const shapes = [
    {
      type: 'cat',
      contourImage: CatContourImg,
      shapeImage: CatShapeImg,
      onSuccess: () => fetchGifs({ animalType: 'cat' })
    },
  
    {
      type: 'dog',
      contourImage: DogContourImg,
      shapeImage: DogShapeImg,
      onSuccess: () => fetchGifs({ animalType: 'dog' })
    },
    
    {
      type: 'elephant',
      contourImage: ElephantContourImg,
      shapeImage: ElephantShapeImg,
      onSuccess: () => fetchGifs({ animalType: 'elephant' })
    },
  
    {
      type: 'lion',
      contourImage: LionContourImg,
      shapeImage: LionShapeImg,
      onSuccess: () => fetchGifs({ animalType: 'lion' })
    },
  
    {
      type: 'monkey',
      contourImage: MonkeyContourImg,
      shapeImage: MonkeyShapeImg,
      onSuccess: () => fetchGifs({ animalType: 'monkey' })
    }
  ]

  async function fetchGifs({ animalType }) {
    try {
      const { data } = await gf.search(
        animalType,
        {
          offset: Math.floor(Math.random() * 16) + 5, // so to have random gifs
          rating: 'g',
          sort: 'relevant',
          lang: 'en',
          limit: 4,
          type: 'gifs'
        })
      setGifs(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  function renderGifs() {
    if (gifs.length === 0) {
      return (
        <h1 className={styles['no-gifs-text']}>?</h1>
      )
    }

    return <AnimalGifs gifs={gifs} />
  }

  const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

  return (
    <main className={styles['grid-container']}>
      <DndProvider backend={HTML5Backend}>
        <section className={styles['shapes']}>
          {
            shuffleArray(shapes).map(shape => (
              <div key={shape.type} className={styles['animal-shape-wrapper']}>
                <AnimalShape image={shape.shapeImage} type={shape.type} />
              </div>
            ))
          }
        </section>

        <section className={styles['contour']}>
          <div className={styles['animal-shape-wrapper']}>
            <AnimalContour
              image={randomShape.contourImage}
              type={randomShape.type}
              onSuccess={randomShape.onSuccess}
            />
          </div>
        </section>
      </DndProvider>

      <section className={styles['gifs']}>
        {renderGifs()}
      </section>  
    </main>
  )
}

export default App
