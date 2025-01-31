import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className={styles.Link}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/restaurantes">Restaurantes</Link>
        </li>
        <li className={styles.admin}>
          <Link to="/restaurantes">Admin</Link>
        </li>
      </ul>
    </nav >)
}

export default NavBar