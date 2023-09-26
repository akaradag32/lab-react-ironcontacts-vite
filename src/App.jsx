import './App.css';
import contactObj from './contacts.json';
import React, { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(contactObj.slice(0, 5));
  const [contactRemain, setContactRemain] = useState(contactObj.slice(5));

  const addRandom = () => {
    const random = Math.floor(Math.random() * contactRemain.length);
    const el = contactRemain.splice(random, 1)[0];

    setContactRemain(contactRemain);
    setContacts([...contacts, el]);
  };

  const sortByName = () => {
    setContacts(
      contacts.toSorted((x, y) => {
        if (x.name > y.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
  };
  const sortByPopularity = () => {
    setContacts(contacts.toSorted((x, y) => y.popularity - x.popularity));
  };
  const removeContact = (celebId) => {
    setContacts(contacts.filter((x) => x.id !== celebId));
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((celeb) => {
            return (
              <tr key={celeb.id}>
                <td>
                  <img src={celeb.pictureUrl} style={{ height: 100 + 'px' }} />
                </td>
                <td>{celeb.name}</td>
                <td>{celeb.popularity}</td>
                <td>{celeb.wonOscar && '🏆'}</td>
                <td>{celeb.wonEmmy && '🏆'}</td>
                <td>
                  <button onClick={() => removeContact(celeb.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button onClick={() => addRandom()}>Add Rondom</button>
            </td>
            <td>
              <button onClick={() => sortByName()}>Sort By Name</button>
            </td>
            <td>
              <button onClick={() => sortByPopularity()}>
                Sort By Popularity
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
