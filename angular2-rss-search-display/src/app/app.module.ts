import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FeedService } from './feed.service';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
@NgModule({
  declarations: [AppComponent, FeedCardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [FeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
