import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import '../css/app.css'
const List = ({ items, delet, edit }) => {

    return (
        <div className='list'>
            {items.map((total) => {
                return (
                    <article className="single-list" key={total.id}>
                        <p>
                            {total.title}
                        </p>
                        <div className="btn-container">
                            <button type='button' className="btn-edit" onClick={() => edit(total.id)}><FaEdit /></button>
                            <button type='button' className="btn-trash" onClick={() => delet(total.id)}><FaTrash /></button>
                        </div>
                    </article>
                )
            })}
        </div>
    )

}
export default List;