import React, { useState } from 'react';
import InteressBy from './interessBy';
import ModelToTry from './modelToTry';
import IfBuyVehicule from './ifBuyVehicule';
import IfLeasingVehicule from './ifLeasingVehicule';
import Contact from './contact';
import axios from 'axios';

const Form = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        type_modele: '',
        achat_ou_leasing: '',
        vehicule_neuf_ou_location: '',
        duree_leasing: '',
        nom: '',
        prenom: '',
        ville: '',
        telephone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.ville === "") {
            alert("Le code postal est incorrect");
            return;
        }
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                'https://hooks.zapier.com/hooks/catch/16422019/37w62x0?em=sasha.lorion@gmail.com',
                { data: formData }
            );
            alert(JSON.stringify(response.data, null, 2));
        } catch (error: any) {
            console.error("Error: ", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const { prenom, nom, telephone, ville, type_modele, achat_ou_leasing, vehicule_neuf_ou_location, duree_leasing } = formData;

    return (
        <form className="w-screen max-w-3xl border-solid border-gray-300 border-2 p-12 rounded-lg bg-white" onSubmit={handleSubmit}>
            <Contact
                prenom={prenom}
                nom={nom}
                telephone={telephone}
                ville={ville}
                handleChange={handleChange}
            />
            <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                <ModelToTry
                    type_modele={type_modele}
                    handleChange={handleChange}
                />
                <InteressBy
                    achat_ou_leasing={achat_ou_leasing}
                    handleChange={handleChange}
                />
            </div>
            {achat_ou_leasing === "achat" && (
                <div className="flex flex-wrap justify-center -mx-3 mb-6 mt-8">
                    <IfBuyVehicule
                        vehicule_neuf_ou_location={vehicule_neuf_ou_location}
                        handleChange={handleChange}
                    />
                </div>
            )}
            {achat_ou_leasing === "leasing" && (
                <div className="flex flex-wrap justify-center -mx-3 mb-6 mt-8">
                    <IfLeasingVehicule
                        duree_leasing={duree_leasing}
                        handleChange={handleChange}
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
    );
};

export default Form;
