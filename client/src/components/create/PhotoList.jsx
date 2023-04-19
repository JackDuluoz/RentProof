import axios from 'axios'
import React from 'react'
import PhotoItem from './PhotoItem'
import './FileItem.scss'

const PhotoList = ({ files, removeFile, setPhoto }) => {
    const deleteFileHandler = (_name) => {
        axios.delete(`http://localhost:8001/upload/photos?name=${_name}`)
          .then((res) => {
            removeFile(_name)
            setPhoto("")
          })
            .catch((err) => console.error(err));
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<PhotoItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export default PhotoList