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
    
        handleSubmit = (e) => {
            //alert(`${this.state.nome}, registrazione avvenuta con successo!`)
            // Puoi gestire i dati del form qui, ad esempio, inviandoli a un server o salvandoli nello stato dell'app.
            console.log(this.state);
            this.setState({
                nome: "",
                cognome: "",
                telefono: '',
                email: "",
                corsoInteresse: ""
            })
            e.preventDefault();
            //axios.post('http://localhost:3306/submit', values)
            //.then(res => console.log("Registrazione avvenuta con successo"))
            //.catch(err => console.log(err));
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