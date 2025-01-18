import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext, Store} from "@ngxs/store";
import {SearchResultModel} from "../../shared/models/search-result/search-result.model";
import {UserActions} from "./user-actions.action";
import {ApiService} from "../../services/api-service.service";
import {lastValueFrom} from "rxjs";
import {CancelMessageRequest, SendMessageRequest} from "../../shared/models/chat/message-request.model";
import {FriendshipStatus} from "../../shared/enums/user.enum";

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
        name: 'userActions',
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

    static searchedResultById(userId: number) {
        return createSelector(
            [UserActionsState.searchedResult],
            (searchResults: SearchResultModel[]) => searchResults.find(result => result.id === userId)
        );
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

        let searchAction =
            {
                searchKey: action.searchTerm,
                searchResult: result ?? [],
            }

        ctx.setState
        (
            {
                ...state,
                searchActions: searchAction
            }
        );

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

        if (res != null && res) {
            let state = ctx.getState();

            let updatedSearchActions = {
                ...state.searchActions,
                searchKey: state.searchActions?.searchKey ?? "",
                searchResult: state.searchActions?.searchResult.map(result => {
                    if (result.id === action.otherUserId) {
                        return {
                            ...result,
                            friendshipStatus: FriendshipStatus.Pending
                        };
                    }
                    return result;
                }) ?? []
            };

            ctx.setState({
                ...state,
                searchActions: updatedSearchActions
            });
        }

    }

    @Action(UserActions.cancelMessageRequestAsync)
    async cancelMessageRequestAsync(
        ctx: StateContext<UserActionsStateModel>,
        action: UserActions.cancelMessageRequestAsync
    ) {

        let payload: CancelMessageRequest = {
            selfUserId: action.selfUserId,
            requestedUserId: action.otherUserId,
        }
        let res = await lastValueFrom(this.apiService.cancelMessageRequest(payload));

        if (res != null && res) {
            let state = ctx.getState();

            let updatedSearchActions = {
                ...state.searchActions,
                searchKey: state.searchActions?.searchKey ?? "",
                searchResult: state.searchActions?.searchResult.map(result => {
                    if (result.id === action.otherUserId) {
                        return {
                            ...result,
                            friendshipStatus: FriendshipStatus.New
                        };
                    }
                    return result;
                }) ?? []
            };

            ctx.setState({
                ...state,
                searchActions: updatedSearchActions
            });
        }
    }



    @Action(UserActions.createNewAccountAsync)
    async createNewAccount(
        ctx: StateContext<UserActionsStateModel>,
        action: UserActions.createNewAccountAsync
    ) {
        let rsp = await lastValueFrom(this.apiService.userSignUp(action.userInfo));

        if (rsp != null) {
            console.log(rsp);
        }
    }

}
