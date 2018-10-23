import { AuthService } from './providers/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { RouterModule, Routes } from '@angular/router';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { ModalEventCreationComponent } from './components/modal-event-creation/modal-event-creation.component';
import { FormsModule } from '@angular/forms';
import { ModalExploreDetailsComponent } from './components/modal-explore-details/modal-explore-details.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { CookieService } from 'ngx-cookie-service';

export const firebaseConfig = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCHwqP6_TpyIF4Hrntv1cvpuniNknimaDs",
    authDomain: "current-54dd9.firebaseapp.com",
    databaseURL: "https://current-54dd9.firebaseio.com",
    projectId: "current-54dd9",
    storageBucket: "",
    messagingSenderId: "240416079301"
  }
};

// defines all URL paths the application can take
const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    EventsListComponent,
    NavBarComponent,
    ModalSigninComponent,
    ModalEventCreationComponent,
    ModalExploreDetailsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCVXbwL7sxBy_7cVNLPIlikinnIUldcvzk' // API key for Angular Google Maps
    }),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    AgmSnazzyInfoWindowModule
  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
