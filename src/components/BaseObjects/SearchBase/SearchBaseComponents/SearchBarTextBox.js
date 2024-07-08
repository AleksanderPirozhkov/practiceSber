import {
  InputAdornment, TextField,
} from '@mui/material';
import '../../../../css/BaseObjects/SearchBase/SearchBaseComponents/SearchBarTextBox.css';
import PropTypes from 'prop-types';

export default function SearchBarTextBox({
  label, value, onChange, icon, multiline,
}) {
  return (
    <div
      className="search-bar-textbox"
    >
      <TextField
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
  icon: PropTypes.string.isRequired,
  multiline: PropTypes.bool.isRequired,
};
