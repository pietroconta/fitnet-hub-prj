import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { TrainerService } from '../../trainer.service';

import { CardData } from '../../classes';
import { Router } from '@angular/router';
import { LsManagerService } from '../../ls-manager.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public cardDataArray: CardData[] = [];
  
  @ViewChild('cards', { read: ElementRef }) cards!: ElementRef;
  constructor(private trainerServ: TrainerService, private lsManager: LsManagerService, private renderer: Renderer2, private router: Router) {
    var limit:number = 5;
    var offset:number = 0;
    //let subs = this.lsManager.getObj("subscribers");
    //console.log("lsResponse", subs);
    console.log("retrieving data from call api")
    trainerServ.getSubscribers(limit, offset).subscribe(
      {


          next: (response: any) => {
            console.log("response of subscribers", response);

            let subscribers = response.trainer_clients;

            console.log("trainer subscribers lenght", subscribers.length); 
            this.pushOnCardDataArray(subscribers);

            //this.updateCardTemplate(cardDataArray);

          },
          error: (error: any) => {
            console.log("error on get subscribers", error);
          }
        }
      );


    
  }

  pushOnCardDataArray(subscribers:any[]){
    for (let i = 0; i < subscribers.length; i++) {


      let imgUri = "";

      if (subscribers[i].usn_img == "default" || subscribers[i].usn_img == null) {
        imgUri = "../assets/images/slider/person-circle-outline.svg";
      } else {
        imgUri = subscribers[i].usn_img;
      }

      const newCard: CardData = {
        username: subscribers[i].usn_username,
        imgUri: imgUri,
        id: subscribers[i].usn_id
      };
      this.cardDataArray.push(newCard);
    }
  }

  goToUserTrainerView(id: any) {
    this.router.navigate(['t-tabs/tabs/trainer-user-view', id]);
  }
}
