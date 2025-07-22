import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  standalone: true,
})
export class UserlistComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  sortColumn = 'username';
  sortAsc = true;

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updateDisplayedUsers();
      },
      error: (err) => console.error(err),
    });
  }

  updateDisplayedUsers(): void {
    const sorted = [...this.users].sort((a, b) => {
      const valueA = (a as any)[this.sortColumn];
      const valueB = (b as any)[this.sortColumn];
      return this.sortAsc
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = sorted.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.updateDisplayedUsers();
  }
}
