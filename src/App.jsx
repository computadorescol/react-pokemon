//components
import Button from "./components/Button.jsx"
import { Card }  from "./components/Card" 
//Styles
import "./sass/App.scss"
import "./sass/Index.scss"
import "./sass/Card.scss"
//Icons
import { TiArrowLeftOutline } from "react-icons/ti" 
import { TiArrowRightOutline } from "react-icons/ti" 
//Hooks
import { useState , useEffect} from "react";

    


const App = ()=>{
    const [PokemonId, setPokemonId]    = useState(63) ;
    const [PokemonName, setPokemonName] = useState('');  
    const [pokemonEvolutions, setPokemonEvolutions]  = useState([])


    useEffect( ()=> {
      getEvolutions(PokemonId);
                 } ,[PokemonId])           
  
    async function getEvolutions(id) {              
      const response = await fetch (`https://pokeapi.co/api/v2/evolution-chain/${id}/` )	        
      const data = await response.json ()   
      //console.log(data.chain.species.name)
     //setPokemonName(data.chain.species.name) 	     // esta es la nueva variable ya seteada con el parametro
     
         let pokemonEvoArray =  [ ]     

    let pokemonLv1    = data.chain.species.name
    let pokemonLv1Img = await getPokemonImgs(pokemonLv1)  
         pokemonEvoArray.push([pokemonLv1,  pokemonLv1Img])
         console.log(pokemonEvoArray)
     
         if ( data.chain.evolves_to.lenght !== 0){
          let pokemonLv2 =data.chain.evolves_to[0].species.name;
          let pokemonLv2Img = await getPokemonImgs(pokemonLv2)
          pokemonEvoArray.push([pokemonLv2,pokemonLv2Img])
          setPokemonEvolutions(pokemonEvoArray)
          console.log(pokemonEvoArray)
            } 
            if  ( data.chain.evolves_to [0].evolves_to.lenght  !== 0 ){
          let pokemonLv3 = data.chain.evolves_to[0].species.name;
          let pokemonLv3Img = await getPokemonImgs(pokemonLv3 )
          pokemonEvoArray.push( [ pokemonLv3,  pokemonLv3Img])
          setPokemonEvolutions(pokemonEvoArray)
          console.log(pokemonEvoArray)   
                       } 
         async function getPokemonImgs(name){
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`) 
                     const data = await response.json()
                    return  data.sprites.other[ `official-artwork`].front_default;
                     //console.log(data.sprites.other[ `official-artwork`].front_default) 
                
         }  }

         function prevClick () {
        
          if (PokemonId == 1 ) { 
              setPokemonId(1)
           }else {
             setPokemonId(PokemonId -1) 
            }
              }
      function nextClick () { 
         setPokemonId(PokemonId + 1)
                       }
         return(
                <div className = "app" >
                        <>
                           
           <div className = "card-container"> 
           { pokemonEvolutions.map((pokemon) =>  < Card 
           key = {pokemon[0]}
           name ={pokemon[0]} 
            img={pokemon[1]}  /> )}
           < Card />
              </div>
                         
                        <div className = "buttons-container">
                            
                            <Button icon = {< TiArrowLeftOutline />}
                             handleClick= { prevClick }/>
                            {PokemonId}
                            {PokemonName}
                            <Button icon = {< TiArrowRightOutline />} handleClick= {()=>{ setPokemonId(PokemonId + 1 )}
                            }  
                            />
                            
                        </div>
                        </>
                        </div>
                        
                        )                 

    }

          export    {App}