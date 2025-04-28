import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageComponent, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        TranslateStore
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
