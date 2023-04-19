import axios from 'axios'
import React from 'react'
import DocumentItem from './PhotoItem'
import './FileItem.scss'

const DocumentList = ({ files, removeFile, setDocument }) => {
    const deleteFileHandler = (_name) => {
        axios.delete(`http://localhost:8001/upload/documents?name=${_name}`)
          .then((res) => {
            removeFile(_name)
            setDocument("")
          })
            .catch((err) => console.error(err));
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<DocumentItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export default DocumentList