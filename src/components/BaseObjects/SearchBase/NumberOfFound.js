import '../../../css/BaseObjects/SearchBase/NumberOfFound.css';
import PropTypes from 'prop-types';

export default function NumberOfFound({ numberOfFound }) {
  return (
    <div>
      {`Найдено: ${numberOfFound}`}
    </div>
  );
}

NumberOfFound.propTypes = {
  numberOfFound: PropTypes.number.isRequired,
};
