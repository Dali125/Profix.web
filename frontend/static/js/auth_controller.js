


export async function Login(formData) {
    return new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/login", true);

            xhr.onerror = function () {
                reject([null, xhr.responseText || 'An error occurred']);
            };

            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve([xhr.response || 'Success', null]);
                } else {
                    reject([null, xhr.statusText || 'Failed']);
                }
            };

            xhr.send(JSON.stringify(formData));
        } catch (error) {
            reject([null, error.message || 'Unexpected error occurred']);
        }
    });
}


export async function Logout() {

    return new Promise((resolve, reject) => {


        try {

            const xhr = new XMLHttpRequest()

            xhr.open('POST')
            xhr.onerror = () => {
                reject([null, xhr.responseText || 'An error occurred']);
            }
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve([xhr.response || 'Success', null]);
                } else {
                    reject([null, xhr.statusText || 'Failed']);
                }
            };

            xhr.send();
            
        } catch (error) {
            
        }

    })
}