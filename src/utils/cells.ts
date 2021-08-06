import { nanoid } from 'nanoid';
import { CellType } from '../enums/CellType';

export const generateCellType = (): Exclude<CellType, CellType.LifeForm> => {
  return Math.random() < 0.5 ? CellType.Dead : CellType.Living;
}

export const createCell = (type : CellType) => {
  return {
    id: String(nanoid()),
    type,
  };
}
