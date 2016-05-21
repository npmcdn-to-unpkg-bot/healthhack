import {Component, OnInit} from '@angular/core';
import {ChatFormComponent} from '../chatForm/chatForm';
import {MessageListComponent} from '../messageList/messageList';
import {APP_SERVICES} from '../../services/services';
import {QuestionService} from "../../services/questionService";
import {QuestionListComponent} from "../questionList/questionList";
import {QuestionComponent} from "../question/question";

@Component({
    selector: 'pairedchatting-app',
    templateUrl: 'app/components/app/app.html',
    directives: [ChatFormComponent, MessageListComponent, QuestionListComponent, QuestionComponent],
    providers: APP_SERVICES
})
export class AppComponent implements OnInit{
    selectedQuestion:string;
    questionList:Array;
    selectedReply:string;

    constructor(private _questionService:QuestionService) {
    }

    ngOnInit(){
        this.getQuestionList().subscribe(list => {
            this.questionList = list;
        });
    }

    onSelectReply(reply) {
        this.selectedReply = reply.reply;
    }

    onSelectQuestion(question) {
        this.selectedQuestion = question.selectedQuestion;
    }

    public getQuestionList() {
        return this._questionService.list();
    }

    public periodicRefresh() {
        this.getQuestionList().subscribe(x => {
            console.log(x)
            setTimeout(() => this.periodicRefresh(), 800);

        }, () => setTimeout(() => this.periodicRefresh(), 1000));
    }
}
