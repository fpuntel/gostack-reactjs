import React from "react";
import api from './services/api';

import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [ repositories, setRepostories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>{
      //console.log(response.data);
      setRepostories(response.data);
    })
}, []);   

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Site React ${Date.now()}`,
      url : "https://www.github.com/fpuntel",
      techs: [
        "teste",
        "teste2"
      ]
    });
    const repository = response.data;
    setRepostories([...repositories, repository]);
  } 

  async function handleRemoveRepository(id) {
    //console.log(id);
    api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    repositories.splice(repositoryIndex, 1);
    
    setRepostories([...repositories]);
  } 
 
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;