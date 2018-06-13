import { Component } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(){
      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyDCS8oiDd02gVtpfggSf_8Fawi-XxPCwFs",
          authDomain: "blogapp-22205.firebaseapp.com",
          databaseURL: "https://blogapp-22205.firebaseio.com",
          projectId: "blogapp-22205",
          storageBucket: "",
          messagingSenderId: "94604640036"
      };
      firebase.initializeApp(config);
  }
}
