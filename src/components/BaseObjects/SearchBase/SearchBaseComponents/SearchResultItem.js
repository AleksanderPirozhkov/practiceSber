import '../../../../css/BaseObjects/SearchBase/SearchBaseComponents/SearchResultItem.css';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function SearchResultItem({ id, name, event }) {
  const onClickEvent = (e) => {
    e.preventDefault();
    event(id);
  };

  return (
    <div>
      <Button
        style={{ minWidth: '5px', padding: '0px' }}
        onClick={onClickEvent}
      >
        {name}
      </Button>
    </div>
  );
}

SearchResultItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};
