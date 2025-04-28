import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageComponent } from './language.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ElementRef } from '@angular/core';
import { of, throwError } from 'rxjs';


describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;


  beforeEach(async () => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use'], { currentLang: 'en' });
    elementRefSpy = jasmine.createSpyObj('ElementRef', [], {
      nativeElement: {
        contains: jasmine.createSpy('contains')
      }
    });
    await TestBed.configureTestingModule({
      imports: [LanguageComponent, TranslateModule.forRoot()],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
        { provide: ElementRef, useValue: elementRefSpy },
        TranslateStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should switch language successfully', () => {
    translateServiceSpy.use.and.returnValue(of({} as any));

    component.switchLanguage('es');

    expect(translateServiceSpy.use).toHaveBeenCalledWith('es');
    expect(component.selectedLang).toBe('es');
    expect(component.dropdownOpen).toBeFalse();
  });
  it('should fallback to Portuguese if language switch fails', () => {
    spyOn(console, 'error');
    translateServiceSpy.use.and.returnValue(throwError(() => new Error('switch failed')));

    component.switchLanguage('es');

    expect(translateServiceSpy.use).toHaveBeenCalledWith('es');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('pt');
    expect(component.selectedLang).toBe('pt');
  });
});
