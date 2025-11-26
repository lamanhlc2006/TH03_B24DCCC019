import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductForm } from '../components';

const AddProductPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Thêm sản phẩm</h1>
      <ProductForm
        onSubmit={(data) => {
          addProduct(data as any);
          navigate('/');
        }}
      />
    </div>
  );
};

export default AddProductPage;
