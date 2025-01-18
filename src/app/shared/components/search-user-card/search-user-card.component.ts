import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {CommonModule} from '@angular/common';
import {FriendshipStatus} from '../../enums/user.enum';
import {SearchResultModel} from "../../models/search-result/search-result.model";
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {map, Observable, take} from "rxjs";
import {UserActions} from "../../../store/user-actions/user-actions.action";
import {UserActionsState} from "../../../store/user-actions/user-actions.state";

@Component({
    selector: 'app-search-user-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search-user-card.component.html',
    styleUrl: './search-user-card.component.css'
})
export class SearchUserCardComponent implements OnInit {

    @Input() userModel:SearchResultModel;
    user$: Observable<SearchResultModel | undefined>;
    selfUserId: number;


    protected readonly FriendshipStatus = FriendshipStatus;

    constructor(private store: Store) {}

    ngOnInit() {

        this.store.select(UserInfoState.getUserInfo).pipe
        (
            take(1),
            map(x => this.selfUserId = x?.id ?? 0)
        ).subscribe();

        this.user$ = this.store.select(UserActionsState.searchedResultById(this.userModel.id));

        console.log(this.userModel.id);
    }

    get avatar(): string {
        return `assets/avatar.jpg`;
    }

    sendFriendRequest(): void {
        this.store.dispatch(new UserActions.sentMessageRequestAsync(this.selfUserId, this.userModel.id));
        this.user$ = this.store.select(UserActionsState.searchedResultById(this.userModel.id));
    }

    cancelFriendRequest(): void {
        this.store.dispatch(new UserActions.cancelMessageRequestAsync(this.selfUserId, this.userModel.id));
    }

    onSelect(): void {
        //this.router.navigate([this.user.id], { relativeTo: this.activeRouter });
    }

}
