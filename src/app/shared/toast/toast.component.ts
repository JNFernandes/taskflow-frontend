import { Component, DestroyRef, OnInit, inject, input, output } from '@angular/core';

export type ToastType = 'success' | 'error';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly message = input.required<string>();
  readonly type = input<ToastType>('success');
  readonly autoDismissMs = input(4000);

  readonly dismissed = output<void>();

  ngOnInit(): void {
    const timer = setTimeout(() => this.dismissed.emit(), this.autoDismissMs());
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }
}
