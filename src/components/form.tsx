import React from 'react';
import InteressBy from './interessBy';
import ModelToTry from './modelToTry';
import IfBuyVehicule from './ifBuyVehicule';
import IfLeasingVehicule from './ifLeasingVehicule';
import Contact from './contact';
import axios from 'axios';

class Form extends React.Component {
    state = {
        type_modele: '',
        achat_ou_leasing: '',
        vehicule_neuf_ou_location: '',
        duree_leasing: '',
        nom: '',
        prenom: '',
        ville: '',
        telephone: '',
    }
    
    constructor(props: String) {
      super(props);

      this.handleContact = this.handleContact.bind(this);
      this.handleModel = this.handleModel.bind(this);
      this.handleNewOrRentCar = this.handleNewOrRentCar.bind(this);
      this.handleBuyOrLeasing = this.handleBuyOrLeasing.bind(this);
    }

    handleBuyOrLeasing = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            achat_ou_leasing: e.target.value,
        })
    }

    handleModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            type_modele: e.target.value,
        })
    }

    handleNewOrRentCar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            vehicule_neuf_ou_location: e.target.value,
        })
    }

    handleLeasingDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            duree_leasing: e.target.value,
        })
    }

    handleContact = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.state.ville === "") {
            alert("Le code postal est incorrect");
            return ;
        }
        const formData = {...this.state};
        axios.put('https://hooks.zapier.com/hooks/catch/16422019/37w62x0?em=sasha.lorion@gmail.com', {
            data: JSON.stringify(formData),
            headers: {'Content-Type':'application/json'},
        })
        .then((response) => {
            axios.post('https://hooks.zapier.com/hooks/catch/16422019/37w62x0?em=sasha.lorion@gmail.com', {
                data: JSON.stringify(response.data),
                headers: {'Content-Type':'application/json'},
            })
        })
        alert(JSON.stringify(formData, null, 2));
    }


    render() {
        const { prenom, nom, telephone, ville, type_modele, achat_ou_leasing, vehicule_neuf_ou_location, duree_leasing } = this.state;

        return (
            <form className="w-screen max-w-3xl border-solid border-gray-300 border-2 p-12 rounded-lg bg-white" onSubmit={this.handleSubmit}>
                <Contact
                    prenom={prenom} 
                    nom={nom}
                    telephone={telephone}
                    ville={ville}
                    handleChange={this.handleContact}
                />
                <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                    <ModelToTry 
                        type_modele={type_modele} 
                        handleChange={this.handleModel}
                    />
                    <InteressBy 
                        achat_ou_leasing={achat_ou_leasing}
                        handleChange={this.handleBuyOrLeasing}
                    />
                </div>
                    {achat_ou_leasing === "achat" && (
                        <div className="flex flex-wrap justify-center -mx-3 mb-6 mt-8">
                            <IfBuyVehicule
                                vehicule_neuf_ou_location={vehicule_neuf_ou_location}
                                handleChange={this.handleNewOrRentCar}
                            />
                        </div>
                    )}
                    {achat_ou_leasing === "leasing" && (
                        <div className="flex flex-wrap justify-center -mx-3 mb-6 mt-8">
                            <IfLeasingVehicule 
                                duree_leasing={duree_leasing}
                                handleChange={this.handleLeasingDuration}
                            /> 
                        </div>
                    )}
                <div className="flex items-center justify-center">
                    <div className="md:w-2/3">
                      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Envoyer
                      </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Form;