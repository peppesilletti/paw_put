import { Gif } from '@giphy/react-components'
import PropTypes from 'prop-types'

import styles from '../styles.module.css'

function AnimalGifs({ gifs }) {
    return (
        <div className={styles['gifs-grid']}>
            {
                gifs.map((gif) => {
                    return (
                        <div key={gif.id}>
                            <Gif gif={gif} width={200} />
                        </div>
                    )
                })
            }
        </div>
    )
}

AnimalGifs.propTypes = {
    gifs: PropTypes.array
}

export default AnimalGifs