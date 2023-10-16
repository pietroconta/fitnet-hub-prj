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
  constructor(private trainerServ: TrainerService, private lsManager:LsManagerService, private renderer: Renderer2, private router:Router) {

    trainerServ.getSubscribers().subscribe(
      {
        next: (response: any) => {
          console.log("response of subscribers", response);

          let subscribers = response.trainer_clients;

          console.log("trainer subscribers lenght", subscribers.length);

          
          this.lsManager.cacheObj(subscribers, "subscribers", 1000);
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

          //this.updateCardTemplate(cardDataArray);

        },
        error: (error: any) => {
          console.log("error on get subscribers", error);
        }
      }
    );
  }

  goToUserTrainerView(id : any){
    console.log("click");
    this.router.navigate(["user-trainer-view", id]);
  }
}
