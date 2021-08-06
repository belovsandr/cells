import React from 'react';
import { ICell } from '../../types/Cell';
import { Cell } from '../Cell/Cell';
import './CellList.css'
import { FixedSizeList } from 'react-window';
export interface ICellListProps {
  items: ICell[];
}

interface IRow {
  index: number;
  style: React.CSSProperties;
  data: ICell[];
}

const Row = ({ index, style, data }: IRow) => {
  const item = data[index];
  return (
    <div style={style}>
      <Cell item={item} />
    </div>
  );
};

export const CellList = ({ items }: ICellListProps) => {
  const listRef = React.createRef<FixedSizeList<ICell[]>>();
  React.useEffect(() => {
    if (!listRef.current || !items?.length) {
      return;
    }
    listRef.current.scrollToItem(items.length - 1, "end");
  }, [items.length, listRef]);

  return (
    <div className="cellList">
      {items.length ? (
        <FixedSizeList
          height={548}
          itemCount={items.length}
          itemSize={76}
          width={328}
          itemData={items}
          ref={listRef}
        >
          {Row}
        </FixedSizeList>
      ) : <p className="empty">Нажмите кнопку для сотворения жизни</p>}
    </div>
  );
};
