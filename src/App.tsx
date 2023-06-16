import { useEffect, useState } from "react";
import { provider } from "./services/firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import "./app.css";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

function App() {
  const [escolhaJogador, setEscolhaJ] = useState("");
  const [escolhaMaquina, setEscolhaM] = useState("");
  const [first, setFirst] = useState(0);
  const [seg, setSeg] = useState(1);
  const [dis, setDis] = useState("");
  const [count, setCount] = useState(0);
  const [define, setDefine] = useState(NaN);
  const [result, setResult] = useState("");
  const [contadorV, setContadorV] = useState(0);
  const [contadorD, setContadorD] = useState(0);
  const [contadorE, setContadorE] = useState(-1);
  const [cor, setCor] = useState("");
  const [user, setUser] = useState("");
  const [foto, setFoto] = useState("");
  const [useImg, setuserImg] = useState('')
  var J = ["pedra", "papel", "tesoura"];
  var R = ["Empate", "Você Venceu", "Você Perdeu"];

  const auth = getAuth();

  function maquina() {
    const M = Math.floor(Math.random() * 3);
    setEscolhaM(J[M]);
    {
      /*😎*/
    }
  }

  function jogadas() {
    console.log(result);
    console.log(escolhaMaquina);
    console.log(escolhaJogador);

    if (escolhaJogador == escolhaMaquina) {
      setResult(R[0]);
      setContadorE(contadorE + 1);
      setCor("white");
    }
    if (
      (escolhaJogador == "pedra" && escolhaMaquina == "tesoura") ||
      (escolhaJogador == "papel" && escolhaMaquina == "pedra") ||
      (escolhaJogador == "tesoura" && escolhaMaquina == "papel")
    ) {
      setResult(R[1]);
      setContadorV(contadorV + 1);
      setCor("Green");
    }
    if (
      (escolhaMaquina == "pedra" && escolhaJogador == "tesoura") ||
      (escolhaMaquina == "papel" && escolhaJogador == "pedra") ||
      (escolhaMaquina == "tesoura" && escolhaJogador == "papel")
    ) {
      setResult(R[2]);
      setContadorD(contadorD + 1);
      setCor("Red");
    }
  }

  function limpar() {
    setContadorD(0);
    setContadorE(0);
    setContadorV(0);
    setCount(0);
  }

  function btnShow() {
    setFirst(1);
    setSeg(0);
    setDis("none");
    
  }

  function voltar() {
    setFirst(0);
    setSeg(1);
    setDis("");
  }

  useEffect(() => {
    jogadas();
    setEscolhaJ("");
  }, [escolhaJogador]);

  async function sigin() {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    setFoto(result.user.photoURL);
  }

  return (
    <div className="App">
      <div className="login-before">
        <FiLogIn onClick={sigin} id="login" />
      </div>
      <div className="login-after" style={{display: useImg}}>
        <img src={foto} />
      </div>
      <div className="after" style={{display: dis }}>
        <h1>Pedra Papel e Tesoura</h1>
        <button id="btnEnt" onClick={btnShow}>
          Jogar
        </button>
        <p id="nome">Made by: JM</p>
      </div>
      <div id="before" style={{ opacity: first }}>
        <h1>
          Jogador = {J[define]} <br />X<br /> Maquina = {escolhaMaquina}
        </h1>
        <p id="pResp" style={{ color: cor }}>
          Resultado = {result}
        </p>
        <FaRegHandRock
          className="opt"
          onClick={() => {
            setEscolhaJ(J[0]);
            setDefine(0);
            maquina();
            setCount(count + 1);
          }}
        />
        <FaRegHandPaper
          className="opt"
          onClick={() => {
            setEscolhaJ(J[1]);
            setDefine(1);
            maquina();
            setCount(count + 1);
          }}
        />
        <FaRegHandScissors
          className="opt"
          onClick={() => {
            setEscolhaJ(J[2]);
            setDefine(2);
            maquina();
            setCount(count + 1);
          }}
        />
        <p id="pV">Vitórias = {contadorV}</p>
        <p id="pE">Empates = {contadorE}</p>
        <p id="pD">Derrotas = {contadorD}</p>
        <button onClick={limpar} id="btnCss">
          Limpar
        </button>
        <p id="jog">Quantidade de jogadas = {count}</p>
        <div id="right">
          <button id="btnVolt" onClick={voltar}>
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
