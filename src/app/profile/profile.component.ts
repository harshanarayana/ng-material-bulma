import { Profile } from './../types/profile/profile.details';
import { ProfileService } from './../services/profile/profile.service';
import { AuthService } from './../services/auth/auth.service';
import { UserDetails } from './../types/auth.result';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import CreateUserRequest from '../types/profile/create.profile';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProfileComponent implements OnInit {
  user: UserDetails;
  designations = [
    { value: 'Software Engineer', viewValue: 'Software Engineer' },
    {
      value: 'Senior Software Engineer',
      viewValue: 'Senior Software Engineer'
    },
    { value: 'Architect', viewValue: 'Architect' },
    { value: 'Other', viewValue: 'Other' }
  ];

  reactScore = 0;
  angularScore = 0;
  nodeJSScore = 0;
  javaScore = 0;

  teamName = '';
  orgName = '';
  userDesignation = '';

  profileExists = false;

  profileForm: FormGroup;

  createUserRequest: CreateUserRequest = {
    name: '',
    designation: '',
    email: '',
    orgName: '',
    skills: [],
    teamName: ''
  };

  constructor(
    private _auth: AuthService,
    private _profile: ProfileService,
    private _formBuilder: FormBuilder,
    private _ngbRating: NgbRatingConfig
  ) {
    this.profileForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      teamName: [null, [Validators.required]],
      organization: [null, [Validators.required]],
      designation: [null, [Validators.required]]
    });
    this._ngbRating.readonly = false;
  }

  ngOnInit() {
    this.user = this.getProfile();
    if (this.user.nickname) {
      this.profileForm.controls['name'].setValue(this.user.name, {
        onlySelf: true
      });
      this.profileForm.controls['email'].setValue(
        this.user.nickname + '@gmail.com',
        {
          onlySelf: true
        }
      );
    }

    if (this._auth.isAuthenticated()) {
      this._profile.checkIfUserExists().subscribe(profiles => {
        let profile: Profile;
        console.log(profiles);

        if (profiles.length > 0) {
          profile = profiles[profiles.length - 1];
        }

        if (profile.name && profile.email.indexOf(this.user.nickname) > -1) {
          this.profileExists = true;
          this._ngbRating.readonly = true;
          profile.skills.map(skill => {
            if (skill.skill === 'nodejs') {
              this.nodeJSScore = skill.rating;
            } else if (skill.skill === 'react') {
              this.reactScore = skill.rating;
            } else if (skill.skill === 'angular') {
              this.angularScore = skill.rating;
            } else if (skill.skill === 'java') {
              this.javaScore = skill.rating;
            }
          });
          this.user.name = profile.name;
          this.user.nickname = profile.email.split('@')[0];
          this.userDesignation = profile.designation;
          this.orgName = profile.organization_name;
          this.teamName = profile.team_name;
        }
      });
    }
  }

  private getProfile(): UserDetails {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public isAuthenticated(): boolean {
    return this._auth.isAuthenticated();
  }

  public getFormData(): string {
    return JSON.stringify(Object.keys(this.profileForm.controls));
  }

  public markAsVisited(): void {
    Object.keys(this.profileForm.controls).map(field => {
      const control = this.profileForm.get(field);
      control.markAsTouched({
        onlySelf: true
      });
    });

    Object.keys(this.profileForm.value).map(field => {
      if (field === 'name') {
        this.createUserRequest.name = this.profileForm.value[field];
      } else if (field === 'email') {
        this.createUserRequest.email = this.profileForm.value[field];
      } else if (field === 'teamName') {
        this.createUserRequest.teamName = this.profileForm.value[field];
      } else if (field === 'organization') {
        this.createUserRequest.orgName = this.profileForm.value[field];
      } else if (field === 'designation') {
        this.createUserRequest.designation = this.profileForm.value[field];
      }
    });

    this.createUserRequest.skills = [
      {
        skill: 'angular',
        rating: this.angularScore
      },
      {
        skill: 'react',
        rating: this.reactScore
      },
      {
        skill: 'nodejs',
        rating: this.nodeJSScore
      },
      {
        skill: 'java',
        rating: this.javaScore
      }
    ];
  }

  public saveProfile() {
    this._profile.createProfile(this.createUserRequest).subscribe(data => {
      if (data && data.id) {
        this.profileExists = true;
      }
    });
  }

  public checkIfDesignationMatches(des: string): boolean {
    return this.userDesignation === des;
  }
}
