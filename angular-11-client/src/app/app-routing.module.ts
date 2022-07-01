import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { AddAirlineComponent } from './components/add-airline/add-airline.component';
import { ViewScheduledFlightsComponent } from './components/view-scheduled-flights/view-scheduled-flights.component';
import { ViewAirlineDetailsComponent } from './components/view-airline-details/view-airline-details.component';
import { EditFlightDetailsComponent } from './components/edit-flight-details/edit-flight-details.component';
import { ViewAllFlightsComponent } from './components/view-all-flights/view-all-flights.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { SearchByPRNComponent } from './components/search-by-prn/search-by-prn.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'addFlight', component: AddAirlineComponent},
  { path: 'scheduledFlights', component: ViewScheduledFlightsComponent},
  { path: 'viewAllFlights', component: ViewAllFlightsComponent},
  { path: 'viewAirlineDetails/:flightNo', component: ViewAirlineDetailsComponent},
  { path: 'editFlightDetails/:flightNo', component: EditFlightDetailsComponent },
  { path: 'flightSearch', component: FlightSearchComponent },
  { path: 'bookingHistory/:userEmail', component: BookingHistoryComponent },
  { path: 'searchByPRN', component: SearchByPRNComponent },
  { path: 'aboutUs', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
