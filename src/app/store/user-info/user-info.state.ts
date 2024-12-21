import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {UserInfoModel} from "../../shared/models/user.model";
import {UserInfoAction} from "./user-info.action";
import {lastValueFrom} from "rxjs";
import {ApiService} from "../../services/api-service.service";

export interface UserInfoStateModel
{
  user: UserInfoModel | null;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
}

@State<UserInfoStateModel>
(
  {
    name: 'userInformation',
    defaults:{
      user: null,
      accessToken: "Not found",
      refreshToken: "Not found",
      isLoggedIn: false
    }
  }
)

@Injectable()
export class UserInfoState{

  @Selector()
  static getUserInfo(state: UserInfoStateModel): UserInfoModel | null {

    return state.user;
  }

  @Selector()
  static getAccessToken(state: UserInfoStateModel): string
  {
    return state.accessToken ?? "";
  }

  @Selector()
  static isUserLogIn(state: UserInfoStateModel): boolean
  {
    return state.isLoggedIn;
  }

  constructor(private apiService: ApiService){}

  @Action(UserInfoAction.userLogInAsync)
  async userLogIn(ctx: StateContext<UserInfoStateModel>, action: UserInfoAction.userLogInAsync)
  {
    let state = ctx.getState();

    const tokenRes = await lastValueFrom(this.apiService.userLogin(action.payload));

    if(tokenRes != null && tokenRes.data != null){

      let data = tokenRes.data;

      ctx.setState
      (
        {
          ...state,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isLoggedIn : tokenRes.success
        }
      );

      const userInfoRsp = await lastValueFrom(this.apiService.getUserInfo());

      if(userInfoRsp != null){

        let userInformation : UserInfoModel = {
          id : userInfoRsp.userId,
          name : userInfoRsp.name,
          email: userInfoRsp.email,
          avatar : 'avater.jpg'
        };

        ctx.setState
        (
          {
            ...state,
            user : userInformation,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoggedIn : tokenRes.success
          }
        );
      }

    }
  }

  @Action(UserInfoAction.userLogOutAsync)
  async userLogOut(ctx: StateContext<UserInfoStateModel>)
  {
    const currentState = ctx.getState();

    if (currentState.user === null)
    {
      return;
    }

    ctx.setState
    (
      {
        user: null,
        accessToken: "",
        refreshToken: "",
        isLoggedIn: false
      }
    );
  }

}
