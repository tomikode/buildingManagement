import formStyles from '../styles/Form.module.css'
import Link from 'next/link'
const Nav = () => {
  return (
    <nav className={formStyles.nav}>
      <ul>
        <li>
            <Link href='/damageReport'>Home</Link>
        </li>
        <li>
            <Link href='/damageReport/incident'>Incidents</Link>
        </li>
        <li>
            <Link href='/damageReport/ticket'>Tickets</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;