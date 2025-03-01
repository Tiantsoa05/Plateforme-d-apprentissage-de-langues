import { UserPlus, Mail, Lock, UserCircle, GraduationCap, Languages, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import ConfirmRegister from '../../components/Popup/ConfirmRegister';

const LANGUES_MATERNELLES = [
    'Malagasy',
    'Français', 
    'Anglais', 
    'Arabe', 
    'Espagnol', 
    'Allemand', 
    'Chinois', 
    'Italien', 
    'Portugais', 
    'Russe', 
    'Autre'
];

const ProfRegister = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ENSEIGNANT');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [langueEnseigner, setlangueEnseigner] = useState('');
    const [registerModal,setRegisterModal]= useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setRegisterModal(false)

        if(password!==confirmPassword){
            setError('Les mots de passe ne correspondent pas.')
        }else{

            console.log(langueEnseigner)
            try {
                const response = await axios.post('http://localhost:3000/auth/prof/register', {
                    nom,
                    prenom,
                    email,
                    password,
                    confirmPassword,
                    role,
                    langue_enseigner: langueEnseigner
                });
    
                localStorage.setItem('token', response.data.token);
    
                navigate('/login');
            } catch (err) {
    
                setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
                console.error('Erreur d\'inscription', err);
            }

        }
    };

    const handleModal = (e)=>{
        e.preventDefault()
        setRegisterModal(true)
    }

  return (
    <div className="min-h-screen flex">
            {/* Section Formulaire d'Inscription */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-300">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl border border-gray-100">
                    <div>
                        <div className="flex justify-center items-center mb-6">
                            <UserPlus className="h-12 w-12 text-blue-600" />
                            <h2 className="ml-3 text-3xl font-extrabold text-gray-900">
                                Créer un Compte
                            </h2>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Champ Nom */}
                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="nom"
                                        name="nom"
                                        type="text"
                                        required
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>

                            {/* Champ Prénom */}
                            <div>
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="prenom"
                                        name="prenom"
                                        type="text"
                                        required
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre prénom"
                                    />
                                </div>
                            </div>

                            {/* Champ Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="votre.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Champ Mot de Passe */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de Passe
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre mot de passe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Confirmer mot de Passe
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Confirmez votre mot de passe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="langueMaternelle" className="block text-sm font-medium text-gray-700">
                                    Langue  à enseigner
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="langueEnseigner"
                                        name="langueEnseigner"
                                        required
                                        value={langueEnseigner}
                                        onChange={(e) => console.log(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Sélectionnez la langue que vous enseignez</option>
                                        {LANGUES_MATERNELLES.map((langue) => (
                                            <option key={langue} value={langue}>
                                                {langue}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Bouton d'Inscription */}
                            <div>
                                <button
                                    onClick={handleModal}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        </form>

                        {/* Section Connexion */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Déjà un compte ? {' '}
                                <Link to={"/login"} className="font-medium text-blue-600 hover:text-blue-500">
                                    Connectez-vous
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal confirmation inscription */}
                {
                    registerModal && <ConfirmRegister 
                        closeRegisterModal={()=>setRegisterModal(false)}
                        handleRegister={handleSubmit}
                    />
                }

            {/* Separateur vertical */}
            <div className="hidden lg:block w-px bg-gray-200"></div>

            {/* Section Illustration */}
            <div className="hidden lg:block lg:w-1/2 bg-blue-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/images/profregister.jpg"
                        alt="register infinity"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-6 left-0 right-0 p-8 text-center bg-white/70">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">
                        Rejoignez notre communauté d'apprentissage
                    </h3>
                    <p className="text-blue-600">
                        Partagez vos compétences avec Infinity
                    </p>
                </div>
            </div>
        </div>
  )
}

export default ProfRegister