import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { TrainerService } from '../trainer.service';
import { CardData } from '../classes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public cardDataArray: CardData[] = [];
  @ViewChild('cards', { read: ElementRef }) cards!: ElementRef;
  constructor(private trainerServ: TrainerService, private renderer: Renderer2, private router:Router) {

    trainerServ.getSubscribers().subscribe(
      {
        next: (response: any) => {
          console.log("response of subscribers", response);

          let subscribers = response.trainer_clients;

          console.log("trainer subscribers lenght", subscribers.length);

          //const cardComponent = this.renderer.createElement('my-card-component');

          // Aggiungi il componente al div
          // this.renderer.appendChild(this.cards.nativeElement, cardComponent);
          

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


  /*
  updateCardTemplate(arr: CardData[]) {
    for (let i = 0; i < arr.length; i++) {
      const cardComponent = this.renderer.createElement("ion-card");
      cardComponent.classList.add("userCard");
  
      cardComponent.innerHTML = `
        <div>
          <img src="${arr[i].imgUri}">
        </div>
        <ion-card-header>
          <ion-card-title>${arr[i].username}</ion-card-title>
        </ion-card-header>
      `;
  
      this.renderer.appendChild(this.cards.nativeElement, cardComponent);
  
      // Aggiungi l'evento di click qui
      this.renderer.listen(cardComponent, 'click', (evt) => {
        console.log("User clicked");
        this.router.navigate(["user-trainer-view"]);
      });
    }

  }*/

  goToUserTrainerView(id : any){
    console.log("click");
    this.router.navigate(["user-trainer-view", id]);
  }
}
