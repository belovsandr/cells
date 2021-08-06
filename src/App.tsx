import React from 'react';
import './App.css';
import { CellType } from './enums/CellType';
import { ICell } from './types/Cell';
import { CellList } from './components/CellList/CellList';
import { createCell, generateCellType } from './utils/cells';
import { findLastIndex } from './utils/common';

export const CELL_SEQUENCE_THRESHOLDS = {
  [CellType.Dead]: 3,
  [CellType.Living]: 2,
}

function App() {
  const [cellList, setCellList] = React.useState<ICell[]>([]);
  const [cellSequenceCount, setCellSequenceCount] = React.useState(0);
  const [currentCellSequenceType, setCurrentCellSequenceType] = React.useState<CellType | null>(null);

  const onClick = () => {
  // const onClick = (newCellType: Exclude<CellType, CellType.LifeForm>) => {
    const newCellType = generateCellType();
    const isSameCellSequence = newCellType === currentCellSequenceType;

    if (!isSameCellSequence || !currentCellSequenceType) {
      setCurrentCellSequenceType(newCellType);
    }

    const cellSequenceEnd = isSameCellSequence && (cellSequenceCount + 1 === CELL_SEQUENCE_THRESHOLDS[newCellType]);

    setCellList(prevState => {
      let newCellList = [...prevState];

      const shouldCheckRecentLifeForm = cellSequenceEnd && newCellType === CellType.Dead;
      if (shouldCheckRecentLifeForm) {
        const recentLifeFormIndex = findLastIndex(prevState, item => item.type === CellType.LifeForm);
        const shouldDeleteRecentLifeForm = (
          (recentLifeFormIndex !== -1)
          && (recentLifeFormIndex + CELL_SEQUENCE_THRESHOLDS[CellType.Dead] === prevState.length) // удаляем жизнь рядом
        );
        if (shouldDeleteRecentLifeForm) {
          newCellList = [
            ...(prevState.slice(0, recentLifeFormIndex)),
            ...(prevState.slice(recentLifeFormIndex + 1, prevState.length))
          ];
        }
      }

      const newCell = createCell(newCellType);
      newCellList.push(newCell);

      const shouldCreateNewLifeForm = cellSequenceEnd && newCellType === CellType.Living;
      if (shouldCreateNewLifeForm) {
        const newLifeForm = createCell(CellType.LifeForm);
        newCellList.push(newLifeForm);
      }

      return newCellList;
    });

    const shouldResetCounter = cellSequenceCount === CELL_SEQUENCE_THRESHOLDS[newCellType] || !isSameCellSequence;
    setCellSequenceCount(prevState => {
      return shouldResetCounter ? 1 : prevState + 1;
    });
  }

  return (
    <div className="App">
      <h1 className="header">Клеточное наполнение</h1>
      <CellList items={cellList} />
      {/*<button type="button" className="button" onClick={() => onClick(CellType.Living)}>Жив</button>*/}
      {/*<button type="button" className="button" onClick={() => onClick(CellType.Dead)}>Мертв</button>*/}
      <button type="button" className="button" onClick={onClick}>Сотворить</button>
    </div>
  );
}

export default App;
