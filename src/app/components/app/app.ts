import {Component, OnInit} from '@angular/core';
import {ChatFormComponent} from '../chatForm/chatForm';
import {MessageListComponent} from '../messageList/messageList';
import {APP_SERVICES} from '../../services/services';
import {QuestionService} from "../../services/questionService";
import {QuestionListComponent} from "../questionList/questionList";
import {QuestionComponent} from "../question/question";
import {Router} from '@angular/router';

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

    constructor(private _questionService:QuestionService, private _router: Router) {
    }

    ngOnInit() {
        this.getQuestionList()
            .subscribe(
                list => {
                    for (var index = 0; index < list.length; index++) {
                        list[index].name = this.randomName();
                    }
                    this.questionList = list;
                },
                err => {
                    if (err.status == 400 && this.questionList.length > 0) {
                        window.location.reload();
                    }
                });
    }

    randomName() {
        var firstname = this.firstnameArray[Math.floor(Math.random() * this.firstnameArray.length)];
        var lastname = this.lastnameArray[Math.floor(Math.random() * this.lastnameArray.length)];

        return firstname + " " + lastname;
    }

    onSelectReply(reply) {
        console.log(reply);
        this.selectedReply = reply.reply;
        this._questionService.answer(this.selectedQuestion, reply.topic, reply.reply);
    }

    onSelectQuestion(question) {
        this.selectedQuestion = question.selectedQuestion;
    }


    onReply() {
        this._questionService.answer(this.selectedQuestion, "thisThaTopic", this.selectedReply).subscribe(
            data => {
                this.selectedQuestion = null;
                this.selectedReply = null;
                this.ngOnInit();
            },
            () => console.log("Request done.")
        );
    }

    public getQuestionList() {
        return this._questionService.list();
    }


    // todo: what is this method supposed to  do? it's only calling itself
    public periodicRefresh() {
        this.getQuestionList().subscribe(x => {
            setTimeout(() => this.periodicRefresh(), 800);

        }, () => setTimeout(() => this.periodicRefresh(), 1000));
    }
}
