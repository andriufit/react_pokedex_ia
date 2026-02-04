import "./home.css";

import { useState, useEffect } from 'react'

import PokemonCardComponent from '../../components/pokemonCardComponent/pokemonCardComponent';

import { getPokemons } from "../../services/pokeApiSerive"
import { Row, Pagination, Col } from 'react-bootstrap';


function Home() {
    
    const pokemonPerPage = 9;

    const [nextPage, setNextPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPokemons, setTotalPokemons] = useState(0);
    const [pokemons, setPokemons] = useState([]);

    const getPokemonPage = (page) => {
        getPokemons(page, pokemonPerPage).then((response) => {
            setPokemons(response.results);
            setTotalPokemons(response.count);
            setCurrentPage(page);
        });
    }

    const generatePagination = () => {

        let maxPage = Math.ceil(totalPokemons / pokemonPerPage);
        
        let paginationCode = (<Pagination>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => setNextPage(nextPage - 1)} />
            
            {currentPage - 3 == 1 ? (
                <>
                <Pagination.Item onClick={() => setNextPage(1)}>1</Pagination.Item>
                </>
            ) : currentPage - 3 > 0 ? (
                <>
                <Pagination.Item onClick={() => setNextPage(1)}>1</Pagination.Item>
                <Pagination.Ellipsis disabled />
                </>
            ) : ""}

            {currentPage - 2 > 0 ? (
                <>
                <Pagination.Item onClick={() => setNextPage(currentPage - 2)}>{currentPage - 2}</Pagination.Item>
                <Pagination.Item onClick={() => setNextPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
                </>
            ) : currentPage - 1 > 0 ? (
                <>
                <Pagination.Item onClick={() => setNextPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
                </>
            ) : "" }

            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage + 2 < maxPage ? (
                <>
                <Pagination.Item onClick={() => setNextPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                <Pagination.Item onClick={() => setNextPage(currentPage + 2)}>{currentPage + 2}</Pagination.Item>
                </>
            ) : currentPage + 1 < maxPage ? (
                <>
                <Pagination.Item onClick={() => setNextPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                <Pagination.Item onClick={() => setNextPage(currentPage + 2)}>{currentPage + 2}</Pagination.Item>
                </>
            ) : currentPage + 1 == maxPage ? (
                <>
                <Pagination.Item onClick={() => setNextPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                </>
            ) : "" }

            {currentPage + 3 < maxPage ? (
                <>
                <Pagination.Ellipsis disabled />
                <Pagination.Item onClick={() => setNextPage(maxPage)}>{maxPage}</Pagination.Item>
                </>
            ) : "" }

            {currentPage + 3 == maxPage ? (
                <>
                <Pagination.Item onClick={() => setNextPage(maxPage)}>{maxPage}</Pagination.Item>
                </>
            ) : "" }

            <Pagination.Next disabled={currentPage === maxPage} onClick={() => setNextPage(nextPage + 1)} />
        </Pagination>);

        return paginationCode;
        
    }

    useEffect(() => {
        getPokemonPage(nextPage);
    }, [nextPage]);

    return (
        <>
            <Row>
                {pokemons.map((pokemon, key) => (
                    <PokemonCardComponent key={key} name={pokemon.name} url={pokemon.url} ></PokemonCardComponent>
                ))}
            </Row>
            <Row>
               <Col className='d-flex justify-content-center pagination-container'>
                {generatePagination()}
               </Col>
            </Row>
        </>
    )

}

export default Home