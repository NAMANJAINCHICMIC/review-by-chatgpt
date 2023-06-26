import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeReviewComponent } from './code-review/code-review.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CodeReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
       HttpClientModule,
       BrowserAnimationsModule,
       MatProgressSpinnerModule
  ],
  exports:[MatProgressSpinnerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
