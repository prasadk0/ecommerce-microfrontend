import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product: any;

  products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop for work and development.',
      category: 'Electronics',
      price: 75000,
      stock: 15,
      status: 'Active',
      icon: 'pi pi-desktop',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1'
      ]
    },
    {
      id: 2,
      name: 'iPhone 15',
      description: 'Latest Apple smartphone with powerful performance.',
      category: 'Mobile',
      price: 65000,
      stock: 8,
      status: 'Active',
      icon: 'pi pi-mobile',
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        'https://images.unsplash.com/photo-1556656793-08538906a9f8'
      ]
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones.',
      category: 'Accessories',
      price: 5000,
      stock: 25,
      status: 'Active',
      icon: 'pi pi-volume-up',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90'
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(product => product.id === id);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  currentImageIndex = 0;

  nextImage(): void {
    if (!this.product?.images?.length) {
      return;
    }
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.product.images.length;
  }

  previousImage(): void {
    if (!this.product?.images?.length) {
      return;
    }
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.product.images.length)
      % this.product.images.length;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef<HTMLDivElement>;

  showZoom = false;
  lensStyle: { [key: string]: string } = {};
  zoomResultStyle: { [key: string]: string } = {};

  private lensSize = 150; 
  private zoomRatio = 2.5;

  onImageMouseEnter(): void {
    this.showZoom = true;
  }

  onImageMouseLeave(): void {
    this.showZoom = false;
  }

  onImageMouseMove(event: MouseEvent): void {
    if (!this.mainImageContainer) {
      return;
    }

    const container = this.mainImageContainer.nativeElement;
    const rect = container.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    const halfLens = this.lensSize / 2;

    x = Math.max(halfLens, Math.min(x, rect.width - halfLens));
    y = Math.max(halfLens, Math.min(y, rect.height - halfLens));

    this.lensStyle = {
      width: `${this.lensSize}px`,
      height: `${this.lensSize}px`,
      left: `${x - halfLens}px`,
      top: `${y - halfLens}px`
    };

    const bgX = (x - halfLens) * this.zoomRatio;
    const bgY = (y - halfLens) * this.zoomRatio;

    this.zoomResultStyle = {
      backgroundImage: `url(${this.product.images[this.currentImageIndex]})`,
      backgroundSize: `${rect.width * this.zoomRatio}px ${rect.height * this.zoomRatio}px`,
      backgroundPosition: `-${bgX}px -${bgY}px`
    };
  }
}