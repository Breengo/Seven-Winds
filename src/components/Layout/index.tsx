import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import "./styles.scss";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div id="main">
        <SideBar />
        <div id="project">
          <div id="project__tabs">
            <p>Строительно-монтажные работы</p>
          </div>

          <div id="project__content">
            <div id="project__content__header">
              <p>Уровень</p>
              <p>Наименование работ</p>
              <p>Основная з/п</p>
              <p>Оборудование</p>
              <p>Накладные расходы</p>
              <p>Сметная прибыль</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
