import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { state, deleteProduct } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const pid = Number(id);
  const product = state.products.find(p => p.id === pid);

  if (!product) {
    return (
      <div className="page-container">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Quay lại
        </button>
        <div className="empty-state">
          <p>Sản phẩm không tìm thấy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Quay lại
      </button>
      
      <div className="product-detail">
        <h1>{product.ten}</h1>
        <span className="category-badge">{product.danhMuc}</span>
        
        <div className="detail-row">
          <span className="detail-label">Giá:</span>
          <span className="detail-value">{product.gia.toLocaleString()} VND</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Số lượng:</span>
          <span className="detail-value">{product.soLuong}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Mô tả:</span>
          <span className="detail-value">{product.moTa}</span>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => navigate(`/edit/${product.id}`)} 
            className="btn-success"
          >
            Sửa
          </button>
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                deleteProduct(product.id);
                navigate('/');
              }
            }}
            className="btn-danger"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
