import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Gönderiliyor...");

    const res = await fetch("https://huseyinozdil.com/api/sendmail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("Mesaj başarıyla gönderildi!");
    } else {
      setStatus("Hata: " + data.error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>İletişim Formu</h2>
          <label>Adınız Soyadı</label>
          <input name="name" placeholder="Adınız" onChange={handleChange} />

           <label>Email</label>
          <input name="email" placeholder="Email" onChange={handleChange} />

          <label>Mesajınız</label>
          <textarea
            name="message"
            placeholder="Mesajınız"
            rows="5"
            onChange={handleChange}
          />
          <button type="submit">Gönder</button>
          <p>{status}</p>
        </form>
      </div>
    </>
  );
}

export default App;
