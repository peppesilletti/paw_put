import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types'

function AnimalContour({ image, onSuccess, type }) {
    const [{}, drop] = useDrop(() => ({
        accept: type,
        drop: onSuccess,
      }), [type, onSuccess])

    return (
        <div
            ref={drop}
        >
            <img src={image} width="150" height="150" />
        </div>
    )
}

AnimalContour.propTypes = {
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
}

export default AnimalContour