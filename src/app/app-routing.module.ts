import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'school',
    canActivate: [AuthGuard],
    loadChildren: () => import('./school/school.module').then( m => m.SchoolPageModule)
  },
  {
    path: 'notice',
    canActivate: [AuthGuard],
    loadChildren: () => import('./notice/notice.module').then( m => m.NoticePageModule)
  },
  {
    path: 'calendar',
    canActivate: [AuthGuard],
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'library',
    canActivate: [AuthGuard],
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'bmi',
    canActivate: [AuthGuard],
    loadChildren: () => import('./bmi/bmi.module').then( m => m.BmiPageModule)
  },
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'attendance',
    canActivate: [AuthGuard],
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'timetable',
    canActivate: [AuthGuard],
    loadChildren: () => import('./timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'marksheets',
    canActivate: [AuthGuard],
    loadChildren: () => import('./marksheets/marksheets.module').then( m => m.MarksheetsPageModule)
  },
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'e-id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./e-id/e-id.module').then( m => m.EIdPageModule)
  },
  {
    path: 'opinions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./opinions/opinions.module').then( m => m.OpinionsPageModule)
  },
  {
    path: 'tuitions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tuitions/tuitions.module').then( m => m.TuitionsPageModule)
  },
  {
    path: 'password',
    canActivate: [AuthGuard],
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'diary',
    canActivate: [AuthGuard],
    loadChildren: () => import('./diary/diary.module').then( m => m.DiaryPageModule)
  },
  {
    path: 'syllabus',
    loadChildren: () => import('./syllabus/syllabus.module').then( m => m.SyllabusPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
