import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddAirlineComponent } from './components/add-airline/add-airline.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewScheduledFlightsComponent } from './components/view-scheduled-flights/view-scheduled-flights.component';
import { ViewAirlineDetailsComponent } from './components/view-airline-details/view-airline-details.component';
import { EditFlightDetailsComponent } from './components/edit-flight-details/edit-flight-details.component';
import { ViewAllFlightsComponent } from './components/view-all-flights/view-all-flights.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { BookTicketComponent } from './components/book-ticket/book-ticket.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { SearchByPRNComponent } from './components/search-by-prn/search-by-prn.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AddAirlineComponent,
    ViewScheduledFlightsComponent,
    ViewAirlineDetailsComponent,
    EditFlightDetailsComponent,
    ViewAllFlightsComponent,
    FlightSearchComponent,
    BookTicketComponent,
    BookingHistoryComponent,
    SearchByPRNComponent,
    AboutUsComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatListModule,
    MatIconModule
  ],
  providers: [authInterceptorProviders,DatePipe,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
