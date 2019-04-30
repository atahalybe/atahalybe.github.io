import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../../services/repositry.service';
import { ServiceCategory } from './../../../models/serviceCategory.model';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { Service } from '../../../models/service.model';
import { element } from 'protractor';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  categories:ServiceCategory[]=[];
  cat:string=null;
  services:Service[]=[];

  cart;
  subscription:Subscription;
  constructor(private repoService:RepositoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartservice:ShoppingCartService) {
      activatedRoute.queryParams.subscribe(q => {
        this.cat =(q.category&&q.category!="")?q.category:null;
        this.getAllCategories();
        this.getAllServices();
      });
      
   
  }
  
  async ngOnInit() {
    this.subscription= (await this.cartservice.getCart()).subscribe(cart=>this.cart=cart);
    // this.cartservice.getCart();
  }
  getAllCategories(){
    this.repoService.getData("api/servicecategories").subscribe((m:ServiceCategory[])=>{
      this.categories=m;
      this.categories.forEach(item=>{
        item["isCheck"]=false;
        if(item.serviceCategoryTitle==this.cat){
          item["isCheck"]=true;
        }
      })
    })
  }
  getAllServices(){
    this.repoService.getData("api/services").subscribe((m:Service[])=>{
      this.services=[];
      m.forEach(element => {
        if((this.cat&& element.serviceCategory.serviceCategoryTitle==this.cat)||!this.cat){
          this.services.push(element);
        }
      });
    })
  }
  naviateToCat(cat){
    this.router.navigateByUrl("/services?category="+cat);
  }
  getQty(service:Service){
    if(!this.cart){ return 0};
    try{
      return this.cart.items[service.serviceId].quantity;
    }catch(err){
      return 0;
    }
    
  }
  addtoCart(service:Service){
   this.cartservice.AddtoCart(service);
  }
  removefromCart(service:Service){
    this.cartservice.removeFromCart(service);
  }
}
