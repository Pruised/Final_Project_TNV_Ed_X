import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'tnv-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  showFooter: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.showFooter = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
