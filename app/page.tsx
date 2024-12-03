import Link from "next/link";
import Image from "next/image";
import img from "../public/01.png"; // Supondo que a imagem esteja na pasta public

export default function Home() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", 
      height: "100vh",
      backgroundColor: "#2c36c0" 
    }}>
      <Image src={img} alt="Imagem" width={100} height={100} /> {/* Adicionando a imagem */}
      <h1 style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }}>Tigrinho da Porta</h1>
      <Link href="/jogo">
        <button style={{
          padding: "15px 30px",
          fontSize: "1.5rem",
          borderRadius: "10px",
          backgroundColor: "#fff",
          color: "#2c36c0",
          border: "none",
          cursor: "pointer"
        }}>Que comecem os jogos!</button>
      </Link>
    </div>
  );
}
