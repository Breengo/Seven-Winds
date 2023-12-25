import "./styles.scss";

import { RowData } from "@/types";
import React from "react";
import Controller from "./components/Controller";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUpdatingRow } from "@/redux/UISlice";
import { useUpdateRowMutation } from "@/redux/dataSlice";

interface Props {
  isChild?: true;
  level: number;
  data: RowData;
}

const RowContainer = ({ isChild, level, data }: Props) => {
  const [formData, setFormData] = React.useState({
    rowName: "",
    salary: 0,
    equipmentCosts: 0,
    estimatedProfit: 0,
    overheads: 0,
  });

  const updateFlag = React.useRef(false);
  const dispatch = useAppDispatch();
  const [updateRow] = useUpdateRowMutation();

  const upadtingRow = useAppSelector((state) => state.UI.updatingRow);

  React.useEffect(() => {
    setFormData({
      rowName: data.rowName,
      salary: data.salary,
      equipmentCosts: data.equipmentCosts,
      estimatedProfit: data.estimatedProfit,
      overheads: data.overheads,
    });
  }, []);

  React.useEffect(() => {
    if (upadtingRow === data.id) updateFlag.current = true;
    if (updateFlag.current && upadtingRow !== data.id) {
      updateRow({ ...data, ...formData });
      updateFlag.current = false;
    }
  }, [upadtingRow]);

  function renderChildren() {
    return data.child.map((child) => {
      return (
        <RowContainer
          data={child}
          key={child.id}
          level={(level ?? 0) + 1}
          isChild={true}
        />
      );
    });
  }

  const RENDRED_DATA = [
    data.rowName,
    data.salary.toLocaleString("ru"),
    data.equipmentCosts.toLocaleString("ru"),
    data.estimatedProfit.toLocaleString("ru"),
    data.overheads.toLocaleString("ru"),
  ];

  return (
    <>
      <div
        onDoubleClick={() => dispatch(setUpdatingRow(data.id))}
        className="project__row__container"
      >
        <Controller level={level} id={data.id} />
        {isChild && (
          <div
            style={{ marginLeft: `${(level + 1) * 15}px` }}
            className="project__row__child_line"
          ></div>
        )}

        {upadtingRow !== data.id && (
          <>
            {RENDRED_DATA.map((str, index) => (
              <p key={index}>{str}</p>
            ))}
          </>
        )}

        {upadtingRow === data.id && (
          <>
            {Object.keys(formData).map((key, index) => {
              return (
                <input
                  key={index}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  value={formData[key as keyof typeof formData]}
                  placeholder={formData[
                    key as keyof typeof formData
                  ].toLocaleString("ru")}
                  className="project__row__input"
                  type="text"
                />
              );
            })}
          </>
        )}
      </div>
      <div className="project__row__children">
        <div
          style={{ marginLeft: `${(level + 1) * 15}px` }}
          className="project__row__line"
        ></div>

        {renderChildren()}
      </div>
    </>
  );
};

export default RowContainer;
