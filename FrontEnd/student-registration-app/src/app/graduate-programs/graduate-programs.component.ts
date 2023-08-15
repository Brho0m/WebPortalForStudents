import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-graduate-programs',
  templateUrl: './graduate-programs.component.html',
  styleUrls: ['./graduate-programs.component.css']
})
export class GraduateProgramsComponent implements OnInit {
  levelOfStudy: string = '';
  program: string = '';
  faculty: string = '';

  constructor(private router: Router) { }
  signOut() {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
  }
}
