import { Pipe, PipeTransform } from '@angular/core';
import { UserRequest } from '../interfaces/userRequest';

@Pipe({
  name: 'filterMailUser'
})
export class FilterMailUserPipe implements PipeTransform {

  transform(users: UserRequest[], args: string): UserRequest[] {
    let result : UserRequest[] = [];

    if(!args || args?.length < 1 || args.trim() == ''){
      return users;
    }

    for (const usr of users) {
      if(usr.username.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) > -1){
        result = [...result, usr];
      }
  }
  
  return result;
  }

}
