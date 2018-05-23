import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import {GlobalService} from "./global.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Ion slide instance
  @ViewChild(Slides) slides: Slides;

  //current index of slide
  public currentIndex: number = 0;
  public deviceType: String = '';
  //ion slide sample data
  public allSlides: Array<Object> = [
    {
      title: 'First attorney',
      imageUrl: 'assets/imgs/attorney1.jpeg'
    },
    {
      title: 'Dream\'s Adventure',
      imageUrl: 'assets/imgs/01.jpg'
    },
    {
      title: 'For the Weekend',
      imageUrl: 'assets/imgs/02.jpg'
    },
    {
      title: 'Family Time',
      imageUrl: 'assets/imgs/03.jpg'
    }
  ];

  constructor(public navCtrl: NavController, public globalService: GlobalService) {
    this.deviceType = globalService.getDeviceType();

  }

  nextSlide() {
    this.slides.slideNext();
  }

  previousSlide() {
    this.slides.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slides.realIndex;
  }

  slideChanged() {
    this.currentIndex = this.slides.realIndex;
  }

  goHome($event) {
    console.log("home page loading");
  }
}
