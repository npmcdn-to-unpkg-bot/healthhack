import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {ChatFormComponent} from '../chatForm/chatForm';
import {MessageListComponent} from '../messageList/messageList';
import {APP_SERVICES} from '../../services/services';
import {QuestionService} from "../../services/questionService";
import {UnicodeToDatePipe} from "../../unicodetodate.pipe";

@Component({
    selector: 'question',
    templateUrl: 'app/components/question/question.html',
    directives: [ChatFormComponent, MessageListComponent],
    pipes: [UnicodeToDatePipe],
    providers: APP_SERVICES
})
export class QuestionComponent implements OnChanges{

    @Input()questionId = null;

    @Output() reply = new EventEmitter();

    response;
    question;
    responses;

    constructor(private _questionService: QuestionService) {}

    public onClick($event) {
        console.log($event.target.id);
        this.response = $event.target.innerHTML;

        this.reply.emit({
            reply : $event.target.innerText,
            topic: $event.target.id,
            question : this.question,
            responses : this.responses
        });
    }

    ngOnChanges(){
        if (!this.questionId) {
            return;
        }
        this._questionService.getQuestionById(this.questionId)
            .subscribe(question => {
                this.question = question.question;
                this.responses = question.responses;
                console.log(question, question.responses)
            });
    }
}