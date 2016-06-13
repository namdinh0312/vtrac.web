/**
 * Created by namdv on 10/06/2016.
 */
/*jshint esversion: 6 */
export default class AjaxHelper {
    constructor() {
    }

    getPromise(url) {
        return request(url, 'GET');
    }

    deletePromise(url) {
        return request(url, 'DELETE');
    }

    postPutJson(url, jsonData) {
        return request(url, 'POST', jsonData, 'application/json');
    }

    postPutFile(url, file) {
        return request(url, 'POST', file, file.type);
    }
}

function request(url, method, data, contentType) {
    let promise =
        new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            if (data && (method === 'POST' || method === 'PUT')) {
                xhr.setRequestHeader('Content-Type', contentType);
                xhr.send(data);
            }
            else {
                xhr.send();
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr);
                    }
                    else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.onerror = function () {
                reject(this.statusText);
            };
        });
    return promise;
}


