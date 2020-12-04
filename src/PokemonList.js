import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FormattedMessage, FormattedNumber } from 'react-intl';


function PokemonList(props) {
    let [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("pokemons") === null) {
                setPokemons("Loading...")
            } else {
                setPokemons(localStorage.getItem("pokemons"));
            }
        } else {
            const url = new URL(props['data']);
            fetch(url).then(res => res.json()).then(res => {
                setPokemons(res);
                localStorage.setItem("pokemons", res);
            })
        }
    }, []);


    return (<>
        <h1>{<FormattedMessage id="Title" />}</h1>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{<FormattedMessage id="Image" />}</th>
                    <th>{<FormattedMessage id="Name" />}</th>
                    <th>{<FormattedMessage id="Description" />}</th>
                    <th>{<FormattedMessage id="Height" />}</th>
                    <th>{<FormattedMessage id="Weigth" />}</th>
                    <th>{<FormattedMessage id="Type" />}</th>
                </tr>
            </thead>
            <tbody>
                {pokemons.map(p => <tr>
                    <td>{p.id}</td>
                    <td><img src={p.ThumbnailImage} alt={p.name} height="100px" width="100px"></img></td>
                    <td>{p.description}</td>
                    <td><FormattedNumber value={p.height} /></td>
                    <td><FormattedNumber value={p.weight} /></td>
                    <td>{p.id}</td>
                </tr>)}
            </tbody>
        </Table>
    </>
    )
}

export default PokemonList;