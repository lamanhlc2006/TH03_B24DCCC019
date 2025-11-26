import React, { useState } from 'react';
import type { Product, Category } from '../types';

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

export const ProductForm: React.FC<{
  initial?: Partial<Product>;
  onSubmit: (data: Omit<Product, 'id'> | Product) => void;
}> = ({ initial = {}, onSubmit }) => {
  const [ten, setTen] = useState(initial.ten ?? '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>((initial.danhMuc as Category) ?? '');
  const [gia, setGia] = useState(initial.gia != null ? String(initial.gia) : '');
  const [soLuong, setSoLuong] = useState(initial.soLuong != null ? String(initial.soLuong) : '');
  const [moTa, setMoTa] = useState(initial.moTa ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!ten || ten.trim().length < 3) e.ten = 'Tên sản phẩm bắt buộc, tối thiểu 3 ký tự.';
    const g = Number(gia);
    if (!gia || isNaN(g) || g <= 0) e.gia = 'Giá phải là số dương.';
    const s = Number(soLuong);
    if (!soLuong || !Number.isInteger(s) || s < 0) e.soLuong = 'Số lượng phải là số nguyên không âm.';
    if (!danhMuc) e.danhMuc = 'Vui lòng chọn danh mục.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      ten: ten.trim(),
      danhMuc: danhMuc as Category,
      gia: Number(gia),
      soLuong: Number(soLuong),
      moTa: moTa.trim(),
    } as Omit<Product, 'id'>;
    onSubmit(initial.id ? ({ id: initial.id, ...data } as Product) : data);
  };

  const handleReset = () => {
    setTen('');
    setDanhMuc('');
    setGia('');
    setSoLuong('');
    setMoTa('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 border rounded shadow">
      <div className="mb-3">
        <label className="block font-medium">Tên sản phẩm</label>
        <input 
          className="border p-2 w-full rounded" 
          value={ten} 
          onChange={e => setTen(e.target.value)} 
        />
        {errors.ten && <div className="text-red-600 text-sm mt-1">{errors.ten}</div>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Danh mục</label>
        <select 
          className="border p-2 w-full rounded" 
          value={danhMuc} 
          onChange={e => setDanhMuc(e.target.value as Category)}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.danhMuc && <div className="text-red-600 text-sm mt-1">{errors.danhMuc}</div>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Giá</label>
        <input 
          className="border p-2 w-full rounded" 
          value={gia} 
          onChange={e => setGia(e.target.value)} 
          type="number" 
        />
        {errors.gia && <div className="text-red-600 text-sm mt-1">{errors.gia}</div>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Số lượng</label>
        <input 
          className="border p-2 w-full rounded" 
          value={soLuong} 
          onChange={e => setSoLuong(e.target.value)} 
          type="number" 
        />
        {errors.soLuong && <div className="text-red-600 text-sm mt-1">{errors.soLuong}</div>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Mô tả</label>
        <textarea 
          className="border p-2 w-full rounded" 
          value={moTa} 
          onChange={e => setMoTa(e.target.value)} 
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <button 
          type="submit" 
          className="btn-primary"
        >
          Lưu
        </button>
        <button 
          type="button"
          className="btn-secondary" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
