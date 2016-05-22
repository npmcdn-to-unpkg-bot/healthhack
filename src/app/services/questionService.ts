import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class QuestionService {
    private _baseApi:string = 'http://139.59.152.219:3000/bot';

    constructor(private _http:Http) {
    }

    getQuestionById(id) {
        return this._http.post(this._baseApi + '/queue/' + id, "")
            .map(r => r.json());
    }

    public list():Observable<Array<string>> {

        return this._http.post(`${this._baseApi}/queueAll`, "")
            .map(r => <Array<string>> r.json());
    }

    public answer(questionId, topic, selectedAnswer) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log(questionId + " ++ " + topic  + " ++ " +  selectedAnswer)
        var bodyPayload = "questionId=" + questionId + "&topic=" + topic + "&response=" + "'" + selectedAnswer + "'";

        return this._http.post(`${this._baseApi}/answer`, bodyPayload, headers);
    }
}
