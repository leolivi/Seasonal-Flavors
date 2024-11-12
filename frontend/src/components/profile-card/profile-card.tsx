export default function ProfileCard() {
  return (
    <div className="w-full bg-sfred-light px-5 py-8">
      <h2>mein Profil</h2>
      <div>Edit</div>
      <div>
        <img src="Profile" alt="Profile" />
        <div>
          <p>Profilname</p>
          <p>Email</p>
          <p>Passwort ***</p>
        </div>
      </div>
    </div>
  );
}
