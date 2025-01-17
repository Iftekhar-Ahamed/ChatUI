import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {SearchResultModel} from "../../shared/models/search-result/search-result.model";
import {UserActions} from "./user-actions.action";
import {ApiService} from "../../services/api-service.service";
import {lastValueFrom} from "rxjs";
import {SendMessageRequest} from "../../shared/models/chat/message-request.model";

export interface UserActionsStateModel {
    searchActions: SearchResultSateModel | null,
    messageActions: MessageRequestResultModel | null,
    pev: null,
    cur: null
}


export interface SearchResultSateModel {
    searchResult: SearchResultModel[],
    searchKey: string,
}

export interface MessageRequestResultModel {
    searchResult: SearchResultModel[],
    searchKey: string,
}


@State<UserActionsStateModel>
(
    {
        name: 'userAction',
        defaults:
            {
                searchActions: null,
                messageActions: null,
                cur: null,
                pev: null
            }
    }
)

@Injectable()
export class UserActionsState {

    @Selector()
    static searchedResult(state: UserActionsStateModel): SearchResultModel[] {
        return state.searchActions?.searchResult ?? [];
    }

    @Selector()
    static searchKey(state: UserActionsStateModel): string {
        return state.searchActions?.searchKey ?? "";
    }

    constructor(private store: Store, private apiService: ApiService) {
    }

    @Action(UserActions.searchUserAsync)
    async searchUserAsync(ctx: StateContext<UserActionsStateModel>, action: UserActions.searchUserAsync) {

        const state = ctx.getState();

        const result = await lastValueFrom(this.apiService.searchUserAsync(action.searchTerm));

        if (result != null) {
            let searchAction =
                {
                    searchKey: action.searchTerm,
                    searchResult: result,
                }

            ctx.setState
            (
                {
                    ...state,
                    searchActions: searchAction
                }
            );
        }

    }

    @Action(UserActions.getAllMessageRequestsAsync)
    async getAllMessageRequestsAsync(
        ctx: StateContext<UserActionsStateModel>,
        action: UserActions.getAllMessageRequestsAsync
    ) {

        const state = ctx.getState();

        const result = await lastValueFrom(this.apiService.getAllMessageRequests());

        if (result != null) {


            ctx.setState
            (
                {
                    ...state,
                    messageActions: null,
                }
            );
        }

    }

    @Action(UserActions.sentMessageRequestAsync)
    async sentMessageRequestAsync(
        ctx: StateContext<UserActionsStateModel>,
        action: UserActions.sentMessageRequestAsync
    ) {

        let payload: SendMessageRequest = {
            selfUserId: action.selfUserId,
            requestedUserId: action.otherUserId,
        }
        let res = await lastValueFrom(this.apiService.sentMessageRequest(payload));
    }

    @Action(UserActions.createNewAccountAsync)
    async  createNewAccount(
        ctx: StateContext<UserActionsStateModel>,
        action: UserActions.createNewAccountAsync
    )
    {
        let rsp = await lastValueFrom(this.apiService.userSignUp(action.userInfo));

        if(rsp != null)
        {
            console.log(rsp);
        }
    }

}
