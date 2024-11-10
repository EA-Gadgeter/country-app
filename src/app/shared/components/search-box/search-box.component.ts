import { Component, Input, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { type OnInit, type OnDestroy } from "@angular/core"

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = "";

  @Output()
  private onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  private onDebounce: EventEmitter<string> = new EventEmitter();

  @ViewChild("txtInput")
  private txtInput!: ElementRef<HTMLInputElement>;

  public ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        // Operator que basicamente dice, si no se emitio un nuevo
        // valor por un segundo, haz lo del suscribe
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  public EmitValue(): void {
    const inputValue: string = this.txtInput.nativeElement.value;

    if (inputValue.length <= 0) return;

    this.onValue.emit(inputValue);
  }

  public OnKeyPress(searchTerm: string): void {
    if (searchTerm.length <= 0) return;

    // Aqui emitimos valores, a los que reaccion el debounceTime
    this.debouncer.next(searchTerm);
  }
}
