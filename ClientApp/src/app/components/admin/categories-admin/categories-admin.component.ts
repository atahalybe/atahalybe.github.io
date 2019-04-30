import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../services/repositry.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import { ServiceCategory } from '../../../models/serviceCategory.model';
@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {
  categories: ServiceCategory[];
  filteredCategories: ServiceCategory[];
  searchTxt = "";
  closeResult = "";
  category = new ServiceCategory();
  state = {
    isTitleExist: false,
    pleaseWait: false
  }

  constructor(private service: RepositoryService, private modalService: NgbModal, public snackBar: MatSnackBar) {
    this.getCategories();


  }

  ngOnInit() {
  }
  getCategories() {
    this.service.getData("api/ServiceCategories").subscribe((m: ServiceCategory[]) => {
      this.categories = m;
      this.search();
    })
  }
  search() {
    if (this.searchTxt != "") {
      this.filteredCategories = [];
      let s = this.searchTxt.toLowerCase();
      this.categories.forEach(m => {
        if (m.serviceCategoryTitle.toLowerCase().includes(s)) {
          this.filteredCategories.push(m);
        }
      })
    } else {
      this.filteredCategories = this.categories;
    }
  }
  checkTitleExistence() {
    this.state.isTitleExist = false;
    this.categories.forEach(element => {
      if (this.category.serviceCategoryId && this.category.serviceCategoryId == 0) {
        if (element.serviceCategoryTitle.toLowerCase() == this.category.serviceCategoryTitle.toLowerCase()) {
          this.state.isTitleExist = true;
          return;
        }
      } else {
        if (element.serviceCategoryTitle.toLowerCase() == this.category.serviceCategoryTitle.toLowerCase() && element.serviceCategoryId != this.category.serviceCategoryId) {
          this.state.isTitleExist = true;
          return;
        }
      }
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.category = new ServiceCategory();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  Load(obj: ServiceCategory) {
    this.category = JSON.parse(JSON.stringify(obj));
  }

  save() {
    if (!this.category.serviceCategoryId || this.category.serviceCategoryId == 0) {
      this.service.create("api/ServiceCategories", this.category).subscribe(m => {
        this.category = new ServiceCategory();
        this.getCategories();
        this.snackBar.open("Added", "", { duration: 1000 });
      })
    } else {
      this.service.update("api/ServiceCategories/" + this.category.serviceCategoryId, this.category).subscribe(m => {
        this.category = new ServiceCategory();
        this.getCategories();
        this.snackBar.open("Updated", "", { duration: 1000 });
      })
    }
  }
  delete(category: ServiceCategory) {
    if (confirm("Are you really want to delete this category?")) {
      this.service.delete("api/ServiceCategories/" + category.serviceCategoryId).subscribe(m => {
        this.getCategories();
      }, error => {
        this.snackBar.open("An error occured while deleting", "", { duration: 3000 });
      })
    }
  }

}
