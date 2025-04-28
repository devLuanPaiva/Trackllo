import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { LanguageComponent } from './components/shared/language/language.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let router: Router;
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['logout']);
    const fakeEvent = new NavigationEnd(0, '/old-url', '/new-url');
    await TestBed.configureTestingModule({
      imports: [CommonModule, LanguageComponent, FontAwesomeModule, AppComponent],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        {
          provide: Router,
          useValue: {
            events: of(fakeEvent)
          }
        },
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });
  it('should toggle dropdownOpen when toggleDropdown is called', () => {
    expect(component.dropdownOpen).toBeFalse();
    component.toggleDropdown();
    expect(component.dropdownOpen).toBeTrue();
    component.toggleDropdown();
    expect(component.dropdownOpen).toBeFalse();
  })
  it('should call logout when onLogout is called', () => {
    component.onLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  })
  it('should close dropdown if clicked outside', () => {
    const fakeEvent = {
      target: document.createElement('div')
    } as unknown as MouseEvent;

    spyOn(component['elementRef'].nativeElement, 'contains').and.returnValue(false);

    component.dropdownOpen = true;
    component.onDocumentClick(fakeEvent);

    expect(component.dropdownOpen).toBeFalse();
  });
  it('should update currentURL on navigation end', fakeAsync(() => {
    const navEnd = new NavigationEnd(1, '/teste', '/teste');
    (router.events as any) = of(navEnd);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tick();
    expect(component.currentURL()).toBe('/teste');

  }))

})
