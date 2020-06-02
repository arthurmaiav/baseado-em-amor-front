import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api';
import ReadMore from '../ReadMore/ReadMore.js';

import './styles.css';

import loguinhoImg from '../../assets/loguinho.png';

export default function Home() {
    const [cases, setCases] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('cases').then(response => {
            setCases(response.data);
        })
    });

    function handleLogin() {
        history.push('/login');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={loguinhoImg} alt="Baseado em Amor" />

                <span>Olá, seja muito bem-vindo(a)</span>

                <Link style={{ width: 150 }} className="button" to="/quem-somos">Sobre nós</Link>
                <button className="button-icon" onClick={handleLogin} type="button">
                    <FiLogIn size={18} color="#537C3A" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {cases.map(cases => (
                    <li key={cases.id}>
                        <strong>CASO:</strong>
                        <p>{cases.title}</p>
                        <strong>DESCRIÇÃO:</strong>

                        <ReadMore description={cases.description}/>

                        {cases.value !== '' && cases.value !== null && <div>
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                .format(cases.value)}
                            </p>
                        </div>
                        }

                        {cases.donationUrl !== '' && <div>
                            <a className="button"
                                target="_blank"
                                href={cases.donationUrl}
                                style={{ marginTop: 16, bottom: 0 }}>
                                Link para Doação
                        </a>
                        </div>
                        }
                    </li>
                ))}
            </ul>
        </div>

    );
}
