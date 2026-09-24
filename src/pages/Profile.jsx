function Profile() {
  return (
    <div className="profile-page">

      {/* Profile heading */}
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage your profile information.</p>
      </div>

      {/* Profile card */}
      <div className="profile-card">

        {/* Avatar */}
        <div className="profile-avatar">
          D
        </div>

        {/* User information */}
        <div className="profile-info">
          <h2>Daniyal</h2>
          <p className="profile-status">Online</p>

          <div className="profile-details">
            <div className="profile-detail">
              <strong>Username</strong>
              <span>@daniyal</span>
            </div>

            <div className="profile-detail">
              <strong>Status</strong>
              <span>ZINDA HOON</span>
            </div>

            <div className="profile-detail">
              <strong>Member Since</strong>
              <span>Since i wrote this code using chatgpt</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Profile;