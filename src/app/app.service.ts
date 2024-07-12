import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'https://localhost:7058/api/User'; 
  private authTokenKey = 'auth_token';

  private jwtHelper: JwtHelperService; 

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService(); 
  }

  registerUser(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  addQuestion(data: any){
    return this.http.post(`${this.apiUrl}/add_question`, data);
  }


  getQuestions():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_questions`);
  }

  updateQuestion(data: any, id: number){
    return this.http.put(`${this.apiUrl}/edit_question${id}`, data);
  }

  sendAnswers(data: any){
    return this.http.post(`${this.apiUrl}/add_answers`, data);
  }

  getAnswers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/get_answers`);
  }



  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_users`);
  }

  loginUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(response => {
          this.setAuthToken(response.token);
          //this.setUserInfo({ email: response.email, userName: response.userName });
        })
      );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/get_user`, { headers });
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken() {
    return localStorage.getItem(this.authTokenKey);
  }

  // setUserInfo(user: { email: string, userName: string }) {
  //   localStorage.setItem(this.userInfoKey, JSON.stringify(user));
  // }


  // removeUserInfo() {
  //   localStorage.removeItem(this.userInfoKey);
  // }

  // getLoggedInUser() {
  //   const token = this.getAuthToken();
  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     return {
  //       email: decodedToken.email,
  //       name: decodedToken.name
  //       // Add other user properties as needed
  //     };
  //   }
  //   return null; // No valid token found or expired
  // }

  removeAuthToken() {
    localStorage.removeItem(this.authTokenKey);
  }

  isLoggedIn() {
    const token = this.getAuthToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token')
    
  }
}
