import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderNavigation } from './header-navigation';

describe('App', () => {
  let component: HeaderNavigation;
  let fixture: ComponentFixture<HeaderNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNavigation);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
