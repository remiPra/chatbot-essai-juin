"use client"; // This is a client component 👈🏽
import { Configuration, OpenAIApi } from 'openai';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase'


import React, { useState } from 'react'

function Page() {
  const [data,setData] = useState()
  const [questionInput, setQuestionInput] = useState('')
  const [responseInput, setResponseInput] = useState('')

  const handleChange = (data) => {
    console.log(data)
    setQuestionInput(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(questionInput)
   
    const configuration = new Configuration({
      apiKey: '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'
    });
    const openai = new OpenAIApi(configuration);
    console.log(openai)
    const querySnapshot = await getDocs(collection(db, 'dataLimoges'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      setData(doc.data().text)
    });

    // Définir la question
    let question = questionInput;

    // Créer les messages pour GPT-3
    let messages = [
      {
          'role': 'system',
          'content': 'you are the customer service employee '
      },
     
      {
          'role': 'user',
          'content':"voici le texte : " + data + "réponds en cherchant dans le texte : voici la question : " +  questionInput  + "réponds a cette question comme si tu répondais comme un employé de la réception de l'hotel de La Loge Gogaille , sois sympathique , met des liens google maps si tu te donne le lien d'un des restaurants cité " 
      },
     
  ];
  const total = "voici le texte : " + data + "réponds en cherchant dans le texte : voici la question : " +  questionInput  + "réponds a cette question comme si tu répondais comme un employé de la réception de l'hotel de La Loge Gogaille "
  console.log(total)

    // Envoyer les messages à GPT-3 et obtenir une réponse
  
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 2000
        });
               if (response && response.data && response.data.choices && response.data.choices.length > 0) {
            console.log({ answer: response.data.choices[0].message.content });
            const fullText = response.data.choices[0].message.content;

            setResponseInput('')

            for (let i = 0; i < fullText.length; i++) {
              setTimeout(() => {
                setResponseInput((prevText) => prevText + fullText[i]);
              }, i * 50); // Définissez la vitesse de frappe ici (50 millisecondes ici)
            }


        } else {
            console.error('Erreur de l\'API OpenAI:');
            // res.json({ error: 'Erreur de l\'API OpenAI.' });
        }

    
  




      }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="flex flex-col   h-screen ">
        <div className="flex flex-row w-full">
          <div className=" text-xl w-1/2 flex flex-col  text-center">

            <h2 className="mt-100 text-3xl dancing-script font-primary"> Bienvenue sur L'ia de la loge de Gogaille</h2>
            <h3 className="mt-2 font-primary">Je suis Nono le robot du service cleintèle , pret a vous répondre   </h3>
            <form className="mt-60px w-2/3 mx-auto w-full  max-w-sm p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-2 text-lg font-medium text-gray-800" >Posez votre
                question:</label>
              <input onChange={(e) => handleChange(e.currentTarget.value)}
                className="w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text" id="question" name="question" />
              <button onClick={handleSubmit}
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded cursor-pointer hover:bg-indigo-600"
              > Submit</button>
            </form>
          </div>
          <div className=" relative w-1/2">
            <figure >
              <img src="https://cdn.discordapp.com/attachments/1064968678640201758/1119603734826197012/remi_award_winning_nature_photography_of_white_colorsportrait_f_b750139e-3038-4fab-8606-4b45f7a5fcdf.png" />
              <div className="bg-cyan-700 opacity-6 absolute top-0 left-0 h-full w-full z-[1]">
                <p className='text-cyan-700 opacity-6'>
                  ghjklkkl
                  </p>
              </div>
            </figure>

            <div className="absolute top-0 left-0 w-full z-[2]">
              {/* <p className="text-white p-4 ">{data}</p> */}
              <p className="text-white p-4 ">{responseInput}</p>
            </div>


          </div>
        </div>
      </div>


    </main>
  )
}

export default Page