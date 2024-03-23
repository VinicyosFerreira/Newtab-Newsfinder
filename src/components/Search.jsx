import React, { useState, useEffect } from "react";
import '../css/Search.css';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [offsets, setOffsets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [semMaisItens, setSemMaisItens] = useState(false);

    const getNextPage = () => {
        if (!semMaisItens) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439");

            let url = 'https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas?pageSize=10&view=Grid%20view';

            if (currentPage > 0) {
                url += `&offset=${offsets[currentPage - 1]}`;
            }

            fetch(url, {
                method: "GET",
                headers: myHeaders
            })
            .then((response) => response.json())
            .then((result) => {
                if (result && result.offset) {
                    setOffsets([...offsets, result.offset]); // Armazenar o novo offset
                } else {
                    setSemMaisItens(true);
                }

                setSearchResults(result.records);
            })
            .catch((error) => console.log(error));
        } else {
            console.log('Acabaram as páginas');
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        getNextPage();
    }, [currentPage]); // Atualiza os dados sempre que a página atual muda

    return (
        <div className="main">
            <div>
                <h2 className="titleBuscas">Buscas Realizadas</h2>
                <table className="tableBuscas" cellspacing="0">
                    <thead className="tableHeader">
                        <tr>
                            <th className="nameBuscas">Buscas</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td className="colBuscas">{result.fields.Busca}</td>
                                <td className="colDate">{new Date(result.fields.Data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit'})}</td>
                                <td className="colTime">{new Date(result.createdTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="btPages">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>&#60;</button>
                    <button onClick={handleNextPage} disabled={semMaisItens}>&#62;</button>
                </div>
            </div>
            
        </div>
    );
}

export default Search;
