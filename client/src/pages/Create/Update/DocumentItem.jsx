import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './FileItem.scss'

const DocumentItem = ({ file, deleteFile }) => {
    return (
        <>
            <li
                className="file-item-li"
                key={file.name}>
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{file.name}</p>
                <div className="actions">
                    <div className="loading"></div>
                    {file.isUploading && <FontAwesomeIcon
                        icon={faSpinner} className="fa-spin"
                        onClick={() => deleteFile(file.name)} />
                    }
                    {!file.isUploading &&
                        <FontAwesomeIcon icon={faTrash}
                            onClick={() => deleteFile(file.name)} />
                    }
                </div>
            </li>
        </>
    )
}

export default DocumentItem