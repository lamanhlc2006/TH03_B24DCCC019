import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

export const ProductCard: React.FC<{ product: Product; onDelete: (id: number) => void }> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="product-card">
      <div>
        <h3>{product.ten}</h3>
        <span className="category">{product.danhMuc}</span>
        <p className="price">{product.gia.toLocaleString()} VND</p>
        <p className="quantity">Số lượng: {product.soLuong}</p>
      </div>
      <div className="button-group">
        <button 
          onClick={() => navigate(`/products/${product.id}`)} 
          className="btn-primary"
        >
          Xem
        </button>
        <button 
          onClick={() => navigate(`/edit/${product.id}`)} 
          className="btn-success"
        >
          Sửa
        </button>
        <button
          onClick={() => {
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) onDelete(product.id);
          }}
          className="btn-danger"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};
