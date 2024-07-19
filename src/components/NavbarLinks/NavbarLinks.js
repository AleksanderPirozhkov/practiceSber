import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import LandscapeIcon from '@mui/icons-material/Landscape';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import NavbarLink from './NavbarLinksComponents/NavbarLink';
import '../../css/NavbarLinks/NavbarLinks.css';

export default function NavbarLinks() {
  const navParams = [{
    id: 'preorders',
    link: '/preorders',
    text: 'Потребности',
    svg: <AssignmentIcon />,
  },
  {
    id: 'configurations',
    link: '/configurations',
    text: 'Конфигурации',
    svg: <SettingsIcon />,
  },
  {
    id: 'environments',
    link: '/environments',
    text: 'Среды',
    svg: <LandscapeIcon />,
  },
  {
    id: 'datacenters',
    link: '/datacenters',
    text: 'ЦОДы',
    svg: <DataUsageIcon />,
  }];
  return (
    <div
      className="navbar-links"
    >
      {navParams
        .map(
          (item) => (
            <NavbarLink
              key={item.id}
              link={item.link}
              text={item.text}
              svg={item.svg}
            />
          ),
        )}
    </div>
  );
}
