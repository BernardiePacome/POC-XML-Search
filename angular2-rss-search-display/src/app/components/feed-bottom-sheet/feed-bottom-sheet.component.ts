import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FeedEntry } from '../../model/feed-entry';

@Component({
  selector: 'app-feed-bottom-sheet',
  templateUrl: './feed-bottom-sheet.component.html',
  styleUrls: ['./feed-bottom-sheet.component.scss'],
})
export class FeedBottomSheetComponent implements OnInit {
  displayedFeedEntry: FeedEntry | undefined;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { feed: any },
    private bottomSheetRef: MatBottomSheetRef<FeedBottomSheetComponent>
  ) {}

  ngOnInit(): void {
    this.displayedFeedEntry = this.data.feed;
    console.log('this.', this.data);
  }
}
