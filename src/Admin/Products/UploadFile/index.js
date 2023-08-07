import React, {Component, useEffect, useState} from "react";
import UploadService from "./UploadFilesService";
import './styles.scss';
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {deleteFile} from "../../../api/upload";
import {ToastContainer, toast} from "react-toastify";


const UploadFiles = ({productIsUpload, data, isPresident, onFetchProduct, handleCloseUpload}) => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const [listImage, setListImage] = useState([]);

    useEffect(() => {
        const productSelected = data.find(item => item.id === productIsUpload.id);
        setListImage(productSelected?.productImages)
    }, [data])

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    }

    const upload = (e) => {
        e.preventDefault();
        let currentFile = selectedFiles?.[0];
        setProgress(0);
        setCurrentFile(currentFile);
        UploadService.upload(currentFile, productIsUpload?.id, isPresident, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
            .then((response) => {
                setMessage(response.data.message)
                onFetchProduct();
            })
            .then((files) => {
                setFileInfos(files.data)

            }).then(() => {

        })
            .catch(() => {
                setProgress(0);
                setMessage("");
                setCurrentFile(undefined);
            });
        setSelectedFiles(undefined);
        document.getElementById("file-form").value = "";
    }

    function onRemoveFile(item) {
        deleteFile({
            id: item.id
        }).then(res => {
            const {data} = res;
            if (data.errorCode === "200") {
                onFetchProduct();
                toast.success("Xóa thành công");
            } else {
                toast.error("Xóa thất bại");
            }
        })

    }

    return (
        <div>
            <div className="d-flex justify-content-end">
            <CloseIcon
                fontSize="12" style={{marginBottom: "16px", textAlign: "right"}} onClick={handleCloseUpload}/>
            </div>
            {currentFile && (
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{width: progress + "%"}}
                    >
                        {progress}%
                    </div>
                </div>
            )}
            <form enctype="multipart/form-data">
                <div className="d-flex justify-content-between">
                    <label className="btn btn-default">
                        <input id="file-form" type="file" onChange={selectFile}/>
                    </label>
                    <button className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={(e) => upload(e)}
                    >
                        Upload
                    </button>
                </div>
            </form>

            <div className="alert alert-light" role="alert">
                {message}
            </div>
            <div className="card">
                <div className="card-header">Danh sách Ảnh</div>
                <ul className="list-group list-group-flush-image">
                    {listImage && listImage && listImage.length ?
                        listImage.slice(0, 4).map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <div className="delete-image" onClick={() => onRemoveFile(file)}><CloseIcon
                                    fontSize="12"/></div>
                                <img src={file.photosImagePath} alt="Lỗi hiển thị"/>
                            </li>
                        )) : null}
                </ul>
            </div>
        </div>
    );
}

export default UploadFiles;