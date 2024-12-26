import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {UserInfoState} from "../store/user-info/user-info.state";
import {inject} from "@angular/core";
import {map, Observable, take} from "rxjs";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> =>
{
  const store = inject(Store);
  const router = inject(Router);


  return store.select(UserInfoState.isUserLogIn).pipe(
    take(1),
    map(isLoggedIn =>
    {
      if (isLoggedIn)
      {
        return true;
      }
      else
      {
        router.navigate(['/welcome/signInAccount']).then();
        return false;
      }
    })
  );
};
