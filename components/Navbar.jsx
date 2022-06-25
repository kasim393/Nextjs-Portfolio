import Link from "next/link";
import style from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <div className={style.navbar}>
      <ul>
        <Link href="/" passHref>
          <li className={router.pathname == "/" ? `${style.active}` : ""}>
            _hello
          </li>
        </Link>
        <Link href="/about" passHref>
          <li className={router.pathname == "/about" ? `${style.active}` : ""}>
            _about me
          </li>
        </Link>
        <Link href="/project" passHref>
          <li
            className={router.pathname == "/project" ? `${style.active}` : ""}
          >
            _projects
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
