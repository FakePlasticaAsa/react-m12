import { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import AddCharacterForm from './components/AddCharacterForm';
import charactersData from './data/characters.json';
function App() {
  // Estado para los personajes, inicializado con los datos del JSON
  const [characters, setCharacters] = useState([]);
  const [useApi, setUseApi] = useState(false);
 
  useEffect(() => {
    if (useApi) {
      // Cargar personajes desde la API de Studio Ghibli
      const fetchCharactersFromAPI = async () => {
        try {
          const response = await
            fetch('https://ghibliapi.vercel.app/people');
          const data = await response.json();
          // Formateamos los datos de la API
          const formattedCharacters = data.map((character) => ({
            name: character.name,
            image: 'https://via.placeholder.com/200',
            description: character.gender || 'Sin descripción'
          }));
          setCharacters(formattedCharacters);
        } catch (error) {
          console.error('Error al obtener los personajes de la API:',
            error);
        }
      };
      fetchCharactersFromAPI();
    } else {
      // Cargar personajes desde el archivo JSON
      setCharacters(charactersData);
    }
  }, [useApi]);
  // Función para añadir un nuevo personaje (solo en modo JSON)
  const addCharacter = (newCharacter) => {
    if (!useApi) {
      setCharacters([...characters, newCharacter]);
    } else {
      alert("No se pueden añadir personajes en el modo API");
    }
  };
  // Estado para mostrar/ocultar personajes
  const [showCharacters, setShowCharacters] = useState(true);
  return (
    <div className="app-container">
      <h1>Bienvenido al mundo de Studio Ghibli</h1>
      <p>Explora los personajes de tus películas favoritas de Studio
        Ghibli.</p>
      {/* Botón para alternar entre JSON y API */}
      <div>
        <button onClick={() => setUseApi(false)}>Cargar desde
          JSON</button>
        <button onClick={() => setUseApi(true)}>Cargar desde API</button>
      </div>
 
      {/* Botón para alternar la visibilidad de los personajes */}
      <button onClick={() => setShowCharacters(!showCharacters)}>
        {showCharacters ? 'Ocultar personajes' : 'Mostrar personajes'}
      </button>
      {/* Componente del formulario para añadir un nuevo personaje */}
      <AddCharacterForm onAddCharacter={addCharacter} />
      {/* Renderizamos los personajes si showCharacters es true */}
      {showCharacters && (
        <div className="characters-grid">
          {characters.map((character) => (
            <CharacterCard
              key={character.name} // Usamos el nombre como key
              name={character.name}
              image={character.image}
              description={character.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default App;