import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {ChatFormComponent} from '../chatForm/chatForm';
import {MessageListComponent} from '../messageList/messageList';
import {APP_SERVICES} from '../../services/services';
import {QuestionService} from "../../services/questionService";

@Component({
    selector: 'question',
    templateUrl: 'app/components/question/question.html',
    directives: [ChatFormComponent, MessageListComponent],
    providers: APP_SERVICES
})
export class QuestionComponent implements OnChanges{

    @Input()questionId = null;

    @Output() reply = new EventEmitter();

    response;
    question;
    responses = [];

    constructor(private _questionService: QuestionService) {}

    public onClick($event) {
        console.log($event)
        this.response = $event.target.innerHTML;
        console.log("i should emit: ", $event.target.innerText, this.reply.emit, this.reply.emit({
            reply: $event.target.innerText
        }));
        this.reply.emit({
            reply : $event.target.innerText
        });
    }

    ngOnChanges(){
        if (!this.questionId) {
            return;
        }
        this._questionService.getQuestionById(this.questionId)
            .subscribe(question => {
                this.question = question.question;
                console.log(question, question.responses)
                for (let property in question.responses) {
                    if(question.responses.hasOwnProperty(property)) {
                        this.responses.push(property);
                    }
                }
            });
    }
}