import React from 'react';
import type { Category } from '../types';

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

export const FilterBar: React.FC<{
  category: string;
  onCategoryChange: (c: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}> = ({ category, onCategoryChange, minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className="filter-bar">
      <select value={category} onChange={e => onCategoryChange(e.target.value)}>
        <option value="">Tất cả danh mục</option>
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Giá min"
        value={minPrice}
        onChange={e => onMinChange(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá max"
        value={maxPrice}
        onChange={e => onMaxChange(e.target.value)}
      />
    </div>
  );
};
