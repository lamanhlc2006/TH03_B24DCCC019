import React from 'react';

export const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        placeholder="Tìm kiếm theo tên sản phẩm..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
