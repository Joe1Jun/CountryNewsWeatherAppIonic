import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [ IonIcon, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class HeaderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
