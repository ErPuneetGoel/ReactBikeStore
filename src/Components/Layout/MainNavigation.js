import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css'
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to="/">{process.env.REACT_APP_APPNAME}</Link></div>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="NewMeetUp"> New MeetUp</Link>
          </li>
          <li>
            <Link to="Favorites"> Favorites</Link>
          </li>
          <li>
            <Link to="ReduxDemo"> Redux Demo</Link>
          </li> */}
          <li>
            <Link to="/"> Bike Brands</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
