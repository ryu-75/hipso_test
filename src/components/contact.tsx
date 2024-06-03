import React from "react";

interface ContactProps {
    first: string;
    last: string;
    phone: string;
    cp: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Contact: React.FC<ContactProps> = ({ first, last, phone, cp, handleChange }: ContactProps) => {
    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Prénom
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="first"
                        type="text"
                        placeholder="Jane"
                        value={first}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nom
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="last"
                        type="text"
                        placeholder="Doe"
                        value={last}
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
                        id="phone"
                        type="text"
                        placeholder="06"
                        maxLength={10}
                        value={phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Code Postal
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="cp"
                        type="text"
                        placeholder="75010"
                        maxLength={5}
                        value={cp}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
