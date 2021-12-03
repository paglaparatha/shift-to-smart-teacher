import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RESPONSE } from './models/response.model';
import { TEACHER_DATA } from './models/teacher.model';
import { BASE } from './utils';
import { map } from 'rxjs/operators'
import { ADMIN } from './models/admin.model';
import { NOTICE } from './models/notice.model';
import { CALENDAR } from './models/calendar.model';
import { MARKSHEET } from './models/marksheet.model';
import { SCHEDULE } from './models/schedule.model';
import { POLLS } from './models/polls.model';
import { TUITION } from './models/tuition.model';
import { SUBJECT } from './models/subjects.model';
import { DIARY } from './models/diary.model'
import { SYLLABUS } from './models/syllabus.model';
import { REQUESTS } from './models/request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  teacher = new BehaviorSubject<TEACHER_DATA>(JSON.parse(localStorage.getItem('sts-teacher') || null))
  constructor(private http: HttpClient, private router: Router) { }

  onLogin(form) {
    return this.http.post<RESPONSE>(`${BASE}`, form, { observe: 'response' })
  }

  onLogout() {
    this.teacher.next(null)
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  get key() {
    let jwt = localStorage.getItem('sts-key-teacher')
    return jwt
  }

  set key(jwt: string) {
    localStorage.setItem('sts-key-teacher', jwt)
  }

  onGetTeacher() {
    return this.http.get<TEACHER_DATA>(`${BASE}?key=${this.key}&teacher=true`)
      .pipe(map(res => {
        res.sliders = res.sliders.map(el => { el.image = el.image.replace(/[.]{2}[/]/g, ''); return el })
        res.school.logo = res.school.logo.replace(/[.]{2}[/]/g, '')
        delete res.teacher['password']
        localStorage.setItem('sts-teacher', JSON.stringify(res))
        this.teacher.next(res)
        return res
      }))
  }

  onGetSchoolAdmins() {
    return this.http.get<ADMIN[]>(`${BASE}?key=${this.key}&admins=true`)
  }

  onGetNotice() {
    return this.http.get<NOTICE[]>(`${BASE}?key=${this.key}&notice=true`).pipe(map(res => {
      res = res.map(el => {
        if (el.file) {
          el.file = el.file.replace(/[.]{2}[/]/g, '')
        }
        return el;
      })
      return res
    }))
  }

  onGetNoticeDetails(id: number) {
    return this.http.get<NOTICE>(`${BASE}?key=${this.key}&notice-detail=true&n_id=${id}`).pipe(map(res => {
      if (res.file) {
        res.file = res.file.replace(/[.]{2}[/]/g, '')
      }
      return res
    }))
  }

  onGetCalendar() {
    return this.http.get<CALENDAR[]>(`${BASE}?key=${this.key}&calendar=true`)
  }

  onGetGallery() {
    return this.http.get(`${BASE}?key=${this.key}&gallery=true`)
  }

  onGetLibrary(form: FormData) {
    return this.http.post(`${BASE}?key=${this.key}`, form)
  }

  onGetAttendanceStudents(date: string) {
    return this.http.get<{ name: string, id: number, present, "id-number": string }[]>(`${BASE}?key=${this.key}&date=${date}&attendance-students=true`).pipe(map(res => {
      res = res.map(e => { e.present = e.present == 1; return e })
      return res
    }))
  }

  onTakeAttendance(form: FormData) {
    return this.http.post(`${BASE}?key=${this.key}`, form)
  }

  onGetTimetable(curr) {
    return this.http.get(`${BASE}?key=${this.key}&timetable=true&class=${curr.class}&section=${curr.section}`)
  }

  onGetMessages() {
    return this.http.get(`${BASE}?key=${this.key}&messages=true`)
  }

  onGetMarksheets() {
    return this.http.get<MARKSHEET[]>(`${BASE}?key=${this.key}&marksheets=true`).pipe(map(res => {
      res = res.map(e => { e.file = e.file.replace(/[.]{2}[/]/g, ''); return e })
      return res
    }))
  }

  onPostMarksheets(form: FormData) {
    return this.http.post<RESPONSE>(`${BASE}?key=${this.key}`, form)
  }

  onDeleteMarksheet(id) {
    return this.http.get<RESPONSE>(`${BASE}?key=${this.key}&delete-marksheet=${id}`)
  }

  onGetSchedule() {
    return this.http.get<SCHEDULE[]>(`${BASE}?key=${this.key}&schedule=true`).pipe(map(res => {
      res = res.map(el => {
        el.file = el.file.replace(/[.]{2}[/]/g, '')
        return el
      })
      return res
    }))
  }

  onGetOpinions() {
    return this.http.get<POLLS[]>(`${BASE}?key=${this.key}&opinions=true`)
  }

  onPostOpinions(form: FormData) {
    return this.http.post<RESPONSE>(`${BASE}?key=${this.key}`, form)
  }

  onGetTuitions() {
    return this.http.get<TUITION[]>(`${BASE}?key=${this.key}&tuitions=true`).pipe(map(r => {
      r = r.map(e => { e.syllabus = e.syllabus.replace(/[.]{2}[/]/g, ''); return e })
      return r;
    }))
  }

  onGetTuitionStudents(id: number) {
    return this.http.get<{ "class": number, id: number, image: string, name: string, section: string }[]>(`${BASE}?key=${this.key}&tuition-student=true&tid=${id}`).pipe(map(r => {
      r = r.map(e => { e.image = e.image.replace(/[.]{2}[/]/g, ''); return e })
      return r;
    }))
  }

  onChangePassword(form: FormData) {
    return this.http.post<RESPONSE>(`${BASE}?key=${this.key}`, form)
  }

  onForgot(form: FormData) {
    return this.http.post<RESPONSE>(`${BASE}`, form)
  }

  onGetFacultySubjects() {
    return this.http.get<SUBJECT[]>(`${BASE}?key=${this.key}&subjects=true`)
  }

  onUploadDiary(form: FormData) {
    return this.http.post<RESPONSE>(`${BASE}?key=${this.key}`, form)
  }

  onGetDiary() {
    return this.http.get<DIARY[]>(`${BASE}?key=${this.key}&diary=true`).pipe(map(r => {
      r = r.map(e => { e.file = e.file.replace(/[.]{2}[/]/g, ''); return e; })
      return r
    }))
  }

  onDeleteDiary(_id) {
    return this.http.get<RESPONSE>(`${BASE}?key=${this.key}&delete-diary=${_id}`)
  }

  onGetSyllabus() {
    return this.http.get<SYLLABUS[]>(`${BASE}?key=${this.key}&syllabus=true`).pipe(map(r => {
      r = r.map(e => { e.syllabus = e.syllabus.replace(/[.]{2}[/]/g, ''); return e })
      return r;
    }))
  }

  onDeleteMSG(id: number) {
    return this.http.get<RESPONSE>(`${BASE}?key=${this.key}&del-msg=${id}`)
  }

  onGetRequest() {
    return this.http.get<REQUESTS[]>(`${BASE}?key=${this.key}&get-requests=true`)
  }

  onDeleteRequest(id: number) {
    return this.http.get<RESPONSE>(`${BASE}?key=${this.key}&del-requests=${id}`)
  }
}
