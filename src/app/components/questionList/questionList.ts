import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ChatFormComponent} from '../chatForm/chatForm';
import {MessageListComponent} from '../messageList/messageList';
import {APP_SERVICES} from '../../services/services';


@Component({
    selector: 'questionList',
    templateUrl: 'app/components/questionList/questionList.html',
    directives: [ChatFormComponent, MessageListComponent],
    providers: APP_SERVICES
})
export class QuestionListComponent {
    @Input()questionList:Array;
    @Output()questionSelect = new EventEmitter();

    public onClick($event) {
        this.questionSelect.emit({
            selectedQuestion : $event.target.id
        });
    }
}