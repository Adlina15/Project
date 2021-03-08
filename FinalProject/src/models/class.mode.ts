import { Time } from "@angular/common";
import { IonDatetime } from "@ionic/angular";
import { TimeInterval, Timestamp } from "rxjs";

export interface Class {
    day: string;
    subject: string;
    starttime: string;
    endtime: string;
    room: string;
}