export type Category = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: number;
  ten: string;
  danhMuc: Category;
  gia: number;
  soLuong: number;
  moTa: string;
}

export type State = {
  products: Product[];
  nextId: number;
};

export type Action =
  | { type: 'ADD'; payload: Omit<Product, 'id'> }
  | { type: 'UPDATE'; payload: Product }
  | { type: 'DELETE'; payload: number }
  | { type: 'SET'; payload: Product[] };
