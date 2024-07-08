import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import '../../css/NavbarHeader/NavbarHeader.css';

export default function NavbarHeader() {
  return (
    <div
      className="navbar-header"
    >
      <Avatar
        sx={{ bgcolor: grey }}
        alt="Remy Sharp"
        src="./images/user.png"
      />
      <div>
        АС Практика
      </div>

    </div>
  );
}
