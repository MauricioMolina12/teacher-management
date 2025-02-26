import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

interface UserData {
  user_id: number;
  full_name: string;
  user: string;
  password: string;
  level_training: string;
  role_id: string;
  working_day_id: string;
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit,OnChanges {
  @Input() usersList: any[] = [];
  users: UserData[] = [];
  filteredUsers: UserData[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchQuery = '';
  isLoading = true;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usersList'] && changes['usersList'].currentValue) {
      this.users = changes['usersList'].currentValue;
      this.filteredUsers = [...this.users];
      this.isLoading = false;
    }
  }

  // Filter for search
  search(): void {
    if (this.searchQuery.trim().toLowerCase() === '') {
      this.currentPage = 1; 
      this.filteredUsers = this.users.slice(0, this.itemsPerPage);
      return;
    }
  
    this.filteredUsers = this.users.filter(
      (user) =>
        user.full_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        // user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  
  }

  // Pagination
  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredUsers = this.users.slice(start, end);
  }

  // Change page
  changePage(next: boolean): void {
    if (
      next &&
      this.currentPage < Math.ceil(this.users.length / this.itemsPerPage)
    ) {
      this.currentPage++;
    } else if (!next && this.currentPage > 1) {
      this.currentPage--;
    }
    this.paginate();
  }
}
