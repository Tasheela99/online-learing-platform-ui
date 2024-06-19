import {Component, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {PlaygroundService} from "../../../services/playground.service";
import {HeaderComponent} from "../../../components/header/header.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../../components/footer/footer.component";

export interface Slide {
  id: string;
  src: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardModule,
    HeaderComponent,
    CarouselModule,
    NgForOf,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit{

  courseList:Array<any>=[];

  constructor(private playgroundService:PlaygroundService) {
  }

  ngOnInit() {
    this.loadAllCourses()

    this.slidesStore = [
      { id: '1', src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 1', title: 'Slide 1' },
      { id: '2', src: 'https://images.unsplash.com/photo-1585314294023-215a865ddee1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2', title: 'Slide 2' },
      { id: '3', src: 'https://images.unsplash.com/photo-1585314540237-13cb52fe9998?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3', title: 'Slide 3' },
    ];
  }

  loadAllCourses() {
    this.playgroundService.findAll().subscribe(response => {
      this.courseList = response.data;
    });
  }

  enrollForCourse(_id: any) {

  }

  slidesStore: Slide[] = [];




  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
