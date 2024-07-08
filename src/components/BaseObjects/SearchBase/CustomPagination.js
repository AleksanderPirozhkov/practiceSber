import { Pagination } from '@mui/material';
// import '../../../css/BaseObjects/SearchBase/CustomPagination.css';
import PropTypes from 'prop-types';

export default function CustomPagination({ numberOfPages }) {
  return (
    <div>
      <Pagination count={numberOfPages} />
    </div>
  );
}

CustomPagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
};
