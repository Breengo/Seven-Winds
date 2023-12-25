import cubeSVG from "@/assets/cube.svg";
import backSVG from "@/assets/back.svg";
import "./styles.scss";

const Navbar = () => {
  return (
    <nav id="navbar">
      <img src={cubeSVG} alt="error" />
      <img src={backSVG} alt="error" />
      <ul>
        <li className="navbar__list__active">Просмотр</li>
        <li>Управление</li>
      </ul>
    </nav>
  );
};

export default Navbar;
