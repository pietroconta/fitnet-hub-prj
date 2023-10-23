import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { TrainerService } from '../trainer.service';
import { CardData } from '../classes';
import { Router } from '@angular/router';
import { LsManagerService } from '../ls-manager.service';
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
    let subs = this.lsManager.getObj("subscribers");
    console.log("lsResponse", subs);
    if (!subs.data.item) {
      console.log("retrieving data from call api")
      trainerServ.getSubscribers(limit, offset).subscribe(
        {

          //se c'è la cache non fare la richiesta (tempo cacheValido=10 secondi in questo caso)

          next: (response: any) => {
            console.log("response of subscribers", response);

            let subscribers = response.trainer_clients;

            console.log("trainer subscribers lenght", subscribers.length); 

            //mettere che se gà c'è la cache non viene ricreta (TODO)x
            this.lsManager.cacheObj({
              objs: subscribers,
              key: "subscribers",
              time: 20000,
              sign: true
            });
          
            this.pushOnCardDataArray(subscribers);

            //this.updateCardTemplate(cardDataArray);

          },
          error: (error: any) => {
            console.log("error on get subscribers", error);
          }
        }
      );


    }else{
      console.log("retrieving data from ls")
      this.pushOnCardDataArray(subs.data.content);
    }
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
    console.log("click");
    this.router.navigate(["user-trainer-view", id]);
  }
}
