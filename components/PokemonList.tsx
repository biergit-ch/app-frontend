import { makeStyles, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import * as React from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from './common/ErrorMessage';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '0 auto',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

const allPokemonQuery = gql`
{
  pokemons(first: 100) {
    id
    name
    types
  }
}
`
export default function PokemonList() {
  const classes = useStyles({});
  return (
    <Query query={allPokemonQuery}>
      {({ loading, error, data: { pokemons } }) => {
        if (error) { return <ErrorMessage message='Error loading pokemons.' /> }
        if (loading) {
          return (
            <div className={classes.card}>
              <img src="/static/images/loading.svg" alt="loading" />
              <Typography component="p">
                Pouring Beer
              </Typography>
            </div>
          )
        }
        return (
          <section>
            <ul>
              {pokemons.map((pokemon: any, index: number) => (
                <li key={pokemon.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <a href={pokemon.id}>{pokemon.name}</a>
                  </div>
                </li>
              ))}
            </ul>
            <style jsx={true}>{`
                section {
                  padding-bottom: 20px;
                }
                li {
                  display: block;
                  margin-bottom: 10px;
                }
                div {
                  align-items: center;
                  display: flex;
                }
                a {
                  font-size: 14px;
                  margin-right: 10px;
                  text-decoration: none;
                  padding-bottom: 0;
                  border: 0;
                }
                span {
                  font-size: 14px;
                  margin-right: 5px;
                }
                ul {
                  margin: 0;
                  padding: 0;
                }
                button:before {
                  align-self: center;
                  border-style: solid;
                  border-width: 6px 4px 0 4px;
                  border-color: #ffffff transparent transparent transparent;
                  content: '';
                  height: 0;
                  margin-right: 5px;
                  width: 0;
                }
              `}</style>
          </section>
        )
      }}
    </Query>
  )
}
