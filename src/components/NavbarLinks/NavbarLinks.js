import HealthAndSafetySharp from '@mui/icons-material/HealthAndSafetySharp';
import NavbarLink from './NavbarLinksComponents/NavbarLink';
import '../../css/NavbarLinks/NavbarLinks.css';

export default function NavbarLinks() {
  const navParams = [{
    id: 'preorders',
    link: '/preorders',
    text: 'Потребности',
    svg: <HealthAndSafetySharp />,
  },
  {
    id: 'configurations',
    link: '/configurations',
    text: 'Конфигурации',
    svg: <HealthAndSafetySharp />,
  },
  {
    id: 'environments',
    link: '/environments',
    text: 'Среды',
    svg: <HealthAndSafetySharp />,
  },
  {
    id: 'datacenters',
    link: '/datacenters',
    text: 'ЦОДы',
    svg: <HealthAndSafetySharp />,
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
