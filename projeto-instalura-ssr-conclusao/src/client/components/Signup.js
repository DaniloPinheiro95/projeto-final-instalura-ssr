import React, { Component } from 'react';
import SignupApi from '../logicas/SignupApi.js';
import {connect} from 'react-redux';


class ErrorList extends Component{

  render(){
    return (<li>{this.props.error}</li>);
  }

}


class Signup extends Component {
	
	constructor(props){
        super(props);        
        this.state = {msgs: [this.props.location.query.msg]};
    }

    validar(email, senha, confirmacao_senha){
    	let mensagens_erro = [];

    	if(senha != confirmacao_senha){
    		mensagens_erro.push('Senha não confere');
    	}

    	if(email == senha){
    		mensagens_erro.push('Senha igual ao username');
    	}

    	this.setState({
    		msgs: mensagens_erro
    	});

    	if(mensagens_erro.length > 0){
    		return false;
    	}

    	return true;
    }

    cadastrar(event){
    	event.preventDefault();

    	if(!(this.validar(this.login.value, this.senha.value, this.confirma_senha_cadastro.value))){
    		event.target.reset();
    	} else {
    		this.props.cadastra(this.login.value, this.senha.value, this.urlPerfil.value);
    	}    	
    }

	render(){
		return (
			<div className="signup-box">
				<h1>Signup</h1>
				<ul>
		          {this.state.msgs.map(function(item,index){
		              return (
		                  <ErrorList key={index} error={item} />
		              );
		          })}
		        </ul>
				<form onSubmit={this.cadastrar.bind(this)}>
					<label htmlFor="sign-login">Login</label>
                    <input id="sign-login" type="text" ref={(input) => this.login = input} required />

                    <label htmlFor="sign-senha">Senha</label>
                    <input id="sign-senha" type="password" ref={(input) => this.senha = input} required />

                    <label htmlFor="sign-confirmacao">Confirmação</label>
                    <input id="sign-confirmacao" type="password" ref={(input) => this.confirma_senha_cadastro = input} required />

                    <label htmlFor="sign-url">URL do perfil</label>
                    <input id="sign-url" type="text" ref={(input) => this.urlPerfil = input} pattern="https?://.+" title="Inclua http://" required />

                    <input type="submit" value="Signup"/>
                </form>
			</div>
		);
	}

}

const mapStateToProps = state => {
  return {msgs: []};
};

const mapDispatchToProps = dispatch => {
  return {
    cadastra : (login, senha, urlPerfil) => {
      dispatch(SignupApi.cadastra(login, senha, urlPerfil));
    }
  }
}

const SignupContainer = connect(mapStateToProps,mapDispatchToProps)(Signup);

export default SignupContainer