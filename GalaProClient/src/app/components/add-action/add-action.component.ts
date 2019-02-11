import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Action } from 'src/app/models/Action';
import { DatabaseService } from 'src/app/services/database.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {

  userName = '';
  action: Action;

  constructor(private databaseServer: DatabaseService, public snackBar: MatSnackBar) {
    this.action = new Action();
  }

  ngOnInit() {
  }

  async sendAction() {
    try {
      // Not allowing to send empty message / empty username.
      if (this.userName === '' || this.action.message === '') {
        this.snackBar.open('Please fill all fields');
        return;
      }
      await this.databaseServer.addOrUpdateUser(new User(this.userName, this.action));
      this.snackBar.open('Added action to ' + this.userName);
    } catch {
      this.snackBar.open('An error occured :(');
    }
  }

}
