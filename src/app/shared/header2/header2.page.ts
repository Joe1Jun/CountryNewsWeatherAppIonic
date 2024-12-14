import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header2',
  templateUrl: './header2.page.html',
  styleUrls: ['./header2.page.scss'],
  standalone: true,
  imports: [IonIcon, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class Header2Page implements OnInit {

  constructor(private pageLocation : Location) { }

  ngOnInit() {
  }

  goBack() {
    this.pageLocation.back();
  }

}
