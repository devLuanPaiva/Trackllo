import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookiesConsentComponent } from './cookies-consent.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('CookiesConsentComponent', () => {
  let component: CookiesConsentComponent;
  let fixture: ComponentFixture<CookiesConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesConsentComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      providers: [
        TranslateService,
        TranslateStore
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CookiesConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
