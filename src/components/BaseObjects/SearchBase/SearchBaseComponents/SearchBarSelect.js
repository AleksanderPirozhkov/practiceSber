import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import '../../../../css/BaseObjects/SearchBase/SearchBaseComponents/SearchBarSelect.css';
import PropTypes from 'prop-types';

export default function SearchBarSelect({
  label, value, options, onChange, color = 'white',
}) {
  return (
    <div className="search-bar-select">
      <FormControl>
        <InputLabel disableAnimation shrink style={{ backgroundColor: color }} id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          value={value}
          onChange={onChange}
          className="search-bar-select__select"
        >
          <MenuItem value="">нет данных</MenuItem>
          {options}
        </Select>
      </FormControl>
    </div>
  );
}

SearchBarSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};
