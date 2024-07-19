import WorkBarPreorders from './BrowsingUsersComponents/WorkBarPreorders';
import UserInfo from './BrowsingUsersComponents/UserInfo';
import '../../css/BrowsingUsers/BrowsingUsers.css';

export default function BrowsingUsers() {
  return (
    <div
      className="browsing-users"
    >
      <div
        className="browsing-users__header"
      >
        <div
          className="browsing-users__header-content"
        >
          <UserInfo name="Jack Russel" />
        </div>
      </div>
      <div
        className="browsing-users__content"
      >
        <WorkBarPreorders />
      </div>

    </div>
  );
}
