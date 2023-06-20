import { Configuration, OpenAIApi } from 'openai';
import fs from "fs"
import { NextResponse } from 'next/server';

export async function POST(req, res) {

    // Lire le fichier texte
    let texte_complet = fs.readFileSync('public/dumbdata.txt', 'utf8');

    // Remplacez par votre clé API OpenAI
    const configuration = new Configuration({
        apiKey: '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'
    });
    const openai = new OpenAIApi(configuration);

    // Définir la question
    let question = req.body.question;

    // Créer les messages pour GPT-3
    let messages = [
        {
            'role': 'system',
            'content': 'Vous êtes un assistant intelligent.'
        },
        {
            'role': 'user',
            'content': texte_complet
        },
        {
            'role': 'user',
            'content': question
        }
    ];

    // Envoyer les messages à GPT-3 et obtenir une réponse
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 2000
        });
        // Renvoyer la réponse à l'interface utilisateur
        if (response && response.data && response.data.choices && response.data.choices.length > 0) {
            // res.json({ answer: response.data.choices[0].message.content });
            console.log(ok)
        } else {
            console.error('Erreur de l\'API OpenAI:', response);
            // res.json({ error: 'Erreur de l\'API OpenAI.' });
        }

    } catch (err) {
        console.error('Erreur lors de la création de la completion du chat:', err.message);
        // res.json({ error: err.message });
    }
}
