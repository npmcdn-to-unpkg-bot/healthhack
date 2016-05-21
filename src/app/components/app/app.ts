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
export class AppComponent implements OnInit {
    selectedQuestion:string;
    questionList:Array;
    selectedReply:string;

    firstnameArray = ["Jascha", "Leonard", "Michael", "David", "Wasili", "Mitja", "Patrick", "Lucas", "Michael", "Luana", "Ilja", "Tom", "Christian", "Peter", "Dimitri", "Leslie", "Lional", "Erhan", "William", "Franz", "Gunner", "Claus", "Eligiusz", "Matthias", "Bernhard", "Christian", "Frank", "Armin", "David", "Oliver"];
    lastnameArray = ["Bahr", "Quintern", "Luthe", "Heinze", "Kek", "Kleider", "Kübler", "Schütz", "Staffa", "Stelz", "Sterz", "van Heyden", "von Hössle", "Bytschok", "Pan", "Weilbach", "Ervard", "Brückner", "Amann", "Arrergui", "Behan", "Gottmann", "Milford", "Pscherer", "Rust", "Schäfer", "Schönthaler", "Skvora", "Zahn"];

    constructor(private _questionService:QuestionService) {
    }

    ngOnInit() {
        this.getQuestionList()
            .subscribe(list => {
                for (var index = 0; index < list.length; index++) {
                    list[index].name = this.randomName();
                }
                this.questionList = list;
            });
    }

    randomName() {
        var firstname = this.firstnameArray[Math.floor(Math.random() * this.firstnameArray.length)];
        var lastname = this.lastnameArray[Math.floor(Math.random() * this.lastnameArray.length)];

        return firstname + " " + lastname;
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
            setTimeout(() => this.periodicRefresh(), 800);

        }, () => setTimeout(() => this.periodicRefresh(), 1000));
    }
}
