import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types'

function AnimalShape({ image, type }) {
  const [{}, drag] = useDrag(() => ({
    type,
  }), [type])

  return (
    <div
      ref={drag}
    >
      <img src={image} width="150" height="150" />
    </div>
  )
}

AnimalShape.propTypes = {
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default AnimalShape
