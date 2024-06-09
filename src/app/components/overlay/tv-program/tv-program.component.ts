import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-program.component.html',
  styleUrls: ['./tv-program.component.scss']
})

export class TvProgramComponent implements OnInit {
  videoIsPlaying: boolean = false;
  timeoutDelay: number = 15000;
  @Input() videoPath?: string;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    if (this.videoPath) {
      this.stopVideo();
      let timeout = setTimeout(() => {
        this.playVideo();
        clearTimeout(timeout);
      }, this.timeoutDelay);
    }
  }

  playVideo(): void {
    this.videoIsPlaying = true;
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.play();
    }
  }

  stopVideo(): void {
    this.videoIsPlaying = false;
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }
  }
}