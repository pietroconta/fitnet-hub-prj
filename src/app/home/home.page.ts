import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { TrainerService } from '../trainer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private trainerServ:TrainerService) {

    
  }

}
