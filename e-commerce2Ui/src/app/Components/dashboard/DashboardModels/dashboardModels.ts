export interface AddProductDto{
  productId?:number,
  title:string;
  description:string;
  price:number;
  quantity:number;
  imageName:string;
  categoryId:number;
  offerId?:number;
}

export interface UserInfo{
  userId:string
  firstName:string;
  lastName:string;
  userName:string;
  email:string;
  mobile:string;
  address:string;
  roles:string[];
}

export interface CategoryDto{
  category:string;
  subcategory:string;
}

export interface OfferDto{
  title:string;
  discount:number;
}

