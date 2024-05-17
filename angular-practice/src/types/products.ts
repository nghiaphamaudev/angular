export interface Iproduct {
  _id: string;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export interface ApiResponse {
  status: string;
  products: Iproduct[];
}
