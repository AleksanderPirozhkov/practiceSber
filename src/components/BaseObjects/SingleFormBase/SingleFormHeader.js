import PropTypes from 'prop-types';
import SingleFormHeaderStatus from './SingleFormHeaderComponents/SingleFormHeaderStatus';
import '../../../css/BaseObjects/SingleFormBase/SingleFormHeader.css';

export default function SingleFormHeader({
  image,
  itemName = 'Неизвестно',
  itemLabel = 'Неизвестно',
  itemStatus,
}) {
  return (
    <div
      className="single-form-header"
    >
      <div
        className="single-form-header__info"
      >
        <div>
          {image}
        </div>
        <div
          className="single-form-header__details"
        >
          <div>
            {itemName}
          </div>
          <div>
            {itemLabel}
          </div>
        </div>
      </div>

      <div>
        <SingleFormHeaderStatus
          status={itemStatus}
        />
      </div>
    </div>
  );
}

SingleFormHeader.propTypes = {
  image: PropTypes.element.isRequired,
  itemName: PropTypes.string.isRequired,
  itemLabel: PropTypes.string.isRequired,
  itemStatus: PropTypes.string.isRequired,
};
