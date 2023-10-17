import React, { Component } from 'react';
import '../css/form.css';
//import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            cognome: '',
            telefono: '',
            email: '',
            corsoInteresse: '',
        };
    }

        handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };
        
        
        handleSubmit = async (e) => {
            e.preventDefault();
            const { nome, cognome, telefono, email, corsoInteresse } = this.state;
          
            try {
              const response = await fetch("/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, cognome, telefono, email, corsoInteresse }),
              });
          
              if (response.status === 200) {
                console.log("Registrazione avvenuta con successo");
                // Esegui qui eventuali azioni dopo la registrazione riuscita
              } else {
                console.error("Errore durante la registrazione");
              }
            } catch (error) {
              console.error("Errore durante la richiesta al server:", error);
            }
          };
          

    render(){
        return(
            <div className="registration-form">

                <h2>Form di registrazione</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={this.state.nome}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="cognome">Cognome</label>
                        <input
                            type="text"
                            name="cognome"
                            value={this.state.cognome}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Telefono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={this.state.telefono}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="corsoInteresse">Quale corso ti interessa?</label>
                        <select
                            name="corsoInteresse"
                            value={this.state.corsoInteresse}
                            onChange={this.handleChange}
                            required
                        >
                        <option value="react">React</option>
                        <option value="vuejs">Vue.js</option>
                        <option value="nodejs">Node.js</option>
                        <option value="mongodb">MongoDB</option>
                        </select>
                    </div>

                    <button type="submit">Registrati!</button>

                </form>
            </div>
            )
        }
    }

export default Form;