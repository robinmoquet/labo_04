import { API_ROOT_URL } from "./config";

export default class Request {

    constructor(path = '/', method = 'GET', formData = null, query = {}, token = null) {
        this.path = path;
        this.query = query;
        this.formData = formData;
        this.method = method;
        this.headers = new Headers();
        this.token = token;
    }

    /**
     * @return Promise
     */
    send() {
        return new Promise((resolve, reject) => {

            this.headers.append('Content-Type', 'application/json');
            if(this.token !== null) this.headers.append('Authorization', 'Bearer ' + this.token);

            let init = {
                method: this.method,
                headers: this.headers,
                mode: 'cors'
            }

            if(this.formData !== null) init.body = this._convertFormDataToJson();

            const url = API_ROOT_URL + this.path + this._generateQueryString();

            fetch(url, init)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    if(data.status === 'success') {
                        resolve(data.data);
                    } else reject(data.data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    /**
     * @return string
     */
    _generateQueryString() {
        let queryString = '';
        let keys = Object.keys(this.query);
        let first = true;
        keys.forEach(key => {
            let separator = '&';
            if (first) {
                first = false;
                separator = '?';
            }
            queryString += `${separator}${key}=${this.query[key]}`;
        })
        return queryString;
    }

    _convertFormDataToJson() {
        let json = {};
        this.formData.forEach((value, key) => {
            json[key] = value;
        })
        return JSON.stringify(json);
    }

}