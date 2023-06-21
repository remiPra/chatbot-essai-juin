"use client"; // Ceci est un composant client 👈🏽
import { Configuration, OpenAIApi } from 'openai';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Page() {
  const [screen, setScreen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (screen < 2) {
        setScreen((prevScreen) => prevScreen + 1);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [screen]);

  const skipToScreen2 = () => {
    setScreen(2);
  };

  const [data, setData] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [responseInput, setResponseInput] = useState('');

  const handleChange = (data) => {
    console.log(data);
    setQuestionInput(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseInput('');
    setIsLoading(true);

    console.log(questionInput);
let openai = null
    if (typeof window !== 'undefined') {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_DEMO_VARIABLE
      });
      openai = new OpenAIApi(configuration);
      console.log(openai);
    }

    const querySnapshot = await getDocs(collection(db, 'dataLimoges'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      setData(doc.data().text);
    });

    let messages = [
      {
        role: 'system',
        content: 'you are the customer service employee of La loge gogaille'
      },
      {
        role: 'user',
        content:
          'voici le texte qui va te servir de base pour ta réponse  : ' +
          data +
          'réponds en cherchant dans le texte : voici la question : ' +
          questionInput +
          "réponds à cette question comme si tu répondais comme un employé de la réception de l'hotel de La Loge Gogaille de Limoges, sois sympathique"
      }
    ];
    const total =
      'voici le texte : ' +
      data +
      'réponds en cherchant dans le texte : voici la question : ' +
      questionInput +
      "réponds à cette question comme si tu répondais comme un employé de la réception de l'hotel de La Loge Gogaille";
    console.log(total);

    setIsFetchingResponse(true);

    if (typeof window !== 'undefined') {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',{
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 2000
  },{
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEMO_VARIABLE}`,
          'Content-Type': 'application/json',
        },
      })
      

      setIsFetchingResponse(false);

      if (
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        console.log({ answer: response.data.choices[0].message.content });
        const fullText = response.data.choices[0].message.content;

        setResponseInput('');

        for (let i = 0; i < fullText.length; i++) {
          setTimeout(() => {
            setResponseInput((prevText) => prevText + fullText[i]);
          }, i * 50);
        }
      } else {
        console.error("Erreur de l'API OpenAI:");
      }
    }

    setIsLoading(false);
    setIsFormVisible(false);
  };

  const handleAutreQuestion = () => {
    setIsFormVisible(true);
    setQuestionInput('');
    setResponseInput('');
  };

  return (
    <>
      {typeof window !== 'undefined' && (
        <>
          {screen === 0 && (
            <div className="flex min-h-screen flex-col items-center justify-between">
              <h1>le chatbot est basé sur des infos pratiques</h1>

            </div>
          )}
          {screen === 1 && (
            <div className="flex min-h-screen flex-col items-center justify-between">
              <h2>
                Vous pouvez poser les questions que vous voulez , gardez a l'esprit que nous sommes au balbutiement de cette ia
                </h2>
            </div>
          )}
          {screen === 2 && (
            <div className="screen">
              <main className="flex min-h-screen flex-col items-center justify-between">
                <button
                  onClick={skipToScreen2}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                >
                  Passer à l'écran 2
                </button>
                <div className="flex flex-col h-screen">
                  <div className="flex flex-row w-full">
                    <div className="text-xl flex flex-col">
                      {isFormVisible && (
                        <>
                          <h2 className="mt-100 text-3xl dancing-script font-primary">
                            Bienvenue sur L'ia de la loge de Gogaille
                          </h2>
                          <h3 className="mt-2 font-primary">
                            Je suis Nono le robot du service clientèle, prêt à vous répondre
                          </h3>
                          <form className="mt-60px w-2/3 mx-auto w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-2 text-lg font-medium text-gray-800">
                              Posez votre question:
                            </label>
                            <input
                              onChange={(e) => handleChange(e.currentTarget.value)}
                              className="w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              type="text"
                              id="question"
                              name="question"
                            />
                            <button
                              onClick={handleSubmit}
                              className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded cursor-pointer hover:bg-indigo-600"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Chargement...' : 'Submit'}
                            </button>
                          </form>
                        </>
                      )}
                      {!isFormVisible && (
                        <>
                          <button
                            onClick={handleAutreQuestion}
                            className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded cursor-pointer hover:bg-indigo-600"
                          >
                            Autre question
                          </button>
                          <p className="text-left text-black p-4">{responseInput}</p>
                        </>
                      )}
                      {isFetchingResponse && (
                        <p className="text-black p-4">Chargement de la réponse...</p>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Page;
