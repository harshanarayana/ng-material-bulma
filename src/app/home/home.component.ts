import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';
import { UserDetails } from '../types/auth.result';
import { ProfileTableMap } from '../types/table.columns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userProfiles: UserDetails[];
  tableHeaders: ProfileTableMap[];

  constructor(public auth: AuthService, private _profile: ProfileService) {}

  ngOnInit() {
    if (!this.userProfiles) {
      this.userProfiles = new Array<UserDetails>();
    }

    this.userProfiles.push(this._profile.getUserProfile());
    this.tableHeaders = [
      {
        field: 'given_name',
        header: 'First Name'
      },
      {
        field: 'family_name',
        header: 'Last Name'
      },
      {
        field: 'nickname',
        header: 'Nickname'
      },
      {
        field: 'name',
        header: 'Full Name'
      },
      {
        field: 'picture',
        header: 'Profile Picture',
        type: 'image'
      }
    ];
    console.log(this.auth.isAuthenticated());
  }

  public checkIfImageColumn(column: ProfileTableMap): boolean {
    return column.type === 'image';
  }
}
