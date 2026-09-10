import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductInfoComponent } from './product-info.component';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  const routerMock = {
    navigate: jest.fn()
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductInfoComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product based on route id', () => {
    expect(component.product).toBeTruthy();
    expect(component.product.id).toBe(1);
    expect(component.product.name).toBe('Laptop');
  });

  it('should navigate back to products', () => {
    component.goBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should move to the next image', () => {
    component.currentImageIndex = 0;

    component.nextImage();

    expect(component.currentImageIndex).toBe(1);
  });

  it('should move to the previous image', () => {
    component.currentImageIndex = 0;

    component.previousImage();

    expect(component.currentImageIndex).toBe(2);
  });

  it('should select an image', () => {
    component.selectImage(2);

    expect(component.currentImageIndex).toBe(2);
  });

  it('should show zoom on mouse enter', () => {
    component.onImageMouseEnter();

    expect(component.showZoom).toBe(true);
  });

  it('should hide zoom on mouse leave', () => {
    component.showZoom = true;

    component.onImageMouseLeave();

    expect(component.showZoom).toBe(false);
  });

  it('should not change image on nextImage when product has no images', () => {
    component.product = {
      id: 1,
      images: []
    };

    component.currentImageIndex = 0;

    component.nextImage();

    expect(component.currentImageIndex).toBe(0);
  });

  it('should not change image on previousImage when product has no images', () => {
    component.product = {
      id: 1,
      images: []
    };

    component.currentImageIndex = 0;

    component.previousImage();

    expect(component.currentImageIndex).toBe(0);
  });

  it('should not update zoom when main image container is unavailable', () => {
    component.mainImageContainer = undefined as any;

    const event = new MouseEvent('mousemove');

    component.onImageMouseMove(event);

    expect(component.lensStyle).toEqual({});
    expect(component.zoomResultStyle).toEqual({});
  });

  it('should update zoom styles when mouse moves over image', () => {
    const mockContainer = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 0,
        top: 0,
        width: 600,
        height: 400
      })
    };

    component.mainImageContainer = {
      nativeElement: mockContainer
    } as any;

    const event = new MouseEvent('mousemove', {
      clientX: 300,
      clientY: 200
    });

    component.onImageMouseMove(event);

    expect(component.lensStyle).toEqual({
      width: '150px',
      height: '150px',
      left: '225px',
      top: '125px'
    });

    expect(component.zoomResultStyle.backgroundImage).toContain(
      component.product.images[component.currentImageIndex]
    );

    expect(component.zoomResultStyle.backgroundSize).toBe(
      '1500px 1000px'
    );
  });
});
