import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Class } from 'src/models/class.mode';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.page.html',
  styleUrls: ['./edit-class.page.scss'],
})
export class EditClassPage implements OnInit {

  class = {} as Class;
 id: any;

  constructor(
    private actRoute: ActivatedRoute,
 private loadingCtrl: LoadingController,
 private firestore: AngularFirestore,
 private toastCtrl: ToastController,
 private navCtrl: NavController

  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");

   }

  ngOnInit() {
    this.getClassesById(this.id);
  }
  async getClassesById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("class/" + id)
    .valueChanges()
    .subscribe(data => {
    this.class.day = data["day"];
    this.class.subject = data["subject"];
    this.class.starttime = data["starttime"];
    this.class.endtime = data["endtime"];
    this.class.room = data["room"];
 });
 //dismiss loader
 (await loader).dismiss();
 }
 async updateClass(post: Class){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("class/" + this.id).update(post);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();

 //redirect to view post page
 this.navCtrl.navigateRoot("home");
 }
 }
 formValidation(){
 if(!this.class.day){
 this.showToast("Choose the day");
 return false;
 }
 if(!this.class.subject){
 this.showToast("Enter subject");
 return false;
 }
 if(!this.class.starttime){
 this.showToast("Choose the start time");
 return false;
 }
 if(!this.class.endtime){
  this.showToast("Enter the end time");
  return false;
  }
  if(!this.class.room){
    this.showToast("Enter the room");
    return false;
    }
  return true;
  }
  showToast (message:string){
  this.toastCtrl.create({
  message: message,
  duration: 3000
  })
  .then(toastData => toastData.present());
  }
 }
 


