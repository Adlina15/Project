import { Component, OnInit } from '@angular/core';
import{AngularFirestore} from '@angular/fire/firestore';
import{LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.page.html',
  styleUrls: ['./view-exam.page.scss'],
})
export class ViewExamPage implements OnInit {
  exams : any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {}
  ionViewWillEnter() {
    this.getExams();
    }
    async getExams(){
    //show loader
    let loader = await this.loadingCtrl.create({
    message: "Please wait..."
    });
    loader.present();
    try {
    this.firestore
    .collection("exam")
    .snapshotChanges()
    .subscribe(data => {
    this.exams = data.map(e => {
    return {
    id: e.payload.doc.id,
    subject: e.payload.doc.data()["subject"],
    mark: e.payload.doc.data()["mark"],
    description: e.payload.doc.data()["description"]
    };
    });
    loader.dismiss();
    });
   
    } catch(e){
    this.showToast(e);
    }
    }
    async deleteExam(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    await this.firestore.doc("exam/" + id).delete();
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
