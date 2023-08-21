export interface AddProductDto{
  title:string;
  description:string;
  price:number;
  quantity:number;
  imageName:string;
  categoryId:number;
  offerId?:number;
}

export interface UserInfo{
  firstName:string;
  lastName:string;
  userName:string;
  email:string;
  mobile:string;
  address:string;
}

export interface CategoryDto{
  category:string;
  subcategory:string;
}
