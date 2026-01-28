import "./pokemonCardComponent.css"
import { Col } from "react-bootstrap"
import {getPokemonDetails} from "../../services/pokeApiSerive"
import {formatPokedexPosition} from "../../services/helperService"
import { useState } from "react";

function PokemonCardComponent({name, url}){

    const [hp, setHp] = useState(0);
    const [pokedexPosition, setPokedexPosition] = useState("");

    getPokemonDetails(url).then((response) => {
        setHp(response.stats[0].base_stat)
        setPokedexPosition(formatPokedexPosition(response.order));
    })

    return (
        <>
            <Col lg={4}>
                <div className="pokemon-card-main">
                    <div className="pokemon-card-container">
                        <div className="pokemon-card-header">
                            <div>
                                <h4>{name}</h4>
                            </div>
                            <div>
                                <label className="life-stat">HP{hp}</label>
                                <label className="pokedex-position">#{pokedexPosition}</label>
                            </div>
                        </div>
                        <div className="pokemon-card-image-container">

                        </div>
                        <div className="pokemon-card-description">
                            
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default PokemonCardComponent