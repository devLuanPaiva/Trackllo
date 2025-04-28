import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { LanguageComponent } from './components/shared/language/language.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideNoopAnimations } from '@angular/platform-browser/animations';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let router: Router;
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, LanguageComponent, FontAwesomeModule, AppComponent],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
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
})
