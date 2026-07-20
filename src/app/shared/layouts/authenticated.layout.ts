import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EduHeader } from '../components/header/edu-header';

@Component({
  selector: 'app-authenticated-layout',
  imports: [RouterOutlet, EduHeader],
  template: `
    <edu-header />
    <router-outlet />
  `,
})
export class AuthenticatedLayout {}
