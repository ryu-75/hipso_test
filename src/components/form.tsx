import React from 'react';
import InteressBy from './interessBy';
import ModelToTry from './modelToTry';
import IfBuyVehicule from './ifBuyVehicule';
import IfLeasingVehicule from './ifLeasingVehicule';
import Contact from './contact';

class Form extends React.Component {
    state = {
        first: '',
        last: '',
        phone: '',
        cp: '',
        model: '',
        interessBy: '',
        ifBuyVehicule: '',
        ifLeasingVehicule: '',
    }
    
    constructor(props: String) {
      super(props);

      this.handleContact = this.handleContact.bind(this);
      this.handleModel = this.handleModel.bind(this);
      this.handleInteressBy = this.handleInteressBy.bind(this);
      this.handleIfBuy = this.handleIfBuy.bind(this);
      this.handleIfLeasing = this.handleIfLeasing.bind(this);
    }

    handleInteressBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            interessBy: e.target.value,
        })
    }

    handleModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            model: e.target.value,
        })
    }

    handleIfLeasing = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            ifLeasingVehicule: e.target.value,
        })
    }

    handleIfBuy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            ifBuyVehicule: e.target.value,
        })
    }

    handleContact = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {...this.state};
        console.log(formData);
        alert(JSON.stringify(formData, null, 2));
    }

    render() {
        const { first, last, phone, cp, model, ifBuyVehicule, ifLeasingVehicule, interessBy } = this.state;

        return (
            <form className="w-screen max-w-3xl border-solid border-gray-300 border-2 p-12 rounded-lg bg-white" onSubmit={this.handleSubmit}>
                <Contact
                    first={first} 
                    last={last}
                    phone={phone}
                    cp={cp}
                    handleChange={this.handleContact}
                />
                <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                    <ModelToTry 
                        model={model} 
                        handleChange={this.handleModel}
                    />
                    <InteressBy 
                        interessBy={interessBy}
                        handleChange={this.handleInteressBy}
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                    <IfLeasingVehicule
                        leasing={ifLeasingVehicule}
                        handleChange={this.handleIfLeasing}
                    />
                    <IfBuyVehicule
                        buy={ifBuyVehicule}
                        handleChange={this.handleIfBuy}
                    />
                </div>
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