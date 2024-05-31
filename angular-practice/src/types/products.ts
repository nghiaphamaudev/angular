export interface Iproduct {
  _id: string;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  liked: boolean;
}

export interface ApiResponse {
  status: string;
  products: Iproduct[];
}
