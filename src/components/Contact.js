import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import linkedin from '../images/linkedin.svg';
import github from '../images/github.svg';
import medium from '../images/medium.svg';
import facebook from '../images/facebook.svg';
import twitter from '../images/twitter.svg';
import loading from '../images/loading.gif';
import Tiago from '../images/tiago.jpg';

class About extends Component {
  state = {
    myName: '',
    myWork: '',
    myDescription: '',
    mySkills: [],
    messageFromUser: '',
    emailFromUser: '',
    sent: false
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tiago !== this.props.tiago) {
      let props = this.props.tiago.allTiagoes[0];
      this.setState({
        myName: props.name,
        myWork: props.work,
        myDescription: props.description,
        mySkills: props.skills
      })
    }
  }

  addMessage = () => {
    const { messageFromUser, emailFromUser } = this.state;
    this.props.addMessage({
      variables: { 
        messageFromUser: messageFromUser,
        emailFromUser: emailFromUser  
      },
      update: (proxy, { data: { createTodo } }) => {
        this.setState({
          sent: true
        })

        setTimeout(() => {
          this.setState({
            sent: false
          })
        },3000)
      },
    })
  };

  render() {
    const { tiago } = this.props;
    let {
      myName,
      myWork,
      myDescription,
      mySkills,
      emailFromUser,
      messageFromUser,
      sent
    } = this.state;

    if(tiago.loading) {
      return (
        <div className="loading"><img src={loading}/></div>
      )
    } else {
      return (
        <div className="app">
          <div className="main">
              <header>
                  <img src={Tiago} />
                  <h1 className="title">{myName}</h1>
              </header>
              <div className="description">
                <p>Olá, eu trabalho com Desenvolvimento Web há mais de 3 anos, já trabalhei para grandes empresas como a <a target="_blank" href="http://www.tim.com.br">TIM</a>.
                  Atualmente trabalho para a <a target="_blank" href="https://globosatplay.globo.com/">Globosat</a> na criação de um aplicativo para SmartTVs.
                  tenho vasta experiência na criação de aplicativos e sites usando as melhores práticas do mercado.</p>
              </div>
            <div className="skills">
              <h2>CONHECIMENTOS</h2>
              <ul>{ mySkills.map((item, index) => <li key={index}>{item}</li>) }</ul>
            </div>
            <div className="icons">
              <a target="_blank" href="https://br.linkedin.com/in/tiago-rocha-1a108710b">
                <img src={linkedin}/>
              </a>

              <a target="_blank" href="https://github.com/tiagocharo">
                <img src={github}/>
              </a>

              <a target="_blank" href="https://medium.com/@tiagofarocha95">
                <img src={medium}/>
              </a>
              <a target="_blank" href="https://www.facebook.com/tiago.rocha.1804">
                <img src={facebook}/>
              </a>
              <a target="_blank" href="https://twitter.com/tiagocharo">
                <img src={twitter}/>
              </a>
		        </div>
          </div>
          <footer>
            <h2>CONTATO</h2>
            <div className="form">
                <div className="block">
                  <input 
                    placeholder="Email"
                    className="large" 
                    type="email" 
                    id="email" 
                    value={emailFromUser}
                    onChange={e => this.setState({ emailFromUser: e.target.value })}/>
                </div>
                <div className="block">
                  <textarea 
                    placeholder="Mensagem"
                    value={messageFromUser} 
                    className="large" 
                    type="text" 
                    id="msg" 
                    onChange={e => this.setState({ messageFromUser: e.target.value })}></textarea>
                </div>
                <div className="block">
                  <input 
                  id="submit" 
                  type="submit" 
                  value="SUBMIT" 
                  onClick={this.addMessage} />
                </div>
                <div className="sucsses">{ sent ? <p>ENVIADO COM SUCESSO!</p> : null }</div>
            </div>
          </footer>
        </div>
      );
    }

  }
}

const TiagosQuery = gql`
  query {
    allTiagoes {
      id
      name
      work
      description
      skills
    }
  }
`;

const FromUserMutation = gql`
  mutation ($emailFromUser: String!, $messageFromUser: String!) {
    createFromUser ( emailFromUser: $emailFromUser, messageFromUser: $messageFromUser) {
      id
      emailFromUser
      messageFromUser
    }
  }
`;

export default compose(
  graphql(TiagosQuery, { name: 'tiago' }),
  graphql(FromUserMutation, { name: 'addMessage' }),
)(About);