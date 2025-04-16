import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, updatePassword, updatePhoneNumber } from 'firebase/auth';
import './ProfileSettings.scss';

const ProfileSettings = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      if (password) {
        await updatePassword(user, password);
      }

      // phoneNumber update needs re-auth and verification; skipped for now

      setSuccessMsg('Profile updated successfully ✅');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-settings">
      <h2>👤 Profile Settings</h2>

      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label>Display Name</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email (not editable)</label>
          <input type="email" value={email} readOnly />
        </div>

        <div className="form-group">
          <label>Phone Number (currently view only)</label>
          <input type="text" value={phoneNumber} readOnly />
        </div>

        <div className="form-group">
          <label>Change Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default ProfileSettings;
