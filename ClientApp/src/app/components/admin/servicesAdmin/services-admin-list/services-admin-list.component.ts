import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from './../../../../models/service.model';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '../../../../../../node_modules/@angular/material';
import { RepositoryService } from '../../../../services/repositry.service';

@Component({
  selector: 'app-services-admin-list',
  templateUrl: './services-admin-list.component.html',
  styleUrls: ['./services-admin-list.component.css']
})
export class ServicesAdminListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['imageURL','serviceCategory','serviceTitle','description', 'price' ,'update','delete'];
  public dataSource = new MatTableDataSource<Service>();
  constructor(private repoService:RepositoryService, public snackBar: MatSnackBar) { }


  ngOnInit() {this.getAllServices();}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getAllServices = () => {
    this.repoService.getData("api/services")
      .subscribe(res => {
        this.dataSource.data = res as Service[];
      })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  delete(service: Service) {
    if (confirm("Are you really want to delete this service?")) {
      this.repoService.delete("api/services/" + service.serviceId).subscribe(m => {
        this.getAllServices();
      }, error => {
        this.snackBar.open("An error occured while deleting", "", { duration: 3000 });
      })
    }
  }

}
