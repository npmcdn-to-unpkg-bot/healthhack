import {Component, Input} from '@angular/core';
import {ChatFormComponent} from '../chatForm/chatForm';
import {MessageListComponent} from '../messageList/messageList';
import {APP_SERVICES} from '../../services/services';

@Component({
    selector: 'question',
    templateUrl: 'app/components/question/question.html',
    directives: [ChatFormComponent, MessageListComponent],
    providers: APP_SERVICES
})
export class QuestionComponent {
    @Input()question:string;

}