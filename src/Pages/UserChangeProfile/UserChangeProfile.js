import MyAccountLayout from "../../Components/Layouts/MyAccount/MyAccountLayout";
import "./UserChangeProfile.css"
import {useEffect, useState} from "react";
import {storage} from "../../Config/firebase"
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
import {v4} from 'uuid'
import axios from '../../axios/index'
import {useSelector} from 'react-redux'
import {updateUserInfo} from "../../Features/CurrentUser/UserSlice"
import {useDispatch} from 'react-redux'


const UserChangeProfile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((store) => store.currentUser.currentUser)
    const [progress, setProgress] = useState(0);
    const [imageUrls, setImageUrls] = useState();
    const [formData, setFormData] = useState({
        username: '',
        company: '',
        phone: '',
        birthday: '',
        email: '',
        imageUpload: null
    })

    const setImageUploaded = (e) => {
        e.preventDefault()
        if (formData.imageUpload == null) {
            return axios
                .put('/my-account/change-profile', {
                ...formData, userId: currentUser.userId
            }).catch(err => console.log(err))
        } else {
            return axios
                .put('/my-account/change-profile', {
                    ...formData, avatarUrl: imageUrls, userId: currentUser.userId
                }).then((resultFromBEAloha) => {
                    console.log(JSON.parse(resultFromBEAloha.config.data));
                    dispatch(updateUserInfo(JSON.parse(resultFromBEAloha.config.data)))
                    alert("update profile success")
                }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        setFormData({...currentUser})
    }, [])


    useEffect(() => {
        if (!formData.imageUpload) return
        const userImage = ref(storage, `images/${formData.username + v4()}`)
        const uploadTask = uploadBytesResumable(userImage, formData.imageUpload)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog);
            }, (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setImageUrls(downloadURL);
                    });
            }
        );
    }, [formData.imageUpload])


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <MyAccountLayout>
                <div className=" master-container block p-6 rounded-lg shadow-lg  bg-white max-w-7xl ">
                    <form onSubmit={(e) => setImageUploaded(e)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Full Name
                                </label>
                                <input type="text" id="name" name='username' value={formData.username}
                                       onChange={(e) => handleChange(e)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       placeholder="John" required=""/>
                            </div>

                            <div>
                                <label htmlFor="company"

                                       className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                                <input type="text" id="company" name="company"
                                       value={formData.company}
                                       onChange={(e) => handleChange(e)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       placeholder="CodeGym" required=""/>
                            </div>
                            <div>
                                <label htmlFor="phone"

                                       className="block mb-2 text-sm font-medium text-gray-900 ">Phone
                                    number</label>
                                <input type="tel" id="phone" name='phone'
                                       value={formData.phone}
                                       onChange={(e) => handleChange(e)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       placeholder="123-45-678" /*pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"*/ required=""/>
                            </div>

                            <div>
                                <label htmlFor="DOB"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Date Of Birth</label>
                                <input type="date" id="DOB" name='birthday'
                                       value={formData.birthday}
                                       onChange={(e) => handleChange(e)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       placeholder="" required=""/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Email
                                address</label>
                            <input type="email" id="email" name='email'
                                   readOnly
                                   value={formData.email}
                                   onChange={(e) => handleChange(e)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                   placeholder="john.doe@codegym.com.vn" required=""/>
                        </div>
                        <div className="mb-6">
                            <div className="mb-3 w-full">
                                <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">
                                    Avatar Image
                                </label>
                                <input onChange={(e) => {
                                    setFormData((prev) => ({...prev, imageUpload: e.target.files[0]}))
                                }}
                                       className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-white bg-clip-padding border border-solid border rounded-lg border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                       type="file" id="formFile"/>
                            </div>
                        </div>
                        <div className=" text-center ">
                            {progress ? <h2>Uploading done {progress}%</h2> : ""}
                            <button type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-2.5 py-2.5 text-center dark:bg-blue-600 ">Submit
                            </button>
                        </div>
                    </form>

                </div>
            </MyAccountLayout>

        </div>
    );
};

export default UserChangeProfile;