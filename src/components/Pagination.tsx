import React from 'react';

export const Pagination: React.FC<{
  total: number;
  perPage: number;
  current: number;
  onPageChange: (p: number) => void;
}> = ({ total, perPage, current, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(Math.max(1, current - 1))}
      >
        ← Previous
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === current ? 'active' : ''}
        >
          {p}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(Math.min(totalPages, current + 1))}
      >
        Next →
      </button>
    </div>
  );
};
