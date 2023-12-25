import rowSVG from "@/assets/row.svg";
import deleteSVG from "@/assets/delete.svg";
import "./styles.scss";
import { useDeleteRowMutation, useCreateRowMutation } from "@/redux/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { showLevel } from "@/redux/UISlice";

interface Props {
  level: number;
  id: number | undefined;
}

const Controller = ({ level, id }: Props) => {
  const dispatch = useAppDispatch();

  const [deleteRow] = useDeleteRowMutation();
  const [addNewRow] = useCreateRowMutation();

  function createRow() {
    addNewRow({
      equipmentCosts: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      parentId: id,
      rowName: "Type name",
      salary: 0,
      supportCosts: 0,
    });
  }

  const showController = useAppSelector((state) => state.UI.showLevel);

  return (
    <div
      onMouseOver={() => dispatch(showLevel(true))}
      onMouseLeave={() => dispatch(showLevel(false))}
      style={{ paddingLeft: `${(level ?? 0) * 15}px` }}
      className="project__row__controller"
    >
      {!showController && <img src={rowSVG} alt="err" />}
      {showController && (
        <div className="project__row__controller__main">
          <img onClick={createRow} src={rowSVG} alt="err" />
          <img onClick={() => deleteRow(id)} src={deleteSVG} alt="err" />
        </div>
      )}
    </div>
  );
};

export default Controller;
