import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() list: any[] = []; // Information
  @Input() headers: any[] = []; // => names for column's table
  @Input() keys: any[] = []; // => In positions 1 and 2 there must be values ​​that can be filtered by search in the resource list
  @Input() title: string = ''; // title's table
  @Output() openModalCreateUser = new EventEmitter<void>();
  @Output() openModalConfirmDeleteUser = new EventEmitter<number>();
  @Output() openModalConfirmEditUser = new EventEmitter<number>();
  @Output() openDetailUser = new EventEmitter<number>();

  filtered: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  searchQuery = '';
  isLoading = true;
  isMenuOpen = false;

  ngOnInit(): void {
    this.paginate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'] && changes['list'].currentValue) {
      this.filtered = [...this.list];
      this.totalPages = Math.ceil(this.filtered.length / this.itemsPerPage);
      this.isLoading = false;
      this.paginate();
    }
  }

  // Filter for search
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.currentPage = 1;
      this.filtered = this.list.slice(0, this.itemsPerPage);
      return;
    }

    this.filtered = this.list.filter(
      (item) =>
        item[this.keys[1]]
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        item[this.keys[2]]
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase())
    );
  }

  // Pagination
  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filtered = this.list.slice(start, end);
  }

  // Change page
  changePage(indicator: string, page: number = 1): void {
    switch (indicator) {
      case 'next':
        if (
          this.currentPage < Math.ceil(this.list.length / this.itemsPerPage)
        ) {
          this.currentPage++;
        }
        break;
      case 'prev':
        if (this.currentPage > 1) {
          this.currentPage--;
        }
        break;
      case 'index':
        if (page) {
          this.currentPage = page;
        }
    }

    this.paginate();
  }

  openModal(action: 'create' | 'delete' | 'edit', userId?: number): void {
    switch (action) {
      case 'create':
        this.openModalCreateUser.emit();
        break;
      case 'delete':
        if (userId) {
          this.openModalConfirmDeleteUser.emit(userId);
        }
        break;
      case 'edit':
        if (userId) {
          this.openModalConfirmEditUser.emit(userId);
        }
    }
  }

  detailUser(userId: number, e: Event): void {
    e.stopPropagation();
    if (userId) {
      this.openDetailUser.emit(userId);
    }
  }
}
