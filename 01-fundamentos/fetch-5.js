// fetch('https://reqres.in/api/users/1000')
//     .then(resp => {
//         if (resp.ok) {
//             return resp.json();
//         } else {
//             // console.log('No existe el usuario 1000');
//             throw new Error('No existe el usuario 1000');
//         }
//     })
//     .then(console.log)
//     .catch(error => {
//         console.log('Error en la petición');
//         console.log(error);
//     });

fetch('https://reqres.in/api/users/1')

    .then(resp => {

        resp.clone().json().then(usuario => {
            console.log(usuario.data);
        });

        resp.clone().json().then(usuario => {
            console.log(usuario.data);
        });

        resp.json().then(usuario => {
            console.log(usuario.data);
        });

    });