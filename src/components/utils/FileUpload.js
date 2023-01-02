import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from 'antd';

const ROOT_URL = 'http://localhost:5000';

const FileUpload = ({ values, setValues, setLoading }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const fileUploadAndResize = (e) => {
        setLoading(true);
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 360, 360, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${ROOT_URL}/api/uploadimages`, { image: uri },
                        {
                            headers: {
                                authtoken: user ? user.token : ""
                            }
                        })
                        .then(res => {
                            console.log("Image Upload Response", res);
                            setLoading(false);
                            allUploadedFiles.push(res.data);
                            setValues({ ...values, images: allUploadedFiles });
                            console.log("Values after image add", values);
                        })
                        .catch((err) => {
                            setLoading(false);
                            console.log(`Cloudinary upload error:${err}`);
                        })
                }, 'base64')
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        console.log(public_id);
        axios.post(`${ROOT_URL}/api/removeimage`, { public_id },
            {
                headers: {
                    authtoken: user ? user.token : ""
                }
            })
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id
                });
                setValues({ ...values, images: filteredImages });
                console.log("Values after image remove", values);

            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }
    return (
        <>
            <div className="row">
                {values.images && values.images.map(image => (
                    <Badge count="X"
                        key={image.public_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleImageRemove(image.public_id)}
                    >
                        <Avatar
                            src={image.url}
                            size={100}
                            shape="square"
                            className="ml-3"
                        />
                    </Badge>
                ))}
            </div>
            <div className="row admin-class mt-1">
                <label className="btn btn-primary ml-2">
                    Choose File to upload
                    <input type="file"
                        multiple
                        hidden
                        accept="/images/*"
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    )
}

export default FileUpload;