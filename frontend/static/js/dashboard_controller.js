export async function getDahboardData(){


    return new Promise((resolve, reject) => {


        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/dashboard/data');




        xhr.timeout = 30000
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve([JSON.parse(xhr.response), null]);
            } else {
                reject([null, xhr.statusText || 'Failed']);
            }
        };

        xhr.onerror = () => {
            reject([null, xhr.statusText || 'Failed']);
        }


        xhr.ontimeout = () =>{

            reject( [null, xhr.statusText || 'Timeout'] )
        }

        


        xhr.send();
    })
}