import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import '../../../css/BaseObjects/SingleFormBase/SingleFormButtons.css';

export default function SingleFormButtons({
  isExistDelete,
  onDeleteClicked,
  onCloseClicked,
  onSaveClicked,
}) {
  return (
    <div
      className="single-form-buttons"
    >
      <div>
        {isExistDelete && (
          <Button
            variant="contained"
            color="error"
            onClick={onDeleteClicked}
          >
            Удалить
          </Button>
        )}
      </div>
      <div
        className="single-form-buttons__group"
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={onCloseClicked}
        >
          Закрыть
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onSaveClicked}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

SingleFormButtons.propTypes = {
  isExistDelete: PropTypes.bool.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  onCloseClicked: PropTypes.func.isRequired,
  onSaveClicked: PropTypes.func.isRequired,
};
