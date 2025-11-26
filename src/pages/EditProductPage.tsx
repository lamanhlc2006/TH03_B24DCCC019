import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductForm } from '../components';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const { state, updateProduct } = useProducts();
  const navigate = useNavigate();
  const pid = Number(id);
  const product = state.products.find(p => p.id === pid);

  if (!product) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>Sản phẩm không tồn tại</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Chỉnh sửa sản phẩm</h1>
      <ProductForm
        initial={product}
        onSubmit={(data) => {
          updateProduct(data as any);
          navigate(`/products/${pid}`);
        }}
      />
    </div>
  );
};

export default EditProductPage;
