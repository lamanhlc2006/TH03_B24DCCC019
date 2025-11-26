import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Product, State, Action } from '../types';

const initialProducts: Product[] = [
  { id: 1, ten: 'iPhone 15 Pro', danhMuc: 'Điện tử', gia: 25000000, soLuong: 10, moTa: 'Smartphone cao cấp' },
  { id: 2, ten: 'Áo Thun Nam', danhMuc: 'Quần áo', gia: 150000, soLuong: 50, moTa: 'Áo thun cotton' },
  { id: 3, ten: 'Bánh Mì Kẹp', danhMuc: 'Đồ ăn', gia: 30000, soLuong: 100, moTa: 'Bữa sáng nhanh' },
  { id: 4, ten: 'Sách ReactJS', danhMuc: 'Sách', gia: 200000, soLuong: 20, moTa: 'Học React từ cơ bản đến nâng cao' },
  { id: 5, ten: 'Tai nghe Bluetooth', danhMuc: 'Điện tử', gia: 800000, soLuong: 30, moTa: 'Âm thanh chất lượng' },
  { id: 6, ten: 'Quần Jeans Nữ', danhMuc: 'Quần áo', gia: 450000, soLuong: 25, moTa: 'Form ôm, thoải mái' },
  { id: 7, ten: 'Snack Khoai Tây', danhMuc: 'Đồ ăn', gia: 25000, soLuong: 200, moTa: 'Snack giòn ngon' },
  { id: 8, ten: 'Vở Tập Viết', danhMuc: 'Sách', gia: 12000, soLuong: 300, moTa: 'Vở 200 trang' },
  { id: 9, ten: 'Sạc Nhanh 30W', danhMuc: 'Điện tử', gia: 220000, soLuong: 60, moTa: 'Sạc nhanh cho điện thoại' },
  { id: 10, ten: 'Áo Khoác Gió', danhMuc: 'Quần áo', gia: 600000, soLuong: 15, moTa: 'Chống gió, nhẹ' },
];

const initialState: State = {
  products: initialProducts,
  nextId: initialProducts.length + 1,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const newProduct: Product = { id: state.nextId, ...action.payload };
      return { products: [newProduct, ...state.products], nextId: state.nextId + 1 };
    }
    case 'UPDATE': {
      return { ...state, products: state.products.map(p => (p.id === action.payload.id ? action.payload : p)) };
    }
    case 'DELETE': {
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    }
    case 'SET': {
      return { ...state, products: action.payload, nextId: Math.max(...action.payload.map(p => p.id)) + 1 };
    }
    default:
      return state;
  }
}

interface ProductContextType {
  state: State;
  addProduct: (payload: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init => {
    try {
      const raw = localStorage.getItem('products_v1');
      if (raw) {
        const parsed: Product[] = JSON.parse(raw);
        return { products: parsed, nextId: Math.max(...parsed.map(p => p.id)) + 1 } as State;
      }
    } catch (e) {
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem('products_v1', JSON.stringify(state.products));
  }, [state.products]);

  const addProduct = (payload: Omit<Product, 'id'>) => dispatch({ type: 'ADD', payload });
  const updateProduct = (product: Product) => dispatch({ type: 'UPDATE', payload: product });
  const deleteProduct = (id: number) => dispatch({ type: 'DELETE', payload: id });

  return (
    <ProductContext.Provider value={{ state, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
