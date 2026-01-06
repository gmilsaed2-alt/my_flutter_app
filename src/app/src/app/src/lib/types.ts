export type Size = {
  name: 'صغير' | 'كبير' | 'قارورة';
  price: number;
};

export type Addon = {
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'juices' | 'sandwiches' | 'breakfast' | 'kids' | 'events';
  imageId: string;
  sizes: Size[];
  addons?: Addon[];
  featured?: boolean;
};

export type Category = {
  id: 'juices' | 'sandwiches' | 'breakfast' | 'kids' | 'events';
  name: string;
};

export type CartItem = {
  id: string; // composite id: productId_sizeName
  productId: string;
  productName: string;
  productImageId: string;
  size: Size;
  quantity: number;
  price: number;
};

export type StoreSettings = {
  name: string;
  slogan: string;
  address: string;
  phone1: string;
  phone2: string;
  mapsLink: string;
  workingHours: string;
  deliveryPolicy: string;
  storeStatus: 'open' | 'closed';
};
