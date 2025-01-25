import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {CommonModule} from '@angular/common';
import {ChatListAction} from '../../store';
import {MenuNavigationAction} from '../../store/menu-navigation/menu-navigation.action';
import {TextInputComponent} from "../../shared/components/text-input/text-input.component";
import {ListViewComponent} from "../../shared/components/list-view/list-view.component";
import {TextInputModel} from "../../shared/models/common/ui-models";
import {lastValueFrom, Observable, takeWhile} from "rxjs";
import {UserActions} from "../../store/user-actions/user-actions.action";
import {StringUtils} from "../../utils/string.utils";
import {ListViewModel} from "../../shared/models/common/list-view.model";
import {ListKey} from "../../shared/enums/list-view-key.enum";
import {SearchResultModel} from "../../shared/models/search-result/search-result.model";
import {UserActionsState} from "../../store/user-actions/user-actions.state";

@Component({
    selector: 'app-search-new-chat-friend',
    standalone: true,
    imports: [CommonModule, TextInputComponent, ListViewComponent],
    templateUrl: './search-new-chat-friend.component.html',
    styleUrl: './search-new-chat-friend.component.css'
})
export class SearchNewChatFriendComponent implements OnInit, OnDestroy {
    searchTerm: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter user email',
        isEditable: true,
        hasErrors: false,
    };
    searchResult$: Observable<SearchResultModel[]> = this.store.select(UserActionsState.searchedResult);

    searchResult: ListViewModel = {
        data: [],
        key: ListKey.Search_Result,
    };

    isActive = false;

    constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new ChatListAction.SelectNewChat());
        this.store.dispatch(new MenuNavigationAction.UpdateMenuCurrentUrl("home/chatList", this.router.url));

        this.route.queryParamMap.subscribe(async (params) => {
            const query = params.get('key');
            if (query) {
                this.searchTerm.value = query;
                await this.searchUserAsync();
            }
        });

        this.isActive = true;
    }

    ngOnDestroy() {
        this.isActive = false;
    }

    async searchUserAsync() {
        if (!StringUtils.isEmptyOrWhitespace(this.searchTerm.value)) {

            await lastValueFrom(this.store.dispatch(new UserActions.searchUserAsync(this.searchTerm.value)));

            await this.router.navigate([], {
                queryParams: {key: this.searchTerm.value},
                queryParamsHandling: 'merge', // Keeps existing query params and updates the 'key'
            });
            this.searchResult$.pipe(takeWhile(() => this.isActive)).subscribe((result) => {
                this.searchResult.data = result;
            });
        } else {
            this.searchTerm.hasErrors = true;
            this.searchTerm.errorMessage = 'Enter a valid user email';
        }
    }

}