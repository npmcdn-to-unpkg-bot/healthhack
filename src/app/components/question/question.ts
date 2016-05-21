import {Component, Input, OnChanges} from '@angular/core';
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
    question = {};


    constructor(private _questionService: QuestionService) {
    }

    ngOnChanges(){
        this._questionService.getQuestionById(this.questionId)
            .subscribe(question => {
                console.log(
                    question,
                    question.message
                );
                if (question.message) {
                    this.question = {
                        question : {
                            question : {
                                text : "this should never appear"
                            }
                        }
                    }
                }
                console.log("call: ", question)
                this.question = question;
            });
    }
}