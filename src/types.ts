interface RowData {
  id?: number;
  child: RowData[];
  salary: number;
  rowName: string;
  parentId?: number | null;
  total?: number;
  mimExploitation?: number;
  machineOperatorSalary?: number;
  materials?: number;
  mainCosts?: number;
  supportCosts?: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
}

export type { RowData };
