import React from "react";
import { useCreateRowMutation } from "@/redux/dataSlice";

const EmptyRow = () => {
  const [formData, setFormData] = React.useState({
    rowName: "",
    salary: 0,
    equipmentCosts: 0,
    estimatedProfit: 0,
    overheads: 0,
  });

  const [addNewRow] = useCreateRowMutation();

  function onDoubleClick() {
    addNewRow({
      equipmentCosts: formData.equipmentCosts,
      estimatedProfit: formData.estimatedProfit,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: formData.overheads,
      parentId: null,
      rowName: formData.rowName,
      salary: formData.salary,
      supportCosts: 0,
    });
  }

  return (
    <div onDoubleClick={onDoubleClick} className="project__row__container">
      <div></div>
      {Object.keys(formData).map((key, index) => {
        return (
          <input
            key={index}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [key]: e.target.value }))
            }
            value={formData[key as keyof typeof formData]}
            placeholder={formData[key as keyof typeof formData].toLocaleString(
              "ru"
            )}
            className="project__row__input"
            type="text"
          />
        );
      })}
    </div>
  );
};

export default EmptyRow;
