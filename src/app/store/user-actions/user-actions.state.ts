import { Injectable } from "@angular/core";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {SearchResultModel} from "../../shared/models/search-result/search-result.model";
import {UserActions} from "./user-actions.action";
import {ApiService} from "../../services/api-service.service";
import {lastValueFrom} from "rxjs";

export interface UserActionsStateModel
{
    userActions : UserActionModel | null,
    pev : null,
    cur : null
}
export interface UserActionModel
{
  searchResult : SearchResultModel[],
  searchKey : string
}

@State<UserActionsStateModel>
(
    {
        name:'userAction',
        defaults:
        {
            userActions:
            {
                searchKey : 'a',
                searchResult :
                []
            },
            cur : null,
            pev : null
        }
    }
)

@Injectable()
export class UserActionsState {

  @Selector()
  static searchedResult( state : UserActionsStateModel):SearchResultModel[]
  {
      return state.userActions?.searchResult ?? [];
  }

  @Selector()
  static searchKey( state : UserActionsStateModel):string
  {
    return state.userActions?.searchKey ?? "";
  }

  constructor( private store : Store,private apiService : ApiService ) {}

  @Action(UserActions.searchUserAsync)
  async searchUserAsync(ctx : StateContext<UserActionsStateModel>, action : UserActions.searchUserAsync){

      const state = ctx.getState();

      const result = await lastValueFrom(this.apiService.searchUserAsync(action.searchTerm));

      if(result != null)
      {
        let userAction =
        {
          searchKey : action.searchTerm,
          searchResult : result
        }


        ctx.setState
        (
          {
            ...state,
            userActions: userAction,
          }
        );
      }

  }

}
