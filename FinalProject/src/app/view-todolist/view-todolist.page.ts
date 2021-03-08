import { Component, OnInit } from '@angular/core';
import{AngularFirestore} from '@angular/fire/firestore';
import{LoadingController, ToastController} from '@ionic/angular';
import { Todolist } from 'src/models/todolist.mode';

@Component({
  selector: 'app-view-todolist',
  templateUrl: './view-todolist.page.html',
  styleUrls: ['./view-todolist.page.scss'],
})
export class ViewTodolistPage implements OnInit {
  todolists : any;
  messages: Todolist[];
  model: Todolist;
  isEditing: boolean = false;
  

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }



  ngOnInit() {}

  ionViewWillEnter() {
    this.getTodolists();
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
    async deleteTodo(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    await this.firestore.doc("todolist/" + id).delete();
    //dismiss loader

    (await loader).dismiss();
 }
 showToast (message:string){
 this.toastCtrl.create({
 message: message,
 duration: 3000
 }).then(toastData => toastData.present());
 }

 toggleCheck(item): void {
  this.isEditing = true;
  item.checked = !item.checked;
  this.model = item;
}
trackByFn(index: number, item: any): number {
  return index; // or item.id
}

}

