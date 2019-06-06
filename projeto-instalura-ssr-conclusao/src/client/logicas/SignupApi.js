import 'isomorphic-fetch';

export default class SignupApi {

	static cadastra (login, senha, urlPerfil) {
		return dispatch => {
			const requestInfo = {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify({login: login, senha: senha, urlPerfil: urlPerfil}),
				header: new Headers ({
					'Content-type':'application/json'
				})
			};
			localStorage.removeItem('auth-token');
			fetch(`https://instalura-api.herokuapp.com/api/usuarios?X-AUTH-TOKEN=`, requestInfo)
			.then(response => {
				console.log(response);
				if(response.ok){
					browserHistory.push('/');
				} else {
					throw new Error("não foi possível cadastrar");
				}					
			})
			.catch( error => {
				alert(error);
			});
		}
	}
}