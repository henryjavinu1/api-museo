import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListMuseums = () => {
    const url = "https://api.visitorsanalytics.com/api/museums";
    const create = "https://apidev.museummate.net/api/floor";
    const getAllFloor = "https://apidev.museummate.net/api/floors/";

    const [museums, setMuseums] = useState([]);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [title, setTitle] = useState('');
    const [planURL, setPlanURL] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        getMuseums();
    }, []);

    const getMuseums = async () => {
        try {
            const response = await axios.get(url);
            setMuseums(response.data.museums['hydra:member']);
        } catch (error) {
            console.error("Error al obtener los museos:", error);
        }
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const selectedMuseum = museums.find(museum => museum.id === parseInt(selectedValue));
        console.log("Selected ID:", selectedMuseum.id);
        setSelectedMuseum(selectedMuseum);

        if (selectedMuseum && selectedMuseum.id) {
            const dynamicGetAllFloorUrl = `${getAllFloor}${selectedMuseum.id}`;

            axios.get(dynamicGetAllFloorUrl)
                .then(response => {
                    console.log('Respuesta de la API getAllFloor:', response.data);
                })
                .catch(error => {
                    console.error('Error al obtener datos de la API getAllFloor:', error);
                    console.log('Error completo:', error);
                });
        }
    }

    const handleSave = () => {
        if (selectedMuseum && title && planURL && imageURL) {
            console.log("Selected ID:", selectedMuseum.id);

            console.log("Title:", title);
            console.log("Plan URL:", planURL);
            console.log("Image URL:", imageURL);

            const requestData = {
                idMuseum: selectedMuseum.id.toString(),
                title: title,
                planURL: planURL,
                imageURL: imageURL
            };

            axios.post(create, requestData)
                .then(response => {
                    // Hacer algo con la respuesta si es necesario
                    console.log('Respuesta de la API:', response.data);
                })
                .catch(error => {
                    console.error('Error al enviar la solicitud:', error);
                    console.log('Error completo:', error);
                });
        }
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <h2 style={{
                            color: 'white',
                            backgroundColor: 'black',
                            textAlign: 'left',
                            padding: '1%',
                            width: '100%',
                            fontSize: '22px',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}>
                            PRUEBA API MUSEO
                        </h2>
                        <div className='form-group mb-3'>
                            <label htmlFor='selectMuseums'>Selecciona un museo:</label>
                            <select id='selectMuseums' className='form-control' onChange={handleSelectChange} style={{ marginTop: '5%' }}>
                                <option value=''>Selecciona un museo</option>
                                {museums.map((museum) => (
                                    <option key={museum.id} value={museum.id}>
                                        {museum.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='title'>Title:</label>
                            <input type='text' id='title' className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='fform-group mb-3'>
                            <label htmlFor='planURL'>Plan URL:</label>
                            <input type='text' id='planURL' className='form-control' value={planURL} onChange={e => setPlanURL(e.target.value)} />
                        </div>
                        <div className='fform-group mb-3'>
                            <label htmlFor='imageURL'>Image URL:</label>
                            <input type='text' id='imageURL' className='form-control' value={imageURL} onChange={e => setImageURL(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <button className='btn btn-success mt-3' onClick={handleSave}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default ListMuseums;
