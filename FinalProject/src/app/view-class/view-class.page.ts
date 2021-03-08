import { Component, OnInit} from '@angular/core';
import{AngularFirestore} from '@angular/fire/firestore';
import{LoadingController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.page.html',
  styleUrls: ['./view-class.page.scss'],
})
export class ViewClassPage implements OnInit {
  classes : any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  
  
  ngOnInit() {}
  ionViewWillEnter() {
    this.getClasses();
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
    async deleteClass(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    await this.firestore.doc("class/" + id).delete();
    //dismiss loader

    (await loader).dismiss();
 }
 showToast (message:string){
 this.toastCtrl.create({
 message: message,
 duration: 3000
 }).then(toastData => toastData.present());
 }


}
