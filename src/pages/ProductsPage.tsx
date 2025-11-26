import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { SearchBar, FilterBar, Pagination, ProductCard } from '../components';

const ProductsPage: React.FC = () => {
  const { state, deleteProduct } = useProducts();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Filtered products
  const filtered = state.products.filter(p => {
    if (q && !p.ten.toLowerCase().includes(q.toLowerCase())) return false;
    if (category && p.danhMuc !== category) return false;
    const min = minPrice ? Number(minPrice) : -Infinity;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    if (p.gia < min || p.gia > max) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Danh sách sản phẩm</h1>
        <a href="/add">Thêm sản phẩm</a>
      </div>

      <div className="filter-section">
        <div>
          <SearchBar value={q} onChange={v => { setQ(v); setPage(1); }} />
        </div>
        <div>
          <FilterBar
            category={category}
            onCategoryChange={c => { setCategory(c); setPage(1); }}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinChange={v => { setMinPrice(v); setPage(1); }}
            onMaxChange={v => { setMaxPrice(v); setPage(1); }}
          />
        </div>
      </div>

      <div className="stats">
        <span>Tổng: {total} sản phẩm</span>
        <span>Trang {page} / {totalPages}</span>
      </div>

      {pageItems.length === 0 ? (
        <div className="empty-state">
          <p>Không có sản phẩm nào</p>
        </div>
      ) : (
        <div className="product-grid">
          {pageItems.map(p => (
            <ProductCard key={p.id} product={p} onDelete={deleteProduct} />
          ))}
        </div>
      )}

      <div className="pagination">
        <Pagination total={total} perPage={perPage} current={page} onPageChange={setPage} />
      </div>
      <div className="stats" style={{ justifyContent: 'flex-end' }}>
        Hiển thị {pageItems.length} trên {total} sản phẩm
      </div>
    </div>
  );
};

export default ProductsPage;
