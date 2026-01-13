
export type Category = 'Saatlar' | 'Bijuteriya' | 'Posterlər (Fərdi Dizayn)' | 'Qadın Aksesuarları';

export type StockFilter = 'Hamısı' | 'Satışda' | 'Tükənib';

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: Category;
  inStock: boolean;
  description?: string;
  materials?: string;
  additionalImages?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AdminCredentials {
  email: string;
  pass: string;
}
