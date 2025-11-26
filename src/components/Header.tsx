import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <header>
    <div className="max-w-6xl">
      <Link to="/" className="text-xl">
        📦 Product Manager
      </Link>
      <nav>
        <Link to="/">Trang chủ</Link>
        <Link to="/add">Thêm</Link>
      </nav>
    </div>
  </header>
);
