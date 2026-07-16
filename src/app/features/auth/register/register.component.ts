import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../core/auth/auth.service';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]]
  });

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService.register(this.form.getRawValue()).subscribe({
      next: (user) => {
        this.isSubmitting.set(false);
        this.successMessage.set(`Account created for ${user.email}. You can now log in.`);
        this.form.reset();
      },
      error: (error: { error?: { detail?: string } }) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Registration failed. Please try again.');
      }
    });
  }
}
