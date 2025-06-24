import Botao from "@/components/Botao";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className="flex items-center justify-between bg-[#EDF2F4] px-4 sm:px-8 py-4"
        style={{ height: "9.063rem" }}
      >
        <div className="flex items-center space-x-4">
          <div className="relative h-10 sm:h-12 w-[5rem]">
            <Image
              src="/images/logo.svg"
              alt="Logo da CozinhAi"
              fill
            />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-t from-[#22577A] to-[#57CC99] bg-clip-text text-transparent"
            style={{
              fontFamily: "DaCherry",
              cursor: "default",
              marginLeft: "0.4rem",
            }}
          >
            CozinhAI
          </h1>
        </div>

        <Botao texto="Experimente agora!" destino="/home" />
      </div>

      <div className="relative w-full min-h-[400px] sm:min-h-[600px] flex items-center">
        {/*div que contém a imagem da salada e o texto que a sobrepõe.*/}
        <div className="absolute inset-0 w-full h-full object-cover z-0">
          <Image
            alt="Bowl de salada com milho, tomate, ovos, e frango"
            src="/images/salada.svg"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-full sm:max-w-[28.375rem] mx-4 sm:ml-[10.188rem] py-8">
          <h1
            className="font-bold"
            style={{
              fontFamily: "Alexandria",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Sem ideias para o jantar?
          </h1>
          <p
            className="max-w-full sm:max-w-[28rem]"
            style={{ fontSize: "1.25rem", fontWeight: "300" }}
          >
            Selecione o que tem na geladeira e receba sugestões de receitas
            deliciosas, feitas sob medida para você.
          </p>
          <div className="py-6 flex justify-start">
            <Botao texto="Experimente agora!" destino="/home" fontSize="20px" />
          </div>
        </div>
      </div>

      <h2
        className="mt-16 mb-24 flex justify-center text-4xl sm:text-[3.8rem] font-bold"
        style={{ fontFamily: "Alexandria" }}
      >
        Seja seu próprio chefe!
      </h2>

<div className="flex flex-col sm:flex-row items-center sm:items-center mb-20 px-6 sm:px-0">
  {/* Image container */}
  <div className="relative w-[80%] max-w-[20rem] aspect-square sm:max-w-[40%] sm:w-full sm:-translate-x-[20%] sm:ml-0 mx-auto sm:mx-0">
    <Image
      src="/images/cozinheiros.svg"
      alt="Duas pessoas cozinhando juntas."
      fill
      className="object-contain"
    />
  </div>

  {/* Text block */}
  <p
    className="mt-6 sm:mt-0 sm:ml-12 max-w-full sm:max-w-[41.87rem] text-center sm:text-left px-4 sm:px-0"
    style={{
      fontFamily: "Alexandria",
      fontWeight: "300",
      fontSize: "1.8rem",
    }}
  >
    Menos desperdício e mais sabor no seu dia a dia. Use o que já está em
    casa e descubra novas receitas criativas para variar no cardápio.
  </p>
</div>
      <Footer />
    </>
  );
}
