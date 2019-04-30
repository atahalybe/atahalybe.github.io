import { Component, OnInit } from '@angular/core';
import { Service } from '../../../../models/service.model';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { RepositoryService } from '../../../../services/repositry.service';
import { ServiceCategory } from './../../../../models/serviceCategory.model';
import { ModalDismissReasons, NgbModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '../../../../../../node_modules/@angular/material';
import { HttpClient } from '../../../../../../node_modules/@angular/common/http';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-services-admin-manage',
  templateUrl: './services-admin-manage.component.html',
  styleUrls: ['./services-admin-manage.component.css']
})
export class ServicesAdminManageComponent implements OnInit {

  serviceId: Number;
  service = new Service();
  serviceCats: ServiceCategory[] = [];

  isHovering: boolean;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private repoService: RepositoryService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar, ) {
    this.serviceId = parseInt(activatedRoute.snapshot.paramMap.get('id'));
    repoService.getData("api/ServiceCategories").subscribe((res: ServiceCategory[]) => {
      this.serviceCats = res;
      if (res[0])
        this.service.serviceCategoryId = res[0].serviceCategoryId;
    })
    if (this.serviceId && this.serviceId != 0) {
      repoService.getData("api/services/" + this.serviceId).subscribe(res => {
        this.service = res as Service;
      })
    }
  }

  ngOnInit() {
  }
  clear() {
    this.service = new Service();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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



  startUpload(event: FileList) {
    // The File object      
    this.modalService.dismissAll();
    this.snackBar.open("Please wait Uploading...");
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      this.snackBar.dismiss();
      this.snackBar.open("Unsupported file type :(", "", { duration: 3000 });
      return;
    }
    const uploadData = new FormData();
    uploadData.append('files', file);
    debugger;
    this.http.post("/image/save", uploadData,{responseType: 'text'})
      .subscribe((m: any) => {
        this.service.imageURL = m;
        this.snackBar.dismiss();
        this.snackBar.open("Image Uploaded", "", { duration: 1000 });
      },
        error => {
          this.snackBar.dismiss();
          this.snackBar.open("An error occured while uploading image", "", { duration: 3000 });
        }
      )

  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  save() {
    if (this.serviceId && this.serviceId != 0) {
      this.repoService.update("api/services/" + this.serviceId, this.service).subscribe(m => {
        this.router.navigateByUrl('/admin/services');

      })
    } else {
      this.repoService.create("api/services/", this.service).subscribe(m => {
        this.router.navigateByUrl('/admin/services');

      })
    }
  }

}
