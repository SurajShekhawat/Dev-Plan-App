import React, { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/AuthContext";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { signOut, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import futuristicAnimation from "../../assets/setting.json"; // Add your own animation

import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setPreviewImage(docSnap.data().photoURL || "");
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) return;

    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
    setLoading(true);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUserData((prev) => ({ ...prev, photoURL: downloadURL }));
      setPreviewImage(downloadURL);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, userData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Failed to send reset email");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);
      toast.success("Account deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting account. Please re-login and try again.");
    }
  };

  return (
    <div className="profile-settings">
      <div className="left-lottie">
        <Lottie animationData={futuristicAnimation} loop autoplay />
        {/* <h2>Name: {currentUser.email}</h2> */}
      </div>

      <div className="form-container">
        <h2>Profile Settings</h2>

        <label>Email</label>
        <input type="email" value={currentUser?.email || ""} disabled />

        <label>Name</label>
        <input type="text" name="name" value={userData.name} onChange={handleInputChange} />

        <label>Profile Image</label>
        {previewImage && <img src={previewImage} alt="Profile Preview" className="preview" />}
        <input type="file" onChange={handleImageUpload} />

        <button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>

        <button onClick={handleResetPassword}>Change/Reset Password</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
