(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Rekj:function(t,e,n){"use strict";n.r(e),n.d(e,"AuthModule",function(){return L});var o=n("ofXK"),r=n("3Pt+"),c=n("tyNb"),s=n("fXoL");let b=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Cb({type:t,selectors:[["app-auth"]],decls:1,vars:0,template:function(t,e){1&t&&s.Jb(0,"router-outlet")},directives:[c.g],styles:[""]}),t})();var i=n("lGQG");function a(t,e){if(1&t&&(s.Nb(0,"small",23),s.sc(1),s.Mb()),2&t){const t=s.Zb();s.xb(1),s.uc("*",t.message,"")}}const l=function(){return["/","auth","login"]},d=function(){return["/","auth","password-recovery"]};let u=(()=>{class t{constructor(t,e){this.authService=t,this.router=e}ngOnInit(){this.valid=!0}onRegister(t){this.authService.register(t.value).subscribe(t=>{this.valid=t.auth,this.message=t.message,this.valid&&(localStorage.setItem("login-token",t.token),this.router.navigate(["/","todo"]))})}}return t.\u0275fac=function(e){return new(e||t)(s.Ib(i.a),s.Ib(c.b))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-registration"]],decls:38,vars:8,consts:[[1,"row","h-100","registration__bg-color","text-light"],[1,"col-12"],[1,"row","h-100","align-content-center","justify-content-center"],[1,"col-12","display-4","text-center","mb-5"],[1,"col-10","col-lg-4","border","rounded","pt-3"],[3,"ngSubmit"],["f","ngForm"],[1,"form-group"],["for","name"],["id","name","type","text","placeholder","Name","name","name","ngModel","","required","",1,"form-control"],["for","email"],["id","email","type","text","placeholder","Email Id","name","email","ngModel","","required","","email","",1,"form-control"],["for","password"],["id","password","type","password","placeholder","Password","name","password","required","","minlength","6","maxlength","15",1,"form-control",3,"ngModel","ngModelChange"],["for","confirm_password"],["id","confirm_password","type","password","placeholder","Confirm Password","name","password2","required","","minlength","6","maxlength","15",1,"form-control",3,"ngModel","ngModelChange"],["class","form-text text-danger",4,"ngIf"],[1,"form-group","mt-4"],["type","submit",1,"btn","btn-success",3,"disabled"],[1,"row","align-content-center","border-top"],[1,"col-12","text-center"],[1,"btn","btn-link","text-warning",3,"routerLink"],[1,"btn","btn-link","text-danger",3,"routerLink"],[1,"form-text","text-danger"]],template:function(t,e){if(1&t){const t=s.Ob();s.Nb(0,"div",0),s.Nb(1,"div",1),s.Nb(2,"div",2),s.Nb(3,"div",3),s.sc(4,"My Scheduler"),s.Mb(),s.Nb(5,"div",4),s.Nb(6,"form",5,6),s.Vb("ngSubmit",function(){s.lc(t);const n=s.jc(7);return e.onRegister(n)}),s.Nb(8,"div",7),s.Nb(9,"label",8),s.sc(10,"Name:"),s.Mb(),s.Jb(11,"input",9),s.Mb(),s.Nb(12,"div",7),s.Nb(13,"label",10),s.sc(14,"Email Address:"),s.Mb(),s.Jb(15,"input",11),s.Mb(),s.Nb(16,"div",7),s.Nb(17,"label",12),s.sc(18,"Password:"),s.Mb(),s.Nb(19,"input",13),s.Vb("ngModelChange",function(t){return e.pswd=t}),s.Mb(),s.Mb(),s.Nb(20,"div",7),s.Nb(21,"label",14),s.sc(22,"Confirm Password:"),s.Mb(),s.Nb(23,"input",15),s.Vb("ngModelChange",function(t){return e.confirmPswd=t}),s.Mb(),s.Mb(),s.rc(24,a,2,1,"small",16),s.Nb(25,"div",17),s.Nb(26,"button",18),s.sc(27,"Register"),s.Mb(),s.Mb(),s.Mb(),s.Nb(28,"div",19),s.Nb(29,"div",20),s.Nb(30,"button",21),s.Nb(31,"small"),s.sc(32,"Log In"),s.Mb(),s.Mb(),s.Nb(33,"span"),s.sc(34," - "),s.Mb(),s.Nb(35,"button",22),s.Nb(36,"small"),s.sc(37,"Forgot Password"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb()}if(2&t){const t=s.jc(7);s.xb(19),s.cc("ngModel",e.pswd),s.xb(4),s.cc("ngModel",e.confirmPswd),s.xb(1),s.cc("ngIf",!e.valid),s.xb(2),s.cc("disabled",!(t.form.valid&&e.pswd===e.confirmPswd)),s.xb(4),s.cc("routerLink",s.dc(6,l)),s.xb(5),s.cc("routerLink",s.dc(7,d))}},directives:[r.n,r.g,r.h,r.a,r.f,r.i,r.k,r.b,r.e,r.d,o.j,c.c],styles:[".registration__bg-color[_ngcontent-%COMP%]{background-color:#3f4896}"]}),t})();function g(t,e){1&t&&(s.Nb(0,"small",19),s.sc(1,"*Invalid Credentials"),s.Mb())}const m=function(){return["/","auth","register"]},f=function(){return["/","auth","password-recovery"]};function p(t,e){if(1&t){const t=s.Ob();s.Nb(0,"form",11,12),s.Vb("ngSubmit",function(){s.lc(t);const e=s.jc(1);return s.Zb().onRecover(e)}),s.Nb(2,"div",13),s.Nb(3,"label",14),s.sc(4,"Email Address:"),s.Mb(),s.Jb(5,"input",15),s.Mb(),s.Nb(6,"div",16),s.Nb(7,"button",17),s.sc(8,"Recover"),s.Mb(),s.Mb(),s.Mb()}if(2&t){const t=s.jc(1);s.xb(7),s.cc("disabled",!t.form.valid)}}function M(t,e){if(1&t&&(s.Nb(0,"div",18),s.sc(1),s.Mb()),2&t){const t=s.Zb();s.xb(1),s.tc(t.message)}}const h=function(){return["/","auth","login"]},v=function(){return["/","auth","register"]};function N(t,e){if(1&t&&(s.Nb(0,"small",21),s.sc(1),s.Mb()),2&t){const t=s.Zb(2);s.xb(1),s.uc("*",t.message,"")}}function w(t,e){if(1&t){const t=s.Ob();s.Nb(0,"form",11,12),s.Vb("ngSubmit",function(){s.lc(t);const e=s.jc(1);return s.Zb().onReset(e)}),s.Nb(2,"div",13),s.Nb(3,"label",14),s.sc(4,"Password:"),s.Mb(),s.Nb(5,"input",15),s.Vb("ngModelChange",function(e){return s.lc(t),s.Zb().pswd=e}),s.Mb(),s.Mb(),s.Nb(6,"div",13),s.Nb(7,"label",16),s.sc(8,"Confirm Password:"),s.Mb(),s.Nb(9,"input",17),s.Vb("ngModelChange",function(e){return s.lc(t),s.Zb().confirmPswd=e}),s.Mb(),s.Mb(),s.rc(10,N,2,1,"small",18),s.Nb(11,"div",19),s.Nb(12,"button",20),s.sc(13,"Reset"),s.Mb(),s.Mb(),s.Mb()}if(2&t){const t=s.jc(1),e=s.Zb();s.xb(5),s.cc("ngModel",e.pswd),s.xb(4),s.cc("ngModel",e.confirmPswd),s.xb(1),s.cc("ngIf",e.valid),s.xb(2),s.cc("disabled",!(t.form.valid&&e.pswd===e.confirmPswd))}}function x(t,e){if(1&t&&(s.Nb(0,"div",22),s.sc(1),s.Mb()),2&t){const t=s.Zb();s.xb(1),s.tc(t.message)}}const y=function(){return["/","auth","login"]},k=function(){return["/","auth","register"]},I=[{path:"",component:b,children:[{path:"login",component:(()=>{class t{constructor(t,e){this.authService=t,this.router=e}ngOnInit(){this.valid=!0}onLogin(t){this.authService.login(t.value).subscribe(t=>{this.valid=t.auth,this.valid&&(localStorage.setItem("login-token",t.token),this.router.navigate(["/","todo","monthly"]))})}}return t.\u0275fac=function(e){return new(e||t)(s.Ib(i.a),s.Ib(c.b))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-login"]],decls:30,vars:6,consts:[[1,"row","h-100","login__bg-color","text-light"],[1,"col-12"],[1,"row","h-100","align-content-center","justify-content-center"],[1,"col-12","display-4","text-center","mb-5"],[1,"col-10","col-lg-4","border","rounded","pt-3"],[3,"ngSubmit"],["f","ngForm"],[1,"form-group"],["for","email"],["id","email","type","text","placeholder","Email Id","name","email","ngModel","","required","","email","",1,"form-control"],["for","password"],["id","password","type","password","placeholder","Password","name","password","ngModel","","required","","minlength","6",1,"form-control"],["class","form-text text-danger",4,"ngIf"],[1,"form-group","mt-4"],["type","submit",1,"btn","btn-warning",3,"disabled"],[1,"row","align-content-center","border-top"],[1,"col-12","text-center"],[1,"btn","btn-link","text-success",3,"routerLink"],[1,"btn","btn-link","text-danger",3,"routerLink"],[1,"form-text","text-danger"]],template:function(t,e){if(1&t){const t=s.Ob();s.Nb(0,"div",0),s.Nb(1,"div",1),s.Nb(2,"div",2),s.Nb(3,"div",3),s.sc(4,"My Scheduler"),s.Mb(),s.Nb(5,"div",4),s.Nb(6,"form",5,6),s.Vb("ngSubmit",function(){s.lc(t);const n=s.jc(7);return e.onLogin(n)}),s.Nb(8,"div",7),s.Nb(9,"label",8),s.sc(10,"Email Address:"),s.Mb(),s.Jb(11,"input",9),s.Mb(),s.Nb(12,"div",7),s.Nb(13,"label",10),s.sc(14,"Password:"),s.Mb(),s.Jb(15,"input",11),s.rc(16,g,2,0,"small",12),s.Mb(),s.Nb(17,"div",13),s.Nb(18,"button",14),s.sc(19,"Login"),s.Mb(),s.Mb(),s.Mb(),s.Nb(20,"div",15),s.Nb(21,"div",16),s.Nb(22,"button",17),s.Nb(23,"small"),s.sc(24,"Create Account"),s.Mb(),s.Mb(),s.Nb(25,"span"),s.sc(26," - "),s.Mb(),s.Nb(27,"button",18),s.Nb(28,"small"),s.sc(29,"Forgot Password"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb()}if(2&t){const t=s.jc(7);s.xb(16),s.cc("ngIf",!e.valid),s.xb(2),s.cc("disabled",!t.form.valid),s.xb(4),s.cc("routerLink",s.dc(4,m)),s.xb(5),s.cc("routerLink",s.dc(5,f))}},directives:[r.n,r.g,r.h,r.a,r.f,r.i,r.k,r.b,r.e,o.j,c.c],styles:[".login__bg-color[_ngcontent-%COMP%]{background-color:#3f4896}"]}),t})()},{path:"register",component:u},{path:"password-recovery",component:(()=>{class t{constructor(t){this.authService=t}ngOnInit(){}onRecover(t){this.authService.getRecoveryLink(t.value).subscribe(t=>{this.message=t.message})}}return t.\u0275fac=function(e){return new(e||t)(s.Ib(i.a))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-forgot-password"]],decls:18,vars:6,consts:[[1,"row","h-100","login__bg-color","text-light"],[1,"col-12"],[1,"row","h-100","align-content-center","justify-content-center"],[1,"col-12","display-4","text-center","mb-5"],[1,"col-10","col-lg-4","border","rounded","pt-3"],[3,"ngSubmit",4,"ngIf"],["class","row justify-content-center pb-3",4,"ngIf"],[1,"row","align-content-center","border-top"],[1,"col-12","text-center"],[1,"btn","btn-link","text-warning",3,"routerLink"],[1,"btn","btn-link","text-success",3,"routerLink"],[3,"ngSubmit"],["f","ngForm"],[1,"form-group"],["for","email"],["id","email","type","text","placeholder","Email Id","name","email","ngModel","","required","","email","",1,"form-control"],[1,"form-group","mt-4"],["type","submit",1,"btn","btn-danger",3,"disabled"],[1,"row","justify-content-center","pb-3"]],template:function(t,e){1&t&&(s.Nb(0,"div",0),s.Nb(1,"div",1),s.Nb(2,"div",2),s.Nb(3,"div",3),s.sc(4,"My Scheduler"),s.Mb(),s.Nb(5,"div",4),s.rc(6,p,9,1,"form",5),s.rc(7,M,2,1,"div",6),s.Nb(8,"div",7),s.Nb(9,"div",8),s.Nb(10,"button",9),s.Nb(11,"small"),s.sc(12,"Log In"),s.Mb(),s.Mb(),s.Nb(13,"span"),s.sc(14," - "),s.Mb(),s.Nb(15,"button",10),s.Nb(16,"small"),s.sc(17,"Create Account"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb()),2&t&&(s.xb(6),s.cc("ngIf",!e.message),s.xb(1),s.cc("ngIf",e.message),s.xb(3),s.cc("routerLink",s.dc(4,h)),s.xb(5),s.cc("routerLink",s.dc(5,v)))},directives:[o.j,c.c,r.n,r.g,r.h,r.a,r.f,r.i,r.k,r.b],styles:[".login__bg-color[_ngcontent-%COMP%]{background-color:#3f4896}"]}),t})()},{path:"password-reset/:token",component:(()=>{class t{constructor(t,e,n){this.authService=t,this.route=e,this.router=n}ngOnInit(){this.valid=!1,this.route.params.subscribe(t=>{this.token=t.token})}onReset(t){this.authService.resetPassword(t.value,this.token).subscribe(t=>{t.valid&&(this.valid=!0,this.message=t.message)})}}return t.\u0275fac=function(e){return new(e||t)(s.Ib(i.a),s.Ib(c.a),s.Ib(c.b))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-reset-password"]],decls:18,vars:6,consts:[[1,"row","h-100","login__bg-color","text-light"],[1,"col-12"],[1,"row","h-100","align-content-center","justify-content-center"],[1,"col-12","display-4","text-center","mb-5"],[1,"col-10","col-lg-4","border","rounded","pt-3"],[3,"ngSubmit",4,"ngIf"],["class","row justify-content-center pb-3",4,"ngIf"],[1,"row","align-content-center","border-top"],[1,"col-12","text-center"],[1,"btn","btn-link","text-warning",3,"routerLink"],[1,"btn","btn-link","text-success",3,"routerLink"],[3,"ngSubmit"],["f","ngForm"],[1,"form-group"],["for","password"],["id","password","type","password","placeholder","Password","name","password","required","","minlength","6","maxlength","15",1,"form-control",3,"ngModel","ngModelChange"],["for","confirm_password"],["id","confirm_password","type","password","placeholder","Confirm Password","name","password2","required","","minlength","6","maxlength","15",1,"form-control",3,"ngModel","ngModelChange"],["class","form-text text-danger",4,"ngIf"],[1,"form-group","mt-4"],["type","submit",1,"btn","btn-success",3,"disabled"],[1,"form-text","text-danger"],[1,"row","justify-content-center","pb-3"]],template:function(t,e){1&t&&(s.Nb(0,"div",0),s.Nb(1,"div",1),s.Nb(2,"div",2),s.Nb(3,"div",3),s.sc(4,"My Scheduler"),s.Mb(),s.Nb(5,"div",4),s.rc(6,w,14,4,"form",5),s.rc(7,x,2,1,"div",6),s.Nb(8,"div",7),s.Nb(9,"div",8),s.Nb(10,"button",9),s.Nb(11,"small"),s.sc(12,"Log In"),s.Mb(),s.Mb(),s.Nb(13,"span"),s.sc(14," - "),s.Mb(),s.Nb(15,"button",10),s.Nb(16,"small"),s.sc(17,"Create Account"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb()),2&t&&(s.xb(6),s.cc("ngIf",!e.message),s.xb(1),s.cc("ngIf",e.message),s.xb(3),s.cc("routerLink",s.dc(4,y)),s.xb(5),s.cc("routerLink",s.dc(5,k)))},directives:[o.j,c.c,r.n,r.g,r.h,r.a,r.k,r.e,r.d,r.f,r.i],styles:[".login__bg-color[_ngcontent-%COMP%]{background-color:#3f4896}"]}),t})()}]}];let C=(()=>{class t{}return t.\u0275mod=s.Gb({type:t}),t.\u0275inj=s.Fb({factory:function(e){return new(e||t)},imports:[[c.f.forChild(I)],c.f]}),t})(),j=(()=>{class t{}return t.\u0275mod=s.Gb({type:t}),t.\u0275inj=s.Fb({factory:function(e){return new(e||t)},providers:[],imports:[[]]}),t})(),L=(()=>{class t{}return t.\u0275mod=s.Gb({type:t}),t.\u0275inj=s.Fb({factory:function(e){return new(e||t)},imports:[[o.b,r.c,C,j]]}),t})()}}]);