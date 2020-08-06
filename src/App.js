import React from 'react';
import './App.css';
import Undraw from './img/undraw_convert_2gjv.png'
//import ReactDOM from "react-dom";
//let n = 0
class Field extends React.Component {
    render() {
        const {type, id, name, onChange, value,children} = this.props
        return <div className="field">
            <label htmlFor={name}>{children}</label>
            <input className="my" onChange={onChange} value={value} type={type} id={id} name={name}/>
        </div>
    }
}

class Convert extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            number:"",
            select:"",
            resultFahrenheit:"",
            clicked:false,
            unitSelected:"",
            statusWater:"",
            imgWater:""
        }
        this.handleChange =this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        this.setState({
            clicked:true
        })
        e.preventDefault()
        if (this.state.number !== "" && this.state.select !=="" && this.state.number.match(/(\d)/g)){
            switch (this.state.select) {
                case "degre":
                    this.setState({
                        resultFahrenheit : (9/5*this.state.number)+32,
                        unitSelected:"Fahrenheit",
                        statusWater : "",
                        imgWater : ""
                    });

                    if (this.state.number === "32"){
                        this.setState({
                            statusWater : "Ce chiffre correspond au point de solidification de l’eau.",
                            imgWater : "https://italianoinamerica.files.wordpress.com/2016/02/cubetti_ghiaccio.jpg?w=529"
                        });
                    }

                    if (this.state.number === "212"){
                        this.setState({
                            statusWater : "Ce chiffre correspond au point d’ébullition.",
                            imgWater: "https://www.iheartradio.ca/image/policy:1.12226559:1587671236/Eau-iStock-com-jacktherabbit.jpg?f=default&$p$f=2155daf"
                        });
                    }
                break;

                case "fahrenheit":
                    this.setState({
                        resultFahrenheit : (this.state.number-32)*5/9,
                        unitSelected:"Degré Celsius",
                        statusWater : "",
                        imgWater : ""
                    });
                break;

                default:
                    this.setState({
                        resultFahrenheit : "Erreur lors de la selection",
                        unitSelected:"",
                        statusWater : "",
                        imgWater : ""
                    });
            }
            this.setState({
                number:"",
                select:"",
            });
        }
        else{
            this.setState({
                resultFahrenheit : "Les champs sont obligatoire ou l'information renseignée n'est pas un chiffre",
                statusWater : "",
                imgWater : "",
            });
        }
    }

    render() {
        return <form className="form" onSubmit={this.handleSubmit}>
                    <div className="selectField">
                        <label htmlFor="select">Choissisez l'unité de conversion</label>
                        <select className="p-5" name="select" value={this.state.select} onChange={this.handleChange} id="select">
                            <option value="">Selectionner</option>
                            <option value="degre">Degrée</option>
                            <option value="fahrenheit">Fahrenheit</option>
                        </select>
                    </div>
                    <Field type="number" id="number" name="number" value={this.state.number} onChange={this.handleChange}>Entrer un nombre</Field>
                    <div className="field">
                        <button className="btn" type="submit">Convertir</button>
                    </div>

                    {this.state.clicked && isFinite(this.state.resultFahrenheit) ?
                        <div className="mt-5">
                            <span> Cela fait <b>{this.state.resultFahrenheit}</b> en <b>{this.state.unitSelected}</b></span>
                        </div>
                        :
                        <div className="red mt-5">{this.state.resultFahrenheit}</div>

                    }

                    { this.state.statusWater ?
                        <div className="mt-5">
                            <em>{this.state.statusWater}</em>
                            <img className="img" src={this.state.imgWater} alt=""/>
                        </div>
                        : ""
                    }
                </form>
    }
}

function App (){
    return <div>
        <header>
            <div>
                <h1 className="title">Convertisseur Celsius-Fahrenheit</h1>
            </div>
            <img className="imgHeader" src={Undraw} alt=""/>
        </header>
        <Convert />
    </div>
}
/*
window.setInterval(()=>{
    n++
    ReactDOM.render(App(),document.getElementById('root'));
},1500)
*/
export default App;