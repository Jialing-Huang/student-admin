import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from '../Models/Admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  servicelocaltoken!: string;
  tokentimer:any;
  isAuthenticated:boolean = false;

  /* private isLogged = new Subject<{user:string, status:boolean}>(); */
  private authListener = new Subject<boolean>();
 
  constructor(private http:HttpClient, private router:Router) { }
  
  logindata:Admin = {   
    Email:'',
    Password:''
  };

  addAdmin(email:string, password:string):Observable<any>{
    const registerdata:Admin = { Email:email, Password:password};
    
    return this.http.post<{message:any}>("http://localhost:8080/admin/register", registerdata)
                    .pipe(
                      catchError(error => { return throwError(error); })
                    );
  };

  login(email:string, password:string):void{

    this.logindata.Email = email;
    this.logindata.Password = password;

    this.http.post<{token:string, expiresIn:number}>("http://localhost:8080/admin/login",this.logindata)
                    .pipe(
                          catchError(error => { return throwError(error); })
                        )
                    .subscribe(
                      response => {

                        //将返回的token存至本地
                        //const localtoken = response.token;
                        this.servicelocaltoken = response.token;

                        if(this.servicelocaltoken){
                          //将返回的expiration存至本地
                          const sevicelocalexpiresIn = response.expiresIn;

                          //创建一个new Date(),把它和存至本地的expiration加起来并转化为以毫秒数计数的一个过期点时刻
                          //将得到的过期点时刻和token通过函数存到浏览器的localstorage中去
                          const now = new Date();
                          const localexpireDate = new Date(now.getTime() + sevicelocalexpiresIn*1000);
                          this.setAuthData(this.servicelocaltoken,localexpireDate);

                          console.log(sevicelocalexpiresIn);
                          console.log(localexpireDate);

                          this.router.navigate(["/list"]);

                          //Set an initial value and dynamic value
                          this.isAuthenticated = true;
                          this.authListener.next(true);
                          
                          //路由跳至"card/list"
                          
                        }else{
                          console.error();
                        }
                      }
                    );
  };

  getToken(){        //To auth interceptor
    return this.servicelocaltoken;
  }

  getIsAuth(){
    return this.isAuthenticated;
  } 

  //把login函数中设置的值广播出去,注意别漏了"return"
  getAuthStatus(){
    return this.authListener.asObservable();
  }

  //将得到的过期点时刻和token通过函数存到浏览器的localstorage中去
  private setAuthData(token:string, expireDate:Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expireDate.toString());
  }

  //token到期后清除掉浏览器中保存的过期点时刻和token
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  //获取浏览器中保存的过期点时刻和token的值，与getAuthUser()函数合作
  private getAutData(){
    const token  = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if( !token || !expiration){
      return;
    }else{
      return {
        token: token,
        expirationDate: new Date(expiration)
      };
    }
  }

  //计时器设定倒数计时，setTimeOut倒数计时到零后启动logout函数和getAuthUser函数一起用
  private setAuthTimer(duration:number){
    console.log("Setting time in seconds: " + duration/1000);
    this.tokentimer = setTimeout(() => this.logout(), duration);
  }

  //用在app.component.ts
  getAuthUser(){
    const authinfo = this.getAutData();

    if (!authinfo){
      return;
    }else{
      //通过将过期点时刻减去现在时刻得到离过期点还有多长时间
      const now = new Date();
      const expirationIn = authinfo.expirationDate.getTime()- now.getTime();

      //如果离过期时间大于零，那么就还在token有效期内，将离过期时间传给setAuthTimer
      if (expirationIn > 0){
        //Set a timer
        this.setAuthTimer(expirationIn);

        //Set an initial value and dynamic value
        this.isAuthenticated = true;
        this.authListener.next(true);

        this.servicelocaltoken = authinfo.token;
      }
    }
  }

  logout(){
    this.servicelocaltoken = '';
    //this.logindata.Email = '';
    //this.sevicelocalexpiresIn = null;

    this.isAuthenticated = false;
    this.authListener.next(false);

    this.clearAuthData();
    clearTimeout(this.tokentimer);
  };
}
