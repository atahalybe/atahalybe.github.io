
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { User } from '../../../models/user';
import { UserService } from './../../../services/user.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['displayName', 'email', 'phoneNumber'];
  public dataSource = new MatTableDataSource<User>();
  constructor(private userService:UserService) { }

  ngOnInit() {this.getAllUsers();}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getAllUsers = () => {
    this.userService.getAll()
      .subscribe(res => {
        this.dataSource.data = res as User[];
      })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
