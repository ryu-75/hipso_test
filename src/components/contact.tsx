import parsePhoneNumberFromString from "libphonenumber-js";
import React, { useState, useEffect } from "react";

interface ContactProps {
    prenom: string;
    nom: string;
    telephone: string;
    ville: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Contact: React.FC<ContactProps> = ({ prenom, nom, telephone, handleChange }) => {
    const [error, setError] = useState(false);
    const [showErrorText, setShowErrorText] = useState(false);
    const [localTelephone, setLocalTelephone] = useState(telephone);
    const [cityError, setCityError] = useState(false);
    const [postalCode, setPostalCode] = useState("");

    useEffect(() => {
        setLocalTelephone(telephone);
    }, [telephone]);

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;

        const newValueIsValid = /^[0-9+\s]*$/.test(value);

        if (!newValueIsValid) {
            setError(true);
            setShowErrorText(true);
        } else {
            setError(false);
            setShowErrorText(false);
        }

        const cleanedValue = value.replace(/\s/g, '');
        value = cleanedValue.replace(/(\d{2})(?=\d)/g, '$1 ');

        const phoneNumberObj = parsePhoneNumberFromString(cleanedValue, 'FR');
        if (phoneNumberObj) {
            value = phoneNumberObj.formatNational().replace(/(\d{2})(?=\d)/g, '$1 ');
        }

        if (value.startsWith('0')) {
            value = value.replace(/^0/, '+33 ');
        }

        setLocalTelephone(value);

        handleChange({
            ...e,
            target: {
                ...e.target,
                id: 'telephone',
                value,
            },
        });
    };

    const handleFocus = () => {
        if (error) {
            setShowErrorText(true);
        }
        if (cityError) {
            setCityError(true);
        }
    };

    const style = (error: boolean) => {
        if (error) {
            return {
                backgroundColor: "rgba(255, 0, 0, 0.5)"
            };
        }
        return {};
    };
    
    const fetchCity = (codePostal: string) => {
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
        .then(response => {
            if (!response.ok) throw new Error("Network response is failed");
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const cityName = data[0].nom;
                const event = {
                    target: {
                        id: 'ville',
                        value: cityName,
                    },
                } as React.ChangeEvent<HTMLInputElement>;
                handleChange(event);
            } else {
                setCityError(true);
            }
        })
        .catch(e => {
            console.error('There was a problem during fetch operation', e);
            setCityError(true);
        })
    }

    const handleVilleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPostalCode(value);
        console.log(fetchCity(value));
    }

    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Prénom
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="prenom"
                        type="text"
                        placeholder="Jane"
                        value={prenom}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nom
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="nom"
                        type="text"
                        placeholder="Doe"
                        value={nom}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-evenly -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Téléphone
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="telephone"
                        type="text"
                        placeholder="+33"
                        maxLength={14}
                        inputMode="decimal"
                        value={localTelephone}
                        pattern="[0-9+\s]*"
                        style={style(error)}
                        onChange={handleChangePhone}
                        onFocus={handleFocus}
                        required
                    />
                    {showErrorText && (
                        <p role="alert" style={{ color: "rgb(255, 0, 0)", fontSize: '16px' }}>
                            Exemple de format attendu: <em>+33 6 00 00 00 00</em>
                        </p>
                    )}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Code Postal
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="ville"
                        type="text"
                        placeholder="75010"
                        maxLength={5}
                        minLength={5}
                        value={postalCode}
                        pattern="\d{5}"
                        onChange={handleVilleChange}
                        onFocus={handleFocus}
                        required
                    />
                    {cityError && (
                        <p role="alert" style={{ color: "rgb(255, 0, 0)", fontSize: '16px'}}>
                            Ville introuvable
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
