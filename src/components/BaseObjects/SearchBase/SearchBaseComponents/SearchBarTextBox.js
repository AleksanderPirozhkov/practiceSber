import {
  InputAdornment, TextField,
} from '@mui/material';
import '../../../../css/BaseObjects/SearchBase/SearchBaseComponents/SearchBarTextBox.css';
import PropTypes from 'prop-types';

export default function SearchBarTextBox({
  label, value = '', onChange, icon, multiline = false, error = false,
}) {
  return (
    <div
      className="search-bar-textbox"
    >
      <TextField
        error={error}
        multiline={multiline}
        label={label}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

SearchBarTextBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  icon: PropTypes.element,
  // eslint-disable-next-line react/require-default-props
  multiline: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.bool,
};
