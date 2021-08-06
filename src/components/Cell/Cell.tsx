import React from 'react';
import classNames from 'classnames';
import { ICell } from '../../types/Cell';
import { CellType } from '../../enums/CellType';
import './Cell.css'

export interface ICellProps {
  item: ICell;
}

export const TITLES = {
  [CellType.Dead]: 'Мёртвая',
  [CellType.Living]: 'Живая',
  [CellType.LifeForm]: 'Жизнь',
}

export const SUBTITLES = {
  [CellType.Dead]: 'или прикидывается',
  [CellType.Living]: 'и шевелится!',
  [CellType.LifeForm]: 'Ку-ку!',
}

export const ICONS = {
  [CellType.Dead]: '💀',
  [CellType.Living]: '💥',
  [CellType.LifeForm]: '🐣',
}

export function Cell({ item }: ICellProps) {
  const { type } = item;
  const iconBackGroundClasses = classNames('iconBackground', type);
  return (
    <div className="cellContainer">
      <div className={iconBackGroundClasses}>
        <p className="icon">{ICONS[type]}</p>
      </div>
      <div className="cellContent">
        <p className="title">{TITLES[type]}</p>
        <p className="subtitle">{SUBTITLES[type]}</p>
      </div>
    </div>
  );
}
