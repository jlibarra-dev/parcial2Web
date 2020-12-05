import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import * as d3 from "d3";

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

    useEffect(() => {
        const canvas = d3.select("#canvas");
        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        console.log(canvas.node());
        console.log(pokemons)
        if (pokemons.length === 0) {
        }
        else {
            const svg = canvas.append("svg");
            svg.attr("width", width);
            svg.attr("height", height);

            let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const y = d3.scaleLinear()
                .domain([0, 1400])
                .range([iheight, 0]);

            const x = d3.scaleBand()
                .domain(pokemons.map(d => d.name))
                .range([0, iwidth])
                .padding(0.1);

            const bars = g.selectAll("rect").data(pokemons);

            bars.enter().append("rect")
                .attr("class", "bar")
                .style("fill", "steelblue")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.height))
                .attr("height", d => iheight - y(d.height))
                .attr("width", x.bandwidth())

            g.append("g")
                .classed("x--axis", true)
                .call(d3.axisBottom(x))
                .attr("transform", `translate(0, ${iheight})`);

            g.append("g")
                .classed("y--axis", true)
                .call(d3.axisLeft(y));
        }
    })

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
                {
                    pokemons.map(p => <tr>
                        <td key={"id" + p.id}>{p.id}</td>
                        <td key={"ThumbnailImage" + p.id}><img src={p.ThumbnailImage} alt={p.name} height="100px" width="100px"></img></td>
                        <td key={"name" + p.id}>{p.name}</td>
                        <td key={"description" + p.id}>{p.description}</td>
                        <td key={"height" + p.id}><FormattedNumber value={p.height} /></td>
                        <td key={"weight" + p.id}><FormattedNumber value={p.weight} /></td>
                        <td key={"type" + p.id}>{p.type.map(t => <p>{t}</p>)}</td>
                    </tr>)}
            </tbody>
        </Table>
        <div id="canvas">
        </div>
    </>
    )
}

export default PokemonList;