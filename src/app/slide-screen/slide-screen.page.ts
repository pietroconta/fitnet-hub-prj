import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slide-screen',
  templateUrl: './slide-screen.page.html',
  styleUrls: ['./slide-screen.page.scss'],
})


export class SlideScreenPage implements OnInit {
  public index = 0;

 
  constructor(private router:Router) { }

  ngOnInit() {
  }

  goTo(module:string){
    this.router.navigate([module]);
  }
}
