import {Component, Input} from '@angular/core';
import {Store} from '@ngxs/store';
import {CommonModule} from '@angular/common';
import {FriendshipStatus} from '../../enums/user.enum';
import {SearchResultModel} from "../../models/search-result/search-result.model";
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {map, take} from "rxjs";
import {UserActions} from "../../../store/user-actions/user-actions.action";

@Component({
    selector: 'app-search-user-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search-user-card.component.html',
    styleUrl: './search-user-card.component.css'
})
export class SearchUserCardComponent {

    @Input() user: SearchResultModel;
    selfUserId: number;
    protected readonly FriendshipStatus = FriendshipStatus;

    constructor(private store: Store,) {
        console.log(this.user);
        this.store.select(UserInfoState.getUserInfo).pipe
        (
            take(1),
            map(x => this.selfUserId = x?.id ?? 0)
        ).subscribe();
    }

    get avatar(): string {
        return `assets/avatar.jpg`;
    }

    sendFriendRequest(): void {
        console.log("OK");
        this.store.dispatch(new UserActions.sentMessageRequestAsync(this.selfUserId, this.user.id));
    }

    onSelect(): void {
        //this.router.navigate([this.user.id], { relativeTo: this.activeRouter });
    }

}
