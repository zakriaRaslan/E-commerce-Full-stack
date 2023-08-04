export interface Category{
  categoryId:number;
  category:string;
  subcategory:string
}
export interface SuggestedProduct{
bannerImage:string;
category:Category;
}

export interface NavigationItem{
  category:string;
  subCategory:string[];
}

export interface Offer{
  offerId:number;
  title:string;
  discount:number;
}

export interface Product{
  productId:number;
  title:string;
  description:string;
  price:number;
  quantity:number;
  imageName:string;
  offer:Offer;
  category:Category;
}
