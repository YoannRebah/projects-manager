import { Component, OnInit, inject } from '@angular/core';
// content
import { HomepageContentComponent } from '../../components/content/homepage-content/homepage-content.component';
// services
import { LoaderService } from '../../shared/services/components/loader.service';
import { VhsFooterService } from '../../shared/services/components/vhs-footer.service';
import { VhsTimeCounterService } from '../../shared/services/components/vhs-time-counter.service';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HomepageContentComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit{ 
  loaderService = inject(LoaderService);
  vhsFooterService = inject(VhsFooterService);
  vhsTimeCounterService = inject(VhsTimeCounterService);

  constructor() {}

  ngOnInit(): void {
    this.loaderService.show();
    this.vhsFooterService.show();
    TimeoutService.setTimeout(()=>{
      this.loaderService.hide();
      this.vhsTimeCounterService.start();
    });
  }

}