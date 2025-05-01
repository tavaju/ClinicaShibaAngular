import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  @Output() captchaResolved = new EventEmitter<string>();
  @Output() captchaError = new EventEmitter<void>();
  @Input() action: string = 'login';

  private tokenTimeout: any = null;
  
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  ngOnInit(): void {
    // Execute reCAPTCHA on component init
    this.executeRecaptcha();
  }

  executeRecaptcha(): void {
    this.recaptchaV3Service.execute(this.action)
      .subscribe({
        next: (token) => {
          this.captchaResolved.emit(token);
          
          // reCAPTCHA v3 tokens expire after 2 minutes, so refresh before that
          this.setTokenRefresh();
        },
        error: (error) => {
          console.error('reCAPTCHA error:', error);
          this.captchaError.emit();
        }
      });
  }

  private setTokenRefresh(): void {
    // Clear any existing timeout
    if (this.tokenTimeout) {
      clearTimeout(this.tokenTimeout);
    }

    // Set a new timeout to refresh the token after 1 minute and 45 seconds
    // (before the 2-minute expiration)
    this.tokenTimeout = setTimeout(() => {
      this.executeRecaptcha();
    }, 105000); // 1m 45s
  }

  ngOnDestroy(): void {
    if (this.tokenTimeout) {
      clearTimeout(this.tokenTimeout);
    }
  }
} 