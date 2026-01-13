
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  'Saatlar',
  'Bijuteriya',
  'Posterlər (Fərdi Dizayn)',
  'Qadın Aksesuarları'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Minimalist Qızılı Saat',
    price: 125.00,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
    category: 'Saatlar',
    inStock: true,
    description: 'Zəriflik və dəqiqliyin vəhdəti. Bu saat minimalist dizaynı ilə hər bir geyiminizə xüsusi lüks qatacaq.',
    materials: 'Paslanmaz polad, Qızıl örtük, Safir şüşə',
    additionalImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'Gümüşü Boyunbağı',
    price: 45.50,
    imageUrl: 'https://images.unsplash.com/photo-1535633302704-c02fbc4d2c34?q=80&w=1000&auto=format&fit=crop',
    category: 'Bijuteriya',
    inStock: true,
    description: 'Gündəlik istifadə üçün ideal olan bu zərif boyunbağı 925 əyar gümüşdən hazırlanmışdır.',
    materials: '925 Əyar Gümüş, Rodium örtük',
    additionalImages: []
  },
  {
    id: '3',
    title: 'Fərdi Dizayn Poster',
    price: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    category: 'Posterlər (Fərdi Dizayn)',
    inStock: true,
    description: 'Eviniz və ya ofisiniz üçün tamamilə sizə özəl dizayn edilmiş minimalist posterlər.',
    materials: 'Yüksək keyfiyyətli mat kağız, Ekoloji boyalar',
    additionalImages: []
  },
  {
    id: '4',
    title: 'Dəri Çanta - Qəhvəyi',
    price: 89.00,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    category: 'Qadın Aksesuarları',
    inStock: true,
    description: 'Həm şık, həm də praktik. Bu dəri çanta uzunmüddətli istifadə üçün nəzərdə tutulmuşdur.',
    materials: 'Həqiqi dəri, Pirinc detallar',
    additionalImages: []
  }
];

export const ADMIN_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: 'Soria2026'
};

export const WHATSAPP_LINK = 'https://wa.me/994602377137';
