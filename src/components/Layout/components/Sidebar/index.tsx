import bottomArrowSVG from "@/assets/bottomArrow.svg";
import projSVG from "@/assets/project.svg";
import "./styles.scss";

const PROJECTS = [
  "По проекту",
  "Объекты",
  "РД",
  "МТО",
  "СМР",
  "График",
  "МиМ",
  "Рабочие",
  "Капвложения",
  "Бюджет",
  "Финансирование",
  "Панорамы",
  "Камеры",
  "Поручения",
  "Контрагенты",
];

const SideBar = () => {
  return (
    <aside id="sidebar">
      <h3>
        Название проекта <span>Аббревиатура</span>
        <img src={bottomArrowSVG} alt="error" />
      </h3>
      <ul>
        {PROJECTS.map((proj, index) => (
          <li
            className={index === 5 ? "side__project__active" : ""}
            key={index}
          >
            <img src={projSVG} alt="error" />
            {proj}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
