import "./pokemonCardComponent.css"
import { Col } from "react-bootstrap"
import {getPokemonDetails, getMoveDetails} from "../../services/pokeApiSerive"
import {formatPokedexPosition, formatMovePower} from "../../services/helperService"
import { useState } from "react";

function PokemonCardComponent({name, url}){

    const [hp, setHp] = useState(0);
    const [pokedexPosition, setPokedexPosition] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [habilities, setHabilities] = useState("");
    const [damageHabilities, setDamageHabilities] = useState(0);
    const [descriptionMove, setDescriptionMove] = useState("");
    const [type, setType] = useState("");
    getPokemonDetails(url).then((response) => {
        setHp(response.stats[0].base_stat)
        setPokedexPosition(formatPokedexPosition(response.id));
        setUrlImage(response.sprites.front_default);
        setHabilities(response.moves[0].move.name);
        setType(response.types[0].type.name);
        getMoveDetails(response.moves[0].move.url).then((response) => {
            setDamageHabilities(formatMovePower(response.power));
            setDescriptionMove(response.effect_entries[1].effect);
        })
    })
    

    return (
        <>
            <Col className="d-flex justify-content-center" lg={4} md={6} sm={12}>
                <div className={"pokemon-card-main "+" " + type}>
                    <div className="pokemon-card-container" >
                        <div className="pokemon-card-header">
                            <div>
                                <h2>{name}</h2>
                            </div>
                            <div className="pokemon-card-header-stats">
                                <label className="life-stat">HP{hp}</label>
                                <label className="pokedex-position">#{pokedexPosition}</label>
                            </div>
                        </div>
                        <div className="pokemon-card-image-container">
                            <img src={urlImage} alt="" />
                        </div>
                        <div className="pokemon-card-description">
                            <div className="pokemon-card-habilities">
                                <div>{habilities}</div>
                                <div>{damageHabilities} DMG</div>
                            </div>
                            <hr />
                            <div className="pokemon-card-description-habilities">
                                <div>{descriptionMove}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default PokemonCardComponent