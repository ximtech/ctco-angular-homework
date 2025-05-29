import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNotFoundComponent } from './blog-not-found.component';

describe('BlogNotFoundComponent', () => {
  let component: BlogNotFoundComponent;
  let fixture: ComponentFixture<BlogNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
