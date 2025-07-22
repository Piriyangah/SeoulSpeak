import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { User } from '../shared/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class UserlistComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  
  sortKey: keyof User = 'username';
  sortAsc = true;

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.applyPagination();
      },
      error: (err) => console.error(err)
    });
  }

  applyPagination(): void {
    const sorted = [...this.users].sort((a, b) => {
      const valA = a[this.sortKey]?.toString().toLowerCase() || '';
      const valB = b[this.sortKey]?.toString().toLowerCase() || '';
      return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    this.totalPages = Math.ceil(sorted.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = sorted.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }

  sortBy(key: keyof User): void {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
    this.applyPagination();
  }

  get pageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
}