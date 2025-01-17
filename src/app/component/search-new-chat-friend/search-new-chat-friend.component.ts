import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {CommonModule} from '@angular/common';
import {ChatListAction} from '../../store';
import {MenuNavigationAction} from '../../store/menu-navigation/menu-navigation.action';
import {TextInputComponent} from "../../shared/components/text-input/text-input.component";
import {ListViewComponent} from "../../shared/components/list-view/list-view.component";
import {TextInputModel} from "../../shared/models/common/ui-models";

@Component({
    selector: 'app-search-new-chat-friend',
    standalone: true,
    imports: [CommonModule, TextInputComponent, ListViewComponent],
    templateUrl: './search-new-chat-friend.component.html',
    styleUrl: './search-new-chat-friend.component.css'
})
export class SearchNewChatFriendComponent implements OnInit {
    searchTerm: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter user email',
        hasErrors: false
    };

    constructor(private route: Router, private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new ChatListAction.SelectNewChat());
        this.store.dispatch(new MenuNavigationAction.UpdateMenuCurrentUrl("home/chatList", this.route.url));
    }

    searchUserAsync() {

    }
}
