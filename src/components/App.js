import React, { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';
import '../css/app.css'

const getlocal = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}
const App = () => {

    const [name, setname] = useState('');
    const [list, setlist] = useState(getlocal);
    const [isediting, setIsediting] = useState(false);
    const [editId, setEditId] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    // todo creating a function so that we dont have to setalert again ang again insted we call showalert which calls setalert 
    const showalert = (show = false, msg = '', type = '') => {
        setAlert({ show, msg, type });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showalert(true, 'please enter value', 'danger')
        } else if (name && isediting) {
            showalert(true, 'item edited', 'succes')
            setlist(list.map((total) => {
                if (total.id === editId) {
                    return (
                        { ...total, title: name }

                    )
                }
                return total
            }))
            setEditId(null)
            setname('')
            setIsediting(false)


        } else {
            showalert(true, 'succesfuly added', 'succes')
            const newitem = { id: new Date().getTime().toString(), title: name };//*creating an object with id and array item(converting normal array to array of object)
            setlist([...list, newitem]);
            setname('');//*so that the form is empty for next input
        }
    }
    //todo creating function to delet an particular item

    const delet = (id) => {
        showalert(true, 'task deleted', 'succes')
        const newlist = list.filter((item) => item.id !== id)
        setlist(newlist);
    }
    const edit = (id) => {
        const edit_item = list.find((item) => item.id === id);
        setIsediting(true);
        setEditId(id)
        setname(edit_item.title)
    }
    //todo using local storage 
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])
    return (
        <section className="section-center">
            <form className="form" onSubmit={handleSubmit}>
                {alert.show && <Alert {...alert} removealert={showalert} list={list} />}
                <h3>Todo Buddy</h3>
                <div className="form-control">
                    <input type="text" placeholder='enter your task here' value={name} onChange={(e) => setname(e.target.value)} />
                    <button className="btn" type='submit'>
                        {isediting ? 'edit' : 'submit'}
                    </button>
                </div>
            </form>
            {list.length > 0 &&
                (<div className="list-container">
                    <List items={list} delet={delet} edit={edit} />
                    <button className="clear" onClick={() => setlist([])}>clear list</button>
                </div>)}
        </section>
    )
}
export default App