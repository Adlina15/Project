import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {Class} from 'src/models/class.mode';


@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {
class = {} as Class;
myDate = new Date().toISOString();

  constructor(
    private toastCtrl: ToastController,
 private loadingCtrl: LoadingController,
 private navCtrl: NavController,
 private firestore: AngularFirestore
  ) { }

  ngOnInit() {}
  async createClass(post: Class){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    try{
      await this.firestore.collection("class").add(post);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();
 //redirect to home page
 this.navCtrl.navigateRoot("view-class");
 }
 }

 formValidation(){
 if(!this.class.day){
 this.showToast("Choose the day");
 return false;
 }
 if(!this.class.subject){
 this.showToast("Enter the subject");
 return false;
 }
 if(!this.class.starttime){
 this.showToast("Insert the start time");
 return false;
 }
 if(!this.class.endtime){
 this.showToast("Insert the end time");
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
 }}



