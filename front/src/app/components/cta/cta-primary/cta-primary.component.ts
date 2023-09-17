import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cta-primary',
  templateUrl: './cta-primary.component.html',
  styleUrls: ['./cta-primary.component.scss']
})
export class CtaPrimaryComponent {

  @Input()
  public text: string = '';

  @Input()
  public disabled: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>(true);
  
  public handleClick() {
    this.onClick.emit();
  }
}
