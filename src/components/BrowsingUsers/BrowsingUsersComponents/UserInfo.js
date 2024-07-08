import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import '../../../css/BrowsingUsers/BrowsingUsersComponents/UserInfo.css';

export default function UserInfo({ name }) {
  return (
    <div
      className="user-info"
    >
      <Avatar
        style={
          {
            backgroundColor: 'blue',
          }
        }
      >
        {name[0]}
      </Avatar>
      <div
        className="user-info__name"
      >
        {name}
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
};
