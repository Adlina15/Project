import { Component, OnInit } from '@angular/core';
import{AngularFirestore} from '@angular/fire/firestore';
import{LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
})
export class ViewAllPage implements OnInit {
  classes : any;
  todolists : any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {}
 
  ionViewWillEnter() {
    this.getTodolists();
    this.getClasses();
    }
    async getTodolists(){
      //show loader
      let loader = await this.loadingCtrl.create({
      message: "Please wait..."
      });
      loader.present();
      try {
      this.firestore
      .collection("todolist")
      .snapshotChanges()
      .subscribe(data => {
      this.todolists = data.map(e => {
      return {
      id: e.payload.doc.id,
      task: e.payload.doc.data()["task"],
      dueDate: e.payload.doc.data()["dueDate"]
      };
      });
      loader.dismiss();
      });
    } catch(e){
      this.showToast(e);
      }
      }
      showToast (message:string){
        this.toastCtrl.create({
        message: message,
        duration: 3000
        }).then(toastData => toastData.present());
        }
        async getClasses(){
          //show loader
          let loader = await this.loadingCtrl.create({
          message: "Please wait..."
          });
          loader.present();
          try {
          this.firestore
          .collection("class")
          .snapshotChanges()
          .subscribe(data => {
          this.classes = data.map(e => {
          return {
          id: e.payload.doc.id,
          day: e.payload.doc.data()["day"],
          subject: e.payload.doc.data()["subject"],
          starttime: e.payload.doc.data()["starttime"],
          endtime: e.payload.doc.data()["endtime"],
          room: e.payload.doc.data()["room"]
          };
          });
          loader.dismiss();
          });
         
          } catch(e){
          this.showToast(e);
          }
          }
     

}
    

  


  