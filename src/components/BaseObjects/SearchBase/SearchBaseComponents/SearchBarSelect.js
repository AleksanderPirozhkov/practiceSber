import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import '../../../../css/BaseObjects/SearchBase/SearchBaseComponents/SearchBarSelect.css';
import PropTypes from 'prop-types';

export default function SearchBarSelect({
  label, value = '', options = [], onChange, color = 'white', error = false, isNullVariant = true,
}) {
  return (
    <div className="search-bar-select">
      <FormControl error={error}>
        <InputLabel disableAnimation shrink style={{ backgroundColor: color }} id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          value={value}
          onChange={onChange}
          className="search-bar-select__select"
        >
          {isNullVariant && (<MenuItem value="">нет данных</MenuItem>)}
          {options}
        </Select>
      </FormControl>
    </div>
  );
}

SearchBarSelect.propTypes = {
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  // eslint-disable-next-line react/require-default-props
  options: PropTypes.arrayOf(PropTypes.element),
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  isNullVariant: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};
