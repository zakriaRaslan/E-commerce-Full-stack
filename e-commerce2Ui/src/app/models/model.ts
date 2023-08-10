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
  userId:string;
  firstName:string;
  lastName:string;
  userName:string;
  email:string;
  address:string;
  mobile:string;
  password:string;
}

export interface RegisterModel{
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

export interface LoginModel{
  email:string;
  password:string;
}

export interface Review{
  userId:string;
  productId:number;
  reviewValue:string;
}

export interface ShowReview{
  userName:string;
  reviewContent:string;
  createdAt:string;
}

export interface reviewResponse{
  id:number;
  user:User;
  product:Product;
  value:string;
  createdAt:string;
}

export interface Cart{
  id:number;
  User:User;
  IsOrdered:boolean;
  createdDate:Date;
  cartItems:CartItems[];
}

export interface CartItems{
  itemCartId:number;
  product:Product;
}

export interface Payment{
  id:number;
  user:User;
  paymentMethod:PaymentMethod;
  totalAmount:number;
  shippingCharges:number;
  amountReduce:number;
  amountPaid:number;
  createdAt:string;
}

export interface PaymentMethod{
id:number;
type:string;
provider:string;
isAvailable:boolean;
reason:string;
}

