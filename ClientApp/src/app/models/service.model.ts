import { ServiceCategory } from './serviceCategory.model';
export class Service{
    serviceId:number;
    serviceTitle:string;
    price:number;
    imageURL:string;
    description:string;
    serviceCategoryId:number;
    serviceCategory:ServiceCategory;
}