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

export interface User{
  firstName:string;
  lastName:string;
  userName:string;
  email:string;
  address:string;
  mobile:string;
  password:string;
}

export interface RegisterResponse{
  FirstName:string;
  LastName:string;
  Email:string;
  Message:string;
  IsAuthenticated:boolean;
  Roles:string[];
}
