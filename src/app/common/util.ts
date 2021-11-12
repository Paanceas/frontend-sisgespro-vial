import Swal from 'sweetalert2';
export class Util {

  delObj(nom: string): void {
    sessionStorage.removeItem(btoa(nom))
  }
  setObj(nom: string, info: any): void {
    sessionStorage.setItem(btoa(nom), btoa(info));
  }

  getObj(nom: string, trasnsformJson?: boolean): any {
    try {
      let obj:any = sessionStorage.getItem(btoa(nom)) ? sessionStorage.getItem(btoa(nom)) : null;
      if(obj){
        obj = atob(obj);
        if (trasnsformJson) {
          obj = JSON.parse(obj);
        }
      }
      return obj;
    } catch (error) {
      return null;
    }
  }


  validObject(object:any){
    let val:boolean = true;
    Object.keys(object).forEach(el => {
       console.log(el);
       if(!object[el]){
        Swal.fire('Advertencia', "Falta el campo "+el, 'warning');
        val = false;
       }
    });
    return val;
  }

  // clearObj(data:any,trasnsformJson?:boolean):any{
  //   try {
  //     let nom = 'temporal';
  //     this.setObj(nom,JSON.stringify(data));
  //     let  obj = sessionStorage.getItem(btoa(nom)) ? atob(sessionStorage.getItem(btoa(nom))) : null;
  //     this.delObj(nom);
  //     if(trasnsformJson){
  //        obj = JSON.parse(obj);
  //     }
  //     return obj;
  //  } catch (error) {
  //     return null;
  //  }
  // }

  // validUser(usuario:IngresarUsurio, msn:string ){
  //   let session:IngresarUsurio = this.getObj("usuario",true);
  //   if(session){
  //     if(session.idUsuario === usuario.idUsuario){
  //       Swal.fire('Cuidado', `${msn}`, 'warning');
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // onlyExist(usuario:IngresarUsurio){
  //   let session:IngresarUsurio = this.getObj("usuario",true);
  //   if(session){
  //     if(session.idUsuario === usuario.idUsuario){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}
